$(window).ready(function() {
	// Animation of the title fade-in and fade-out
	$("#front").fadeOut(300, function() {
		$("#title").animate({
			opacity: 1.0,
			top: "-=10%"
		}, 3000, function() {
			$("#title").animate({
				opacity: .0,
				top: "-=10%"
			}, 3000);
		});
	});
});