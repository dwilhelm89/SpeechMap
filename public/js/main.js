var SpeechMap = {

    ALLOWED_METHODS: ['zoom', 'pan', 'create_marker', 'create_line'],
    pan_amount: 200,

    init: function() {
        this.speechRecognition.init();
    },

    handleCommand: function(command) {
        var witResult = command.outcome;
        if (this.ALLOWED_METHODS.indexOf(witResult.intent) > -1) {
            this.toggleLoader(true);
            this[witResult.intent](witResult);
        }
    },

    zoom: function(command) {
        if (command.entities && command.entities.location && command.entities.location.value) {
            var location = command.entities.location.value.toLocaleLowerCase();

            //zoom in or out
            if (location === 'in') map.zoomIn();
            else if (location === 'out') map.zoomOut();

            //If a location is given 
            else {
              this.panToLocation(location);
            }

        }
        this.toggleLoader(false);
    },

    pan: function(command) {
        if (command.entities && command.entities.location && command.entities.location.value) {
            var location = command.entities.location.value.toLocaleLowerCase();

            //Pan in a direction
            if (location === 'up' || location === "north") map.panBy([0, this.pan_amount]);
            else if (location === 'left' || location === "west") map.panBy([-this.pan_amount, 0]);
            else if (location === 'right' || location === "east") map.panBy([this.pan_amount, 0]);
            else if (location === 'down' || location === "south") map.panBy([0, -this.pan_amount]);

            //Pan to a location (geocoding)
            else {
              this.panToLocation(location);
            }
        }
        this.toggleLoader(false);
    },

    panToLocation: function(location) {
        this.geocode(location, function(result) {
            if (result && result.results) result = result.results[0];
            if (result.locations && result.locations[0] && result.locations[0].latLng) {
                map.panTo([result.locations[0].latLng.lat, result.locations[0].latLng.lng]);
            }
            this.toggleLoader(false);
        }.bind(this));
    },

    create_marker: function(command) {
        if (command.entities && command.entities.location && command.entities.location.value) {
            var location = command.entities.location.value;

            this.geocode(location, function(result) {
                if (result && result.results) result = result.results[0];
                if (result.locations && result.locations[0] && result.locations[0].latLng) {
                    L.marker([result.locations[0].latLng.lat, result.locations[0].latLng.lng]).addTo(map);
                }
                this.toggleLoader(false);

            }.bind(this));
        }
        this.toggleLoader(false);
    },

    create_line: function(command) {
        //Line creation is only possible if two locations are available
        if (command.entities && command.entities.location && command.entities.location.length == 2) {
            var loc1 = command.entities.location[0].value;
            var loc2 = command.entities.location[1].value;
            var latLng1 = undefined;
            var latLng2 = undefined;

            //Two callback functions to handle each location individually
            //Create a line if both locations have been geocoded
            var callbackFunction1 = function(result) {
                if (result && result.results) result = result.results[0];
                if (result.locations && result.locations[0] && result.locations[0].latLng) latLng1 = result.locations[0].latLng;
                if (latLng1 && latLng2) L.polyline([latLng1, latLng2]).addTo(map);
                this.toggleLoader(false);
            };

            var callbackFunction2 = function(result) {
                if (result && result.results) result = result.results[0];
                if (result.locations && result.locations[0] && result.locations[0].latLng) latLng2 = result.locations[0].latLng;
                if (latLng1 && latLng2) L.polyline([latLng1, latLng2]).addTo(map);
                this.toggleLoader(false);
            };

            this.geocode(loc1, callbackFunction1);
            this.geocode(loc2, callbackFunction2);
        }
        this.toggleLoader(false);
    },

    //GET call to the mapquest geocoding api
    geocode: function(location, callback) {
        this.toggleLoader(true);
        $.get('http://www.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluur21ub25%2C70%3Do5-90ts54&location=' + location, callback);
    },

    //true -> show loader, false hide loader
    toggleLoader: function(arg) {
        var loader = document.getElementById('ajaxLoader');
        if (arg) loader.style.display = "block";
        else loader.style.display = "none";

    }

};
