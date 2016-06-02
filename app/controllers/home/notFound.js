'use strict';

angular.module('app').controller('HomeNotFoundCtrl', function HomeNotFoundCtrl($scope,ngDialog) {
  var vm = $scope.vm = {};
  $scope.clickToOpen = function () {

        ngDialog.open({
		    template: '<p>my template</p>',
		    plain: true
		});
		// ngDialog.open({ template: 'index.html', className: 'ngdialog-theme-default' });
    };
});
