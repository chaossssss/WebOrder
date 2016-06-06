'use strict';

angular.module('app').controller('loginCtrl', function MainIndexCtrl($scope,$timeout,httpService) {
	var vm = $scope.vm = {};

	$scope.errorInfo = "";
	$scope.errorTag = false;

	$scope.login = function(phone,password){
		console.log("phone",phone,"password",password);
		if(phone === false && password === false){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入您的手机号码和密码";
		}
		if(phone === false && password === true){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入您的手机号码";
		}
		if(phone === true && password === false){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入6-12位数字、字母或常用特殊字符";
		}
		if(phone === true && password === true){
			$scope.errorInfo = false;
		}
	}

	$scope.regist = function(phone,password,sms_code){
		console.log("phone",phone,"password",password,"sms_code",sms_code);
		if(phone === false && password === false){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入您的手机号码、密码和验证码";
		}
		if(phone === false && password === true){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入您的手机号码";
		}
		if(phone === true && password === false){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入6-12位数字、字母或常用特殊字符";
		}
		if(phone === true && password === true && sms_code === false){
			$scope.errorTag = true;
			$scope.errorInfo = "请输入验证码";
		}
		if(phone === true && password === true && sms_code === true){
			$scope.errorTag = false;
		}
	}

	$scope.sendTime = function(phone){
		console.log("phone",phone);
		if(phone === false){
			$scope.errorInfo = "手机号码格式错误，请输入11位数字";
		}else{
			$scope.sms_code_status=true;
			smsCodeLoad(60);
		}
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

	//切换tab情况表单
	$scope.clearForm = function(){
		$scope.errorTag = false;
		$scope.errorInfo = "";
		$scope.phone = "";
		$scope.password = "";
	}



 }) 