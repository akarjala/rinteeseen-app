// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
// Hostname to send HTTP GET to my own APIs
var API_hostname = 'localhost';
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


// configuration ===============================================================
//provide a sensible default for local developmenti
var connection_string = 'mongodb://127.0.0.1:27017/rinteeseenapp';

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

// default to a 'localhost' dev configuration:
var connection_string = 'mongodb://127.0.0.1:27017/rinteeseenapp';

// Support Openshift environments
// if OPENSHIFT env variables are present, use the available connection info so that we can connect to openshift mongo instance.
// This works normally fine if running in one node+mongodb pod.
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	console.log('Using openshift_mongodb_db env vars.');
	connection_string = "mongodb://" + 
	process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	process.env.OPENSHIFT_APP_NAME;
};

// Connecting to another mongodb pod based on the OpenShift env vars.
if(process.env.MONGODB_DB_PASSWORD){
	console.log('Using mongodb_db env vars.');
	connection_string = "mongodb://" +
	process.env.MONGODB_DB_USERNAME + ":" +
	process.env.MONGODB_DB_PASSWORD + "@" +
	process.env.MONGODB_DB_HOST + ':' +
	process.env.MONGODB_DB_PORT + '/' +
	process.env.MONGODB_DB_DBNAME
};

if (process.env.OPENSHIFT_NODEJS_IP != undefined) {
	console.log('Using openshift_nodejs_ip env var: ' + process.env.OPENSHIFT_NODEJS_IP);
} else {
	console.log('Instead of openshift_nodejs_ip defaulting to 0.0.0.0');
};

// Connect to DB.
console.log('Connecting to Mongodb '+connection_string);
mongoose.connect(connection_string); 	// Connect to mongodb


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
		host: API_hostname,
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
        host: API_hostname,
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



