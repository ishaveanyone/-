var deviceIds=[];
var times=[];
var pageCount=0;


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

var option = {
  url : "http://101.200.141.234:8877/hawkeye/client",
  dataType : "json",
  type : "post",
  async:false, 
  data:{
	  "method":"startScreen",
	  "deviceIds":deviceIds,
	  "times":times,
	  "pageNo":$("#pageNo").val(),
	  "pageSize":$("#pageSize").val()
  },
  success : function(result){
	var status=result.status;
	if(status==-1){
		window.location.href="denglu.html"; 
	}
  $("table").eq(0).children().not("thead").remove();
  var dataList=result.data.rows;
  for (i=0;i<dataList.length;i++){
	  $("table").eq(0).append(
		  	"<tr><td>"
			+(i+1)+"</td><td>"
			+retStr(dataList[i].collectionplace)+"</td><td>"
			+retStr(dataList[i].carrier)+"</td><td>"
			+retStr(dataList[i].imei)+"</td><td>" 
			+retStr(dataList[i].imsi)+"</td><td>" 
			+retStr(dataList[i].phoneNum)+"</td><td>" 
			+retStr(dataList[i].phoneBrand)+"</td><td>"
			+retStr(dataList[i].collectionTimeFormatd)+"</td><td>" 
			+timeStamp(retStr(dataList[i].collectionTimeLong))+"</td><td>" +
			+retStr(dataList[i].rssi)+"</td><td>"
			+retStr(dataList[i].collectionTimes)
			+"</td></tr>"
	  );
	  //存放数据总页数
  }
  pageCount=caculPageCount(+result.data.total,+result.data.pageSize);
  },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
	  console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus)
  }
};


//选择设备点击
var sBOption={
	type:"post",
	url:"http://101.200.141.234:8877/hawkeye/client",
	data:{
		"method":"queryAllDeviceList"
	},//待定
	dataType:"json",
	async:false,
	success:function(result){
		$(".scnr5 .zz-w .zz-sousuo form").children(":gt(1)").remove();//移除多余的元素
		var dataList=result.data;//
		for(i=0;i<dataList.length;i++){
			//其中name 不知道
			$(".scnr5 .zz-w .zz-sousuo form").append(
				'<input type="checkbox" name="shebei" class="zc" id="shebei'+i+'" data-id='+dataList[i].id+'/><label class="cuol" for="shebei'+i+'">'+retStr(dataList[i].deviceName)+'</label><br/>'
			)
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		  console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus)
	}
};


//过滤非法数据
function retStr(ziduan){
	if(typeof(ziduan)=="undefined"){
		return "未知";
	}else{
		var arr=ziduan.toString().split("");
		var newstr=arr[0]+arr[1];
		if(newstr=="Na"){
			return "未知"
		}
		return ziduan;
	}
}


//秒转换
function timeStamp(second_time){  
	var time = parseInt(second_time) + "秒";  
	if( parseInt(second_time )> 60){  
	  
	    var second = parseInt(second_time) % 60;  
	    var min = parseInt(second_time / 60);  
	    time = min + "分" + second + "秒";  
	      
	    if( min > 60 ){  
	        min = parseInt(second_time / 60) % 60;  
	        var hour = parseInt( parseInt(second_time / 60) /60 );  
	        time = hour + "小时" + min + "分" + second + "秒";  
	  
	        if( hour > 24 ){  
	            hour = parseInt( parseInt(second_time / 60) /60 ) % 24;  
	            var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );  
	            time = day + "天" + hour + "小时" + min + "分" + second + "秒";  
	        }  
	    }  
	}  
	return time;          
}  



$(document).ready(function (){
	
	//判断 下面的 是否有遮罩，没有改掉上面的 遮罩
	if($("#baoqilai").css("display") == "none"){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
	}
	
	
	//填充运算数据量
	$.ajax({
		type:"post",
		url:"http://101.200.141.234:8877/hawkeye/client",
		data:{
			"method":"queryMaxDeviceCount"
		},//待定
		dataType:"json",
		async:false,
		success:function(result){
			var status=result.status;
			if(status==-1){
				window.location.href="denglu.html"; 
			}
			$(".center-shujuzhanshi").find("p").eq(1).text(result.data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus)
		}
	});
	
	//绑定点击事件
	$(".jtgxz1").click(function() {
		$.ajax(sBOption);
		$("#scnr5").css("display","block")
		$("#baoqilai").css("display","block")
		window.parent.document.getElementById("baoqilai1").style.display = "block";
	})
	//设备选择 --点击确定和取消按钮
	$("#scnr5 .xuanzeb").find("button").click(function (){
		if($(this).index()==0){
			$("#scnr5").css("display","none");
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			$("#baoqilai").css("display","none");
		}else{
			//取消
			$("input[name='shebei']:checked").each(function (){
				deviceIds.push($(this).attr("data-id"));
			})
			$("#scnr5").css("display","none");
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			$("#baoqilai").css("display","none");
		}
	});
	
	//时间选择那块需要
	$("#timerSelect").find("button").eq(0).click(function (){
		//单击 取消
		document.getElementById("scnr6").style.display = "none";
		window.parent.document.getElementById("baoqilai1").style.display = "none";
		document.getElementById("baoqilai").style.display = "none";
	});
	
	$("#timerSelect").find("button").eq(1).click(function (){
		//单击 确定
		$("input[name='chk']:checked").each(function(){
			var startTime=$(this).next().next().val();
			var endTime=$(this).next().next().next().next().val();
			times.push(startTime+","+endTime);
		});
		document.getElementById("scnr6").style.display = "none";
		window.parent.document.getElementById("baoqilai1").style.display = "none";
		document.getElementById("baoqilai").style.display = "none";
	});
	
	//点击启动按钮
	$("#qidong").click(function (){
		$.ajax(option);
		initFyTable(pageCount);
	})
})

