
var http = require("http");
var https = require("https");
var XMLparseString = require('xml2js').Parser({explicitArray : false});
//var moment = require('moment');
var moment = require('moment-timezone');

exports.get = function(options, targetArea, onResult)
{
	console.log("Requesting HTTP GET: " + options.host + '/' + options.path);
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

			
			// Get next 5 hours
			var resultObjects = [];
			var tempfound = false;
			var hour = moment();
			for (i=0; resultObjects.length<8; i++) {
				if (result.weatherdata.product.time[i].location.temperature !== undefined) {
					   	if (result.weatherdata.product.time[i].location.temperature.$.value !== undefined) {
							temp = result.weatherdata.product.time[i].location.temperature.$.value;
							windspeed = result.weatherdata.product.time[i].location.windSpeed.$.mps;
							windspeedDirection = result.weatherdata.product.time[i].location.windDirection.$.name;
							tempfound = true;
						};
				};

				if (tempfound == true && result.weatherdata.product.time[i+1].location.symbol !== undefined) {
						// We have temp. Proceed also to next elements from XML
						rainMin = result.weatherdata.product.time[i+1].location.precipitation.$.minvalue;
						rainMax = result.weatherdata.product.time[i+1].location.precipitation.$.maxvalue;
						symbolname = result.weatherdata.product.time[i+1].location.symbol.$.id;
						symbolno = result.weatherdata.product.time[i+1].location.symbol.$.number;


						hour.add(1, 'hours').tz('Europe/Helsinki');
						if (temp !== undefined && symbolname !== undefined && symbolno !== undefined && windspeed !== undefined) {
						resultObjects.push ( {
							country : 'FIN',
							area : targetArea,
							temp: temp,
							symbolname: symbolname,
							symbolno: symbolno,
							windspeed: windspeed,
							windspeedDirection: windspeedDirection,
							rainMin: rainMin,
							rainMax: rainMax,
							hour: hour.format('HH')
            			});

						// Finally tempfound must be false as we how our object together now.
						tempfound = false;
						};
				};
            };



			JSON.stringify(resultObjects);
			
			onResult(res.statuscode, resultObjects);
            });

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






