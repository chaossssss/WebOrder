'use strict';

angular.module('app').controller('NewPasswordCtrl', function NewPasswordCtrl($scope) {
	var vm = $scope.vm = {};

	$scope.stepImage2 = "images/setUp/step2off.png";
	$scope.changePsd = "yes";
	$scope.stepNewPsd= 1;
	
	$scope.step1ToNext = function(){
  		$scope.stepImage2 = "images/setUp/step2on.png";
  		$scope.stepNewPsd = 2;
  	}

  	$scope.step2ToNext = function(){
  		$scope.changePsd = "success";
  	}

});