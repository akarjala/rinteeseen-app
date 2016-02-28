
var http = require("http");
var https = require("https");
//var XMLparse = require('xml2js').parseString;
var XMLparseString = require('xml2js').parseString;
var moment = require('moment');


exports.updateLevi = function(options, onResult)
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

			// Parse from XML to json
			XMLparseString(output, function (err, result) {

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
						hidden: false,
						extrainfo: ''
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
						hidden: false,
						extrainfo: ''
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


/* ==================== YLLAS =============== */



exports.updateYllas = function(options, onResult)
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

			var pistes = [];

			//output = output.replace(/[\n]/g, 'rivivaihto');

			var pistecounter = 0;

			// create array by linefeed so each line is item in array
			iteration1 = output.split(/[\n]/g);


			// FIRST ITERATE RINNE, LIFTS WILL FOLLOW LATER

			for (i=0; i<iteration1.length; i++) {

				var search = '_rinne=\''; var pisteno = '';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
						// Open object for writing 
						var inputopen = 1;
                        var pisteno = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
						pistecounter++;
						pistes.push( {
                        	country : 'FIN',
                        	area : 'Ylläs',
                        	name: pisteno,
                        	date: moment().format(),
                        	status: '',
                        	difficulty: '',
                        	length: '',
                        	hidden: false,
							extrainfo: ''
						});
                };

				var search = '_nimi=\'';
				var nameposition = iteration1[i].indexOf(search);
				if ( inputopen == 1 && nameposition != -1) {
						pistes[pistecounter-1].name = pistes[pistecounter-1].name + ' ' + iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
				};

                var search = '_pituus=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
                        pistes[pistecounter-1].length = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
                };

                var search = '_avoinna=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
						status = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
						if (status == 'Avoinna') {
							pistes[pistecounter-1].status = 169;
						};
						if (status == 'Suljettu') {
							pistes[pistecounter-1].status = 94;
						};
						// Close input as avoinna is the last attribute
						inputopen = 0;
                };

                var search = '_extra1=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
                        pistes[pistecounter-1].extrainfo = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
                };

                var search = '_extra2=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
                        pistes[pistecounter-1].extrainfo = pistes[pistecounter-1].extrainfo + ' - ' + iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
                };


			};


			// NOW ITERATE THE LIFTS
			//

			for (i=0; i<iteration1.length; i++) {
				//iteration1[i] = iteration1[i].replace('var ys_', '');

				var search = '_hissi=\''; var pisteno = '';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
						// Open object for writing 
						var inputopen = 1;
                        var pisteno = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
						pistecounter++;
						pistes.push( {
                        	country : 'FIN',
                        	area : 'Ylläs',
                        	name: pisteno,
                        	date: moment().format(),
                        	status: '',
                        	difficulty: '',
                        	length: '',
                        	hidden: false,
							extrainfo: ''
						});
                };

				var search = '_hissin_nimi=\'';
				var nameposition = iteration1[i].indexOf(search);
				if ( inputopen == 1 && nameposition != -1) {
						pistes[pistecounter-1].name = pistes[pistecounter-1].name + ' ' + iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
				};

                var search = '_hissin_pituus=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
                        pistes[pistecounter-1].length = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
                };

                var search = '_hissi_avoinna=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
						status = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
						if (status == 'Avoinna') {
							pistes[pistecounter-1].status = 169;
						};
						if (status == 'Suljettu') {
							pistes[pistecounter-1].status = 94;
						};
						// Close input as avoinna is the last attribute
						inputopen = 0;
                };

                var search = '_hissi_extra1=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
                        pistes[pistecounter-1].extrainfo = iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
                };

                var search = '_hissi_extra2=\'';
                var nameposition = iteration1[i].indexOf(search);
                if (nameposition != -1) {
                        pistes[pistecounter-1].extrainfo = pistes[pistecounter-1].extrainfo + ' - ' + iteration1[i].slice(nameposition+search.length, iteration1[i].length-2);
                };


			};

			//debug: for (i = 0; i<pistes.length; i++) { console.log(pistes[i])};

			JSON.stringify(pistes);

            onResult(res.statuscode, pistes);
      

		}); 
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};



