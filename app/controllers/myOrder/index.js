'use strict';

angular.module('app').controller('MyOrderIndexCtrl', function MyOrderIndexCtrl($scope,ngDialog) {
  var vm = $scope.vm = {};
  $scope.flag = false;
  $scope.toggleOrder = function(){
  	$scope.flag = !$scope.flag;
  }
  $scope.openUseExternalTemplate = function(){
      ngDialog.open({
        template: 'controllers/myOrder/popWindow-confirm.html',
        plain: false,
        className: 'ngdialog-theme-default',
        closeByEscape: true,
        closeByDocument: true
      });
    };

	$scope.openUseExternalTemplate1 = function(){
	  ngDialog.open({
	    template: 'controllers/myOrder/popWindow-pay.html',
	    plain: false,
	    className: 'ngdialog-theme-default',
	    closeByEscape: true,
	    closeByDocument: true
	  });
	};

	$scope.openUseExternalTemplate2 = function(){
	  ngDialog.open({
	    template: 'controllers/myOrder/popWindow-content.html',
	    plain: false,
	    className: 'ngdialog-theme-default',
	    closeByEscape: true,
	    closeByDocument: true
	  });
	};
});