$(".jtgxz2").click(function() {
	document.getElementById("scnr6").style.display = "block";
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
});


$(".jtgxz").click(function() {
	document.getElementById("scnr1").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	window.parent.document.getElementById("baoqilai1").style.display = "block";
});

$(".del").click(function() {
	document.getElementById("scnr6").style.display = "none";
	document.getElementById("scnr5").style.display = "none";
	document.getElementById("scnr1").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	window.parent.document.getElementById("baoqilai1").style.display = "none"
});

$("#scnr1").find(".xuanzeb").find("button").eq(0).click(function(){
	document.getElementById("scnr1").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	window.parent.document.getElementById("baoqilai1").style.display = "none"
})

$("#scnr1").find(".xuanzeb").find("button").eq(1).click(function(){
	document.getElementById("scnr1").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	window.parent.document.getElementById("baoqilai1").style.display = "none"
})

$(".jtgxz4").click(function() {
	//缓存cookie 处理结束之后删除
	setCookie("times_length", times.length);
	setCookie("deviceIds_length", deviceIds.length);
	for(i=0;i<times.length;i++){
		setCookie(i, times[i]);
	}
	for(j=0;j<deviceIds.length;j++){
		setCookie(j, deviceIds[j]);
	}
	window.location.href = 'guijifenxi1.html';
}),
$(".jtgxz5").click(function() {
	window.location.href = 'qiekuaifenxi.html';
});


//初始化分页表格
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
				+'<p id="pcount" style="font-size: 12px;height:15px;width:100px;background: none;margin-left: 72%;top: 32px;position: relative;color: rgba(255, 255, 255, 0.5);float: left;">共<i style="margin:0 5px;">'+pageCount+'</i>页</p>'
			+"</tr>"
		+"</table>"
		+"<div class='fudong' id='dcsj'>"
			+"<img src='img/daochu.png' /><a href='http://101.200.141.234:8877/hawkeye/common/exportHotConnectionExcel'>导出数据</a>"
		+"</div>"
	);
}

function initFyTable(pageCount){
	if(typeof($("table").eq(1))!="undefined"){
		$("table").eq(1).remove();
		$("#pcount").remove();
		$("#dcsj").remove();
	}
	if(pageCount==0){
		return;
	}
	drawFYTable();
	for (i=0;i<pageCount&&i<6;i++){
		var str="<td>"+(i+1)+"</td>";
		$("table").eq(1).find("th").eq(1).before(str)
	}
	$("table").eq(1).find("td").first().css("color","#0d80d0");
	
	//点击对应下面数字跳转页面
	$("table").eq(1).find("td").click(function (){
		$("#pageNo").val($(this).text());//填充数据
		var crrentPageNum=$("#pageNo").val();//当前页号
		$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
		
		option.data={
		  "method":"startScreen",
		  "deviceIds":deviceIds,
		  "times":times,
		  "pageNo":$("#pageNo").val(),
		  "pageSize":$("#pageSize").val()
		};
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
		option.data={
		  "method":"startScreen",
		  "deviceIds":deviceIds,
		  "times":times,
		  "pageNo":$("#pageNo").val(),
		  "pageSize":$("#pageSize").val()
		};
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
		
		option.data={
		  "method":"startScreen",
		  "deviceIds":deviceIds,
		  "times":times,
		  "pageNo":$("#pageNo").val(),
		  "pageSize":$("#pageSize").val()
		};
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
			alertJs.alert('系统提示', '页号超出范围');
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
		option.data={
		  "method":"startScreen",
		  "deviceIds":deviceIds,
		  "times":times,
		  "pageNo":$("#pageNo").val(),
		  "pageSize":$("#pageSize").val()
		};
		
		//绑定点击事件
		$("table").eq(1).find("td").click(function (){
			$("#pageNo").val($(this).text());//填充数据
			var crrentPageNum=$("#pageNo").val();//当前页号
			$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
			option.data={
			  "method":"startScreen",
			  "deviceIds":deviceIds,
			  "times":times,
			  "pageNo":$("#pageNo").val(),
			  "pageSize":$("#pageSize").val()
			};
			$.ajax(option);
		});
		$.ajax(option);
	})
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



//cookie
function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
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






