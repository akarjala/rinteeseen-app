angular.module('pisteController', [])


		// inject the Piste service factory into our controller
        .controller('mainController', ['$scope','$http','Pistes', function($scope, $http, Pistes) {
	        $scope.reviewForm = {};
			$scope.submitError = '';
			$scope.areaFilter = 'Levi';
			
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all pistes and show them
		Pistes.get()
			.success(function(data) {
			        console.log('Hitting Pistes.get');
			        
			        // testing, overriding the real data with sample
			        /*var data = [];
			        data.push ({ name: 'Gondooli g1', length: '500'});
				data.push ({ name: '7.3b', length: '1400'});
				data.push ({ name: '11.1', length: '900'}); */
				
				$scope.pistes = data;
				$scope.loading = false;
			});



		$scope.areas = [ {
        	name: 'Levi'
		},
		{
			name: 'Ylläs'
		}];

		$scope.areaSelected = function ($areaName) {
        	console.log("Area selected:" + $areaName);
        	$scope.areaFilter = $areaName;
		};




	}]);


