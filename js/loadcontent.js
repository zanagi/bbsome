var htmlData = [];
var debug = true;

var loadContent = function() {
	var hash = window.location.hash.substring(1) || 'home';
	var url = "content/" + hash + ".html";
	
	var ajaxLoad = function() {
		// Empty content 
		$("#text-content").empty();
		
		// Load content using AJAX
		$.ajax({url: url, 
	        beforeSend: function(xhr) {
	          xhr.overrideMimeType("text/html; charset=UTF-8");
	        },
	        success: function(data, textStatus, jqXHR) {
	          $("#text-content").html(data);
	          $("#text-content").fadeIn(1000);
	          
	          // Debug print
	          if(debug) console.log("Data loaded from: " + url);
	        }, 
	        complete: function() {
	          // TODO: Some load indicator?
	        }});
	};
	
	// Fade-out animation, after completion call load function
	$("#text-content").fadeOut(1000, ajaxLoad);
};

var animate = function() {
	$("#front").fadeOut(3000, function() {
		// Title fade-in
		$("#title").animate({
			opacity: 1.0,
			top: "-=10%"
		}, 1500, function() {
			// Title fade-out
			$("#title").animate({
				opacity: .0,
				top: "-=10%"
			}, 1500, function(){
				// Content fade-in
				$("#content").show();
				$("#content").animate({
					opacity: 1.0,
				}, 2000);
			});
		});
	});
};

var setTabListener = function() {
	var showTabText = function(id) {
		$(".active-tab-text").toggleClass("active-tab-text");
		$("#" + id).toggleClass("active-tab-text");
	};
	
	$("body").on("click", ".tab", function(){
		$(".active-tab").toggleClass("active-tab");
		$(this).toggleClass("active-tab");
		var id = $(this).attr("id");
		var textId = id + "-text";
		showTabText(textId);
	});
};

$(window).ready(function(){
	animate();
	loadContent();
	setTabListener();
	
	if (!('onhashchange' in window)) {
		// Save old URL.
		var oldHref = location.href;

		// Set a timer (interval) for updating content, if event 'hashchange' does not exist
		setInterval(function() {
		  var newHref = location.href;
		  if (oldHref !== newHref) {
			// Update URL and load content.
		    oldHref = newHref;
		    loadContent();
		  }
		}, 100);
	    
	    // Debug print
		if(debug) console.log('No "onhashchange" event. Using timer for updating content.');
	} else {
	    $(window).on('hashchange', function() {
	    	loadContent();
	    });
	}
});
