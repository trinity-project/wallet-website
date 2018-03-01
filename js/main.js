// Placeholder 
var placeholderFunction = function() {
  $('input, textarea').placeholder({ customClass: 'my-placeholder' });
}

// Placeholder 
var contentWayPoint = function() {
  var i = 0;
  $('.animate-box').waypoint(function(direction) {
    if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
      i++;
      $(this.element).addClass('item-animate');
      setTimeout(function() {
        $('body .animate-box.item-animate').each(function(k) {
          var el = $(this);
          setTimeout(function() {
            var effect = el.data('animate-effect');
            if (effect === 'fadeIn') {
              el.addClass('fadeIn animated-fast');
            } else if (effect === 'fadeInLeft') {
              el.addClass('fadeInLeft animated-fast');
            } else if (effect === 'fadeInRight') {
              el.addClass('fadeInRight animated-fast');
            } else {
              el.addClass('fadeInUp animated-fast');
            }
            el.removeClass('item-animate');
          }, k * 200, 'easeInOutExpo');
        });

      }, 100);
    }
  }, { offset: '85%' });
};
//全局变量申明
var addr;
var privateKey;
var pubkey;
var txRawDataTest;
var TrinityTestNet = "http://47.254.39.10:20552";
//nav start
$(".navbar-nav").find("li").click(function() {
    $(this).siblings().removeAttr("class");
    $(this).attr("class", "active");
});
var hideall = function(){
  $(".index-form").hide();
  $(".assets-form").hide();
  $(".txonchain-form").hide();
  $(".channel-edit-form").hide();
  $(".channel-form").hide();
  $(".transfer-form").hide();
  $(".record-form").hide();
  $(".setting-form").hide();
}
$("#nav-btn-index").click(function() {
  hideall();
  $(".index-form").show();
});
$("#nav-btn-assets").click(function() {
  hideall();
  assetsfun(privateKey);
  getbalanceonchain();
  $(".assets-form").show();
 });
$("#nav-btn-transfer").click(function() {
  hideall();
  $("#txonchain-address").val("");
  $("#txonchain-amount").val("");
  $(".txonchain-form").show();
 });
