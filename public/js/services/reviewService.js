var reviewModule = angular.module('reviewServiceModule', [])

	// super simple service
	// each function returns a promise object 
	reviewModule.factory('Reviews', ['$http',function($http) {
		return {
			get : function() {
			        console.log('reviewService get');
				return $http.get('/api/review');
			},
			createReview : function(reviewForm, pisteId) {
			  	console.log('reviewService create');
			  	// Add piste _id to data so that we know to which piste the review is referring
			  	reviewForm._id = pisteId;
				return $http.post('/api/review', reviewForm);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);



