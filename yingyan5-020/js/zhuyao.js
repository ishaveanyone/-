//获取绝对上下文路径
function getRealPath(){
	var curWwwPath=window.document.location.href;
	var pathName=window.document.location.pathname;
	var pos=curWwwPath.indexOf(pathName);
	var lcoaPaht=curWwwPath.substring(0,pos);
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var realPath=lcoaPaht+projectName;
	return realPath;
}

/**********定义全局变量**************/
var deviceNo="";
var latitude_array=[];//定义经纬度存放组
var mark=[];//创建点数组
var longitude_array=[];

$(document).ready(function (){
	
	//判断 下面的 是否有遮罩，没有改掉上面的 遮罩
	if($("#baoqilai").css("display") == "none"){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
	}
	
	
	//初始化地图
	initMap1();//地图1
	initQjt();//全景图
	initMap2();//地图2
	initMap3();//地图3
	//为搜索绑定点击事件
	$("#sousuo").on("click",function(){
		initMap1_search();//地图1
		initMap2_search();//地图2
		initMap3_search();//地图3
	});
});

//第一个地图---显示 最后 一个点到 位置 
function initMap1(){
	clearArr();
	var map1 = new BMap.Map("tingwode");
	var point = new BMap.Point(116.331398, 39.897445);
	map1.centerAndZoom(point, 12);
	map1.enableScrollWheelZoom();
	function myFun(result) {
		var cityName = result.name;
		map1.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}

//点击搜索 按钮 地图 1发生变化
function initMap1_search(){
	var temp=null;
	clearArr();
	// 百度地图API功能
	var map1 = new BMap.Map("tingwode");
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		data:{
			"imei":$("#content").find("input").eq(2).val(),//imei
			"imsi":$("#content").find("input").eq(3).val(),//imsi
			"phone":$("#content").find("input").eq(1).val(),//电话号码
			"startTime":$("#content").find("input").eq(4).val(),//开始 时间
			"endTime":$("#content").find("input").eq(5).val(),//结束时间
			"method":"queryLastCollectionData"//方法名称
		},
		dataType:"json",
		async:false,
		success:function(result){
			var data=result.data;
			temp=data;
			if(data==null){
				return;
			}
			//存汇创的数据
			latitude_array.push(data.latitude);
			longitude_array.push(data.longitude);
			mark.push(new BMap.Marker(new BMap.Point(data.longitude, data.latitude)));
		},
		error:function(){
			alert("error")
		}
	});
	if(temp==null){
		initMap1();
		return;
	}
	var point = new BMap.Point(longitude_array[0], latitude_array[0]);
	map1.centerAndZoom(point, 12);
	map1.enableScrollWheelZoom();
	map1.addOverlay(mark[0]);
}


//全景图
function initQjt(){
	var panorama = new BMap.Panorama('tingwode7');
	panorama.setPosition(new BMap.Point(116.403925, 39.913903)); //坐标点在天安门
	var labelPosition = new BMap.Point(116.403925, 39.913903);
	var labelOptions = {
		position: labelPosition,
		altitude: 5
	}; //设置标注点的经纬度位置和高度
	var label = new BMap.PanoramaLabel('自定义标注-天安门广场', labelOptions);
	panorama.addOverlay(label); //在全景地图里添加该标注
	panorama.setPov(label.getPov()); //修改点的视角，朝向该label
	label.addEventListener('click', function() { //给标注点注册点击事件
		panorama.setPov({ //修改点的视角
			pitch: 10,
			heading: 14
		});
	});
}


