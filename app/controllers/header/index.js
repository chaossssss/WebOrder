'use strict';

angular.module('app').controller('HeaderIndexCtrl', function HeaderIndexCtrl($scope,ngDialog) {
  var vm = $scope.vm = {};
  $scope.openUseExternalTemplate = function(){
      ngDialog.open({
        template: 'controllers/header/serverTpl.html',
        plain: false,
        className: 'ngdialog-theme-default',
        closeByEscape: true,
        closeByDocument: true
      });
    };
});
