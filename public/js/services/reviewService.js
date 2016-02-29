var reviewModule = angular.module('reviewServiceModule', [])

	// super simple service
	// each function returns a promise object 
	reviewModule.factory('Reviews', ['$http',function($http) {
		return {
			get : function() {
			        console.log('reviewService get');
				return $http.get('/api/review');
			},
			createReview : function(newreviewData) {
			  	console.log('reviewService create');
				return $http.post('/api/review', newreviewData);
			}
		}
	}]);



