var myfilter = angular.module('rinteeseenFilters', [])

	myfilter.filter('updatedDateDiff', function() {
	  return function(input) {
	    var diff = Math.abs(new Date() - new Date(input));
	    var diff = Math.floor((diff/1000)/60);
	    console.log('Filter: updatedDateDiff with input: ' + input);
	    return diff;
	  };
	});

        myfilter.filter('pisteStatusFormatter', function() {
          return function(input) {
            var output = 'AVOINNA';
            if (input=="94") { 
              output = 'SULJETTU'; 
            };
            return output;
          };
        });

        myfilter.filter('pisteStatusImageFormatter', function() {
          return function(input) {
            var output = 'ok.png';
            if (input=="94") { 
              output = 'stop.png';
            };
            return output;
          };
        });

        myfilter.filter('dateFormatter', function() {
          return function(input) {
			var output = '';
			if (input != undefined) {
            	var date = new Date(input);
            	var output = date.toLocaleString();
			}
            return output;
          };
        });

        myfilter.filter('extractTimeFromDate', function() {
          return function(input) {
            var date = new Date(input);
            var output = date.toLocaleTimeString(); 
            return output;
          };
        });

        myfilter.filter('reviewSummaryFormatter', function() {
          return function(input) {
            if (input == '') {
				return 'Ei vielä arvioita.';
			} else { return input };
          };
        });



	// Input array of objects. You get back array with objects where date is today
        myfilter.filter('reviewsToday', function() {
          return function(input) {
            var output = [];

            angular.forEach(input, function(review) {
              var today = new Date();
	      var date = new Date(review.date);
	      if (today.toDateString() === date.toDateString()) {
	      	// Review date is today, push the review object to return array.
	        output.push(review);
	      };
	    });
            return output;
          };
        });

        myfilter.filter('reviewAverageToday', function() {
          return function(input) {
            var avg = 0;
            var sum = 0;
            var num = 0;
            angular.forEach(input, function(onereview) {
              var today = new Date();
              var date = new Date(onereview.date);
              if (today.toDateString() === date.toDateString()) {
                // Review date is today
	        sum+= onereview.review;
	        num++;   
	      };
            }); 
            if (num != 0) {
              var avg = Math.round (sum/num);
            };
            return avg;
          };
        });


        




