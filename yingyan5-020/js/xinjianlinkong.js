/****************************************定义全局变量***************************************************/
var lklb_id="";
var lklb_name="";

var lkry_id="";
var lkry_name="";
var lkry_phone="";

var lkqy_id="";
var lkqy_name="";

var bjlb_id="";
var bjlb_name="";
var lksx_name="";

var controllId=null;//用于修临控信息，回传参数
var strArr=[];

/**************************************点击管理按钮********************************************/

//临控类别
$("#guanli1").click(function() {
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		async:false,
		data:{
			"method":"queryTemporaryTypeList",
		},
		dataType:"json",
		success:function(result){
			var dataList= result.data;
			$("#lklb_form").html("");//清空
			for (i=0;i<dataList.length;i++){
				$("#lklb_form").append(
					'<input type="checkbox" name="lklb" value='+dataList[i].id+' class="chk" id="lklb'+i+'" /><label class="anjian" for="lklb'+i+'">'+dataList[i].name+'</label><label class="kaiin" style="color: red;" onclick="delX('+dataList[i].id+')">x</label><br>'
				);	
			}
		},
		error:function (){
			alert("error");
		}
	});
	
	//处理只能进行 单选---处理绑定 一个change事件
	$("#lklb_form").find("input").change(function (){
		$(this).siblings("input").prop("checked",false);//很简单就不说了哦
	})
	
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	$("#lklbgl").css("display","block");
	$("#xjanlb_link").css("display","block");
	$("#baoqilai").css("display","block");
	document.getElementById("xjanlb_link").style.display = "block";
});

//轨迹临控接收号码
$("#guanli2").click(function() {
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client ",
		type:"post",
		data:{
			"method":"queryTemporaryUser"
		},
		dataType:"json",
		success:function(result){
			var status=result.status;
			if(status==-1){
				window.location.href="denglu.html"; 
			}
			
			var dataList= result.data;
			$("#lkry_form").html("");//清空
			for (i=0;i<dataList.length;i++){
				$("#lkry_form").append(
					'<input type="radio" name="lkry" value="'+dataList[i].id+'" class="chk" id="lkry'+i+'" /><label class="liuwei" for="lkry'+i+'">'+dataList[i].userName+'</label><label class="pcm">'+dataList[i].phone+'</label><label class="kaiin" style="color: red;" onclick="delX('+dataList[i].id+')">x</label><br>'
				);	
			}
		},
		error:function (){
			alert("error");
		}
	});
	
	
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	$("#guanlilinkongrenyuan").css("display","block");
	$("#xjangj_link").css("display","block");
	$("#baoqilai").css("display","block");
	document.getElementById("xjangj_link").style.display = "block";
});

//临控区域
$("#guanli3").click(function() {
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		async:false,
		data:{
			"method":"queryTemporaryArea",
			"parentNo":"110100"
		},
		dataType:"json",
		success:function(result){
			var dataList= result.data;
			$("#lkqy_form").html('');
			for (i=0;i<dataList.length;i++){
				$("#lkqy_form").append(
					'<input type="checkbox" name="lkqy" value="'+dataList[i].areaNo+'" class="chk9 " id="lkqy'+i+'" /><label class="quanbuquyu" for="lkqy'+i+'">'+dataList[i].name+'</label><label class="kaiin" style="color: red;" onclick="delX('+dataList[i].areaNo+')">x</label><br>'
				);	
			}
		},
		error:function (){
			alert("error");
		}
	});
	
	//处理只能进行 单选---处理绑定 一个change事件
	$("#lkqy_form").find("input").change(function (){
		$(this).siblings("input").prop("checked",false);//很简单就不说了哦
	})
	
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	$("#lkqygl").css("display","block");
	$("#xjanqy_link").css("display","block");
	$("#baoqilai").css("display","block");
	document.getElementById("xjanqy_link").style.display = "block";
});

//报警类别
$("#guanli4").click(function() {
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		type:"post",
		data:{
			"method":"queryAlarmTypeList"
		},
		dataType:"json",
		success:function(result){
			$("#bjlb_form").children().remove();
			var dataList=result.data;
			for (i=0;i<dataList.length;i++){
				$("#bjlb_form").append(
					'<input type="radio" value='+dataList[i].id+' name="bjlb" class="chk8" id="bjlb'+i+'"/><label class="quanbuquyu1" for="bjlb'+i+'">'+dataList[i].name+'</label><br />'	
				);
			}
		},
		error:function(){
			alert("error")
		}
	})
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("gllklb").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	/*document.getElementById("xjanbj_link").style.display = "block";*/
});


