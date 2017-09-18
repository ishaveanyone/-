/*******************************全局 变量***************************************/
var latitude_arr=[];
var lastmodifytime_arr=[];


$(".del").click(function() {
	document.getElementById("xgmm").style.display = "none";
	document.getElementById("baoqilai").style.display = "none";
	document.getElementById("baoqilai1").style.display = "none"
});
$("#xiugaimima").click(function() {
	document.getElementById("baoqilai1").style.display = "block";
	document.getElementById("baoqilai").style.display = "block";
	document.getElementById("xgmm").style.display = "block";
	$("#xialachakan").toggleClass("hide");
});
//导航栏切换
$(".xuanze").find("a").click(function() {
	switch($(this).index()) {
		case 0:
			src = "zhuyao.html";
			break;
		case 1:
			src = "shujuchaxun.html";
			break;
		case 2:
			src = "yanpanpingtai.html";
			break;
		case 4:
			src = "jiankongguanli.html";
			break;
		case 5:
			src = "zhinengshapan.html";
			break;
		case 6:
			src = "xitongguanli.html";
			break;
		default:
			break;
	}
	$('#if1').attr('src', src);
	$(this).css('color', '#00A8DF');
	$(this).siblings().css('color', '#828485');
});

$("#userOP").click(function (){
	$("#xialachakan").toggleClass("hide");
})


//点击退出登录的js
$(".xiala-bottom").click(function() {
	window.location.href = 'denglu.html';
})

//更新登录用户名称

function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null)  
    	return unescape(arr[2]);   
    return null;  
}   
$(".mc").text(getCookie("%..userName..%"));

//控制鼠标滚动
/*$(window).on('mousewheel', function(event, delta) {  
	if(delta>0){
		//向上
	}else{
		//向下
		
	}
});*/

//点击websocket 关闭按钮
$("#close_frame").click(function(){
	$("#xiaoxitanchuang").css("display","none");
});

//点击websocket查看详情
$("#look_detile").click(function(){
	//$("#xiaoxitanchuang").css("display","none");
	console.log("实际的效果并没有给出");
});



