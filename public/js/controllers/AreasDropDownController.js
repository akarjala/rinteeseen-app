angular.module('AreasDropDownControllerModule', [])

  .controller('AreasDropDownController', function ($scope) {
 
    $scope.areasDropDown = ['Math', 'Physics', 'Chemistry', 'Hindi', 'English'];
 
    $scope.dropboxitemselected = function ($areaName) {
        console.log("drop box item selected:" + $areaName);
    }
});

 
