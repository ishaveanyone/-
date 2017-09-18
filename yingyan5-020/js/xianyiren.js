$(".pachu").click(function() {
	$(".ck").attr('src', 'img/zjt.png');
	$(".pachu").css('color', '#0D80D0');
	$(".xianyiren").css('color', '#8BC1DA');
	$(".xianyiren").css('textDecoration', 'none');
	$(".pachu").css('textDecoration', 'underline');

});
$(".xianyiren").click(function() {
	$(".ck").attr('src', 'img/yjt.png');
	$(".xianyiren").css('color', '#0D80D0');
	$(".pachu").css('color', '#8BC1DA');
	$(".pachu").css('textDecoration', 'none');
	$(".xianyiren").css('textDecoration', 'underline');
});

//中间模块的切换
$("#k1").click(function() {
	document.getElementById("k1").style.background = "#0D80D0";
	document.getElementById("imgzx1").src = "img/tx.png";
	document.getElementById("p1").style.color = "#FFFFFF";

	document.getElementById("imgzx2").src = "img/tx_on.png";
	document.getElementById("p2").style.color = "#7dadc4";
	document.getElementById("k2").style.background = "url(img/huaxiangbg.png)";

	document.getElementById("imgzx3").src = "img/tx_on.png";
	document.getElementById("p3").style.color = "#7dadc4";
	document.getElementById("k3").style.background = "url(img/huaxiangbg.png)";
});
$("#k2").click(function() {
	window.location.href = "xianyirenliabiao.html";
	document.getElementById("k2").style.background = "#0D80D0";
	document.getElementById("imgzx2").src = "img/tx.png";
	document.getElementById("p2").style.color = "#FFFFFF";
	document.getElementById("imgzx1").src = "img/tx_on.png";
	document.getElementById("p1").style.color = "#7dadc4";
	document.getElementById("k1").style.background = "url(img/huaxiangbg.png)";
	document.getElementById("imgzx3").src = "img/tx_on.png";
	document.getElementById("p3").style.color = "#7dadc4";
	document.getElementById("k3").style.background = "url(img/huaxiangbg.png)";
});
$("#k3").click(function() {
	document.getElementById("k3").style.background = "#0D80D0";
	document.getElementById("imgzx3").src = "img/tx.png";
	document.getElementById("p3").style.color = "#FFFFFF";

	document.getElementById("imgzx2").src = "img/tx_on.png";
	document.getElementById("p2").style.color = "#7dadc4";
	document.getElementById("k2").style.background = "url(img/huaxiangbg.png)";

	document.getElementById("imgzx1").src = "img/tx_on.png";
	document.getElementById("p1").style.color = "#7dadc4";
	document.getElementById("k1").style.background = "url(img/huaxiangbg.png)";
})