/*****************************************点击确定取消功能按钮**********************************************************/

//临控类别管理---点击确定取消按钮页面端显示
$("#lklbgl .xuanzeb").find("button").eq(0).click(function (){
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#lklbgl").css("display","none");
	$("#baoqilai").css("display","none");
	document.getElementById("xjanlb_link").style.display = "none";
});

$("#lklbgl .xuanzeb").find("button").eq(1).click(function (){
	$("#lklb_form input[name=lklb]:checked").each(function (){
		$("#linkongleibie").find("span").html($(this).next().text());
		lklb_id=$(this).val();
		lklb_name=$(this).next().text();
		/*
		$("#baojingleibie1 ul").append(
			"<li data-id="+$(this).val()+">"+$(this).next().text()+"</li>"
		);*/
	})
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#lklbgl").css("display","none");
	$("#baoqilai").css("display","none");
	document.getElementById("xjanlb_link").style.display = "none";
	//为每一个li绑定一个点击事件
	/*$("#baojingleibie1 ul").find("li").click(function (){
		   lklb_id=$(this).attr("data-id");
		   lklb_name=$(this).text();
		   $("#linkongleibie span").text(lklb_name);
		   $("#baojingleibie1").hide();
	})*/
});

//管理临控人员--点击确定取消按钮后页面端显示
$("#guanlilinkongrenyuan .xuanzeb").find("button").eq(0).click(function(){
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#guanlilinkongrenyuan").css("display","none");
	$("#baoqilai").css("display","none");
	document.getElementById("xjangj_link").style.display = "none";
});
$("#guanlilinkongrenyuan .xuanzeb").find("button").eq(1).click(function(){
	$("#lkry_form input[name=lkry]:checked").each(function (){
		lkry_id=$(this).val();
		lkry_name=$(this).next().text();
		lkry_phone=$(this).next().next().text();
		/*$("#show_lkry").find("input").attr("checked","checked");*/
		$("#show_lkry").find("label").html(lkry_name+" "+ lkry_phone+ "<b style='color: red;'>*</b>");
	})
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#guanlilinkongrenyuan").css("display","none");
	$("#baoqilai").css("display","none");
	document.getElementById("xjangj_link").style.display = "none";
});

//临控区域管理--点击确定取消按钮 后页面端显示数据
$("#lkqygl .xuanzeb").find("button").eq(0).click(function (){
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#lkqygl").css("display","none");
	$("#baoqilai").css("display","none");
	document.getElementById("xjanqy_link").style.display = "none";
});

$("#lkqygl .xuanzeb").find("button").eq(1).click(function (){
	/*$("#baojingleibie2 ul li").remove();*/
	$("#lkqy_form input[name='lkqy']:checked").each(function (){
		$("#linkongquyu").find("span").html($(this).next().text());
		lkqy_id=$(this).val();
	   	lkqy_name=$(this).next().text();
		/*$("#baojingleibie2 ul").append(
			"<li data-id="+$(this).val()+">"+$(this).next().text()+"</li>"
		);*/
	});
	//绑定点击事件
	/*$("#baojingleibie2 ul li").click(function (){
	 	lkqy_id=$(this).attr("data-id");
	   	lkqy_name=$(this).text();
	   	$("#linkongquyu span").text(lkqy_name);
	    $("#baojingleibie2").hide();
	});*/
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	$("#lkqygl").css("display","none");
	$("#baoqilai").css("display","none");
	document.getElementById("xjanqy_link").style.display = "none";
});

//报警类别管理--点击报警类别确定取消按钮 后页面端显示数据
$("#gllklb .xuanzeb").find("button").eq(0).click(function(){
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	document.getElementById("gllklb").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	/*document.getElementById("xjanbj_link").style.display = "none";*/
});

