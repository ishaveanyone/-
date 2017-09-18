//新建设备的触犯事件
$("#guanlianniu").click(function() {
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		document.getElementById("xinjianshebei").style.display = "block";
		document.getElementById("baoqilai").style.display = "block";
	}),
	$("#xjsbpz").click(function(){
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		document.getElementById("xinjianshebeipeizhi").style.display = "block";
		document.getElementById("baoqilai").style.display = "block";
	})
	$(".qiehuan1").click(function() {
		$(".quyu").css('display', 'block');
		$(".quyu").css('marginTop', '10px');
		$(".qiehuan1").css('color', '#FFFFFF');
		$(".qiehuan").css('color', '#8BC1DA');
		$(".qiehuan").css('background', 'transparent');

		$(".qiehuan1").css('background', '#0d80d0');
		$(".chal").css('height', '130px');
		$("#caiji1").css('position', 'relative');
		$("#caiji1").css('top', '140px');
		$("#cipan").css('position', 'relative');
		$("#cipan").css('top', '140px');
	}),
	$(".qiehuan").click(function() {
		$(".quyu").css('display', 'none');
		$(".qiehuan1").css('color', '#8BC1DA');
		$(".qiehuan").css('color', '#FFFFFF');
		$(".qiehuan").css('background', '#0d80d0');

		$(".qiehuan1").css('background', 'transparent');
		$(".chal").css('height', '50px')
		$("#caiji1").css('position', 'relative');
		$("#caiji1").css('top', '60px');
		$("#cipan").css('position', 'relative');
		$("#cipan").css('top', '60px');

	}),
	$(".qiehuan4").click(function() {
		$(".quyu1").css('display', 'block');
		$(".quyu1").css('marginTop', '10px');
		$(".qiehuan4").css('color', '#FFFFFF');
		$(".qiehuan3").css('color', '#8BC1DA');
		$(".qiehuan3").css('background', 'transparent');

		$(".qiehuan4").css('background', '#0d80d0');
		$(".chal1").css('height', '130px');

		$("#cipan").css('position', 'relative');
		$("#cipan").css('top', '200px');
	}),
	$(".qiehuan3").click(function() {
		$(".quyu1").css('display', 'none');
		$(".qiehuan4").css('color', '#8BC1DA');
		$(".qiehuan3").css('color', '#FFFFFF');
		$(".qiehuan3").css('background', '#0d80d0');

		$(".qiehuan4").css('background', 'transparent');
		$(".chal1").css('height', '50px');
		$("#cipan").css('position', 'relative');
		$("#cipan").css('top', '120px');
	}),
	$(".del").click(function() {
		window.parent.document.getElementById("baoqilai1").style.display = "none";
		document.getElementById("xinjianshebei").style.display = "none";
		document.getElementById("chakanshebeixiangqing").style.display = "none";
		document.getElementById("baoqilai").style.display = "none";
		document.getElementById("xinjianshebeipeizhi").style.display = "none";
	}),
	$(".table6 tr").click(function() {
		window.parent.document.getElementById("baoqilai1").style.display = "block";
		document.getElementById("chakanshebeixiangqing").style.display = "block";
		document.getElementById("baoqilai").style.display = "block";
	})