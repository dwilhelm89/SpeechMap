SpeechMap.speechRecognition = {
    final_transcript: '',
    lastRecognition: 0,
    timeBetweenCommands: 3000,

    init: function() {

        if (!('webkitSpeechRecognition' in window)) {
            this.notSupportedMessage();
        } else {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';


            //is called several times if while speeking... builds a string 
            recognition.onresult = function(event) {
                //If the last word is a certain time ago, start a new sentence
                this.isNewCommand();

                //concat the single workds
                var interim_transcript = this.concatSpeechResults(event);

                if (this.final_transcript !== '') {
                    document.getElementById('interim').innerHTML = '"' + this.final_transcript + '"';
                    this.initCommand(this.final_transcript);
                }
            }.bind(this);

            //The speech recognition seems to end without any reason -> simply restarting it
            recognition.onend = function(evt) {
                console.log("end", evt);
                recognition.start();
            };

            recognition.start();
        }
    },

    concatSpeechResults: function(event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                this.final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.getElementById('interim').innerHTML = '"' + interim_transcript + '"';

        return interim_transcript;

    },

    //Check if the last word is to old in order to start a new sentence 
    //Resets the stored sentence
    isNewCommand: function() {
        var tmpTime = new Date().getTime();
        if (tmpTime - this.lastRecognition > this.timeBetweenCommands) {
            this.lastRecognition = tmpTime;
            this.final_transcript = '';
            return true;
        } else return false;
    },

    //GET call to retrieve the command from WIT (uses a proxy for oAuth2)
    initCommand: function(command) {
        $.get('./wit?text=' + command, function(result) {
            if (result) SpeechMap.handleCommand(result);
            else console.error("wit request not successful");
        });
    },

    notSupportedMessage: function() {
        alert('Speech Recognition is only supported by Chrome');
    }
};
