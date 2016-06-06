'use strict';

angular.module('app').controller('ManageIndexCtrl', function ManageIndexCtrl($scope,ngDialog) {
  var vm = $scope.vm = {};
  $scope.openUseExternalTemplate = function(){
	  ngDialog.open({
	    template: 'controllers/manage/popCharge.html',
	    plain: false,
	    className: 'ngdialog-theme-default',
	    closeByEscape: true,
	    closeByDocument: true
	  });
	};
});