//轨迹分析---显示当钱的城市
function initMap2(){
	clearArr();
	//百度地图API功能
	var map2 = new BMap.Map("tingwode8");
	var point = new BMap.Point(116.331398, 39.897445);
	map2.centerAndZoom(point, 12);
	map2.enableScrollWheelZoom();
	function myFun(result) {
		var cityName = result.name;
		map2.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}



//轨迹分析--点击搜索
function initMap2_search(){
	var temp;
	clearArr();
	$.ajax({
		type:"post",
		url:"http://101.200.141.234:8877/hawkeye/client",
		dataType:"json",
		data:{
			"method":"queryPhoneWay",
			"imsi":$("#content").find("input").eq(3).val(),
			"imei":$("#content").find("input").eq(2).val(),
			"startTime":$("#content").find("input").eq(4).val(),
			"endTime":$("#content").find("input").eq(5).val()
		},
		async:false,
		success:function(result){
			var dataList=result.data;
			temp=dataList.length;
			if(dataList==0){
				return; 
			}
			for (i=0;i<dataList.length;i++){
				//填充数据
				longitude_array.push(dataList[i].longitude);
				latitude_array.push(dataList[i].latitude);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			  console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus)
		}
	});
	
	if(temp==0){
		initMap2();
		return;
	}
	
	var map2 = new BMap.Map("tingwode8");
	map2.centerAndZoom(new BMap.Point(longitude_array[longitude_array.length-1], latitude_array[latitude_array.length-1]),15);//以最后一个点为中心
	var startIcon = new BMap.Icon(getRealPath()+"/img/startPlace.png", new BMap.Size(25,40));  //创建起点图标
	var endIcon = new BMap.Icon(getRealPath()+"/img/endPlace.png", new BMap.Size(25,40));   //创建终点图标
	map2.enableScrollWheelZoom();
	
	//先把那个起点和终点处理了
	var startPoint = new BMap.Point(longitude_array[0], latitude_array[0]);
	var endPoint = new BMap.Point(longitude_array[longitude_array.length-1], latitude_array[latitude_array.length-1]);
	
	var startMark = new BMap.Marker(startPoint,{icon:startIcon});  // 创建起点标注
	map2.addOverlay(startMark);              // 将标注添加到地图中
	
	var endMark = new BMap.Marker(endPoint,{icon:endIcon});  // 创建终点标注
	map2.addOverlay(endMark);              // 将标注添加到地图中
	
	mark.push(startPoint);//添加起点
	for(i=1;i<longitude_array.length-1;i++){
		var p= new BMap.Point(longitude_array[i], latitude_array[i]);
		var m = new BMap.Marker(p);
		map2.addOverlay(m);
		mark.push(p);//填充点数据
	}
	mark.push(endPoint);//添加终点
	var polyline = new BMap.Polyline(mark, {strokeColor:"red", strokeWeight:4, strokeOpacity:0.5});   //创建折线
	map2.addOverlay(polyline);   //增加折线
	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	/*缩放控件type有四种类型:
	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		map2.enableScrollWheelZoom(true);
	}else{
		map2.addControl(top_left_control);        
		map2.addControl(top_left_navigation);     
		map2.addControl(top_right_navigation);
	}  
}

//加载页面 是刷新 地图 三 封装 方法 
function initMap3(){
	var temp=null;
	clearArr();
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		data:{
			"method":"queryAllDeviceList",//查询 所有 的 设备 
		},
		dataType:"json",
		async:false,
		success:function(result){
			var data=result.data;
			temp=data;
			if(data==null){
				return;
			}
			for (i=0;i<data.length;i++){
				//存汇创的数据
				latitude_array.push(data[i].latitude);
				longitude_array.push(data[i].longitude);
				mark.push(new BMap.Marker(new BMap.Point(data[i].longitude, data[i].latitude)));
			}
		},
		error:function(){
			alert("error");
		}
	});
	
	//没有查询到数据 级定位到但钱城市
	if(temp==null){
		var map3 = new BMap.Map("tingwode2");
		var point = new BMap.Point(116.331398, 39.897445);
		map3.centerAndZoom(point, 12);
		map3.enableScrollWheelZoom();
		function myFun(result) {
			var cityName = result.name;
			map3.setCenter(cityName);
		}
		var myCity = new BMap.LocalCity();
		myCity.get(myFun);
		return;
	}
	
	var map3 = new BMap.Map("tingwode2");
	map3.enableScrollWheelZoom();
	map3.centerAndZoom(new BMap.Point(longitude_array[0],latitude_array[0]), 12);
	var ctrl = new BMapLib.TrafficControl({
		showPanel: false //是否显示路况提示面板
	});
	map3.addControl(ctrl);
	ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
	for (j=0;j<mark.length;j++){
		map3.addOverlay(mark[j]);      
	}
}


//点击 搜索·  地图 三 刷新 地图 
function initMap3_search(){
	var temp=null;
	clearArr();
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		data:{
			"method":"queryDeviceByDeviceNo",
			"deviceNo":$("#content").find("input").eq(0).val()//deviceNo
		},
		dataType:"json",
		async:false,
		success:function(result){
			var data=result.data;
			temp=data;
			
			if(data==null){
				return;
			}
			for (i=0;i<data.length;i++){
				//存汇创的数据
				latitude_array.push(data[i].latitude);
				longitude_array.push(data[i].longitude);
				mark.push(new BMap.Marker(new BMap.Point(data[i].longitude, data[i].latitude)));
			}
		},
		error:function(){
			alert("error");
		}
	});
	
	if(temp==null){
		initMap3();
		return;
	}
	var map3 = new BMap.Map("tingwode2");
	map3.enableScrollWheelZoom();
	map3.centerAndZoom(new BMap.Point(longitude_array[0],latitude_array[0]), 12);
	var ctrl = new BMapLib.TrafficControl({
		showPanel: false //是否显示路况提示面板
	});
	map3.addControl(ctrl);
	ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
	for (j=0;j<mark.length;j++){
		map3.addOverlay(mark[j]);      
	}
}


//清空数组 
function clearArr(){
	latitude_array.splice(0,latitude_array.length); 
	longitude_array.splice(0,longitude_array.length);
	mark.splice(0,mark.length);
}