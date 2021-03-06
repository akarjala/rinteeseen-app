


var Piste = require('./models/piste');
var Review = require('./models/review');
var Weather = require('./models/weather');
var Updatepistedata = require('./models/updatepistedata');
var Updatepistedataconfig_levi = require('../config/pistedata_levi'); 
var Updatepistedataconfig_yllas = require('../config/pistedata_yllas');
var WeatherConfig = require('../config/weatherconfig');

function getPistes(res) {
  Piste.find().sort({name: -1}).exec( function (err, pistes) {
    if (err) {
      res.send(err);
    };
    res.json(pistes); //return all pistes in JSON format
  });
};


function getReviews(res) {
	Review.find( function (err, reviews) {
		if (err) {
			res.send(err);
		};
		res.json(reviews); // return all reviews in JSON format

	});
};





/* INITIAL DATA LOAD TO EMPTY DB. NORMALLY COMMENTED OUT */
/*require('/tmp/pistedata');
console.log(arr.length);
for (var i=0; i<arr.length; i++) {
  console.log(arr[i]);
  var p = new Piste({
    country : arr[i].country,
    area : arr[i].area,
    name : arr[i].name,
    date : arr[i].date,
    status : arr[i].status,
    difficulty : arr[i].difficulty,
    length : arr[i].length,
    hidden : arr[i].hidden
  }); console.log(p.name);
  p.save(function(err) {
    if (err) throw err;
    console.log('saved.');
  });
};*/





module.exports = function (app) {





  app.get('/api/pistes', function(req, res, next) {
    console.log('API req: /api/pistes');
    Piste.find(function(err, pistes) {
      if(err){ return next(err); }
      res.json(pistes); //return all pistes in JSON format
    });
  });

  app.get('/api/review', function(req, res, next) {
    console.log('API req: /api/review');
      Review.find(function(err, reviews) {
        if(err) { return next(err); }
        res.json(reviews);
      });
    });



	app.get('/api/updatepistedata_levi', function(req, res, next) {
		Updatepistedata.updateLevi(Updatepistedataconfig_levi,
		function(statusCode, result)
        {
			//console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
			res.statuscode = statusCode;

            result.forEach(function(piste) {
                var p = ({
                        country : piste.country,
                        area : piste.area,
                        name : piste.name,
                        date : piste.date,
                        status : piste.status,
                        difficulty : piste.difficulty,
                        length : piste.length,
                        hidden : piste.hidden,
						extrainfo : piste.extrainfo,
                });

                Piste.findOneAndUpdate({name: p.name}, p, {upsert: true}).exec(function(err, doc) {
					if (err) {
						   console.log(err);	
						   	return (err); }
					console.log('Successfully upsert: ' + p.area + ', ' + p.name);
				});


            });

			res.json(result);
		});

    });


	app.get('/api/updatepistedata_yllas', function(req, res, next) {
		Updatepistedata.updateYllas(Updatepistedataconfig_yllas,
		function(statusCode, result)
        {
			//console.log("onResult: (" + statusCode + ")" + JSON.stringify(result))
            res.statuscode = statusCode;
			
            result.forEach(function(piste) {
                var p = ({
                        country : piste.country,
                        area : piste.area,
                        name : piste.name,
                        date : piste.date,
                        status : piste.status,
                        difficulty : piste.difficulty,
                        length : piste.length,
                        hidden : piste.hidden,
						extrainfo : piste.extrainfo
                });

                Piste.findOneAndUpdate({name: p.name}, p, {upsert: true}).exec(function(err, doc) {
                    if (err) {
                           console.log(err);
                            return (err); }
                    console.log('Successfully upsert: ' + p.area + ', ' + p.name);
                });


            });

			res.json(result);
		});

    });



	// create review and send back all reviews after creation
	app.post('/api/review', function (req, res) {
	console.log('API req POST: /api/review');
	console.log('post params: '+req.body.area+req.body.pisteId+'--'+req.body.comment);
	
	Review.create({
 		area: req.body.area,			
		review: req.body.reviewno,
		comment: req.body.comment,
		piste: req.body.pisteId,
        }, function (err, review) {
          if (err) { return res.send(err); }
          // get and return all the reviews after you create another
          getReviews(res);
        });
      });


    app.get('/api/weather', function(req, res, next) {
        
		// WeatherConfig is an array, iterate through requesting weather for each area
		var weatherResults = [];
		Weather.get(WeatherConfig[0], 'Levi', function(err, result) {
			if(err) { return next(err); }
			weatherResults = weatherResults.concat(result);
		});

		Weather.get(WeatherConfig[1], 'Ylläs', function(err, result) {
            if(err) { return next(err); }
            weatherResults = weatherResults.concat(result);
        });

		Weather.get(WeatherConfig[2], 'Ruka', function(err, result) {
			if(err) { return next(err); }
			weatherResults = weatherResults.concat(result);
			res.json(weatherResults);
		});

        
    });



    // application -------------------------------------------------------------
    console.log('Routes doing app.get');

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/koe.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
