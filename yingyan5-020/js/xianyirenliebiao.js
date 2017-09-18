var startTime=null;//开始时间
var timer_t=null;//计时器
var timer_w=null;//计时器
var timer_ct=null;
var timer_cw=null;
var timeCount=0;//记录时间
var pageCount=0;//返回 参数 总页数
var pageNo=0;//当前页面 编号
var mutex=0;//s顺序锁 -----互斥白名单和群体明芳
var hcs=0;//互斥锁
var parentId=null;
//查询全局 变量
var select_option={
	url:"http://101.200.141.234:8877/hawkeye/client",
	type:"post",
	async:false,
	data:$("#select_paraForm").serialize(),
	dataType:"json",
	success:function (result){
		var status=result.status;
		if(status==-1){
			window.location.href="denglu.html"; 
		}
		//清除数据 
		$("table").eq(0).children().not("thead").remove();
		var dataList=result.data.rows;//数据 
		for (i=0;i<dataList.length;i++){
			$("table").eq(0).append(
				"<tr><td>"
					+retStr(dataList[i].imei)+"</td><td>"
					+retStr(dataList[i].imsi)+"</td><td>"
					+retStr(dataList[i].phoneNum)+"</td><td>"
					+timeStamp(retStr(dataList[i].collectionTimeLong))+"</td>"
					+"<td>"+retStr(dataList[i].collectionTimes)+"</td>"
					+"<td>"+formatTime(dataList[i].startCollectionTime)+"-"+formatTime(dataList[i].collectionTime)+"</td>"
					+"<td style='display:none'>"
						+"<a style='cursor:pointer;' class='fanglianjie' href='javascript:void(0)'  data-id="+dataList[i].id+">移至临控管理</a>"
					+"</td>"
				+"</tr>"
			);
		}	
		pageCount=caculPageCount(+result.data.total,+result.data.pageSize);
		move();
	},
	error:function (){
		alert("error");
	}
}


var select_option2={
	url:"http://101.200.141.234:8877/hawkeye/client",
	type:"post",
	async:false,
	data:$("#select_paraForm").serialize(),
	dataType:"json",
	success:function (result){
		//清除数据 
		$("table").eq(0).children().not("thead").remove();
		var dataList=result.data.rows;//数据 
		for (i=0;i<dataList.length;i++){
			$("table").eq(0).append(
				"<tr><td>"
					+retStr(dataList[i].imei)+"</td><td>"
					+retStr(dataList[i].imsi)+"</td><td>"
					+retStr(dataList[i].phoneNum)+"</td><td>"
					+timeStamp(retStr(dataList[i].collectionTimeLong))+"</td>"
					+"<td>"+retStr(dataList[i].collectionTimes)+"</td>"
					+"<td>"+formatTime(dataList[i].firstPositionTime)+"-"+formatTime(dataList[i].endPositionTime)+"</td>"
					+"<td style='display:none'>"
						+"<a style='cursor:pointer;' class='fanglianjie' href='javascript:void(0)'  data-id="+dataList[i].id+">移至临控管理</a>"
					+"</td>"
				+"</tr>"
			);
		}	
		pageCount=caculPageCount(+result.data.total,+result.data.pageSize);
		move();
	},
	error:function (){
		alert("error");
	}
}


//生成名单全局 变量
var create_option={
	url:"http://101.200.141.234:8877/hawkeye/client",
	type:"post",
	async:false,
	data:$("#create_paraForm").serialize(),
	dataType:"json",
	success:function (result){
		parentId=result.data;
		setTimeout("hide()",4000);
	},
	error:function (){
		alert("error");
	}
}

//

function formatTime(time){
	if(typeof(time)=="undefined")
		return "未知";
	else{
		var d=new Date(+time);
		return d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日"+" "+d.getHours()+"时"+d.getMinutes()+"分"+d.getSeconds();
	}
}


//
function hide(){
	$("#zzImg").css("display","none");
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#baoqilai").css("display","none");
}

//点击 建立 ---群体名单
function create_total_blank(){
	if(hcs==1){
		alertJs.alert("系统提示", "请先结束正在的操作");
		return;
	}
	hcs=1;
	mutex=0;//锁死
	startTime=getNowDate();//初始化 开始 时间
	timeCount=0;
	timer_ct=setInterval("startCountTimer('tp')",1000);
	$("#startTime1").val(startTime);
	loading_t();
	$("#method").val("queryDenseAreaCollectionData");
	timer_t=setInterval("select_total_blank_luxun()",5000);
}

