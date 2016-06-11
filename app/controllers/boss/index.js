'use strict';

angular.module('app').controller('BossIndexCtrl', function BossIndexCtrl($scope,ngDialog) {
	var vm = $scope.vm = {};
	$scope.infoshow = true;
    $scope.infoshow1 = false;
    $scope.infoshow2 = false;
    $scope.toggle = function(){
    	$scope.infoshow = true;
    	$scope.infoshow1 = false;
    	$scope.infoshow2 = false;
    }
    $scope.toggle1 = function(){
    	$scope.infoshow = false;
    	$scope.infoshow1 = true;
    	$scope.infoshow2 = false;
  	}
  	$scope.toggle2 = function(){
    	$scope.infoshow = false;
    	$scope.infoshow1 = false;
    	$scope.infoshow2 = true;
  	}
})	