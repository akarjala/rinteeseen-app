angular.module('reviewController', [])


	// inject the Review service factory into our controller
        .controller('reviewController', ['$scope','$http','Reviews', function($scope, $http, Reviews) {
	        $scope.reviewForm = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all reviews
		Reviews.get()
			.success(function(data) {
			        console.log('Hitting Reviews.get');
				
				$scope.reviews = data;
				$scope.loading = false;
			});

     // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createReview = function(area, pisteId, reviewno, comment) {
            console.log('Hitting Review.createReview');
            
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if (reviewno == '1' || reviewno == '2' || reviewno == '3' || reviewno == '4' || reviewno == '5') {
                $scope.submitError = '';
                $scope.loading = true;
                console.log('Submit received ok.');

                // call the create function from our service (returns a promise object)
				reviewData = ({
						area: area,
						pisteId: pisteId,
					    reviewno: reviewno,
						comment: comment
				});

				Reviews.createReview(reviewData)

                    // if successful creation, call our get function to get all the new pistes
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.reviewForm = {}; // clear the form so our user is ready to enter another
						console.log('got data back: '+data);
                        $scope.reviews = data; // assign our new list of reviews
						$scope.$apply;
                    });
            } else {
                console.log('Bad submit');
                $scope.submitError = 'Error';
            };
        };

		$scope.stateChanged = function() {
				console.log('CHanged!');
		};



        }]);


