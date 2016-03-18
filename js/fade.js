$(document).ready(function() {
	$("#front").fadeOut(3000, function() {
		$("#title").animate({
			opacity: 1.0,
			top: "-=10%"
		}, 3000);
	});
});