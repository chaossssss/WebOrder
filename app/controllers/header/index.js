'use strict';

angular.module('app').controller('HeaderIndexCtrl', function HeaderIndexCtrl($scope,ngDialog) {
  var vm = $scope.vm = {};
  $scope.openUseExternalTemplate = function(){
      ngDialog.open({
          template: 'components/location/location.html',
          plain: false,
          className: 'ngdialog-theme-default',
          closeByEscape: true,
          closeByDocument: true,
          controller: 'locationCtrl'
      });
    };
});
