'use strict';

$(window).scroll(function() {
	if ($(this).scrollTop() > 1){  
		$('header').addClass('sticky');
	}
	else{
		$('header').removeClass('sticky');
	}

	if($(window).scrollTop()<550){
		$('#btn-up').fadeOut();
	}
	else{
		$('#btn-up').fadeIn();
	}

	if($(window).scrollTop()<550){
		$('#nav2').fadeOut();
	}
	else{
		$('#nav2').fadeIn();
	}
});
