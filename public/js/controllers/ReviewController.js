angular.module('reviewController', [])


	// inject the Review service factory into our controller
        .controller('reviewController', ['$scope','$http','Reviews', function($scope, $http, Reviews) {
	        $scope.reviewForm = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all pistes and show them
		Reviews.get()
			.success(function(data) {
			        console.log('Hitting Reviews.get');
				
				$scope.reviews = data;
				$scope.loading = false;
			});


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createReview = function(pisteId) {
			console.log('Hitting Reviews.createReview');
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.reviewForm.inputtext != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Reviews.createReview($scope.reviewForm, pisteId)

					// if successful creation, call our get function to get all the new pistes
					.success(function(data) {
						$scope.loading = false;
						$scope.reviewForm = {}; // clear the form so our user is ready to enter another
						$scope.reviews = data; // assign our new list of pistes
					});
			};
		};

        }]);


