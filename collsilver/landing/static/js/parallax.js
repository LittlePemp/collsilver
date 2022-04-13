$(document).ready(function(){
	//Cash object of window
	$window = $(window);

	$('[data-type="background"]').each(function(){
		var $bgobj = $(this);  //Create object

		$(window).scroll(function(){
			var yPos = -($window.scrollTop() / $bgobj.data('speed'));

			var coords = '50%' + yPos + 'px'

			$bgobj.css({ backgroundPosition: coords});
		});
	});

});