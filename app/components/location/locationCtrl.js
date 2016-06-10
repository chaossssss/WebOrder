'use strict';

angular.module('app').controller('locationCtrl', function locationCtrl($scope,httpService) {
	var vm = $scope.vm = {};

	$scope.provinces = [
		"北京","天津","浙江省","陕西省","湖南省","天津省"
		,"河北省","济南","温州"
	]
})