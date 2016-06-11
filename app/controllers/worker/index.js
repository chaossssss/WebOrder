'use strict';

angular.module('app').controller('WorkerIndexCtrl', function WorkerIndexCtrl($scope) {
  var vm = $scope.vm = {};
  $scope.infoshow = true;
  $scope.infoshow1 = false;
  $scope.toggle = function(){
  	$scope.infoshow = true;
  	$scope.infoshow1 = false;
  }
  $scope.toggle1 = function(){
  	$scope.infoshow = false;
  	$scope.infoshow1 = true;
  }
});