$("#gllklb .xuanzeb").find("button").eq(1).click(function(){
	$("#bjlb_form input[name='bjlb']:checked").each(function (){
		
		$("#baojing").find("label").html($(this).next().text());
		bjlb_id= $(this).val();
		bjlb_name=$(this).next().text();
		/*if($.inArray($(this).val().toString(), strArr)==-1){
			strArr.push($(this).val());
			$("#baojingleibie form").append(
				'<input type="radio" value="'+$(this).val()+'" name="show_bjlb" id="'+$(this).val()+'" class="danxuan" /><label for="'+$(this).val()+'">'+$(this).next().text()+'</label><br/>'
			);
		}else{
			console.log("-!-");
		}*/
	});
	
/*	//绑定点击事件
	$("#baojingleibie form input").click(function (){
		$("#baojingleibie form input[name='show_bjlb']:checked").each(function (){
			bjlb_id= $(this).val();
			bjlb_name=$(this).next().text();
		});
		$("#baojing").find("input").attr("checked","checked");
		$("#baojing").find("label").html(bjlb_name);
		$("#baojingleibie").hide();
	});*/
	
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	document.getElementById("gllklb").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	/*document.getElementById("xjanbj_link").style.display = "none";*/
});


//数据编写完成之后 ----  取消按钮
$("#add_btn").find("button").eq(0).click(function (){
	
});


//填写完数据   ----  点击保存按钮
$("#add_btn").find("button").eq(1).click(function (){
	
	var method="";
	if(controllId!=null){
		method="modifyTemporary";
	}else{
		method="createTemporary";
	}
	var phone=$("#phone").val();//必填
	var controlledName=$("#controlledName").val();//必填
	var idCard=$("#idCard").val();//非必填
	var IMEI=$("#IMEI").val();//必填
	var IMSI=$("#IMSI").val();//必填
	var userId=lkry_id;//必填
	var type=lklb_id;//必填
	var area=lkqy_id;//必填
	var alarmTypes=bjlb_id;
	var endTime=lksx_name;//必填
	var remark=$("#beizhu").val(); 
	//判断 并且 计算 开始时间和结束时间 
	var nowTime=new Date($.now());
	endTime = getEndTime(nowTime, endTime);
	endTime=endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate()+" "+endTime.getHours()+":"+endTime.getMinutes()+":"+endTime.getSeconds();
	
	if(IMSI=='' || userId=='' || type=='' ||alarmTypes==''){
		alertJs.alert("系统提醒","缺少必填字段");
		return;
	}
	
	//做必要的判断
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		data:{
			"method":method,
			"id":controllId,
			"phone":phone,
			"controlledName":controlledName,
			"idCard":idCard,
			"imei":IMEI,
			"imsi":IMSI,
			"userId":userId,
			"type":type,
			"area":area,
			"alarmTypes":alarmTypes,
			"endTime":endTime,
			"remark":remark
		},
		dataType:"json",
		success:function (result){
			if(result.status==1){
				window.location.href="jiankongguanli.html";
			}else{
				
			}
		},
		error:function (){
			alert("error")
		}
	})
});


/*****************************************一些页面的去下按钮事件*******************************************************/
//关闭窗口X
$(".del").click(function() {
	document.getElementById("baoqilai").style.display = "none";
	document.getElementById("lklbgl").style.display = "none";
	document.getElementById("lkqygl").style.display = "none";
	document.getElementById("xinjianlklb").style.display = "none";
	document.getElementById("xinjianlkqy").style.display = "none";
	document.getElementById("xinjian").style.display = "none";
	document.getElementById("guanlilinkongrenyuan").style.display = "none";
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	document.getElementById("gllklb").style.display = "none";
	document.getElementById("xinjianbjlb").style.display = "none";
	//隐藏
	/*$("#xjanbj_link").hide();*/
	$("#xjanlb_link").hide();
	$("#xjanqy_link").hide();
	$("#xjangj_link").hide();	
});

//页面回退的跳转
$("#tiaozhuan").click(function() {
	window.location.href = 'jiankongguanli.html';
});

/***************************************页面加载事件******************************************/

