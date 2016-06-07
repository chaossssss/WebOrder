'use strict';

angular.module('app').controller('SetUpIndexCtrl', function SetUpIndexCtrl($scope,ngDialog) {
  var vm = $scope.vm = {};
  $scope.toggle = true;
  $scope.changeName = function(){
  	$scope.toggle = !$scope.toggle;
  }
  $scope.openUseExternalTemplate = function(){
      ngDialog.open({
        template: 'controllers/setUp/popHeadPic.html',
        plain: false,
        className: 'ngdialog-theme-default',
        closeByEscape: true,
        closeByDocument: true
      });
    };
});