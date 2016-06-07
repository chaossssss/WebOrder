'use strict';

angular.module('app').controller('MainIndexCtrl', function MainIndexCtrl($scope,$state,httpService,ngDialog) {
  var vm = $scope.vm = {};
  $scope.searchName = "";

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
    	width : 0,
    	height : 135
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

    //自定义图文结合信息窗口(百度地图自带的样式修改)
    function changeInfoWin(){
    	var BMap_pop = $(".BMap_pop");
		console.log('BMap_pop',BMap_pop);
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
		//左下角
		BMap_pop.children("div").eq(4).children("div").css({
			"border-left":"1px solid rgb(50,190,255)",
			"border-bottom":"1px solid rgb(50,190,255)",
			"border-radius":"6px",
			"background-color":"rgb(245,245,245)"
		});
		//右下角
		BMap_pop.children("div").eq(6).children("div").css({
			"border-right":"1px solid rgb(50,190,255)",
			"border-bottom":"1px solid rgb(50,190,255)",
			"border-radius":"6px",
			"background-color":"rgb(245,245,245)"
		});
		//箭头
		// BMap_pop.children("div").eq(7).children("img").attr("src","../../images/main/worker.png")
		//关闭按钮图片隐藏
		BMap_pop.children("img").first().css({
			"opacity":"0"
		});
    }

    /* 搜索控件
    *  按钮
    *  输入框
    */
    function searchButtonControl(){
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(378,108);
    }  
    searchButtonControl.prototype = new BMap.Control();    
    searchButtonControl.prototype.initialize = function(map){

        var div = document.createElement("div");
        div.className = "searchBtn";

        map.getContainer().appendChild(div);
        return div;
    }
    var webSearchButtonControl = new searchButtonControl();
    map.addControl(webSearchButtonControl);

    function searchButton(){
        $(".searchBtn").append(
            '<div id="searchBtn" class="btn-group">'
          +'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
          + '<i class="glyphicon glyphicon-list mr"></i><span>全部</span><i class="caret"></i>'
          +'</button>'
          +'<ul class="dropdown-menu">'
          +  '<li><a href="javascript:;"><i class="glyphicon glyphicon-question-sign mr"></i>全部</a></li>'
          +  '<li><a href="javascript:;"><i class="glyphicon glyphicon-question-sign mr"></i>商户</a></li>'
          +  '<li><a href="javascript:;"><i class="glyphicon glyphicon-question-sign mr"></i>工人</a></li>'
          +'</ul>'
          +'</div>'
        )
    }
    searchButton();

    function searchBthClick(){
        $("#searchBtn").on("click",".dropdown-menu li",function(){
            var index = $(this).index();
            var content = $(this).children("a").text();
            console.log("点击第几个",index);
            console.log("取到点击的值",content);

            var btnVal = $(this).closest("ul").siblings("button").text();
            console.log("取到的按钮值",btnVal);
            $(this).closest("ul").siblings("button").children("span").text(content);
        })
        
    }
    searchBthClick();

    function searchInputControl(){
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(485,108);
    }  
    searchInputControl.prototype = new BMap.Control();    
    searchInputControl.prototype.initialize = function(map){

        var div = document.createElement("div");
        div.className = "searchGroup";

        map.getContainer().appendChild(div);
        return div;
    }
    var webSearchInputControl = new searchInputControl();
    map.addControl(webSearchInputControl);

    function searchInput(){
        $(".searchGroup").append(
            '<div id="searchGroup" class="searchGroup">'
            +    '<div class="input-group">'
            +      '<i class="glyphicon glyphicon-search"></i>'
            +      '<input id="input" ng-model="searchName" type="text" class="form-control" placeholder="请输入您的服务地址、商户或工人...">'
            +      '<i id="close" class="glyphicon glyphicon-remove off"></i>'
            +      '<span class="input-group-btn">'
            +        '<button id="search" class="btn btn-info" type="button">搜索</button>'
            +      '</span>'
            +    '</div>'
            +    '<ul class="nav">'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>北戴河</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>萧山区</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>杭州乐园</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>蜀山</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-search mr"></i>钱江新城</a></li>'
            +        '<li><a href="javascript:;"><i class="glyphicon glyphicon-trash mr"></i>清除历史记录</a></li>'
            +    '</ul>'
            +'</div>'
        )
    }
    searchInput();

    function searchInputClick(){
        var localStorage = window.localStorage;
        var history = [];
        $("#searchGroup").on("click",".nav li",function(){
            var index = $(this).index();
            var content = $(this).children("a").text();
            
            //取到最后一个：清除历史记录
            if(content === "清除历史记录"){
                localStorage.setItem("history","");
                $("#input").focus();
            }else{
                console.log("点击第几个",index);
                console.log("取到点击的值",content);
                $("#input").val(content);
                $("#input").focus();
            }
        })
        //显示隐藏关闭icon
        $("#input").on("focus",function(){
            $(this).siblings("#close").removeClass("off");
        })
        $("#input").on("blur",function(){
            $(this).siblings("#close").addClass("off");
        })
        // var inputVal = $scope.searchName;
        // console.log(inputVal);
        // if(inputVal){
        //     $("#searchGroup").children(".nav").removeClass("off");
        // }else{
        //     $("#searchGroup").children(".nav").addClass("off");
        // }

        $("#close").on("click",function(){
            $("#input").val("");
        })

        $("#search").on("click",function(){
            history.push($("#input").val());
            localStorage.setItem("history",history)
        })
    }
    searchInputClick();
    $scope.$watch("searchName",function(){
        console.log("$scope.searchName",$scope.searchName);
    })
    /*
    *   搜索结果控件
    */
    function searchResultControl(){
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(20,178);
    }  
    searchResultControl.prototype = new BMap.Control();    
    searchResultControl.prototype.initialize = function(map){

        var div = document.createElement("div");
        div.className = "searchResult";

        map.getContainer().appendChild(div);
        return div;
    }
    var webSearchResultControl = new searchResultControl();
    map.addControl(webSearchResultControl);

    function searchResult(){
        $(".searchResult").append(
            '<div id="searchResult">'
            +    '<span>共12条搜索结果</span>'
            +    '<i class="glyphicon glyphicon-circle-arrow-down blue"></i>'  
            +'</div>'
            +'<ul class="nav">'
            +    '<li>'
            +        '<div class="resultContent">'
            +            '<i class="glyphicon glyphicon-leaf"></i>'
            +            '<div>'
            +                '<p>'
            +                    '<span>宋家宝</span>'
            +                    '<span class="fr orange f12">50元/小时</span>'
            +                '</p>'
            +                '<p class="secondFontColor cr">小时工、保姆、月嫂</p>'
            +                '<p>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<span class="pl5">5.0</span>'
            +                '</p>'
            +                '<p>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                '</p>'
            +                '<p>电话：151****6895</p>'
            +            '</div>'
            +            '<img src="./../images/main/BigPic1.png" alt="">'
            +            '<button class="btn btn-info">下单</button>'
            +        '</div>'
            +    '</li>'
            +    '<li>'
            +        '<div class="resultContent">'
            +            '<i class="glyphicon glyphicon-leaf"></i>'
            +            '<div>'
            +                '<p>'
            +                    '<span>宋家宝</span>'
            +                    '<span class="fr orange f12">50元/小时</span>'
            +                '</p>'
            +                '<p class="secondFontColor cr">小时工、保姆、月嫂</p>'
            +                '<p>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<span class="pl5">5.0</span>'
            +                '</p>'
            +                '<p>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                '</p>'
            +                '<p>电话：151****6895</p>'
            +            '</div>'
            +            '<img src="./../images/main/BigPic1.png" alt="">'
            +            '<button class="btn btn-info">下单</button>'
            +        '</div>'
            +    '</li>'
            +    '<li>'
            +        '<div class="resultContent">'
            +            '<i class="glyphicon glyphicon-leaf"></i>'
            +            '<div>'
            +                '<p>'
            +                    '<span>宋家宝</span>'
            +                    '<span class="fr orange f12">50元/小时</span>'
            +                '</p>'
            +                '<p class="secondFontColor cr">小时工、保姆、月嫂</p>'
            +                '<p>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<i class="glyphicon glyphicon-heart-empty"></i>'
            +                    '<span class="pl5">5.0</span>'
            +                '</p>'
            +                '<p>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                    '<i class="glyphicon glyphicon-modal-window"></i>'
            +                '</p>'
            +                '<p>电话：151****6895</p>'
            +            '</div>'
            +            '<img src="./../images/main/BigPic1.png" alt="">'
            +            '<button class="btn btn-info">下单</button>'
            +        '</div>'
            +    '</li>'    
            +'</ul>'
        )
    }
    searchResult();

    function searchResultClick(){
        $("#searchResult").on("click",function(){
            $(this).siblings("ul").toggle();
        })
    }
    searchResultClick();

    /*
    *   头部导航
    */
    function topBarControl(){
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(0,0);
    }  
    topBarControl.prototype = new BMap.Control();    
    topBarControl.prototype.initialize = function(map){

        var div = document.createElement("div");
        div.className = "top";

        map.getContainer().appendChild(div);
        return div;
    }
    var webTopBarControl = new topBarControl();
    map.addControl(webTopBarControl);
    
    function topBar(){
        $(".top").append(
            '<nav id="topbar" class="navbar navbar-default navbar-fixed-top">'
        +      '<div class="container">'
        +        '<div class="navbar-header">'
        +          '<a href="javascript:;">'
        +            '<img class="logo" src="images/headerImg/zhujiaLogo.png" alt="">'
        +          '</a>'    
        +        '</div>'
        +        '<div class="navbar-header navPosition">'
        +            '<a href="javascript:;">'
        +                '<img class="position" src="images/headerImg/position.png" alt="">'
        +            '</a>'
        +            '<span class="positionText">杭州市 萧山区<br><a class="togglePosition" id="changeLocation">[切换]</a></span>'    
        +        '</div>'
        +        '<div id="navbar" class="collapse navbar-collapse">'
        +          '<ul class="nav navbar-nav">'
        +            '<li><a href="javascript:;">首页</a></li>'
        +            '<li><a href="javascript:;">我的订单</a></li>'
        +            '<li><a href="javascript:;">下载APP</a></li>'
        +          '</ul>'
        +          '<div id="openLogin">' 
        +          '<div class="dropdown" >'       
        +            '<p class=""  id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
        +                '家奶和鲁大八个字'
        +                '<span class="glyphicon glyphicon-menu-down" style="color:#999;"></span>'
        +            '</p>'
        +            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'
        +                '<li><a href="javascript:;">我的订单</a></li>'
        +                '<li><a href="javascript:;">我的收藏</a></li>'
        +                '<li><a href="javascript:;">账户管理</a></li>'
        +                '<li><a href="javascript:;">消息设置</a></li>'
        +                '<li><a href="javascript:;">帐号设置</a></li>'
        +                '<li><a href="javascript:;"><span class="glyphicon glyphicon-log-in"></span>退出</a></li>'
        +            '</ul>'
        +          '</div>'
        +          '<img class="headPic" src="images/headerImg/headPic.png" alt="">'
        +           '</div>' 
        +        '</div>'
        +      '</div>'
        +    '</nav>'
        )
    }
    topBar();
    /*
    *   切换登录地点
    */
    function changeLocation(){
        $("#changeLocation").on("click",function(){
            ngDialog.open({
                template: 'controllers/main/location.html',
                plain: false,
                className: 'ngdialog-theme-default',
                closeByEscape: true,
                closeByDocument: true,
                controller: 'locationCtrl'
            });
        })
    }
    changeLocation();

    /*
    *   登录注册弹窗
    */
    function openLogin(){
        $("#openLogin").on("click",function(){
            ngDialog.open({
                template: 'controllers/main/login.html',
                plain: false,
                className: 'ngdialog-theme-default',
                closeByEscape: true,
                closeByDocument: true,
                controller: 'loginCtrl'
              });
        })
    }
    openLogin();

    /*
    *   比例尺控件
    *   缩放平移控件
    */
    var bottom_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    var top_right_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMap.Size(0,154)
    });

    //添加控件和比例尺
    function add_control(){
        map.addControl(bottom_left_control);        
        map.addControl(top_right_navigation);        
    }
    add_control();

    /*
    *   广告位控件
    */
    function noticeControl(){
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(32,494);
    }
    noticeControl.prototype = new BMap.Control();    
    noticeControl.prototype.initialize = function(map){

        var img = document.createElement("img");
        img.style.width = "105px";
        img.style.height = "132px";
        img.src = "../../images/main/qrCode.png";

        map.getContainer().appendChild(img);
        return img;
    }
    var webNoticeControl = new noticeControl();
    map.addControl(webNoticeControl);

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