$(document).ready(function() {
	
	//判断 下面的 是否有遮罩，没有改掉上面的 遮罩
	if($("#baoqilai").css("display") == "none"){
		window.parent.document.getElementById("baoqilai1").style.display = "none";
	}
	//判断是否是要进行页面填充
	controllId=getCookie("controllId")
	if(controllId!=null){
		initInformatica(getCookie("controllId"));
		delCookie("controllId");
	}
	
	
	 /*$("#baojing").click(function(e) {
		 $("#baojingleibie1").hide();
		 $("#baojingleibie2").hide();
		 $("#baojingleibie3").hide();
       if($("#baojingleibie").is(":hidden")) {
           $("#baojingleibie").show();
           e ? e.stopPropagation() : event.cancelBubble = true;
       }
	 });
	 $("#baojingleibie").click(function(e) {
         e ? e.stopPropagation() : event.cancelBubble = true;
	 });
	 
	$("#linkongleibie").click(function(e) {
		$("#baojingleibie").hide();
		$("#baojingleibie2").hide();
		$("#baojingleibie3").hide();
		if($("#baojingleibie1").is(":hidden")) {
			$("#baojingleibie1").show();
			e ? e.stopPropagation() : event.cancelBubble = true;
		}
	});
   $("#baojingleibie1").click(function(e) {
       e ? e.stopPropagation() : event.cancelBubble = true;
   });
   
   $("#linkongquyu").click(function(e) {
		$("#baojingleibie").hide();
		$("#baojingleibie1").hide();
		$("#baojingleibie3").hide();
       if($("#baojingleibie2").is(":hidden")) {
           $("#baojingleibie2").show();
           e ? e.stopPropagation() : event.cancelBubble = true;
       }
   });
   $("#baojingleibie2").click(function(e) {
        e ? e.stopPropagation() : event.cancelBubble = true;
   });
   
	$("#lksx").click(function (e){
	   $("#baojingleibie").hide();
	   $("#baojingleibie1").hide();
	   $("#baojingleibie2").hide();
		 if($("#baojingleibie3").is(":hidden")) {
			$("#baojingleibie3").show();
		  	e ? e.stopPropagation() : event.cancelBubble = true;
		 }
	})
	
	$("#baojingleibie3").click(function(e) {
	       e ? e.stopPropagation() : event.cancelBubble = true;
	});
	
	//这个是写死了
	$("#baojingleibie3 ul li").click(function (){
	   	lksx_name=$(this).text();
	   	$("#lksx span").text(lksx_name);
	   	$("#baojingleibie3").hide();
	});
  
	$(document).click(function() {
		$("#baojingleibie").hide();
		$("#baojingleibie1").hide();
		$("#baojingleibie2").hide();
		$("#baojingleibie3").hide();
	});*/
	$("#lksx").click(function (e){
		 if($("#baojingleibie3").is(":hidden")) {
			$("#baojingleibie3").show();
		  	e ? e.stopPropagation() : event.cancelBubble = true;
		 }
	})
	$("#baojingleibie3 ul li").click(function (){
	   	lksx_name=$(this).text();
	   	$("#lksx span").text(lksx_name);
	   	$("#baojingleibie3").hide();
	});
	$(document).click(function() {
		$("#baojingleibie3").hide();
	});
})

//验证11位号码长度
$("#phone").change(function (){
	var phoneNum = $("#phone").val();
	if(validatemobile(phoneNum+"")){
		return;
	}else
		$(this).val("");
});

function validatemobile(mobile) 
{ 
    if(mobile.length!=11) 
    { 
    	alertJs.alert('系统提示', '请输入有效的手机号');
        return false; 
    } 
    return true;
} 


/****************************封装的功能函数***************************************/
//点击红色的 X进行删除
function delX(id){
	
	$("#lklbgl").css("display","none");
	$("#guanlilinkongrenyuan").css("display","none");
	$("#lkqygl").css("display","none");
	
	$("#xjanlb_link").css("display","none");
	$("#xjanqy_link").css("display","none");
	$("#xjangj_link").css("display","none");
	
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	window.document.getElementById("baoqilai").style.display = "block";
	
	alertJs.confirm('系统提示', '删除？');
	var nIntervId=setInterval(function (){
		 if(getCookie("del")=="ok"){
			 //删除
			/*$.ajax({
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
			})*/
		 }
	},1000);
}


function initInformatica(id){
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		data:{
			"method":"queryHawkeyeTemporaryControlById",
			"id":id
		},
		type:"post",
		dataType:"json",
		success:function (result){
			//填充页面数据
			var data=result.data;
			$("#phone").val(data.controlledPhone);
			$("#controlledName").val(data.controlledName);
			$("#idCard").val(data.idCard);
			$("#IMEI").val(data.imei);
			$("#IMSI").val(data.imsi);
			$("#IMSI").val(data.imsi);
			$("#linkongleibie").find("span").html(data.typeName);//临控类别文字填充
			$("#show_lkry").find("label").html(data.controlledName+" "+ data.controlledPhone+ "<b style='color: red;'>*</b>");
			$("#linkongquyu").find("span").html(data.data);
			$("#baojing").find("label").html(data.alarmTypeName);
			$("#lksx").find("span").html(getDiff(+data.startTime,+data.endTime));
			$("#beizhu").val(data.remark);
		},
		error:function(){
			console.log("1");
		}
	})
}


