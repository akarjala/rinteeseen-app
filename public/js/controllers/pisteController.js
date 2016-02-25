angular.module('pisteController', [])


	// inject the Piste service factory into our controller
        .controller('mainController', ['$scope','$http','Pistes', function($scope, $http, Pistes) {
	        $scope.reviewForm = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all pistes and show them
		// use the service to get all the todos
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

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createReview = function(pisteId) {
			console.log('Hitting Pistes.createReview');
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.reviewForm.inputtext != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Pistes.createReview($scope.reviewForm, pisteId)

					// if successful creation, call our get function to get all the new pistes
					.success(function(data) {
						$scope.loading = false;
						$scope.reviewForm = {}; // clear the form so our user is ready to enter another
						$scope.pistes = data; // assign our new list of pistes
					});
			};
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};


        }]);


