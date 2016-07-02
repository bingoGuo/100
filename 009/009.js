$(document).ready(function() {
	checkWindowSize();
	function checkWindowSize() {
		var color = Math.round($(window).width()/10);
		var string = "#1a4f";
		if (color == 0) {
			color = string+"00";
		} else if (color < 16) {
			color = string+"0"+color.toString(16);
		} else if (color < 256) {
			color = string+color.toString(16);
		} else {
			color = string+"ff";
		}
		$("body").css({"background-color":color});
	}
	$(window).resize(checkWindowSize);
});