
var http = require("http");
var https = require("https");
var XMLparseString = require('xml2js').Parser({explicitArray : false});
var moment = require('moment');


exports.get = function(options, onResult)
{
	console.log("Requesting HTTP GET");
	var prot = options.port == 443 ? https : http;

	var req = prot.request(options, function(res)
	{
		var output = '';
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			output += chunk;
		});
		res.on('end', function() {

			// Parse from XML to json
			XMLparseString.parseString(output, function (err, result) {
			var resultobjects = [];

              
			console.log('Plain: ' + result['weatherdata']['product']['time'][0]);
			var forecast = result['weatherdata']['product']['time']['location']['altitude'];
			console.log('purettu:' + forecast);
			console.log(JSON.stringify(forecast));

			resultobjects.push( {
				country : 'FIN',
				area : 'Levi',
				temp: forecast[value],
				symbol: 'snow'
				
			});


			JSON.stringify(resultobjects);
			
			onResult(res.statuscode, resultobjects);
            });

            //onResult(res.statusCode, output);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};



/**
 * postJSON: post a JSON object to a REST service
 *
 * @param options
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.postJSON = function(options, data, onResult)
{
    console.log("rest::postJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            console.log('end: ' + output);
            var obj = eval("(" + output + ")");
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log('error: ' + err.message);
    });

    req.write(JSON.stringify(data));
    req.end();
};






