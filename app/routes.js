
//remove
//var Todo = require('./models/todo');


var Piste = require('./models/piste');
var Review = require('./models/review');
var Updatepistedata = require('./models/updatepistedata');
var Updatepistedataconfig = require('../config/pistedata_levi'); 


function getPistes(res) {
  Piste.find(function (err, pistes) {
    if (err) {
      res.send(err);
    }
    console.log('Tee: ' + result.length);
    // Find num of reviews per piste
    for (var i=0; i<result.length; i++) {
      Review.find( { "piste": ObjectId("result[i]._id") } ).count().exec(function(err, countresult) {
      	if(err){ return next(err); }
      	  result[i].reviewsTotal = countresult; console.log(countresult);
      	});
      };
    });

    res.json(result); //return all pistes in JSON format
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

    // create todo and send back all todos after creation
    /* app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    }); */

    // delete a todo
    /* app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    }); */


// 
// Areas and update timestamps
// GET /pistes
// PUT /reviews/:id upvote and comment
// Update pistes
// GET /updatepistedata


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


    app.get('/api/updatepistedata', function(req, res, next) {
      Updatepistedata.getJSON(Updatepistedataconfig,
        function(statusCode, result)
        {
          //console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
          res.statuscode = statusCode;
          res.json(result);
        });
    });


    // Get only 1 piste, the one which was updated most recently.
   app.get('/api/latestonepiste', function(req, res, next) {
      console.log('API req: /api/latestonepiste');
      //Piste.find(function(err, result) {
      Piste.find({}).sort({'date':-1}).limit(1).exec(function(err, result) {
        if(err){ return next(err); }
        res.json(result);
      });
   }); 



   // create review and send back all reviews after creation
   app.post('/api/review', function (req, res) {
	console.log('API req POST: /api/review');
	console.log('post params: '+req.body._id+'--'+req.body.inputtext);
        var reviewno = 5;
	Review.create({         
          review: reviewno,
          comment: req.body.inputtext,
          piste: req.body._id
        }, function (err, review) {
          if (err) { return res.send(err); }

          // get and return all the reviews after you create another
          getPistes(res);
        });
      });
   



    // application -------------------------------------------------------------
    console.log('Routes doing app.get');

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
