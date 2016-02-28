// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
// For development.
//var port = process.env.PORT || 8080; 				// set the port
// For redhat openshift
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
// For redhat opnenshift
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var database = require('./config/database'); 			// load the database config
//var pistedata_levi = require('./config/pistedata_levi');	// load pistedata providers config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)



app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);


// scheduled jobs ============
//
var schedulerCount_levi = 0;
setInterval(function() {
	schedulerCount_levi++;
	console.log('Scheduler triggered execUpdater, levi count is ' + schedulerCount_levi);

	var http = require('http');

	var options = {
		host: 'localhost',
		path: '/api/updatepistedata_levi',
	    port: port
	};

	callback = function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			console.log('Response to updatedpistedata_levi: ' + JSON.stringify(str).substr(0,75) + '...');
  		});
	};
	http.request(options, callback).end();
}, 300000);


var schedulerCount_yllas = 0;
setInterval(function() {
    schedulerCount_yllas++;
    console.log('Scheduler triggered execUpdater, yllas count is ' + schedulerCount_yllas);

    var http = require('http');

    var options = {
        host: 'localhost',
        path: '/api/updatepistedata_yllas',
        port: port
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log('Response to updatedpistedata_yllas: ' + JSON.stringify(str).substr(0,75) + '...');
        });
    };
    http.request(options, callback).end();
}, 250000);





// listen (start app with node server.js) ======================================

app.listen(port, server_ip_address, function () {
		  console.log( "Listening on " + server_ip_address + ", port " + port )
});