$("#nav-btn-channel").click(function() {
  hideall();
  getchannelstate();
  $(".channel-edit-form").show();
});
$("#nav-btn-record").click(function() {
  hideall();
  $(".record-form").show();
});
$("#nav-btn-setting").click(function() {
  hideall();
  $(".setting-form").show();
});
$("#nav-logo").click(function() {
  getchannelstate();
})
//nav end
//index start
var addressfun = function(a){
  privateKey = a; //私钥
  //console.log('privateKey:'+privateKey);
  pubkey = getPublicKey(privateKey,0); //公钥
  //console.log('pubkey:'+ab2hexstring(pubkey));
  var pubKeyEncoded =getPublicKeyEncoded(ab2hexstring(pubkey));
  //console.log('pubKeyEncoded:'+pubKeyEncoded);
  var pubKeySignatureScript =createSignatureScript(pubKeyEncoded);
  //console.log('pubKeySignatureScript:'+pubKeySignatureScript);
  var pubKeyHash = getHash(pubKeySignatureScript);
  //console.log('pubKeyHash:'+pubKeyHash);
  addr = ToAddress(pubKeyHash); //钱包地址
  //console.log('addr:'+addr);
}
$("#signup-a").click(function(){
  $("#curtain").show();
  $(".sign-up-box").show();
});
$("#index-details-btn").click(function(){
  hideall();
  assetsfun(privateKey);
  getbalanceonchain();
  $(".assets-form").show();
});
$("#wallet_qr").click(function(){
  swal({
    title: "Wallet Address",
    text: $("#wallet_add").html(),
    imageUrl: "http://qr.liantu.com/api.php?text="+addr,
    imageSize:  "200x200",
    confirmButtonText:"Close",
    allowOutsideClick:"ture"
  });
});
$(".record-channel-a").click(function(){
  $("#onchannel-record-table").slideDown("slow");
  $("#onchian-record-table").hide();
});
$(".record-chain-a").click(function(){
  $("#onchian-record-table").slideDown("slow");
  $("#onchannel-record-table").hide();
});
var getbalanceonchain = function(){
    $.ajax({
    url: "http://47.88.35.235:21332",
    type: "POST",
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "getBalance",
      "params": [$("#wallet_add").text()],
      "id": 1
    }),
    contentType: 'application/json',
    success: function(message) {
      $(".total-balance").text(message.result.tncBalance + "TNC");
      $("#assets-neobalance").text(message.result.neoBalance);
      $("#assets-tncbalance").text(message.result.tncBalance);
      $("#assets-gasbalance").text(message.result.gasBalance);
    },
    error: function(message) {
    }
  });
}
//index end
//sign up start
$(".btn-sign-up").click(function(){
  if (!$("#sign-up-password").val()) {
    $("#sign-up-danger").text("Password can't be empty.");
    $("#sign-up-danger").slideDown("slow");
    return;
  }
  if ($("#sign-up-password").val().length < 8) {
    $("#sign-up-danger").text("Password at least 8 characters.");
    $("#sign-up-danger").slideDown("slow");
    return;
  } 
  if ($("#sign-up-repassword").val()!==$("#sign-up-password").val()) {
    $("#sign-up-danger").text("Password and Repeat Password inconsistent.");
    $("#sign-up-danger").slideDown("slow");
    return;
  }
  privateKey = ab2hexstring(generatePrivateKey()); //随机生成私钥
  $(".sign-up-box").hide();
  $("#curtain").hide(); 
  swal({ 
    title: "Create success", 
    text: "<div style='word-break:break-all;font-size:20px'>This is your Private Key, Please keep it safe.<br><br><div class='alert alert-info' role='alert'>" + privateKey + "</div></div>", 
    type: "success",
    confirmButtonColor: "#FC6686",
    confirmButtonText: "Import", 
    closeOnConfirm: false, 
    html: true   
  },function(isConfirm){ 
  if (isConfirm) {
  loginfun();
} 
});
});
$(".btn-sign-up-cancel").click(function(){
  $("#curtain").hide();
  $(".sign-up-box .form-group").show();
  $(".sign-up-box .form-group1 .btn-sign-up").show();
  $("#sign-up-password").val("");
  $("#sign-up-repassword").val("");
  $(".sign-up-box").hide();
  $("#sign-up-danger").hide();
  $("#sign-up-success").hide();
  loginfun();
});
//sign up end
//login start
var loginfun = function(){
    swal({ 
    title: "Import your wallet", 
    text: "From Private Key", 
    type: "input",
    showCancelButton: true, 
    confirmButtonColor: "#FC6686",
    confirmButtonText: "Import",
    cancelButtonColor: "#d9edf7",  
    cancelButtonText: "Create",
    closeOnConfirm: false, 
    closeOnCancel: false  
  },
  function(inputValue){ 
    if (inputValue === false){
      swal({ 
        title: "Import your wallet", 
        text: "From Private Key", 
        type: "input",
        showCancelButton: true, 
        confirmButtonColor: "#FC6686",
        confirmButtonText: "Import",
        cancelButtonColor: "#d9edf7", 
        cancelButtonText: "Create",
        closeOnConfirm: false, 
        closeOnCancel: false,
        timer:1   
      })
      $("#curtain").show();
      $(".sign-up-box").show();
      return false;
    }
    if (inputValue === "") { 
      swal.showInputError("Private Key can't be empty!");
      return false
    } 
    if (inputValue.length !== 64) { 
      swal.showInputError("PrivateKey length check failed.");
      return false
    } 
    setTimeout(function(){ 
      swal({ 
        title: "Success!", 
        timer: 1000, 
        type: "success",
        cancelButtonText: "Close"
      });
      $("nav").css("filter","blur(0px)");
      $(".index-form").css("filter","blur(0px)");
      addressfun(inputValue); 
      $("#wallet_add,#wallet-address").html(addr);
      $("#wallet_qr").attr('src','http://qr.liantu.com/api.php?text='+addr);
      getbalanceonchain();
      registeaddress();
      getchannelstate();
    }, 1);
  });
};
var registeaddress = function(){
  $.ajax({
    url: TrinityTestNet,
    type: "POST",
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "registeaddress",
      "params": [addr,"",ab2hexstring(pubkey)],
      "id": 1
    }),
    contentType: 'application/json',
    success: function(message) {
    },
    error: function(message) {
    }
  });
}
//login end
//channel-edit start
$("#channel-regist").click(function() {
   transFace('.channel-form');
   $("#regist-channel-address").val("");
   $("#regist-channel-deposit").val("");
   $("#regist-channel-time").val(""); 
 });
