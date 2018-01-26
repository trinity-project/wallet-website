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
	//index开始
	$("#wallet_add").click(function(){
		$(".curtain").css("display","block");
		$(".wallet-form").css("display","block");
	});
	$("#wallet_qr").click(function(){
		$(".curtain").css("display","block");
		$(".wallet-form").css("display","block");
	});
	$("#channel-btn").click(function(){
		$.ajax({    
	        url: "http://106.15.91.150:20552", 
	        type: "POST",
	        data: JSON.stringify({
			  "jsonrpc": "2.0",
			  "method": "getchannelstate",
			  "params": ["AZXy3tWPN86UZRYpSRH4EzanMy6vgQaLG3"],
			  "id": 1
			}),  
			contentType: 'application/json', 
	        success: function (message) {  
	            if (message.result) {  
					var j=0;
		            $.each(message.result,function (i,items) {
		                if(items.tx_info){
		                    j++;
		                }
		            });
	            }
	            var html="";
	            for(var i=0;i<j;i++){
	            	html +="<div id='Channel-"+i+"' class='Channel-box' onclick='infofun(event, this)'>";
	            	html +="<p id='channel-remark-"+i+"'>" + message.result[i].tx_info[1].address + "</p>";
	            	html +="<h5 id='channel-channelname-"+i+"' style='display: none;'>" + message.result[i].channel_name + "</h5>";
	            	html +="<h5 id='channel-address-"+i+"' style='display: none;'>" + message.result[i].tx_info[1].address + "</h5>";
	            	html +="<h5 id='channel-deposit-"+i+"'>Deposit:" + message.result[i].tx_info[0].deposit + "TNC</h5>";
	            	html +="<h5 id='channel-balance-"+i+"'>Balance:"+ message.result[i].tx_info[0].balance + "</h5>";
	            	html +="<h5 id='channel-time-"+i+"' style='display: none;'>"+ message.result[i].open_block + "</h5>";
	            	html +="<h5 id='channel-deposit1-"+i+"' style='display: none;'>Deposit:" + message.result[i].tx_info[1].deposit + "TNC</h5>";
	            	html +="<h5 id='channel-balance1-"+i+"' style='display: none;'>"+ message.result[i].tx_info[1].balance + "</h5>";
	            	html +="<h5 id='channel-state-"+i+"'>" + message.result[i].channel_state + "</h5>";
	            	html +="<hr style='margin: 10px 0;'>";
	            	html +="</div>";
	            }
	            $(".Channel-body").html(html);
	            window.infofun = function(event, obj) {
	            var b;
				$(".channel-info-form").css("display","block");
				$(".curtain").css("display","block");
				b = $(obj).attr("id").split("-")[1];//获取点击了第几个div	 
				$("#info-channel-name").text($("#channel-channelname-"+b).text());
				$("#info-receiver-addr").text($("#channel-address-"+b).text());
				$("#info-time").text($("#channel-time-"+b).text());
				$("#info-sender-deposit").text($("#channel-deposit-"+b).text().split(":")[1]);
				$("#info-sender-balance").text($("#channel-balance-"+b).text().split(":")[1]);
				$("#info-state").text($("#channel-state-"+b).text().split(".")[1]); 
		}
	        },  
	        error: function (message) {  
	            alert("error"); 
	        }  
		});
		$(".channel-edit-form").css("display","block");
	});
	$("#transfer-btn").click(function(){
		$(".transfer-form").css("display","block");
	});
	$("#setting-btn").click(function(){
		$(".setting-form").css("display","block");
		$(".curtain").css("display","block");
	});
	$("#wallet-close-btn").click(function(){
		$(".wallet-form").css("display","none");
		$(".curtain").css("display","none");
	});
	$("#setting-close-btn").click(function(){
		$(".setting-form").css("display","none");
		$(".setting-input").val("http://106.15.91.150:20552");
		$(".curtain").css("display","none");
	});
	$("#setting-reset").click(function(){
		$(".setting-input").val("http://106.15.91.150:20552");
	})
	$(".setting-save-btn").click(function(){
		$(".setting-form").css("display","none");
		alert("Save success!");
	})
	//index结束
	//channel-edit开始
	$(".channel-edit-form .icon-left").click(function(){
		$(".channel-edit-form").css("display","none");
	})
	$("#channel-regist").click(function(){
		$(".channel-form").css("display","block");
	});
	$(".btn-totransfer").click(function(){
		$(".transfer-form").css("display","block");
		$(".channel-info-form").css("display","none");
		$(".curtain").css("display","none");
		$("#transfer-channel-name").val($("#info-channel-name").text());
		$("#transfer-address").val($("#info-receiver-addr").text());
	});
	$("#channel-edit-close-btn").click(function(){
		$(".channel-edit-form").css("display","none");
	});
	//channel-edit结束
	//channel开始
	$("#regist-channel-assets").focus(function(){
    	$(".assets-form").css("display","block");
  	});
	$(".btn-channel").click(function(){
		if($("#regist-channel-address").val()==null || $("#regist-channel-address").val()==""){
			alert("Address can't be empty.");
			return;
		}
		if($("#regist-channel-deposit").val()==null || $("#regist-channel-deposit").val()==""){
			alert("Deposit can't be empty.");
			return;
		}
		if($("#regist-channel-time").val()==null || $("#regist-channel-time").val()==""){
			alert("Time Password can't be empty.");
			return;
		}
		$.ajax({   
		        url: "http://106.15.91.150:20552", 
		        type: "POST", 
		        data: JSON.stringify({
				  "jsonrpc": "2.0",
				  "method": "registchannle",
				  "params": ["AZXy3tWPN86UZRYpSRH4EzanMy6vgQaLG3",$("#regist-channel-address").val(),$("#regist-channel-assets").val(),$("#regist-channel-deposit").val(), $("#regist-channel-time").val()],
				  "id": 1
				}),  
				crossDomain:true,
		        contentType: 'application/json',  
		        success: function (message) {  
		                if(message.result.error){
		                	alert(message.result.error);
		                }else if(message.error){
		                	alert(message.error.message);
		                } 
		        		else {
		        			alert("Regist success! \r\nChannel name:" + message.result.channel_name);
		        			$("#Channel-3").css("display","block");
		        			if ($("#regist-channel-remark").val()!==""&&$("#regist-channel-remark").val()!==null){
		        				$("#channel-remark-3").text($("#regist-channel-remark").val());
		        			} else {
		        				$("#channel-remark-3").text($("#regist-channel-address").val());
		        			}
		        			$("#channel-address-3").text(message.result.channel_name);
		        			$("#channel-time-3").text($("#regist-channel-time").val()+"Block");
		        			$("#channel-deposit-3").text("Deposit:"+$("#regist-channel-deposit").val()+$("#regist-channel-assets").val()); 
		        			$("#channel-state-3").text("State:OPEN");
							$("#channel-form").css("display","none");
							$("#channel-edit-form").css("display","block");
		        			$.ajax({    
						        url: "http://106.15.91.150:20552", 
						        type: "POST",
						        data: JSON.stringify({
								  "jsonrpc": "2.0",
								  "method": "sendrawtransaction",
								  "params": ["AZXy3tWPN86UZRYpSRH4EzanMy6vgQaLG3",message.result.channel_name,"9wFwhkLmZ"],
								  "id": 1
								}),  
								contentType: 'application/json', 
						        success: function (message1) {  
						            if (message1 > 0) {  
										alert("1111"); 
						            }  
						        },  
						        error: function (message) {  
						            alert("error"); 
						        }  
							});
		        		}
		        },  
		        error: function (message) {  
		            alert("error"); 
		        }  
		});
	});
	$("#channel-edit").click(function(){
		$(".channel-edit-form").css("display","block");
	})
	$("#channel-close-btn").click(function(){
		$(".channel-form").css("display","none");
	});
	//channel结束
	//channel-info开始
	$(".btn-close-channel").click(function(){
		if($("#info-state").text()=="OPEN"){
			$.ajax({    
			        url: "http://106.15.91.150:20552", 
			        type: "POST",
			        data: JSON.stringify({
					  "jsonrpc": "2.0",
					  "method": "closechannel",
					  "params": ["AY8r7uG6rH7MRLhABALZvf8jM4bCSfn3YJ","AUvupHdCKhaSsfPpzo6f4He4c9wFwhkLmZ","3129844fc317d3f7d7cb7f30ac23b180"],
					  "id": 1
					}),  
					contentType: 'application/json', 
			        success: function (message) {  
			            if (message > 0) {  
							alert("Channel is closed now."); 
							$(".channel-info-form").css("display","none");
							$("#channel-state-"+a).text("State:CLOSED");
			            }  
			        },  
			        error: function (message) {  
			            alert("error"); 
			        }  
			});
		}
	})
	$("#info-close-btn").click(function(){
		$(".channel-info-form").css("display","none");
		$(".curtain").css("display","none");
	});
	//channel-info结束
	//add开始
	$("#add-deposit").click(function(){
		$(".channel-info-form").css("display","none");
		$(".add-form").css("display","block");
		$(".curtain").css("display","block");
	});
	$(".add-deposit-btn").click(function(){
		$(".pay-form").css("display","block");
	});
	$("#add-close-btn").click(function(){
		$(".add-form").css("display","none");
		$(".curtain").css("display","none");
	});
	//add结束
	//transfer开始
	$("#transfer-assets").focus(function(){
    	$(".assets-form").css("display","block");
  	});
	$(".icon-assets").click(function(){
		$(".assets-form").css("display","block");
	});
	$("#transfer-channel-name").focus(function(){
    	$(".channel-edit-form").css("display","block");
  	});
	$(".btn-transfer").click(function(){
		if($("#transfer-address").val()==null || $("#transfer-address").val()==""){
			alert("Address can't be empty.");
			return;
		}
		if($("#transfer-assets").val()==null || $("#transfer-assets").val()==""){
			alert("Assets can't be empty.");
			return;
		}
		if($("#transfer-amount").val()==null || $("#transfer-amount").val()==""){
			alert("Amount can't be empty.");
			return;
		}
		if($("#transfer-amount").val()>Number($("#total-amount").text())){
			alert("The transfer amount should be less than the total amount.");
			return;
		}
		$(".curtain").css("display","block");
		$(".comfirm-form").css("display","block");
		$("#comfirm-address").val($("#transfer-address").val());
		$("#comfirm-amount").val($("#transfer-amount").val() + $("#amount-svg").text());
	});
	$("#transfer-close-btn").click(function(){
		$(".transfer-form").css("display","none");
	});	
	//transfer结束
	//assets开始
	$("#close-assets").click(function(){
		$(".assets-form").css("display","none");
	})
	$("#NEO").click(function(){
		$(".assets-form").css("display","none");
		$("#regist-channel-assets").val('NEO');
		$("#transfer-assets").val('NEO');
		$("#amount-svg").text('NEO');
		$("#amount-svg").css("display","block");
	});
	$("#GAS").click(function(){
		$(".assets-form").css("display","none");
		$("#regist-channel-assets").val('GAS');
		$("#transfer-assets").val('GAS');
		$("#amount-svg").text('GAS');
		$("#amount-svg").css("display","block");
	});
	$("#trinity").click(function(){
		$(".assets-form").css("display","none");
		$("#regist-channel-assets").val('TNC');
		$("#transfer-assets").val('TNC');
		$("#amount-svg").text('TNC');
		$("#amount-svg").css("display","block");
	});
	//assets结束
	//comfirm开始
	$("#comfirm-close-btn").click(function(){
		$(".comfirm-form").css("display","none");
		$(".curtain").css("display","none");
	});	
	$(".btn-comfirm").click(function(){
		$(".comfirm-form").css("display","none");
		$(".pay-form").css("display","block");
	});	
	//comfirm结束
	//Payment开始
	$("#password_img").click(function(){
		if ($("#comfirm-password").prop("type") == "password") {
			$("#comfirm-password").prop('type', 'text');
			$("#password_img").prop('src', 'images/invisible.png');
		}else {
			$("#comfirm-password").prop('type', 'password');
			$("#password_img").prop('src', 'images/visible.png');
		}
	});
	$("#pay-close-btn").click(function(){
		$(".pay-form").css("display","none");
		$(".curtain").css("display","none");
	});	
	$("#comfirm-password").change(function(){
		if($("#comfirm-password").val()=="123456"){
			$.ajax({    
			        url: "http://106.15.91.150:20552", 
			        type: "POST",
			        data: JSON.stringify({
					  "jsonrpc": "2.0",
					  "method": "sendertoreceiver",
					  "params": ["AZXy3tWPN86UZRYpSRH4EzanMy6vgQaLG3",$("#transfer-address").val(),$("#transfer-channel-name").val(),$("#transfer-assets").val(),$("#transfer-amount").val()],
					  "id": 1
					}),  
					contentType: 'application/json', 
			        success: function (message) {  
			            if (message.result=="SUCCESS") {   
							$("#password-div").css("display","none");
							$("#success-div").css("display","block");  
			            }else{
			            	alert("error"); 
			            }  
			        },  
			        error: function (message) {  
			            alert("error"); 
			        }  
			});
		}else{
			alert("The password is incorrect.");
		}
	})
	//Payment结束

	$(".curtain").click(function(){
		$(".curtain").css("display","none");
		$(".comfirm-form").css("display","none");
		$(".pay-form").css("display","none");
		$(".wallet-form").css("display","none");
		$(".channel-info-form").css("display","none");
		$(".setting-form").css("display","none");
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

		var infofun = function() {
			var a;
				alert("1");
				// $(".channel-info-form").css("display","block");
				// $(".curtain").css("display","block");
				//  a = $(this).attr("id").split("-")[1];
				// $("#info-remark").text($("#channel-remark-"+a).text());		 
				// $("#info-channel-name").text($("#channel-channelname-"+a).text());
				// $("#info-receiver-addr").text($("#channel-address-"+a).text());
				// $("#info-deposit").text($("#channel-deposit-"+a).text().split(":")[1]);
				// $("#info-time").text($("#channel-time-"+a).text());
				// $("#info-state").text($("#channel-state-"+a).text().split(":")[1]);
				// if($("#info-state").text()=="OPEN"){
				// 	$(".btn-close-channel").removeAttr("disabled");
				// }else{
				// 	$(".btn-close-channel").attr('disabled',"true");
				// }
		}
	});

}());