//点击停止
function stop_total_blank(){
	back_t();
	clearInterval(timer_t);
	clearInterval(timer_ct);
	$("#startTime").val(startTime);
	$("#parentId").val(parentId);
	$("#type2").val(0);
	$("#parentId").val(0);
	create_option.data=$("#create_paraForm").serialize();
	$.ajax(create_option);
	mutex=1;
	hcs=0;
}

//点击 建立  --- 白名单
function create_white_blank(){
	if(mutex==0){
		alertJs.alert("系统提示", "请先进行群体分析");
		return;
	}
	if(hcs==1){
		alertJs.alert("系统提示", "请先结束正在的操作");
		return;
	}
	hcs=1;
	timeCount=0;
	startTime=getNowDate();//初始化 开始 时间
	$("#startTime1").val(startTime);
	timer_cw=setInterval("startCountTimer('wp')",1000);
	loading_w();
	$("#method").val("queryDenseAreaCollectionData");
	timer_w=setInterval("select_white_blank_luxun()",5000);
}

function stop_white_blank(){
	back_w();
	clearInterval(timer_w);
	clearInterval(timer_cw);
	$("#startTime").val(startTime);
	$("#parentId").val(parentId);
	$("#type2").val(1);
	$("#parentId").val(parentId);
	create_option.data=$("#create_paraForm").serialize();
	$.ajax(create_option);
	hcs=0;
	mutex=0;
}

function select_total_blank_luxun(){
	$("#type").val(0);
	$("#pageNo").val(1);
	$(".initTable").remove();
	select_option.data=$("#select_paraForm").serialize();
	$.ajax(select_option);
	initTable(pageCount);
	$("table").eq(0).find("tr").each(function (){
		$(this).find("td").last().css("display","block");
		$(this).find("td").last().css("lineHeight","50px");
	})
	$("table").eq(0).find("thead").find("th").last().css("display","block");
	$("table").eq(0).find("thead").find("th").last().css("lineHeight","50px");
}


function select_white_blank_luxun(){
	$("#type").val(1);
	$("#pageNo").val(1);
	$(".initTable").remove();
	select_option.data=$("#select_paraForm").serialize();
	$.ajax(select_option);
	initTable(pageCount);
	$("table").eq(0).find("tr").each(function (){
		$(this).find("td").last().css("display","block");
		$(this).find("td").last().css("lineHeight","50px");
	})
	$("table").eq(0).find("thead").find("th").last().css("display","block");
	$("table").eq(0).find("thead").find("th").last().css("lineHeight","50px");
	
}


//点击查询 --- 群体名单
function select_total_blank(){
	$("#type").val(0);
	$("#pageNo").val(1);
	$(".initTable").remove();
	select_option2.data=$("#select_paraForm").serialize();
	$.ajax(select_option2);
	initTable(pageCount);
	$("table").eq(0).find("tr").each(function (){
		$(this).find("td").last().css("display","block");
		$(this).find("td").last().css("lineHeight","50px");
	})
	$("table").eq(0).find("thead").find("th").last().css("display","block");
	$("table").eq(0).find("thead").find("th").last().css("lineHeight","50px");
}



//等待图片
function loading_t(){
	$("#tf").css("display","none");
	$("#tl").css("display","block");
}

//点击之后 恢复原样
function back_t(){
	$("#tf").css("display","block");
	$("#tl").css("display","none");
}

//等待图片
function loading_w(){
	$("#wf").css("display","none");
	$("#wl").css("display","block");
}

//点击之后 恢复原样
function back_w(){
	$("#wf").css("display","block");
	$("#wl").css("display","none");
}

//开始一个器的方法
function startCountTimer(pid){
	timeCount++;
	document.getElementById(pid).innerHTML=timeCount+"s";
}

//点击查询 --- 白名单
function select_white_blank(){
	$("#type").val(1);
	$("#pageNo").val(1);
	$(".initTable").remove();
	select_option2.data=$("#select_paraForm").serialize();
	$.ajax(select_option2);
	initTable(pageCount);
	$("table").eq(0).find("tr").each(function (){
		$(this).find("td").last().css("display","block");
		$(this).find("td").last().css("lineHeight","50px");
	})
	$("table").eq(0).find("thead").find("th").last().css("display","block");
	$("table").eq(0).find("thead").find("th").last().css("lineHeight","50px");
}