//根据时间 框 选择 确定开始1时间 和结束 时间 

function getEndTime(nowTime,endTime){
	switch (endTime){
		case "七天":
			nowTime.setDate(nowTime.getDate()+7);
			break;
		case "两周":
			nowTime.setDate(nowTime.getDate()+14);
			break;
		case "一个月":
			nowTime.setMonth(nowTime.getMonth()+1);
			break;
		case "一年":
			nowTime.setFullYear(nowTime.getFullYear()+1);
			break;
		case "永久":
			//永久是十年
			nowTime.setFullYear(nowTime.getFullYear()+10);
			break;
		}
	return nowTime;
}

//返回有确定开始时间和结束时间确定的 时间差----只能是7天 两周 一个月 一年 永久（10年） 
function getDiff(startTime,endTime){
	
	var now=new Date(startTime);
	now.setDate(now.getDate()+7);
	if(now.valueOf()==endTime){
		return "七天";
	}
	now.setDate(now.getDate()-7+14);
	if(now.valueOf()==endTime){
		return "两周";
	}
	now.setDate(now.getDate()-14);
	now.setMonth(now.getMonth()+1);
	if(now.valueOf()==endTime){
		return "一个月";
	}
	now.setMonth(now.getMonth()-1);
	now.setFullYear(now.getFullYear()+1);
	if(now.valueOf()==endTime){
		return "一年";
	}
	now.setFullYear(now.getFullYear()-1);
	now.setFullYear(now.getFullYear()+10);
	if(now.valueOf()==endTime){
		return "十年";
	}
}

//新建临控人员
$("#xjangj_link").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjian").style.display = "block";
	document.getElementById("guanlilinkongrenyuan").style.display = "none";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xjangj_link").style.display = "none";
})

//新建临控类别
$("#xjanlb_link").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjianlklb").style.display = "block";
	document.getElementById("lklbgl").style.display = "none";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xjanlb_link").style.display = "none";
});

//新建临控区域
$("#xjanqy_link").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjianlkqy").style.display = "block";
	document.getElementById("lkqygl").style.display = "none";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xjanqy_link").style.display = "none";
});



$("#quxiaoyr").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjian").style.display = "none";
	document.getElementById("guanlilinkongrenyuan").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xjangj_link").style.display = "block";
	
});


$("#quedingry").click(function() {
	//发送ajax请求 添加凌空人员
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		data:{
			"method":"addTemporaryUser",
			"userName":$("#xinjian_username").val(),
			"phone":$("#xinjian_phone").val(),
			"position":$("#xinjian_job").val(),
			"age":$("#xinjian_age").val(),
		},
		type:"post",
		success:function (result){
			//让用户重新点击管理进行 查看数据
		//alert(result);
		},
		error:function(){
			
		}
	})
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	document.getElementById("xinjian").style.display = "none";
	document.getElementById("guanlilinkongrenyuan").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
});


$("#quxiaolb").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjianlklb").style.display = "none";
	document.getElementById("lklbgl").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xjanlb_link").style.display = "block";
});
$("#quedinglb").click(function() {
	$.ajax({
		url:"http://101.200.141.234:8877/hawkeye/client",
		data:{
			"method":"addTemporaryType",
			"name":$("#xinjian_lk_lb").val(),
		},
		type:"post",
		success:function (result){
			//让用户重新点击管理进行 查看数据
			//alert(result);
		},
		error:function(){
		}
	})
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	document.getElementById("xinjianlklb").style.display = "none";
	document.getElementById("lklbgl").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
});


$("#quxiaoqy").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("xinjianlkqy").style.display = "none";
	document.getElementById("lkqygl").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xjanqy_link").style.display = "block";
});

$("#quedingqy").click(function() {
	window.parent.document.getElementById("baoqilai1").style.display = "none";
	document.getElementById("xinjianlkqy").style.display = "none";
	document.getElementById("lkqygl").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
});


//绑定X框点击 的 确认框显示并且进行 删除


