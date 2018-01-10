;(function () {
	

	'use strict';

	// Placeholder 
	var placeholderFunction = function() {
		$('input, textarea').placeholder({ customClass: 'my-placeholder' });
	}
	
	// Placeholder 
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

	$(".btn-transfer").click(function(){
		$(".curtain").css("display","block");
		$(".comfirm-form").css("display","block");
	});

	$(".close-btn").click(function(){
		$(".curtain").css("display","none");
		$(".comfirm-form").css("display","none");
		$(".pay-form").css("display","none");
		$(".wallet-form").css("display","none");
	});

	$(".btn-comfirm").click(function(){
		$(".comfirm-form").css("display","none");
		$(".pay-form").css("display","block");
	});

	$(".curtain").click(function(){
		$(".curtain").css("display","none");
		$(".comfirm-form").css("display","none");
		$(".pay-form").css("display","none");
		$(".wallet-form").css("display","none");
	});

	$("#password_img").click(function(){
		if ($("#password").prop("type") == "password") {
			$("#password").prop('type', 'text');
			$("#password_img").prop('src', 'images/invisible.png');
		}else {
			$("#password").prop('type', 'password');
			$("#password_img").prop('src', 'images/visible.png');
		}
	});

	$("#wallet_add").click(function(){
		$("#curtain1").css("display","block");
		$(".wallet-form").css("display","block");
	});

	$("#wallet_qr").click(function(){
		$("#curtain1").css("display","block");
		$(".wallet-form").css("display","block");
	});


	// On load
	$(function(){
		placeholderFunction();
		contentWayPoint();
	});

}());