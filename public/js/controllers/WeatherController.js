angular.module('weatherController', [])


	// inject the Review service factory into our controller
        .controller('weatherController', ['$scope','$http','Weathers', function($scope, $http, Weathers) {
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all reviews
		Weathers.get()
			.success(function(data) {
			        console.log('Hitting Weathers.get');
				
				$scope.weathers = data;
				$scope.loading = false;
			});

        }]);


