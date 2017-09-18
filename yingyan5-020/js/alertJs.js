var alertJs=new function (){
	this.alert=function (title,content){
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		window.document.getElementById("baoqilai").style.display = "block";
		$("body").append(
			'<div class="tanchuang">'
				+'<div class="m-tishi">'
					+'<p>'+title+'</p>'
					+'<a href="javascript:void(0)">x</a>'
				+'</div>'
				+'<div class="xiafang-tishi">'
					+'<p class="zge-tishi">'+content+'</p>'
					+'<p class="zge-queding">确定</p>'
				+'</div>'
			+'</div>'
		);
		
		$("body").find(".tanchuang .m-tishi a").click(function (){
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			window.document.getElementById("baoqilai").style.display = "none";
			$("body").find(".tanchuangzhezhao").remove();
			$("body").find(".tanchuang").remove();
		});
		
		$("body").find(".tanchuang .xiafang-tishi p").eq(1).click(function (){
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			window.document.getElementById("baoqilai").style.display = "none";
			$("body").find(".tanchuangzhezhao").remove();
			$("body").find(".tanchuang").remove();
		})
	};
	
	this.confirm=function (title,content){
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		window.document.getElementById("baoqilai").style.display = "block";
		$("body").append(
			'<div class="tanchuang">'
				+'<div class="m-tishi">'
					+'<p>'+title+'</p>'
					+'<a href="javascript:void(0)">x</a>'
				+'</div>'
				+'<div class="xiafang-tishi">'
					+'<p class="zge-tishi">'+content+'</p>'
					+'<p class="zge-confirm-queding">确定</p>'
					+'<p class="zge-confirm-quxiao">取消</p>'
				+'</div>'
			+'</div>'
		);
		
		$("body").find(".tanchuang .m-tishi a").click(function (){
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			window.document.getElementById("baoqilai").style.display = "none";
			$("body").find(".tanchuangzhezhao").remove();
			$("body").find(".tanchuang").remove();
		});
		
		$("body").find(".tanchuang .xiafang-tishi p").eq(1).click(function (){
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			window.document.getElementById("baoqilai").style.display = "none";
			$("body").find(".tanchuangzhezhao").remove();
			$("body").find(".tanchuang").remove();
			SetCookie("del", "ok")
		});
		
		
		//取消
		$("body").find(".tanchuang .xiafang-tishi p").eq(2).click(function (){
			window.parent.document.getElementById("baoqilai1").style.display = "none";
			window.document.getElementById("baoqilai").style.display = "none";
			$("body").find(".tanchuangzhezhao").remove();
			$("body").find(".tanchuang").remove();
		});
	};
}



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