var getchannelstate = function(){
  $.ajax({
    url: TrinityTestNet,
    type: "POST",
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "getchannelstate",
      "params": [$("#wallet_add").html()],
      "id": 1
    }),
    contentType: 'application/json',
    success: function(message) {
      if(message.result.type == "transaction"){
      $('#channels').html('');
      $('#channels-index').html('');
      if (message.result) {
        message.result.forEach((item) => {
          if (item.tx_info) {
            var aa = item.channel_state.split('.');
            $(`<tr><td>${item.tx_info[1].address}</td><td>${item.tx_info[0].deposit}TNC</td><td>${item.tx_info[0].balance}TNC</td><td>OPEN</td><td style="color: #FF95AE;cursor: pointer;">Details ></td></tr>`)
              .appendTo('#channels-index').click(() => {
                transFace('.channel-info-form');  
                $("#info-channel-name").text(item.channel_name);
                $("#info-sender-addr").text(item.tx_info[0].address);
                $("#info-receiver-addr").text(item.tx_info[1].address);
                $("#info-contract-addr").text(item.tx_info[0].address);
                $("#info-time").text(item.open_block);
                $("#info-sender-deposit").text(item.tx_info[0].deposit);
                $("#info-sender-balance").text(item.tx_info[0].balance);
                $("#info-state").text(aa[1]);
              });
          }
          $("#channels-mes").hide();
        });
        message.result.forEach((item) => {
          // if (item.tx_info && item.channel_state === 'State.OPEN') {
          if (item.tx_info) {
            var aa = item.channel_state.split('.');
            $(`<div class='channel-edit-box' style='position: relative;cursor: pointer;'><h2>${item.tx_info[1].address}</h2><h4>Deposit:${item.tx_info[0].deposit}</h4><h4>Balance: ${item.tx_info[0].balance}</h4><h4>State: ${aa[1]}</h4></div>`)
              .appendTo('#channels').click(() => {
                transFace('.channel-info-form');
                $("#info-channel-name").text(item.channel_name);
                $("#info-sender-addr").text(item.tx_info[0].address);
                $("#info-receiver-addr").text(item.tx_info[1].address);
                $("#info-contract-addr").text(item.tx_info[0].address);
                $("#info-time").text(item.open_block);
                $("#info-sender-deposit").text(item.tx_info[0].deposit);
                $("#info-sender-balance").text(item.tx_info[0].balance);
                $("#info-state").text(aa[1]);
              });
          }
        });
      }
      return;
      }
      if(message.result.type == "signature"){
        txRawDataTest = message.result.message.raw_tx;
        var pubKeyEncoded =getPublicKeyEncoded(ab2hexstring(pubkey));
        var signre = signatureData( txRawDataTest, privateKey);
        $.ajax({
          url: TrinityTestNet,
          type: "POST",
          data: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "settlerawtx",
            "params": [message.result.message.channel_name, txRawDataTest, signre],
            "id": 1
          }),
          contentType: 'application/json',
          success: function(message) {
            //if (message.error) {
              //swal("error!", message.error.message,"error");
            //} else 
            if(message.result =="fail"){
              swal("fail!", message.result,"error");
            } else {
              swal("Transfer success!", "","success");
            }
          },
          error: function(message) {
            alert("error");
          }
        });
      }
    },
    error: function(message) {
    }
  });
}
//channel-edit end

