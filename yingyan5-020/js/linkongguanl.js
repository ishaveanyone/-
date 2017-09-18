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


$(".pl").click(function() {
	window.location.href = 'xinjianlinkong.html'
});
$("#xjanbj9").click(function()
{
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjianbjlb").style.display = "block";
	document.getElementById("gllklb").style.display = "none";
	document.getElementById("baoqilai").style.display = "block";
});

//关闭窗口
$(".del").click(function() {
	document.getElementById("reyuanxiangqing").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	document.getElementById("gllklb").style.display = "none";
	document.getElementById("xinjianbjlb").style.display = "none";
	window.parent.document.getElementById("baoqilai1").style.display = "none"
});

//全局变量id
var pageCount=0;
var map=new BMap.Map("tingwode4");
var option={
	url:"http://101.200.141.234:8877/hawkeye/client",
	data:$("#paramForm").serialize(),
	dataType:"json",
	async:false,
	type:"post",
	success:function(result){
		var status=result.status;
		if(status==-1){
			window.location.href="denglu.html"; 
		}
		var dataList=result.data.rows;
		$("#dataTable").children().not("thead").remove();
		for(i=0;i<dataList.length;i++){
			if(dataList[i].status==1){
				$("#dataTable").append(
					'<tr data-controllId="'+dataList[i].id+'">'
						+'<td></td>'
						+'<td>'+dataList[i].imei+'</td>'
						+'<td>'+dataList[i].imsi+'</td>'
						+'<td></td>'
						+'<td></td>'
						+'<td>'+dataList[i].typeName+'</td>'
						+'<td  onclick="reloadGJ('+"'"+'+dataList[i].imsi+'+"'"+')">轨迹回放</td>'
						+'<td ondblclick=";changeJKStatus(this,'+dataList[i].id+',event)"><img src="img/loading.gif" style="width:35px;height:30px;position:relative;left:25px;"/></td>'
						+'<td onclick="delData('+dataList[i].id+',event)">删除</td>'
					+'</tr>'
				);
			}else{ 
				$("#dataTable").append(
					'<tr data-controllId="'+dataList[i].id+'">'
						+'<td></td>'
						+'<td>'+dataList[i].imei+'</td>'
						+'<td>'+dataList[i].imsi+'</td>'
						+'<td></td>'
						+'<td></td>'
						+'<td>'+dataList[i].typeName+'</td>'
						+'<td onclick="reloadGJ('+dataList[i].imsi+')">轨迹回放</td>'
						+'<td ondblclick=";changeJKStatus(this,'+dataList[i].id+',event)">暂停</td>'
						+'<td onclick="delData('+dataList[i].id+',event)">删除</td>'
					+'</tr>'
				);
			}
		}
		
		pageCount=caculPageCount(+result.data.total,+result.data.pageSize);
		//绑定 双击 单击 事件
		$("#dataTable").find("tr").each(function(){
			//行数据 的单击 和双击事件
	        $(this).on('dblclick', function(){ 
	        	//缓存当前的临控id
	        	SetCookie("controllId", $(this).attr("data-controllId"));
	        	
	        	window.location.href="xinjianlinkong.html";
	        })
		});
	},
	error:function(){
		alert("系统异常")
	}
}



//初始化 页面 地图 
function initMap(){
	// 百度地图API功能
	var map = new BMap.Map("tingwode4");
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);
	map.enableScrollWheelZoom();
	function myFun(result) {
		var cityName = result.name;
		map.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}

