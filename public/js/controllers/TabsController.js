angular.module('TabsControllerModule', [])

	.controller('TabsController', function ($scope) {
		$scope.tabs = [
			{ 
				title:'Ja rinteet täs',
				active: true,
				disabled: false
			},
			{	
				title:'Sää olis tässä',
				active: true,
				disabled: false
			}
		];
	
		$scope.model = {
    		name: 'Tabs'
  		};
	});