//channel start
$(".btn-channel").click(function() {
  if($("#regist-channel-address").val().length != 34){
    swal({ 
      title: "Address length check failed.", 
      type: "error", 
      showCancelButton: false
    });
    return;
  }
  if (!$("#regist-channel-deposit").val()) {
    swal({ 
      title: "Deposit can't be empty.", 
      type: "error", 
      showCancelButton: false
    });
    return;
  }
  if ($("#regist-channel-deposit").val() > Number($(".total-balance").text())) {
    swal.showInputError("Deposit amount should be less than the balance on chain.");
    return;
  } 
  // if (!$("#regist-channel-time").val()) {
  //   alert("Time can't be empty.");
  //   return;
  // }
  swal({ 
      title: "Add Channel", 
      text: "You will add a new channel. <br />Receiver address : " + $("#regist-channel-address").val() + "<br>Deposit : " + $("#regist-channel-deposit").val() + $("#regist-channel-assets").val(), 
      type: "info",
      type: "info", 
      showCancelButton: true, 
      closeOnConfirm: false, 
      showLoaderOnConfirm: true, 
      html:true  
    },function(isConfirm){ 
    if (isConfirm) {
    $.ajax({
    url: TrinityTestNet,
    type: "POST",
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "registchannel",
      "params": [$("#wallet_add").html(), $("#regist-channel-address").val(), $("#regist-channel-assets").val(), $("#regist-channel-deposit").val(), "1"],
      "id": 1
    }),
    contentType: 'application/json',
    success: function(message) {
      if (message.result.error) {
        swal("error!", message.result.error,"error");
        return;
      }
      if(message.result.channel_name == null){
        swal("error!", message.result.trad_info,"error");
        return;
      }
        txRawDataTest = message.result.trad_info;
        var pubKeyEncoded =getPublicKeyEncoded(ab2hexstring(pubkey));
        var signre = signatureData( txRawDataTest, privateKey);
        $.ajax({
          url: TrinityTestNet,
          type: "POST",
          data: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "sendrawtransaction",
            "params": [message.result.trad_info, signre, pubKeyEncoded],
            "id": 1
          }),
          contentType: 'application/json',
          success: function(message) {
            //if (message.error) {
              //swal("error!", message.error.message,"error");
            //} else 
            if(message.result =="fail"){
              swal("fail!", message.result,"error");
            } else {
              swal("Transfer success!", "","success");
            }
          },
          error: function(message) {
            alert("error");
          }
        });

    },
    error: function(message) {
      alert("error");
    }
  });
  } 
  });
});
//channel end
//channel-info start
$("#btn_closechannel").click(function() {
  if ($("#info-state").text() == "OPEN") {
      $(".channel-info-form").hide();
      $(".curtain").hide();
      swal({ 
        title: "Comfirm close channel?", 
        type: "info", 
        showCancelButton: true, 
        closeOnConfirm: false, 
        showLoaderOnConfirm: true, 
      },
      function(){ 
          $.ajax({
          url: TrinityTestNet,
          type: "POST",
          data: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "closechannel",
            "params": [$("#wallet_add").html(), $("#info-receiver-addr").text(), $("#info-channel-name").text()],
            "id": 1
          }),
          contentType: 'application/json',
          success: function(message) {
            if (message.result) {
              sweetAlert("Channel is in SETTLING state.", "","success");
              $(".channel-info-form").hide();
              $(".curtain").hide();
            }else{
              sweetAlert("something error", "","error");
            }
          },
          error: function(message) {
            sweetAlert("something error", "","error");
          }
        });
        });
  } else {
    sweetAlert("Channel not in OPEN state.", "","error");
  }
})
$(".btn-totransfer").click(function() {
  if ($("#info-state").text() == "OPEN") {
  transFace('.transfer-form');
  $("#transfer-channel-name").val($("#info-channel-name").text());
  $("#transfer-address").val($("#info-receiver-addr").text());
  $("#transfer-amount").val("");
  $("#channel-balance").text($("#info-sender-balance").text());
  } else {
    sweetAlert("Channel not in OPEN state.", "","error");
  }
});
//channel-info end
//add start
$("#add-deposit").click(function(){
  if ($("#info-state").text() == "OPEN") {
    transFace('.add-form');
    $(".channel-info-form").hide();
    $(".add-input").val("");
  }else{
    sweetAlert("Channel not in OPEN state.", "","error");
  }
});
$(".add-deposit-btn").click(function() {
  if ($(".add-input").val()) {
      if ($(".add-input").val() > Number($(".total-balance").text())) {
        swal.showInputError("Deposit amount should be less than the balance on chain.");
        return;
      } else {
      // $(".deposit-pay-form").show();
      $(".add-form").hide();
      $(".curtain").hide();
      swal({ 
          title: "Add deposit", 
          text: "Add " + $(".add-input").val() + "TNC as deposit", 
          type: "info",
          confirmButtonColor: "#FC6686",
          confirmButtonText: "Comfirm", 
          closeOnConfirm: false, 
          html: true   
        },function(isConfirm){ 
        if (isConfirm) {
        updatedeposit();
      } 
      });
      //$("#deposit-comfirm-info").text("Add " + $(".add-input").val() + "TNC as deposit");
    }
  } else {
    sweetAlert("Deposit can't be empty.", "","error");
  }
});
$("#add-close-btn").click(function() {
    $(".add-form").hide();
    $(".curtain").hide();
})
//add end
//add-comfirm start
$("#deposit-pay-close-btn").click(function() {
    $(".deposit-pay-form").hide();
    $(".curtain").hide();
})
var updatedeposit = function(){
  $.ajax({
    url: TrinityTestNet,
    type: "POST",
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "updatedeposit",
      "params": [$("#wallet_add").text(),$("#info-channel-name").text(),"TNC",$(".add-input").val()],
      "id": 1
    }),
    contentType: 'application/json',
    success: function(message) {
      if (message.result && message.result.error) {
        sweetAlert(message.result.error, "","error");
      } else if (message.error) {
        sweetAlert(message.error.message, "","error");
      } else {
        txRawDataTest = message.result.trad_info;
        var pubKeyEncoded =getPublicKeyEncoded(ab2hexstring(pubkey));
        var signre = signatureData( txRawDataTest, privateKey);
          $.ajax({
            url: TrinityTestNet,
            type: "POST",
            data: JSON.stringify({
              "jsonrpc": "2.0",
              "method": "sendrawtransaction",
              "params": [message.result.trad_info, signre, pubKeyEncoded],
              "id": 1
            }),
            contentType: 'application/json',
            success: function(message) {
              //if (message.error) {
                //swal("error!", message.error.message,"error");
              //} else 
              if(message.result =="fail"){
                swal("fail!", message.result,"error");
              } else {
                swal("Transfer success!", "","success");
              }
            },
            error: function(message) {
              alert("error");
            }
          });
      }
    },
    error: function(message) {
      alert("error");
    }
  });
}
//add-comfirm end
//transfer start
$(".btn-transfer").click(function() {
  if (!$("#transfer-address").val()) {
    alert("Address can't be empty.");
    return;
  }
  if (!$("#transfer-assets").val()) {
    alert("Assets can't be empty.");
    return;
  }
  if (!$("#transfer-amount").val()) {
    alert("Amount can't be empty.");
    return;
  }
  if ($("#transfer-amount").val() > Number($(".total-balance").text())) {
    alert("The transfer amount should be less than the balance amount.");
    return;
  }
  transFace('.pay-form');
  // $(".curtain").show();
  // $(".pay-form").show();
  $("#comfirm-info").html("transfer " + $("#transfer-amount").val() + $("#amount-svg").text() + " to<br/>" + $("#transfer-address").val());
});
//transfer end
//transfer on chain start
$(".btn-txonchain").click(function() {
  if($("#txonchain-address").val().length != 34){
    swal({ 
      title: "Address length check failed.", 
      type: "error", 
      showCancelButton: false
    });
    return;
  }
  if (!$("#txonchain-assets").val()) {
    swal({ 
      title: "Assets can't be empty.", 
      type: "error", 
      showCancelButton: false
    });
    return;
  }
  if (!$("#txonchain-amount").val()) {
    swal({ 
      title: "Amount can't be empty.", 
      type: "error", 
      showCancelButton: false
    });
    return;
  }
  if ($("#txonchain-amount").val() > Number($(".total-balance").text())) {
    swal({ 
      title: "The transfer amount should be less than the balance amount.", 
      type: "error", 
      showCancelButton: false
    });
    return;
  }
  swal({ 
    title: "Payment", 
    text: "transfer " + $("#txonchain-amount").val()  + "TNC to<br/>" + $("#txonchain-address").val(), 
    type: "info", 
    showCancelButton: true, 
    closeOnConfirm: false, 
    showLoaderOnConfirm: true, 
    html:true
  },
  function(){ 
    $.ajax({
      url: TrinityTestNet,
      type: "POST",
      data: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "txonchain",
        "params": [$("#wallet_add").text(),$("#txonchain-address").val(),"TNC",$("#txonchain-amount").val()],
        "id": 1
      }),
      contentType: 'application/json',
      success: function(message) {
        if (message.result && message.result.error) {
          swal(message.result.error, "","error");
        } else if (message.error) {
          swal(message.error.message, "","error");
        } else {
          swal("Transfer success!", "","success");
        }
      },
      error: function(message) {
        alert("error");
      }
    });
  });
});
//transfer on chain end
//assets start
var assetsfun = function(a){
  $("#assets-private-key").text(a);

  pubkey = getPublicKey(privateKey,0); //公钥
  $("#assets-public-key").text(ab2hexstring(pubkey));

  var pubKeyEncoded =getPublicKeyEncoded(ab2hexstring(pubkey));
  var pubKeySignatureScript =createSignatureScript(pubKeyEncoded);
  var pubKeyHash = getHash(pubKeySignatureScript);
  $("#assets-script-hash").text(pubKeyHash);

  addr = ToAddress(pubKeyHash); //钱包地址
  $("#assets-address").text(addr);
}
$("#private-key-show").click(function() {
  if($("#private-key-show").text()=="Show"){
    $("#private-key-show").text("Hide");
  } else {
  $("#private-key-show").text("Show");
  }
  $("#assets-private-key").slideToggle("slow");
});
//assets end
//Payment start
$('.btn-pay').click(function() {  
  if ($("#comfirm-password").val() == "123456") {
    $.ajax({
      url: TrinityTestNet,
      type: "POST",
      data: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "sendertoreceiver",
        "params": [$("#wallet_add").text(), $("#transfer-address").val(), $("#transfer-channel-name").val(), $("#transfer-assets").val(), $("#transfer-amount").val()],
        "id": 1
      }),
      contentType: 'application/json',
      success: function(message) {
        if (message.result == "SUCCESS") {
          alert("Transfer success!");
          transFace('.channel-edit-form', true);
          $("#channel-btn").trigger('click');//refresh channel list
          // $(".password-div").hide();
          // $(".success-div").show();
        } else {
          alert("error");
        }
      },
      error: function(message) {
        alert("error");
      }
    });
    $("#comfirm-password").val("");
  } else {
    alert("The password is incorrect.");
  }
  return false;
})
//Payment end
//setting start
$("#setting-btn3").click(function(){
  $("#setting-gateway").fadeToggle();
});
$(".setting-save-btn").click(function(){
  $("#setting-gateway").fadeOut();
});
$("#setting-reset").click(function() {
  $(".setting-input").val("https://test.trinity.tech");
})
$("#setting-btn4").click(function(){
  window.location.reload();
});
//setting end

