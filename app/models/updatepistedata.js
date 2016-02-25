
var http = require("http");
var https = require("https");
var XMLparse = require('xml2js').parseString;
var parseString = require('xml2js').parseString;
var moment = require('moment');



exports.getJSON = function(options, onResult)
{
    console.log("Requesting HTTP GET");
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
            // As it's XML can't parse to JSON
            //var obj = JSON.parse(output);
            //onResult(res.statusCode, obj);

            // Parse from XML
            parseString(output, function (err, result) {

              var resultobjects = [];
              
              // Elementgroup6 is lifts, 7 for piste.  
              var pistes = result['EXPORT']['DESTINATION'][0]['RESSORT'][0]['ELEMENTGROUP'][7]['ELEMENT'];
              var lifts = result['EXPORT']['DESTINATION'][0]['RESSORT'][0]['ELEMENTGROUP'][6]['ELEMENT'];

              console.log ("Number of piste: " + pistes.length);
              console.log ("Number of lifts: " + lifts.length);


              // Push pistes to the array            
              for (var i = 0; i < pistes.length; i++) {
                resultobjects.push( {
		  country : 'FIN',
		  area : 'Levi',
		  name: pistes[i]['Name'][0],
		  date: moment().format(),
		  status: pistes[i]['Status'][0],
                  difficulty: pistes[i]['Difficulty'][0],
                  length: pistes[i]['Laenge'][0],
                  hidden: false
                });
              };

              // Push lifts to the array
              for (var i = 0; i < lifts.length; i++) {
                resultobjects.push( {
                  country : 'FIN',
                  area    : 'Levi',
                  name: lifts[i]['Name'][0],
                  date: moment().format(),
                  status: lifts[i]['Status'][0],
                  difficulty: ' - ',
                  length: ' - ',
                  hidden: false
                });
              };

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





