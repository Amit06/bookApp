angular.module('starter.controllers1', [])



.controller('LinkCtrl', function($scope,$window) {

  
  $scope.openLink=function(link)
  {
    $window.open(link,'_system');
  }


})
