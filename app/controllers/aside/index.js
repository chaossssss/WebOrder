'use strict';

angular.module('app').controller('AsideIndexCtrl', function AsideIndexCtrl($rootScope,$scope,$location) {
  var vm = $scope.vm = {};


  $scope.myOrderIsActive = false;
  $scope.loveIsActive = false;
  $scope.manageIsActive = false;
  $scope.recordIsActive = false;
  $scope.setUpIsActive = false;

  switch($location.url())
  {
    case "/abstract/aside/myOrder":

      $scope.myOrderIsActive = true;
      $scope.loveIsActive = false;
      $scope.manageIsActive = false;
      $scope.recordIsActive = false;
      $scope.setUpIsActive = false;
      break;
    case "/abstract/aside/love":
      $scope.myOrderIsActive = false;
      $scope.loveIsActive = true;
      $scope.manageIsActive = false;
      $scope.recordIsActive = false;
      $scope.setUpIsActive = false;
      break;
    case "/abstract/aside/manage":
      $scope.myOrderIsActive = false;
      $scope.loveIsActive = false;
      $scope.manageIsActive = true;
      $scope.recordIsActive = false;
      $scope.setUpIsActive = false;
      break;
    case "/abstract/aside/record":
      $scope.myOrderIsActive = false;
      $scope.loveIsActive = false;
      $scope.manageIsActive = false;
      $scope.recordIsActive = true;
      $scope.setUpIsActive = false;
      break;
    case "/abstract/aside/setUp":
      $scope.myOrderIsActive = false;
      $scope.loveIsActive = false;
      $scope.manageIsActive = false;
      $scope.recordIsActive = false;
      $scope.setUpIsActive = true;
      break;  
  }

  // $rootScope.$on('$locationChangeSuccess', function(event,toState, toParams, fromState, fromParams){
  //     // console.log(event);
  //     // console.log('toState', toState);
  //     // console.log('toParams', toParams);
  //     // console.log('fromState', fromState);
  //     // console.log('fromParams', fromParams);

  //     console.log("路径",$location.url());
  //     if($location.url() === "/abstract/aside/setUp"){
  //       $location.url("/abstract/aside/setUp");
  //       $scope.myOrderIsActive = false;
  //           $scope.loveIsActive = false;
  //           $scope.manageIsActive = false;
  //           $scope.recordIsActive = false;
  //           $scope.setUpIsActive = true;

  //       console.log("相等");
  //     }else{
  //       console.log("不想等");
  //     }
      
      // switch($location.url())
      //   {
      //     case "/abstract/aside/myOrder":

      //       $scope.myOrderIsActive = false;
      //       $scope.loveIsActive = false;
      //       $scope.manageIsActive = false;
      //       $scope.recordIsActive = false;
      //       $scope.setUpIsActive = false;
      //       break;
      //     case "/abstract/aside/love":
      //       $scope.myOrderIsActive = false;
      //       $scope.loveIsActive = true;
      //       $scope.manageIsActive = false;
      //       $scope.recordIsActive = false;
      //       $scope.setUpIsActive = false;
      //       break;
      //     case "/abstract/aside/manage":
      //       $scope.myOrderIsActive = false;
      //       $scope.loveIsActive = false;
      //       $scope.manageIsActive = true;
      //       $scope.recordIsActive = false;
      //       $scope.setUpIsActive = false;
      //       break;
      //     case "/abstract/aside/record":
      //       $scope.myOrderIsActive = false;
      //       $scope.loveIsActive = false;
      //       $scope.manageIsActive = false;
      //       $scope.recordIsActive = true;
      //       $scope.setUpIsActive = false;
      //       break;
      //     case "/abstract/aside/setUp":
      //       $scope.myOrderIsActive = false;
      //       $scope.loveIsActive = false;
      //       $scope.manageIsActive = false;
      //       $scope.recordIsActive = false;
      //       $scope.setUpIsActive = true;
      //       break;  
      //   }
  // }); 

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

        // console.log('跳转路由的名字', toState.name);

        switch(toState.name)
        {
        	case "abstract.aside.myOrder":
				$scope.myOrderIsActive = true;
				$scope.loveIsActive = false;
				$scope.manageIsActive = false;
				$scope.recordIsActive = false;
				$scope.setUpIsActive = false;
        		break;
        	case "abstract.aside.love":
        		$scope.myOrderIsActive = false;
				$scope.loveIsActive = true;
				$scope.manageIsActive = false;
				$scope.recordIsActive = false;
				$scope.setUpIsActive = false;
        		break;
        	case "abstract.aside.manage":
        		$scope.myOrderIsActive = false;
				$scope.loveIsActive = false;
				$scope.manageIsActive = true;
				$scope.recordIsActive = false;
				$scope.setUpIsActive = false;
        		break;
        	case "abstract.aside.record":
        		$scope.myOrderIsActive = false;
				$scope.loveIsActive = false;
				$scope.manageIsActive = false;
				$scope.recordIsActive = true;
				$scope.setUpIsActive = false;
        		break;
        	case "abstract.aside.setUp":
        		$scope.myOrderIsActive = false;
				$scope.loveIsActive = false;
				$scope.manageIsActive = false;
				$scope.recordIsActive = false;
				$scope.setUpIsActive = true;
        		break;	
        }
    });


});
