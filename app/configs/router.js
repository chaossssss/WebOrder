'use strict';

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
  
  //首页
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'controllers/main/index.html',
    controller: 'MainIndexCtrl'
  });

  $stateProvider.state('abstract', {
    url: '/abstract',
    views :{
      '':{
          templateUrl: 'controllers/abstract/index.html',
      },
      'topbar@abstract': {
        templateUrl: 'controllers/header/index.html',
        controller: 'HeaderIndexCtrl'
      },
      'content@abstract': {
        templateUrl: 'controllers/home/index.html',
        controller: 'HomeIndexCtrl'
      },
    }
  });

  //侧边栏
  $stateProvider.state('abstract.aside', {
    url: '/aside',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/aside/index.html',
        controller: 'AsideIndexCtrl'
      }
    }
  });

  //我的订单
  $stateProvider.state('abstract.aside.myOrder', {
    url: '/myOrder',
    templateUrl: 'controllers/myOrder/index.html',
    controller: 'MyOrderIndexCtrl'
  });

  //我的收藏
  $stateProvider.state('abstract.aside.love', {
    url: '/love',
    templateUrl: 'controllers/love/index.html',
    controller: 'LoveIndexCtrl'
  });

  //账户管理
  $stateProvider.state('abstract.aside.manage', {
    url: '/manage',
    templateUrl: 'controllers/manage/index.html',
    controller: 'ManageIndexCtrl'
  });
  
  //消息记录
  $stateProvider.state('abstract.aside.record', {
    url: '/record',
    templateUrl: 'controllers/record/index.html',
    controller: 'RecordIndexCtrl'
  });

  //消息记录详情
  $stateProvider.state('abstract.detail', {
    url: '/detail',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/record/recordDetail.html',
        controller: 'RecordDetailCtrl'
      }
     } 
  });

  //账号设置
  $stateProvider.state('abstract.aside.setUp', {
    url: '/setUp',
    templateUrl: 'controllers/setUp/index.html',
    controller: 'SetUpIndexCtrl'
  });

  //账号设置——添加新地址
  $stateProvider.state('abstract.newPhone', {
    url: '/newPhone',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/setUp/newPhone.html',
        controller: 'NewPhoneCtrl'
      }
    } 
  });

  //账号设置——添加新地址
  $stateProvider.state('abstract.newPassword', {
    url: '/newPassword',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/setUp/newPassword.html',
        controller: 'NewPasswordCtrl'
      }
    } 
  });

  //账号设置——添加新地址
  $stateProvider.state('abstract.newAddress', {
    url: '/newAddress',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/setUp/newAddress.html',
        controller: 'NewAddressCtrl'
      }
    } 
  });


  //工人页面
  $stateProvider.state('abstract.worker', {
    url: '/worker',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/worker/index.html',
        controller: 'WorkerIndexCtrl'
      }
    }
  });

  //商户页面
  $stateProvider.state('abstract.boss', {
    url: '/boss',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/boss/index.html',
        controller: 'BossIndexCtrl'
      }
    }  
  });

  //下单页面
  $stateProvider.state('abstract.order', {
    url: '/order',
    views: {
      'content@abstract': {
        templateUrl: 'controllers/order/index.html',
        controller: 'OrderIndexCtrl'
      }
    } 
  });

  $stateProvider.state('notFound', {
    url: '/notFound',
    templateUrl: 'controllers/home/notFound.html',
    controller: 'HomeNotFoundCtrl'
  });

  $urlRouterProvider.otherwise('/abstract/aside');
});
