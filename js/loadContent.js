var loadContent = function() {
	var hash = window.location.hash.substring(1) || '/about';
	var url = "content/" + hash + ".html";
	
	// Empty content
	$("#content").empty();
	
	// Load content using AJAX
	$.ajax({url: url, 
        beforeSend: function(xhr) {
          xhr.overrideMimeType("text/html; charset=UTF-8");
        },
        success: function(data, textStatus, jqXHR) {
          $("#content").html(data);
        }, 
        complete: function() {
          // TODO: Upon completion hide loading marker
        }});
};

$(window).ready(function(){
	// Set a timer (interval) for updating content, if event 'hashchange' does not exist
	if (!('onhashchange' in window)) {
		// Save old URL.
		var oldHref = location.href;
		setInterval(function() {
		  var newHref = location.href;
		  if (oldHref !== newHref) {
			// Update URL and load content.
		    oldHref = newHref;
		    loadContent();
		  }
		}, 100);
	    
	    // Debug print
	    console.log('No "onhashchange" event. Using timer for updating content.');
	} else {
	    $(window).on('hashchange', function() {
	    	loadContent();
	    });
	}
});
