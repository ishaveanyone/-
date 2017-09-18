$("tr").click(function() {

		window.parent.document.getElementById("baoqilai1").style.display = "block";
		document.getElementById("chakanshebeixiangqing").style.display = "block";
		document.getElementById("baoqilai").style.display = "block";

	}),
	$(".del").click(function() {
		window.parent.document.getElementById("baoqilai1").style.display = "none";
		document.getElementById("chakanshebeixiangqing").style.display = "none";
		document.getElementById("baoqilai").style.display = "none";
	})