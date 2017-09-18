//加载时填充
$(document).ready(function (){
	if((getCookie("%..password..%"))!=null && (getCookie("%..userName..%"))!=null){
		$("#content form").find("input").eq(0).val(getCookie("%..userName..%"));
		$("#content form").find("input").eq(1).val(getCookie("%..password..%"));
		$("input[type='checkbox']").attr("checked","checked");
	}else{
		return;
	}
});

//点击登录按钮提交表单
$(".denglu").click(function (){
	//获取提交的参数
	var userName = $("#content form").find("input").eq(0).val();
	var password = $("#content form").find("input").eq(1).val();
	var code = $("#content form").find("input").eq(2).val();
	$.ajax({
	 	type:"post",
	 	url:"http://101.200.141.234:8877/hawkeye/client",
	 	data:{
	 		"method":"toLogin",
	 		"userName":userName,
	 		"password":password,
	 		"code":code
	 	},
	 	dataType:"json",
	 	async:true,
	 	success:function (result){
	 		//登录成功
	 		if(result.status=="1"){
	 			clearCookie();//清空cookie
	 			SetCookie("%..userName..%",userName);//缓存账号
	 			if($("input[type='checkbox']").is(":checked")){
	 				SetCookie("%..password..%",password);////缓存密码
	 			}
	 			window.location.href="index.html";
	 		}else{
	 		//登录失败
	 			$("#tishi").css("display","block");
	 			$("#content").css("position","relative");
	 			$("#content").css("marginTop","0px");
	 			$("#tishi").text(result.message);
	 		}
	 	},
	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
	 		
	 		console.log(XMLHttpRequest.status+"-"+XMLHttpRequest.readyState+"-"+textStatus);
	 		
	 	}
	});
});

//只有上次保存之后才会有可能存在cookie被删除
$("input[type='checkbox']").change(function (){
	var key = $("#content form").find("input").eq(0).val();
	if(!this.checked){
		clearCookie();
		$("#content form").find("input").eq(0).val("");
		$("#content form").find("input").eq(1).val("");
	}else
		return;
});

//点击 图片 换图片
$("#imgCode").click(function (){
	$(this).attr("src","http://101.200.141.234:8877/hawkeye/common/getVerifyCode?width=150&height=50&rr="+Math.random());
});


//cookie
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


