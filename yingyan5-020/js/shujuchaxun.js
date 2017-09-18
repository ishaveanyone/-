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


var pageCount=0;
var option = {
  url : "http://101.200.141.234:8877/hawkeye/client",
  dataType : "json",
  type : "post",
  async:false, 
  data:$("#paramForm").serialize(),
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
				+retStr(dataList[i].deviceNo)+"</td><td>"
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
	  
	  $("table").eq(0).find("tr").on("dblclick",function(){
			var phone=$(this).find("td").eq(5).text();	
			setCookie("phone",phone);	//缓存号码  
			var startTime=$("#startTime").val();
			setCookie("startTime",startTime);	//缓存开始时间
			var endTime=$("#endTime").val();
			setCookie("endTime",endTime);	//缓存结束时间
			//需要缓存用户的查询参数
			var imsi=$(this).find("td").eq(4).text();	
			setCookie("imsi",imsi);	//缓存结束时间
			var imei=$(this).find("td").eq(3).text();	
			setCookie("imei",imei);	//缓存结束时间
			window.location.href="guijifenxi2.html";
	  });
  },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
	  console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus)
  }
};

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
		var arr=ziduan.toString().split("");
		var newstr=arr[0]+arr[1];
		if(newstr=="Na"){
			return "未知"
		}
		return ziduan;
	}
}

function lunxun(){
	$.ajax(option);
}

//页面刷新加载
$(document).ready(function (){
	//判断 下面的 是否有遮罩，没有改掉上面的 遮罩
	if($("#baoqilai").css("display") == "none"){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
	}
	
	
	
	pageCount=0;
	$.ajax(option);
	initFyTable(pageCount);
	//启动定时器,刷新时间为5分钟
	setInterval("lunxun()",5000);
	//没有办法，丑就丑点吧，总比每一个tr写一个入侵的js onclick函数要好，这是一个双击事件
});

//点击搜索
$("#ssBtn").click(function (){
	$("#phone").val($(".chaxunkuan form").find("input").eq(0).val())//手机号码搜索表单填充
	$("#startTime").val($(".chaxunkuan form").find("input").eq(1).val());
	$("#endTime").val($(".chaxunkuan form").find("input").eq(2).val());
	option.data=$("#paramForm").serialize();
	$.ajax(option);
	initFyTable(pageCount);
})

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
	option.data=$("#paramForm").serialize();
	$("table").eq(1).find("td").first().css("color","#0d80d0");
	
	
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
	})
	
	
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
		
		//绑定点击事件
		$("table").eq(1).find("td").click(function (){
			$("#pageNo").val($(this).text());//填充数据
			var crrentPageNum=$("#pageNo").val();//当前页号
			$(this).css("color","#0d80d0").siblings().css("color","rgba(255, 255, 255, 0.5)");
			option.data=$("#paramForm").serialize();
			$.ajax(option);
		});
		
		option.data=$("#paramForm").serialize();
		$.ajax(option);
	})
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






