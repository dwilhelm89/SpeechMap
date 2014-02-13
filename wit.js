var https = require('https');
var Future = require('futures').future;
var config = require('./config');

var request_wit = function(user_text) {
    var future = Future.create();
    var options = {
        host: 'api.wit.ai',
        path: '/message?q=' + encodeURIComponent(user_text),
        // the Authorization header allows you to access your Wit account
        // make sure to replace it with your own
        headers: {'Authorization': 'Bearer ' + config.authToken}
    };

    https.request(options, function(res) {
        var response = '';

        res.on('data', function (chunk) {
            response += chunk;
        });

        res.on('end', function () {
            future.fulfill(undefined, JSON.parse(response));
        });
    }).on('error', function(e) {
        future.fulfill(e, undefined);
    }).end();

    return future;
};

module.exports.request_wit = request_wit;