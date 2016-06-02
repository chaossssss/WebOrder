'use strict';

angular.module('app').controller('MainIndexCtrl', function MainIndexCtrl($scope,httpService) {
  var vm = $scope.vm = {};

  var $winHeight = $(window).height();
    $("#allmap").css("height",$winHeight);
    console.log("height",$winHeight);

  	var initLng,initLat;
    // 初始化定位(根据浏览器定位)
  //   var geolocation = new BMap.Geolocation();
  //   geolocation.getCurrentPosition(function(r){
  //       if(this.getStatus() == BMAP_STATUS_SUCCESS){
		// 	var mk = new BMap.Marker(r.point);
		// 	map.addOverlay(mk);
		// 	map.panTo(r.point);
		// 	console.log('您的位置：'+r.point.lng+','+r.point.lat);

		// 	initLng = r.point.lng;
		// 	initLat = r.point.lat;
		// }
		// else {
		// 	alert('failed'+this.getStatus());
		// }            
  //   },{enableHighAccuracy: true})

  	// 百度地图API功能    
	var map = new BMap.Map("allmap");   //创建地图实例
	map.centerAndZoom(new BMap.Point(120.159788,30.320708), 15); //创建点坐标；并且初始化地图，设置中心点坐标和地图级别     

	var boss = "../../images/main/worker.png";
    var workMan = "../../images/main/boss.png";

	//清除覆盖物
    function remove_overlay(){
        map.clearOverlays();   
    }

    //创建气泡标注
    function createBubble(workers,business){
        if(workers){
            for(var i=0,len=workers.length;i<len;i++){         
                var htm = "<div class='outBorder' >"
             + '<img class="imgInfo" src='+workers[i].Photos[0].SmallPic+' onerror="javascript:this.src=\'../../images/main/SmallPic1.png\';" alt=""/>'
             // + "<p class='textInfo'>"+workers[i].Services.DefaultServiceType.Name+"</p>"   
                + "</div>"
                                   
                var point = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
                var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-32,-63), "enableDragging": true});
                myRichMarkerObject.disableDragging();   //不可拖拽
                map.addOverlay(myRichMarkerObject);
                
                addClickHandler(myRichMarkerObject,workers[i]);
            }  
        }
         
        if(business){
            for(var j=0,leng=business.length;j<leng;j++){         
                var htm = "<div class='outBorder' >"
             + '<img class="imgInfo" src='+business[j].Photos[0].SmallPic+' onerror="javascript:this.src=\'../../images/main/小头像2.png\';" alt=""/>'
             // + "<p class='textInfo'>"+business[j].Services.DefaultServiceType.Name+"</p>"   
                + "</div>"
                                   
                var point = new BMap.Point(business[j].Longitude,business[j].Latitude);
                var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-32,-63), "enableDragging": true});
                myRichMarkerObject.disableDragging();   //不可拖拽
                map.addOverlay(myRichMarkerObject);
                
                addClickHandler(myRichMarkerObject,business[j]);
            }
        }
    }  
    
    //创建头像定位标注 
    function createMarker(workers,business){
        if(workers){
            for(var i=0,len=workers.length;i<len;i++){   
                var point1 = new BMap.Point(workers[i].Longitude,workers[i].Latitude);
                var myIcon1 = new BMap.Icon(workMan, new BMap.Size(30,42)); //1，3工人
                var marker1 = new BMap.Marker(point1,{icon:myIcon1});  // 创建标注
                map.addOverlay(marker1);              // 将标注添加到地图中 
                                                         //将唯一身份认证信息传入                                               
                addClickHandler(marker1,workers[i]);
            }  
        }
        if(business){
            for(var j=0,leng=business.length;j<leng;j++){
                var point2 = new BMap.Point(business[j].Longitude,business[j].Latitude);
                var myIcon2 = new BMap.Icon(boss, new BMap.Size(30,42)); // 2 商户
                var marker2 = new BMap.Marker(point2,{icon:myIcon2});  // 创建标注
                map.addOverlay(marker2);              // 将标注添加到地图中
                
                addClickHandler(marker2,business[j]);
            }
        }
    }
     
    // 创建信息窗口
    function createInfoWin(info){

    }
    var opts = {
    	width : 320,
    	height : 0
    }

    var sContent = '<div class="infoWindow" id="imgDemo">'
	+'<img src="../../images/main/bigPic2.png" alt="">'
	+'<div class="content">'
	+	'<p class="firstLine">'
	+		'<span class="firstFontColor">神马艾玛保洁保洁</span>'
	+		'<span class="secondFontColor" style="float: right;">距离1.9km</span>'
	+	'</p>'
	+	'<p class="secondLine secondFontColor" style="clear:right;">成立于1990年</p>'
	+	'<p class="thirdLine">'
	+		'<i class="glyphicon glyphicon-list iconListColor"></i>'
	+		'<span class="secondFontColor">小时工,保姆,月嫂</span>'
	+	'</p>'
	+	'<p class="fourLine">'
	+		'<i class="glyphicon glyphicon-thumbs-up iconUpColor"></i>'
	+		'<span>9999</span>'
	+		'<i class="glyphicon glyphicon-star-empty iconStarColor ml"></i>'
	+		'<span>9999</span>'
	+		'<i class="glyphicon glyphicon-heart-empty iconHeartColor ml"></i>'
	+		'<span>9999</span>'
	+	'</p>'
	+'</div>'
	+'<button class="btn btn-default">立即下单</button>'
	+'</div>'
    var infoWindow = new BMap.InfoWindow(sContent,opts);

    //个人身份标志信息
    function addClickHandler(marker,info){
        marker.addEventListener("click",function(e){
        	console.log("this",this);
	    	this.openInfoWindow(infoWindow);
	    	//图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		   }
		   changeInfoWin();

            //console.log("唯一",e);
            //console.log("唯一身份确认信息",info);

            // var sessionStorage = window.sessionStorage;
            // var detailInfo = JSON.stringify(info); 
            // sessionStorage.setItem("info",detailInfo);

            // var flag = info.Property;
            // console.log("flag",flag);
            // if(flag){
            //     $state.go("bossDetail");    
            // }else{
            //     $state.go("workerDetail");
            // }   
        });
    }

    //自定义图文结合信息窗口
    function changeInfoWin(){
    	var BMap_pop = $(".BMap_pop");
		console.log(BMap_pop);
		//左上角
		BMap_pop.children("div").eq(0).children("div").css({
			"border-top":"1px solid rgb(50,190,255)",
			"border-left":"1px solid rgb(50,190,255)",
			"border-radius":"6px",
			"background-color":"rgb(245,245,245)"
		});
		//右上角
		BMap_pop.children("div").eq(2).children("div").css({
			"border-top-color":"rgb(50,190,255)",
			"border-right":"1px solid rgb(50,190,255)",
			"border-radius":"6px",
			"background-color":"rgb(245,245,245)"
		});
		//中间
		BMap_pop.children("div").eq(3).css({
			"border-left":"1px solid rgb(50,190,255)",
			"border-right":"1px solid rgb(50,190,255)",
			"height":"140px"
		});
		//左下角
		BMap_pop.children("div").eq(4).children("div").css({
			"border-left":"1px solid rgb(50,190,255)",
			"border-bottom":"1px solid rgb(50,190,255)",
			"border-radius":"6px",
		});
		//右下角
		BMap_pop.children("div").eq(6).children("div").css({
			"border-right":"1px solid rgb(50,190,255)",
			"border-bottom":"1px solid rgb(50,190,255)",
			"border-radius":"6px",
		});
		//箭头
		// BMap_pop.children("div").eq(7).children("img").attr("src","../../images/main/worker.png")
		//关闭按钮图片隐藏
		BMap_pop.children("img").first().css({
			"opacity":"0"
		});
    }


    //从后台获取所有数据方法,默认搜索
    function getData(){
        httpService.get("../../services/main/mainData.json")
        	.success(function(data){
	            console.log("获得数据成功",data);
                remove_overlay();
                createBubble(data.Body.Workers,data.Body.Business); 
                createMarker(data.Body.OtherWorkers,data.Body.OtherBusiness);
        	}) 
	        .error(function(data){
	            alert("服务器连接失败，请检查您的网络设置");
	            console.log("失败",data);
	        })                      
    }
    getData();
























});