// $(".curtain").click(function() {
//   $(".curtain").hide();
//   // transFace(FACE_BACK);
// });

// On load
$(function() {
  placeholderFunction();
  contentWayPoint();
  loginfun();

  if ($("#transfer-assets").val() == "" || $("#transfer-assets").val() == null) {
    $("#amount-svg").hide();
  } else {
    $("#amount-svg").show();
  }
  if ($("#txonchain-assets").val() == "" || $("#txonchain-assets").val() == null) {
    $("#amount-svg1").hide();
  } else {
    $("#amount-svg1").show();
  }

// setInterval(function(){  
// },2000);
});
/* common function*/
// 显隐密码
let hideShowPsw = (domId, imgId) => {
  let toType = $('#' + domId).attr('type') === 'text' ? 'password' : 'text';
  $('#' + domId).attr('type', toType);
  $('#' + imgId).attr('src', toType  === 'text' ? 'images/invisible.png' : 'images/visible.png');
}

// 自定转换 html: face-button data-action="[close|back]" / data-go="<dom selector>"
const FACE_BACK = -1, FACE_CLOSE = -2;
let $backFace, $modalStack = [], backStack = [];
/*
  toDom: [FACE_CLOSE | FACE_BACK | <DOM selector>]
  FACE_CLOSE 只关闭当前弹窗 FACE_BACK | [EMPTY] 关闭所有弹窗
  isReplace: 不记录当前离开的路径
*/
let hideAllModal = () => {
  if (!$modalStack.length) {
    return;
  }
  $modalStack.forEach((_$modal) => {
    _$modal.hide();
  });
  $modalStack = [];
  $('.curtain').hide();
}
let transFace = (toDom, isReplace) => {
  let isBack = false;
  if (!toDom || toDom === FACE_BACK || toDom === FACE_CLOSE) {
    if ($modalStack.length) { //  && $modal.is(':visible')
      if (toDom === FACE_CLOSE) {
        $modalStack.pop().hide();
        if (!$modalStack.length) {
          $('.curtain').hide();
        }
      } else {
        hideAllModal();
      }
      return;
    } else {
      toDom = '.' + backStack.pop();
      isBack = true;
    }
  }
  let $leave = $('.animate-box:visible'), $to = $(toDom);
  if ($to.data('animate-effect') === 'fadeInBottom') {
    $modalStack.push($to);
    $to.show().css('position', 'fixed');
    if ($to.outerHeight() > 500) {
      $to.css('top', (window.innerHeight - $to.outerHeight()) + 'px');
    }
    $('.curtain').show();
  } else {
    if (!isBack && !isReplace) {
      let dom = $leave.attr('class').match(/\S*-form/)[0];
      backStack = backStack.filter((_dom) => _dom !== dom);
      backStack.push(dom);
    }
    if (isReplace) {
      backStack = backStack.filter((_dom) => _dom !== toDom.replace('.', ''));
    }
    $to.show();
    hideAllModal();
    setTimeout(() => {
      $leave.hide().css('position', 'absolute');
      $to.css('position', 'static');
    }, 110);
  }
}

$('[face-button]').click(function () {
  let $this = $(this), action = $this.data('action'), go = $this.data('go');
  if (action) {
    if (action === 'back') {
      transFace(FACE_BACK);
    } else if (action === 'close') {
      transFace(FACE_CLOSE);
    }
  } else if (go) {
    transFace(go);
  }
});
/*$("#password_img").click(function() {
  if ($("#comfirm-password").prop("type") == "password") {
    $("#comfirm-password").prop('type', 'text');
    $("#password_img").prop('src', 'images/invisible.png');
  } else {
    $("#comfirm-password").prop('type', 'password');
    $("#password_img").prop('src', 'images/visible.png');
  }
});*/