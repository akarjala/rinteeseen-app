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






