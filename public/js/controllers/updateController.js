angular.module('updateControllerModule', [])


  .controller('updateController', ['$scope', 'LatestOnePisteService', '$http', function updateController($scope, LatestOnePisteService) {
    $scope.loading = true;
    console.log('Controller: GET latestOnePiste');
    LatestOnePisteService.get()
      .success(function(data) {
        $scope.loading=false;
        // data has 1 piste, the latest one updated.
        $scope.lastUpdatedPiste = data;
      });

    

  /* Could be some other functions as well
   *
   * $scope.checkupdatestatus = function() {
   *  do stuff...$scope.updatestatusResults = ....
   *  } */ 

  }]);





