var debug = true;

$(window).ready(function(){
	var showSubBar = function(prefix) {
		var hash = prefix;
		
		// Show old
		// if(!hash) hash = window.location.hash.substring(1) || 'home';
		
		var subBarId = $('a[href="#' + hash + '"]').attr("id") + "-sub";
		
		$(".active-sub").toggleClass("active-sub");
		$("#" + subBarId).toggleClass("active-sub");
		
		if($("#" + subBarId).children().length === 0) {
			$("#subbar").hide();
		} else {
			$("#subbar").show();
		}
	}
	
	var loadContent = function() {
		var hash = window.location.hash.substring(1) || 'home';
		var url = "content/" + hash + ".html";
		var subbarurl = "subbar/" + hash + ".html";
		var fadeTime = 1000;
		
		$(".active-sub-button").toggleClass("active-sub-button"); // In each case, clear active state from subbar button
		
		if(hash.indexOf('-') === -1) {
			// Temp: Change active nav button
			$(".active").toggleClass("active");
			$('a[href="#' + hash + '"]').toggleClass("active");
			
			// Update subbar
			showSubBar(hash);
		} else {
			// TODO: Check that active navbar button is correct
			var p = hash.split('-')[0];
			var jqn = $('a[href="#' + p + '"]');
			if(!(jqn.hasClass("active"))) {
				jqn.toggleClass("active");
				showSubBar(p);
			}
			
			// Subbar button clicked
			$('a[href="#' + hash + '"]').toggleClass("active-sub-button");
		}
		
		var ajaxLoad = function() {
			// Empty content
			$("#content").empty();
			
			// Load content using AJAX
			$.ajax({url: url, 
		        beforeSend: function(xhr) {
		          xhr.overrideMimeType("text/html; charset=UTF-8");
		        },
		        success: function(data, textStatus, jqXHR) {
		          $("#content").css("top", $("#navi").height());
		          $("#content").html(data);
		          $("#content").fadeIn(fadeTime);
		          animateOpacity("#footer", 1.0, fadeTime); // Having to make a separate call for footer due to problems with jquery multiple selector

		          // Debug print
		          if(debug) console.log("Data loaded from: " + url);
		        },
		        error: function(){
		        	loadErrorPage();
		        }});
		};

		var loadErrorPage = function() {
			// Load content using AJAX
			$.ajax({url: "content/error.html", 
		        beforeSend: function(xhr) {
		          xhr.overrideMimeType("text/html; charset=UTF-8");
		        },
		        success: function(data, textStatus, jqXHR) {
		          $("#content").html(data);
		          $("#content").fadeIn(fadeTime);
		          animateOpacity("#footer", 1.0, fadeTime); // Having to make a separate call for footer due to problems wiht jquery multiple selector

		        },
		        error: function(){
		        	console.log("Error loading error page."); // Lol
		        }});
		};
		
		// Fade-out animation, after completion call load function
		$("#content").fadeOut(fadeTime, ajaxLoad);
		animateOpacity("#footer", .0, fadeTime); // Having to make a separate call for footer due to problems wiht jquery multiple selector
	};

	var animateOpacity = function(id, target, time) {
		$(id).animate({
			opacity: target
		}, time);
	}

	var animate = function() {
		$("#page").show();
		animateOpacity("#page", 1.0, 2000);
	};

	var setEvents = function() {
		$("#search-area").click(function(){
			document.getElementById("search").focus();
		});
	}
	
	setEvents();
	animate();
	loadContent();
	
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
