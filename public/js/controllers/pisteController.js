angular.module('pisteController', [])


		// inject the Piste service factory into our controller
        .controller('mainController', ['$scope','$http','Pistes', function($scope, $http, Pistes) {
	        
			$scope.reviewForm = {};
			$scope.submitError = '';
			$scope.areaFilterDisplayName = 'Levi';
			$scope.areaFilterArea = 'levi';
			
			
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
        	displayName: 'Levi',
			area: 'levi'
		},
		{
			displayName: 'Ylläs',
			area: 'yllas'
		},
		{
			displayName: 'Ruka',
			area: 'ruka'
		}];


		$scope.areaSelected = function (areaName) {
        	console.log("Area selected:" + areaName);
        	$scope.areaFilterArea = areaName;
			for (i=0 ; i<$scope.areas.length; i++) {
					if ($scope.areas[i].area == areaName) {
						$scope.areaFilterDisplayName = $scope.areas[i].displayName;
					};
			};
		};




	}]);


