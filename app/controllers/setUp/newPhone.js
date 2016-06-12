'use strict';

angular.module('app').controller('NewPhoneCtrl', function NewPhoneCtrl($scope,$timeout) {
	var vm = $scope.vm = {};

	$scope.stepImage2 = "images/setUp/step2off.png";
	$scope.stepNewPhone = 1;
	$scope.changePhone = "yes";

  	$scope.step1ToNext = function(){
  		$scope.stepImage2 = "images/setUp/step2on.png";
  		$scope.stepNewPhone = 2;
  	}

  	$scope.step2ToNext = function(){
  		$scope.changePhone = "success";
  	}

	$scope.sendTime = function(){
		$scope.sms_code_status=true;
		smsCodeLoad(60);
	}

  	//发送内容
	$scope.sms_code_content='发送验证码';
	//用于设置disabled
	$scope.sms_code_status=false;
	var time = 60;
	function smsCodeLoad(time) {
		console.log(time);
		if (time == 0) {
		//倒计时结束do something
		$scope.sms_code_content = '发送验证码';
		$scope.sms_code_status = false;
		}
		else {
		$scope.sms_code_content = time+'秒后重发';
		$scope.sms_code_status = true;
		time--;
		    $timeout(function () {
		        smsCodeLoad(time)
		    }, 800);
		}
	};
});