//单击绘制 轨迹 
function reloadGJ(imsi,oevent){
	
	//获取cookie全部的数据，然后进行ajax请求
	var longitudeArr=[];//经度数组, 
	var latitudeArr=[];//纬度数组
	var pointArr=[];//点数组
	var temp=0;
	$.ajax({
		type:"get",
		url:"http://101.200.141.234:8877/hawkeye/client",
		dataType:"json",
		data:{
			"method":"queryPhoneWay",
			"imsi":imsi
		},
		async:false,
		success:function(result){
			var dataList=result.data;
			temp=dataList.length;
			if(temp==0){
				initMap();
				return;
			}
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
	if(temp==0){
		return;
	}
	
	// 百度地图API功能
	var map = new BMap.Map("tingwode4");
	map.centerAndZoom(new BMap.Point(longitudeArr[longitudeArr.length-1], latitudeArr[latitudeArr.length-1]),15);//以最后一个点为中心
	var startIcon = new BMap.Icon(getRealPath()+"/img/startPlace.png", new BMap.Size(25,40));  //创建起点图标
	var endIcon = new BMap.Icon(getRealPath()+"/img/endPlace.png", new BMap.Size(25,40));   //创建终点图标
	map.enableScrollWheelZoom();
	
	//先把那个起点和终点处理了
	var startPoint = new BMap.Point(longitudeArr[0], latitudeArr[0]);
	var endPoint = new BMap.Point(longitudeArr[longitudeArr.length-1], latitudeArr[latitudeArr.length-1]);
	
	var startMark = new BMap.Marker(startPoint,{icon:startIcon});  // 创建起点标注
	map.addOverlay(startMark);              // 将标注添加到地图中
	
	var endMark = new BMap.Marker(endPoint,{icon:endIcon});  // 创建终点标注
	map.addOverlay(endMark);              // 将标注添加到地图中
	
	pointArr.push(startPoint);//添加起点
	for(i=1;i<longitudeArr.length-1;i++){
		var p= new BMap.Point(longitudeArr[i], latitudeArr[i]);
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
}

//双击改变监控
function changeJKStatus(dome,id,oevent){
	if(document.all) window.event.cancelBubble=true;
	else oevent.stopPropagation();
	
	//发送状态请求给他
	if($(dome).find("img").length!=0){
		type=0;
		$(dome).html('暂停');
	}else{
		type=1;
		$(dome).html('<img src="img/loading.gif" style="width: 35px;height: 30px;position:relative;left:25px;"/>');
	}
	//发起ajax请求
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		data:{
			"method":"modifyMonitorStatus",
			"controllId":id,
			"type":type
		},
		async:false,
		dataType:"json",
		success: function (result){
			
		},
		error:function (){}
	})
}

//删除
function delData(id,oevent){
	if(document.all) window.event.cancelBubble=true;
	else oevent.stopPropagation();
	
	
	alertJs.confirm('系统提示', '删除？');
	var nIntervId=setInterval(function (){
		 if(getCookie("del")=="ok"){
			$.ajax({
				url:"http://101.200.141.234:8877/hawkeye/client",
				data:{
					"controllId":id,
					"method":"removeMonitor"
				},
				dataType:"json",
				async:true,
				success:function (){
					initDataTable();
					clearInterval(nIntervId);
				},
				error:function(){
					alert("系统页面")
					clearInterval(nIntervId);
				}
			})
		 }
	},1000);
}


 
function  initMAp(map){
	// 百度地图API功能
	map.enableScrollWheelZoom();
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
	var ctrl = new BMapLib.TrafficControl({
		showPanel: false //是否显示路况提示面板
	});
	map.addControl(ctrl);
	ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
}

//计算得到 总页数
function caculPageCount(total,pageSize){
	if(total==0){
		return 0;
	}else{
		if(total%pageSize!=0){
			return parseInt(total/pageSize)+1;
		}else{
			return parseInt(total/pageSize);
		}
	}
}


//过滤非法数据
function retStr(ziduan){
	if(typeof(ziduan)=="undefined"){
		return "未知";
	}else{
		return ziduan;
	}
}


//描画分页表格
function drawFYTable(){
	$("table").eq(0).after(
		"<table border='0' cellspacing='0' cellpadding='0' class='fenye'>"
			+"<tr class='noh'>"
				+"<th>&lt;</th>"
				+"<th>&gt;</th>"
				+"<th class='tiaozhuandao'><label>跳转到</label>" 
				+"<input type='text' class='inp' />" 
				+"<label class='go' style='cursor:pointer'>GO</label>"
				+"</th>"
				+'<p id="totalPageHtml" style="font-size: 12px;height:15px;width:50px;background: none;margin-left: 72%;top: 32px;position: relative;color: rgba(255, 255, 255, 0.5);float: left;">共<i style="margin:0 5px;">'+pageCount+'</i>页</p>'
			+"</tr>"
		+"</table>"
	);
}


//初始化分页
function initFyTable(pageCount){
	if(pageCount==0){
		return;
	}
	$("table").eq(1).remove();
	$("#totalPageHtml").remove();
	drawFYTable();
	for (i=0;i<pageCount&&i<6;i++){
		var str="<td>"+(i+1)+"</td>";
		$("table").eq(1).find("th").eq(1).before(str)
	}
	option.data=$("#paramForm").serialize();
	$("table").eq(1).find("td").eq((+$("#pageNo").val())-1).css("color","#0d80d0");
	//点击对应下面数字跳转页面
	$("table").eq(1).find("td").click(function (){
		$("#pageNo").val($(this).text());//填充数据
		var crrentPageNum=$("#pageNo").val();//当前页号
		$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
		option.data=$("#paramForm").serialize();
		$.ajax(option);
	});
	
	//点击上一页.alert("hh","33");
	$("table").eq(1).find("th").eq(0).click(function (){
		//定义发送ajax对象
		var crrentPageNum=$("#pageNo").val();//当前页号
		if(crrentPageNum=="1"){
			alertJs.alert('系统提示', '已经是第一页');
			return;
		}
		if(crrentPageNum==$("table").eq(1).find("td").first().text()){
			$("table").eq(1).find("td").each(function (){
				$(this).text((+$(this).text()-1));
			})
		}
		//修改隐含域数据
		$("#pageNo").val((+crrentPageNum)-1);
		$("table").eq(1).find("td").each(function(){
			if($(this).text()==$("#pageNo").val()){
				$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
			}
		});
		option.data=$("#paramForm").serialize();
		$.ajax(option);
	});
	
	//点击下一页
	$("table").eq(1).find("th").eq(1).click(function (){
		var crrentPageNum=$("#pageNo").val();//当前页号
		if(crrentPageNum==pageCount){
			alertJs.alert('系统提示', '已经是最后一页');
			return;
		}
		
		if(crrentPageNum==$("table").eq(1).find("td").last().text()){
			$("table").eq(1).find("td").each(function (){
				$(this).text((+$(this).text()+1));
			})
		}
		//修改隐含域数据
		$("#pageNo").val((+crrentPageNum)+1);
		$("table").eq(1).find("td").each(function(){
			if($(this).text()==$("#pageNo").val()){
				$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
			}
		});
		option.data=$("#paramForm").serialize();
		$.ajax(option);
	});

	//点击跳转指定页面
	$(".go").click(function (){
		var pageNum=$(".inp").val();//获取填写的页数
		if(isNaN(pageNum)||pageNum==''){
			alertJs.alert('系统提示', '请填写数字');
			$(".inp").val("")
			return;
		}
		pageNum=(+pageNum);
		if(pageNum<0||pageNum>(pageCount)){
			alertJs.alert('系统提示', '页号1超出范围');
			$(".inp").val("")
			return;
		}
		//更新数据
		$("#pageNo").val(pageNum);
		var markGrounp=0;//是在哪一个组中 6 个为一组
		$("#pageNo").val(pageNum);
		if(+pageNum%6!= 0){
			markGrounp =parseInt(+pageNum/6)+1;//确定是第几组的数据
		}else{
			markGrounp=parseInt(+pageNum/6);
		}
		$("table").eq(1).find("td").remove();
		for (i=((markGrounp-1)*6+1);i<=(pageCount)&&i<((markGrounp-1)*6+7);i++){
			var str="<td>"+i+"</td>";
			$("table").eq(1).find("th").eq(1).before(str)
		}
		//添加样式
		$("table").eq(1).find("td").each(function(){
			if($(this).text()==$("#pageNo").val()){
				$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
			}
		});
		option.data=$("#paramForm").serialize();
		$.ajax(option);
	})
}


//初始化加载数据
function initDataTable(){
	$.ajax(option);
	initFyTable(pageCount);
}


$(document).ready(function (){
	initMap();
	//判断 下面的 是否有遮罩，没有改掉上面的 遮罩
	if($("#baoqilai").css("display") == "none"){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
	}
	initMAp(map);
	initDataTable()
});





//报警类型 加载 	
$("#guanli5").click(function() {
	$("#bjlb_form").children().remove();
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		data:{
			"method":"queryAlarmTypeList"
		},
		async:false,
		dataType:"json",
		type:"post",
		success:function (result){
			var data= result.data;
			for(i=0;i<data.length;i++){
				if(i==0){
					$("#bjlb_form").append(
						'<input type="radio" name="zx" class="chk8" id="bjlb_input'+i+'"/><label class="quanbuquyu1" for="bjlb_input'+i+'">'+data[i].name+'</label><label id="xjanbj9" style="position: absolute;top: 40px;">+新建报警类别</label><br/>'
					);
					continue;
				}else{
					$("#bjlb_form").append(
						'<input type="radio" name="zx" class="chk8" id="bjlb_input'+i+'"/><label class="quanbuquyu1" for="bjlb_input'+i+'">'+data[i].name+'</label><br/>'
					);
				}
			}			 
		},
		error:function (){
			
		}
	});
	
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("gllklb").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	
	//报警类别确定取消
	$("#gllklb .xuanzeb").find("button").eq(0).click(function (){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
		document.getElementById("gllklb").style.display = "none";
		document.getElementById("baoqilai").style.display = "none";
	})

	$("#gllklb .xuanzeb").find("button").eq(1).click(function (){
		$("#bjlb_form input[name='zx']:checked").each(function (){
			
			$("#ckBJLB").html($(this).next().html());
		});
		window.parent.document.getElementById("baoqilai1").style.display = "none";
		document.getElementById("gllklb").style.display = "none";
		document.getElementById("baoqilai").style.display = "none";
	})
	
	
});	
	



function SetCookie(name,value){  
    var Days = 7;   //cookie 将被保存一星期 
    var exp  = new Date();  //获得当前时间  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";  //该项目下所有的页面都将可以访问该cookie
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

function clearCookie(){ 
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
	if (keys) { 
		for (var i = keys.length; i--;) 
		document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString()+";path=/";
	} 
}
	