//点击查询 --- 黑名单
function select_black_blank(){
	$("#type").val(2);
	$("#pageNo").val(1);
	$(".initTable").remove();
	select_option2.data=$("#select_paraForm").serialize();
	$.ajax(select_option2);
	initTable(pageCount);
	$("table").eq(0).find("tr").each(function (){
		$(this).find("td").last().css("display","block");
		$(this).find("td").last().css("lineHeight","50px");
	})
	$("table").eq(0).find("thead").find("th").last().css("display","block");
	$("table").eq(0).find("thead").find("th").last().css("lineHeight","50px");
}

//计算得到总页数
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

//初次加载页面刷新数据
function initDataTable(){
	$.ajax(select_option);
	initTable(pageCount);
}

//移至临控管理
function move(){
	$(".fanglianjie").click(function (){
		var id=$(this).attr("data-id");
		$.ajax({
			url:"http://101.200.141.234:8877/hawkeye/client",
			data:{
				"method":"addHawkeyeTemporaryByPhoneList",
				"id":id
			},
			dataType:"json",
			success:function (result){
				if(result.status==1){
					alertJs.alert("系统提示",result.message);
					window.location.href="jiankongguanli.html";
				}
			},
			error:function(){
				alert("erorr");
			}
		})
	})
}


//初始化分页表格
function drawFYTable(pageCount){
	$("table").eq(0).after(
		"<div class='initTable'>"
		+"<table border='0' cellspacing='0' cellpadding='0' class='fenye'>"
			+"<tr class='noh'>"
				+"<th>&lt;</th>"
				+"<th>&gt;</th>"
				+"<th class='tiaozhuandao'><label>跳转到</label>" 
					+"<input type='text' class='inp' />" 
					+"<label class='go' style='cursor:pointer'>GO</label>"
				+"</th>"
				+'<p id="pcount" style="font-size: 12px;height:15px;width:100px;background: none;margin-left: 80%;top: 32px;position: relative;color: rgba(255, 255, 255, 0.5);float: left;">共<i style="margin:0 5px;">'+pageCount+'</i>页</p>'
			+"</tr>"
		+"</table>"
		+"</div>"
	);
}



//初始化分页 
function initTable(pageCount){
	$("#pageNo").val(1);
	if(typeof($("table").eq(1))!="undefined"){
		$("table").eq(1).remove();
		$("#pcount").remove();
	}
	
	if(pageCount==0){
		return;
	}
	
	drawFYTable(pageCount);
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
		select_option.data=$("#select_paraForm").serialize();
		$.ajax(select_option);
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
		select_option.data=$("#select_paraForm").serialize();
		$.ajax(select_option);
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
		select_option.data=$("#select_paraForm").serialize();
		$.ajax(select_option);
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
		select_option.data=$("#select_paraForm").serialize();
		$.ajax(select_option);
	})
}

//返回调用这个函数 的时间
function getNowDate(){
	var now=new Date($.now());
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var date=now.getDate();
	var hour=now.getHours();
	var minute= now.getMinutes();
	var second= now.getSeconds()
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
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


//
$(document).ready(function (){
	
	//判断 下面的 是否有遮罩，没有改掉上面的 遮罩
	if($("#baoqilai").css("display") == "none"){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
	}
	
	initDataTable();
	$("#tl").click(function (){
		$("#zzImg").css("display","block");
		$("#baoqilai").css("display","block");
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		stop_total_blank();
	})
	$("#wl").click(function (){
		$("#zzImg").css("display","block");
		$("#baoqilai").css("display","block");
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		stop_white_blank();
	})
	$("#total_blank").click(function(){
		$("#tp").text("1s")
		create_total_blank();
	});
	
	$("#white_blank").click(function(){
		$("#wp").text("1s")
		create_white_blank();
	});
	
	//点击名单 查询 按钮--群体名单
	$(".fudong1").find("div").eq(0).click(function (){
		$("#method").val("queryPhoneListByType");
		select_total_blank();
	});
	
	//点击名单 查询 按钮--黑名单
	$(".fudong1").find("div").eq(1).click(function (){
		$("#method").val("queryPhoneListByType");
		select_black_blank()
	});
	
	//点击名单 查询 按钮--白名单
	$(".fudong1").find("div").eq(2).click(function (){
		$("#method").val("queryPhoneListByType");
		select_white_blank()
	});
})