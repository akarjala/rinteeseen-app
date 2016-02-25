angular.module('updateServiceModule', [])


	.factory('LatestOnePisteService', ['$http', function($http) { 
	  return {
	    get : function() {
	      	console.log('Service: LatestonePisteService');
	      	return $http.get('/api/latestonepiste');
	      }
	    }
          }]);

	/* Could me more services in this service module
	.factory('someService', ['$http',function($http) {
		return {
			get : function() {
			        console.log('pisteServer GET');
				return $http.get('/api/pistes');
			},
			create : function(pisteData) {
				return $http.post('/api/pistes', pisteData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);
	*/


