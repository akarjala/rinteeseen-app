var reviewModule = angular.module('weatherServiceModule', [])

	// super simple service
	// each function returns a promise object 
	reviewModule.factory('Weathers', ['$http',function($http) {
		return {
			get : function() {
			        console.log('weatherService get');
				return $http.get('/api/weather');
			}
		}
	}]);



