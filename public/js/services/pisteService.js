var pisteModule = angular.module('pisteServiceModule', [])

	// super simple service
	// each function returns a promise object 
	pisteModule.factory('Pistes', ['$http',function($http) {
		return {
			get : function() {
			        console.log('pisteService get');
				return $http.get('/api/pistes');
			},
			createReview : function(reviewForm, pisteId) {
			  	console.log('pisteService create');
			  	// Add piste _id to data so that we know to which piste the review is referring
			  	reviewForm._id = pisteId;
				return $http.post('/api/review', reviewForm);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);





