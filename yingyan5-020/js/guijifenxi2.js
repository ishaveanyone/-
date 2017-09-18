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
var deviceIds=[];
var times=[];


$(document).ready(function (){
	//获取cookie全部的数据，然后进行ajax请求
	
	var longitudeArr=[];//经度数组, 
	var latitudeArr=[];//纬度数组
	var pointArr=[];//点数组
	
	
	var times_length=+getCookie("times_length");
	var deviceIds_length=+getCookie("deviceIds_length");
	
	delCookie("times_length");
	delCookie("deviceIds_length");
	//还原数组
	for(i=0;i<times_length;i++){
		times.push(getCookie(i));
		delCookie(i);
	}
	for(j=0;j<deviceIds_length;j++){
		deviceIds.push(getCookie(j));
		delCookie(j);
	}
	
	
	$.ajax({
		type:"get",
		url:"http://101.200.141.234:8877/hawkeye/client",
		dataType:"json",
		data:{
			"timers":times,
			"deviceIds":deviceIds,
			"method":"trajectoryAnalysis"
		},
		async:false,
		success:function(result){
			var dataList=result.data[0].positionList;
			for (i=0;i<dataList.length;i++){
				//填充数据
				longitudeArr.push(dataList[i].longitude);
				latitudeArr.push(dataList[i].latitude);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			  console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus)
		}
	});
	// 百度地图API功能
	var map = new BMap.Map("tingwode9");
	map.centerAndZoom(new BMap.Point(longitudeArr[longitudeArr.length-1],latitudeArr[latitudeArr.length-1]),15);//以最后一个点为中心
	var startIcon = new BMap.Icon(getRealPath()+"/img/startPlace.png", new BMap.Size(25,40));  //创建起点图标
	var endIcon = new BMap.Icon(getRealPath()+"/img/endPlace.png", new BMap.Size(25,40));   //创建终点图标
	map.enableScrollWheelZoom();
	
	//先把那个起点和终点处理了
	var startPoint = new BMap.Point(longitudeArr[0], latitudeArr[0]);
	var endPoint = new BMap.Point(longitudeArr[longitudeArr.length-1],latitudeArr[latitudeArr.length-1]);
	
	var startMark = new BMap.Marker(startPoint,{icon:startIcon});  // 创建起点标注
	map.addOverlay(startMark);              // 将标注添加到地图中
	
	var endMark = new BMap.Marker(endPoint,{icon:endIcon});  // 创建终点标注
	map.addOverlay(endMark);              // 将标注添加到地图中
	
	pointArr.push(startPoint);//添加起点
	for(i=1;i<longitudeArr.length-1;i++){
		var p= new BMap.Point( longitudeArr[i],latitudeArr[i]);
		var m = new BMap.Marker(p);
		map.addOverlay(m);
		pointArr.push(p);//填充点数据
	}
	pointArr.push(endPoint);//添加终点
	var polyline = new BMap.Polyline(pointArr, {strokeColor:"red", strokeWeight:4, strokeOpacity:0.5});   //创建折线
	map.addOverlay(polyline);   //增加折线
	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	/*缩放控件type有四种类型:
	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		map.enableScrollWheelZoom(true);
	}else{
		map.addControl(top_left_control);        
		map.addControl(top_left_navigation);     
		map.addControl(top_right_navigation);
	}  
})



//cookie
function SetCookie(name,value){  
    var Days = 7;   //cookie 将被保存一星期 
    var exp  = new Date();  //获得当前时间  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/"; 
}   

function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null)  
    	return unescape(arr[2]);   
    return null;  
}   
function delCookie(name){  
    var exp = new Date();  //当前时间  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
}


