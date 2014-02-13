var http = require('http');
var wit = require('./wit');
var url = require('url');

var express = require('express');
var app = express();

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/wit', function(req, res) {
    if (req && req.query && req.query.text) {
        var parameters = req.query.text;
        var wit_request = wit.request_wit(parameters);

        //proxy for WIT with oAuth2
        wit_request.when(function(err, response) {
            if (err) console.log(err); // handle error here
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(response));
        });
    } else {
        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({'error': 'text parameter specified'}));
    }
});

app.listen(8080);
console.log('Listening on port 8080');