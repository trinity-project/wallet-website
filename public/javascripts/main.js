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
	//Login开始
	$(".btn-login").click(function(){
		if($("#username").val()==null || $("#username").val()==""){
			alert("Username can't be empty.");
			return;
		}
		if($("#password").val()==null || $("#password").val()==""){
			alert("Password can't be empty.");
			return;
		}
		if($("#username").val()=="123456789"&&$("#password").val()=="123456"){
			window.location.href = "index.html"; 
		}else{
			alert("Incorrect username or password! Please try again.");
		}
	});
	//Login结束
	//Sign up开始
	$("#sign-up-agree").change(function() { 
		if($("#sign-up-agree").prop('checked')){
			$(".btn-sign-up").removeAttr("disabled");
		}else{
			$(".btn-sign-up").attr('disabled',"true");
		}
	});
	$(".btn-sign-up").click(function(){
		if($("#sign-up-name").val()==null || $("#sign-up-name").val()==""){
			alert("Username can't be empty.");
			return;
		}
		if($("#sign-up-password").val()==null || $("#sign-up-password").val()==""){
			alert("Password can't be empty.");
			return;
		}
		if($("#sign-up-repassword").val()==null || $("#sign-up-repassword").val()==""){
			alert("Repeat Password can't be empty.");
			return;
		}
		if($("#sign-up-password").val()!==$("#sign-up-repassword").val()){
			alert("The two passwords you typed do not match.");
			return;
		}
		$.ajax({  
		        type: "POST",  
		        url: "http://106.15.91.150:20552",
		        headers:{
		        	  'User-Agent': 'Super Agent/0.0.1',
     				  'Content-Type': 'application/json-rpc',
     				  Accept: 'application/json-rpc' 
     			}, 
		        data: JSON.stringify(GetJsonData()),  
		        dataType: "json",  
		        success: function (message) {  
		            if (message > 0) {  
		                alert("success");  
		            }  
		        },  
		        error: function (message) {  
		            alert("error"); 
		        }  
		});
		function GetJsonData() {  
		    var json = {
			  "jsonrpc": "2.0",
			  "method": "registeaddress",
			  "name": $("#sign-up-name").val(),  
			  "password": $("#sign-up-password").val(),  
			  "params": ["AY8r7uG6rH7MRLhABALZvf8jM4bCSfn3YJ"],
			  "id": 1
			};  
		    return json;
		}  
	});
	//Sign up结束
	//transfer开始
	$("#transfer-assets").focus(function(){
    	$(".assets-form").css("display","block");
  	});
	$(".icon-assets").click(function(){
		$(".assets-form").css("display","block");
	});
	$("#transfer-channel-name").focus(function(){
    	$(".channle-edit-form1").css("display","block");
  	});
	$(".icon-channel-name").click(function(){
		$(".channle-edit-form1").css("display","block");
	});
	$(".channle-edit-form1 .icon-left").click(function(){
		$(".channle-edit-form1").css("display","none");
	})
	// $(".btn-transfer").click(function(){
	// 	if($("#transfer-address").val()==null || $("#transfer-address").val()==""){
	// 		alert("Address can't be empty.");
	// 		return;
	// 	}
	// 	if($("#transfer-assets").val()==null || $("#transfer-assets").val()==""){
	// 		alert("Assets can't be empty.");
	// 		return;
	// 	}
	// 	if($("#transfer-amount").val()==null || $("#transfer-amount").val()==""){
	// 		alert("Amount can't be empty.");
	// 		return;
	// 	}
	// 	if($("#transfer-amount").val()>Number($("#total-amount").text())){
	// 		alert("The transfer amount should be less than the total amount.");
	// 		return;
	// 	}
	// 	$(".curtain").css("display","block");
	// 	$(".comfirm-form").css("display","block");
	// 	$("#comfirm-address").val($("#transfer-address").val());
	// 	$("#comfirm-amount").val($("#transfer-amount").val() + $("#amount-svg").text());
	// 	$("#dollar-amount").html($("#transfer-amount").val());
	// });
	//transfer结束
	//assets开始
	$("#close-assets").click(function(){
		$(".assets-form").css("display","none");
	})
	$("#NEO").click(function(){
		$(".assets-form").css("display","none");
		$("#transfer-assets").val('NEO');
		$("#amount-svg").text('NEO');
		$("#amount-svg").css("display","block");
	});
	$("#GAS").click(function(){
		$(".assets-form").css("display","none");
		$("#transfer-assets").val('GAS');
		$("#amount-svg").text('GAS');
		$("#amount-svg").css("display","block");
	});
	$("#trinity").click(function(){
		$(".assets-form").css("display","none");
		$("#transfer-assets").val('TNC');
		$("#amount-svg").text('TNC');
		$("#amount-svg").css("display","block");
	});
	//assets结束
	//Payment开始
	$("#comfirm-password").change(function(){
		if($("#comfirm-password").val()=="123456"){
			$.ajax({  
			        type: "POST",  
			        url: "http://106.15.91.150:20552", 
			        data: JSON.stringify(GetJsonData()),  
			        dataType: "json",  
			        success: function (message) {  
			            if (message > 0) {  
							$("#password-div").css("display","none");
							$("#success-div").css("display","block");  
			            }  
			        },  
			        error: function (message) {  
			            alert("error"); 
			        }  
			});
			function GetJsonData() {  
			    var json = {
					  "jsonrpc": "2.0",
					  "method": "sendertoreceiver",
					  "params": ["0xf4cc4154a4987f8784064468c3c6b21f0d0cdd64",$("#transfer-address").val(),$("#transfer-amount").val()],
					  "id": 1
				};  
			    return json;
			}  
		}else{
			alert("The password is incorrect.");
		}
	})
	//Payment结束
	//channle开始
	// $(".btn-channle").click(function(){
	// 	if($("#regist-channle-address").val()==null || $("#regist-channle-address").val()==""){
	// 		alert("Address can't be empty.");
	// 		return;
	// 	}
	// 	if($("#regist-channle-deposit").val()==null || $("#regist-channle-deposit").val()==""){
	// 		alert("Deposit can't be empty.");
	// 		return;
	// 	}
	// 	if($("#regist-channle-time").val()==null || $("#regist-channle-time").val()==""){
	// 		alert("Time Password can't be empty.");
	// 		return;
	// 	}
	// 	$.ajax({  
	// 	        type: "POST",  
	// 	        url: "http://106.15.91.150:20552", 
	// 	        data: JSON.stringify(GetJsonData()),  
	// 	        dataType: "json",  
	// 	        success: function (message) {  
	// 	            if (message > 0) {  
	// 	                alert("success");  
	// 	            }  
	// 	        },  
	// 	        error: function (message) {  
	// 	            alert("error"); 
	// 	        }  
	// 	});
	// 	function GetJsonData() {  
	// 	    var json = {
	// 			"jsonrpc": "2.0",
	// 		    "method": "registchannle",
	// 		    "params": ["0xf4cc4154a4987f8784064468c3c6b21f0d0cdd64",$("#regist-channle-address").val(),Number($("#regist-channle-deposit").val()),Number($("#regist-channle-time").val())], 
	// 		    "id": 1 
	// 		};  
	// 	    return json;
	// 	} 
	// });
	$("#Channle3").click(function(){
		$(".channle-edit-form1").css("display","none");
		$("#transfer-channel-name").val($("#channle-address-3").text());
	});
	$("#Channle2").click(function(){
		$(".channle-edit-form1").css("display","none");
		$("#transfer-channel-name").val($("#channle-address-2").text());
	});
		$("#Channle2").click(function(){
		$(".channle-edit-form1").css("display","none");
		$("#transfer-channel-name").val($("#channle-address-2").text());
	});
	$("#channle-edit").click(function(event){
		$(".channle-edit-form").css("display","block");
		event.stopPropagation();
	}).mousedown(function(e){
	  e.stopPropagation();
	})
	//channle结束
	//channle-edit开始
	$(".channle-edit-form .icon-left").click(function(){
		$(".channle-edit-form").css("display","none");
	})
	var a;
	$(".channle-i").click(function(){
			$.ajax({  
			        type: "POST",  
			        url: "http://106.15.91.150:20552", 
			        data: JSON.stringify(GetJsonData()),  
			        dataType: "json",  
			        success: function (message) {  
			            if (message > 0) {  
			            alert("success");  
			            }  
			        },  
			        error: function (message) {  
			            alert("error"); 
			        }  
			});
			function GetJsonData() {  
			    var json = {
			        "jsonrpc": "2.0",
				    "method": "getchannelstate",
				    "params": ["AY8r7uG6rH7MRLhABALZvf8jM4bCSfn3YJ"],
				    "id": 1
				};  
			    return json;
			} 

		// $(".channle-info-form").css("display","block");
		// $(".curtain").css("display","block");


		//  a = $(this).attr("id").split("-")[2];
		// $("#info-receiver-addr").text($("#channle-address-"+a).text());
		// $("#info-deposit").text($("#channle-deposit-"+a).text().split(":")[1]);
		// $("#info-state").text($("#channle-state-"+a).text().split(":")[1]);
		// if($("#info-state").text()=="OPEN"){
		// 	$(".btn-close-channle").removeAttr("disabled");
		// }else{
		// 	$(".btn-close-channle").attr('disabled',"true");
		// }
	});
	// $("#channle-i-3").click(function(){
	// 	$(".channle-edit-form").submit();
	// });
	//channle-edit结束
	//channle-info开始
	$(".btn-close-channle").click(function(){
//		if($("#info-state").text()=="OPEN"){
			$.ajax({  
			        type: "POST",  
			        url: "http://106.15.91.150:20552", 
			        data: JSON.stringify(GetJsonData()),  
			        dataType: "json",  
			        success: function (message) {  
			            if (message > 0) {  
							alert("Channel is closed now."); 
							$(".channle-info-form").css("display","none");
							$("#channle-state-"+a).text("State:CLOSED");
			            }  
			        },  
			        error: function (message) {  
			            alert(message.status); 
			        }  
			});
			function GetJsonData() {  
			    var json = {
					  "jsonrpc": "2.0",
					  "method": "sendertoreceiver",
					  "params": ["0xf4cc4154a4987f8784064468c3c6b21f0d0cdd64"],
					  "id": 1
				};  
			    return json;
			}
//		}
	})
	//channle-info结束
	//index开始
	$("#wallet_add").click(function(){
		$("#curtain1").css("display","block");
		$(".wallet-form").css("display","block");
	});

	$("#wallet_qr").click(function(){
		$("#curtain1").css("display","block");
		$(".wallet-form").css("display","block");
	});

	//index结束

	$(".close-btn").click(function(){
		$(".curtain").css("display","none");
		$(".comfirm-form").css("display","none");
		$(".pay-form").css("display","none");
		$(".wallet-form").css("display","none");
		$(".channle-info-form").css("display","none");
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
		$(".channle-info-form").css("display","none");
	});

	$("#password_img").click(function(){
		if ($("#comfirm-password").prop("type") == "password") {
			$("#comfirm-password").prop('type', 'text');
			$("#password_img").prop('src', 'images/invisible.png');
		}else {
			$("#comfirm-password").prop('type', 'password');
			$("#password_img").prop('src', 'images/visible.png');
		}
	});




	// On load
	$(function(){
		placeholderFunction();
		contentWayPoint();

		if($("#sign-up-agree").prop('checked')){
			$(".btn-sign-up").removeAttr("disabled");
		}else{
			$(".btn-sign-up").attr('disabled',"true");
		}

		if($("#transfer-assets").val()==""||$("#transfer-assets").val()==null){
			$("#amount-svg").css("display","none");
		}else{
			$("#amount-svg").css("display","block");
		}

	});

}());