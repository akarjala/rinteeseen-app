angular.module('PistesDropDownControllerModule', [])

  .controller('PistesDropDownController', function ($scope) {
 
 
    $scope.dropboxitemselected = function ($pisteName) {
        console.log("drop box item selected:" + $pisteName);
    }
});

 
