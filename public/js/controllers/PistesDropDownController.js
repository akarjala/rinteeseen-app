angular.module('PistesDropDownControllerModule', [])

  .controller('PistesDropDownController', function ($scope) {
 
    $scope.pistesDropDown = ['Math', 'Physics', 'Chemistry', 'Hindi', 'English'];
 
    $scope.dropboxitemselected = function ($pisteName) {
        console.log("drop box item selected:" + $pisteName);
    }
});

 
