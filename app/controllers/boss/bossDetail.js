'use strict';

angular.module('app').controller('BossDetailCtrl', function BossDetailCtrl($scope,ngDialog) {
	var vm = $scope.vm = {};
	
	// 初始化定位(根据浏览器定位)
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			console.log('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			alert('failed'+this.getStatus());
		}            
    },{enableHighAccuracy: true})

	var map = new BMap.Map("bossmap");   //创建地图实例
	map.centerAndZoom(new BMap.Point(120.159788,30.320708), 15); //创建点坐标；并且初始化地图，设置中心点坐标和地图级别     

	/*
	*	查看完整地图控件
	*/
	function smallMapControl(){
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
        this.defaultOffset = new BMap.Size(0,0);
    }  
    smallMapControl.prototype = new BMap.Control();    
    smallMapControl.prototype.initialize = function(map){

        var div = document.createElement("div");
        div.className = "lookBigMap";

        map.getContainer().appendChild(div);
        return div;
    }
    var webSmallMapControl = new smallMapControl();
    map.addControl(webSmallMapControl);

    function smallMapClick(){
    	$(".lookBigMap").append(
    		'<i class="glyphicon glyphicon-zoom-in"></i><span>查看完整地图</span>'
		);
		$(".lookBigMap").on("click",function(){

		})
		ngDialog.open({
            template: 'controllers/boss/lookBigMap.html',
            plain: false,
            className: 'ngdialog-theme-default',
            closeByEscape: true,
            closeByDocument: true,
            controller: 'lookBigMapCtrl'
        });
    }
    smallMapClick();
    /*
    *   缩放控件
    */
    var top_right_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_ZOOM,
        offset: new BMap.Size(3,10)
    });
    map.addControl(top_right_navigation);    








});