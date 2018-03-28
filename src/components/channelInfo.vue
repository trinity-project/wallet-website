<template>
  <form action="#" class="channel-info-form animate-box" data-animate-effect="fadeInBottom">
    <a class="close-btn" id="info-close-btn" @click="closeChannelInfo()">×</a>
    <h1 id="info-remark">Channel Info</h1>
    <label style="display: none;">Channel Name:
      <br><span id="info-channel-name"></span></label>
    <br>
    <label>Local Address:
      <br><span id="info-sender-addr"></span></label>
    <br>
    <label>Remote Address:
      <br><span id="info-receiver-addr"></span></label>
    <br>
    <label>Contract Address:
      <br><span id="info-contract-addr"></span></label>
    <br>
    <label>Deposit:<span id="info-sender-deposit"></span>TNC</label><a id="add-deposit" @click="addDeposit()">Add</a>
    <br>
    <label>Balance:<span id="info-sender-balance"></span>TNC</label>
    <br>
    <label style="display: none;">Channel Life(day):<span id="info-time"></span></label>
    <label>Channel State:<span id="info-state"></span></label>
    <br>
    <h3 @click="openRecord()" style="">Transaction Record</h3>
    <div style="text-align: center;margin-top: 10%">
      <input type="button" value="Transfer" class="btn btn-totransfer" @click="toTransfer()">
      <br><a id="btn_closechannel" @click="closeChannel()" style="color: #FC6686;font-size: 14px;cursor: pointer;">Close Channel</a>
    </div>
  </form>
</template>

<script>
export default {
  name: 'channelInfo',
  data () {
    return {

    }
  },
  props:["tncBalance"],
  methods:{
    openRecord:function(){
      transFace('.record-form');
      $.ajax({
        //url: TrinityTestNet + ":5000",
        url: "http://47.254.39.10:20552",
        type: "POST",
        data: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "gethistory",
          "params": [$("#info-channel-name").text(), index=0, count=100],
          "id": 1
        }),
        contentType: 'application/json',
        success: function(message) {
          //if (message.error) {
            //swal("error!", message.error.message,"error");
          //} else
          if(message.error){
            swal("Error!", message.error,"error");
          } else {
              $('#records').html('');
              message.result.forEach((item) => {
                  if (item.tx_detail) {
                   $(`<div class='record-box' style='position: relative;'><h2>${item.tx_detail[1].address}</h2><span style="text-align:right">${item.tx_detail[0].trans}TNC</span><h3>${item.tx_detail[0].time}</h3><span style="line-height: 32px;">Deposit:${item.tx_detail[0].balance}TNC</span></div>`)
                  .appendTo('#records');
                  }
            });
          }
        },
        error: function(message) {
          alert("error");
        }
      });
      event.stopPropagation();
      return false;
    },
    closeChannel:function(){
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
              //url: TrinityTestNet + ":5000",
              url: "http://47.254.39.10:20552",
              type: "POST",
              data: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "closechannel",
                "params": [$("#wallet_add").html(), $("#info-receiver-addr").text(), $("#info-channel-name").text()],
                "id": 1
              }),
              contentType: 'application/json',
              success: function(message) {
                if (message.result==""||message.result==null) {
                  sweetAlert("something error", "","error");
                }else{
                  sweetAlert(message.result, "","success");
                }
              },
              error: function(message) {
                alert("error");
              }
            });
            });
      } else {
        sweetAlert("Channel not in OPEN state.", "","error");
      }
    },
    addDeposit:function(){
      if ($("#info-state").text() == "OPEN") {
          $(".channel-info-form").hide();
          $(".curtain").hide();
        } else {
          sweetAlert("Channel not in OPEN state.", "","error");
          return false;
        }
        swal({
          title: "Add Deposit",
          text: "(Balance on chain:aaa" +"TNC)",
          type: "number",
          showCancelButton: true,
          closeOnConfirm: false,
          inputPlaceholder: "Deposit"
        },
        function(inputValue){
          if (inputValue === false)
            return false;
          if (inputValue === "") {
            swal("Error", "Deposit can't be null","error");
            return false;
          }
          if (inputValue > Number(this.tncBalance)) {
            swal.showInputError("Deposit amount should be less than the balance on chain.");
            return;
          }
          swal({
            title: "Payment",
            text: "transfer " + inputValue + "TNC to this channel",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
          },
          function(){
              $.ajax({
              //url: TrinityTestNet + ":5000",
              url: "http://47.254.39.10:20552",
              type: "POST",
              data: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "closechannel",
                "params": [$("#wallet_add").html(), $("#info-receiver-addr").text(), $("#info-channel-name").text()],
                "id": 1
              }),
              contentType: 'application/json',
              success: function(message) {
                if (message.result==""||message.result==null) {
                  sweetAlert("something error", "","error");
                }else{
                  sweetAlert(message.result, "","success");
                }
              },
              error: function(message) {
                alert("error");
              }
            });
          });
        });
    },
    toTransfer:function(){
      if ($("#info-state").text() == "OPEN") {
      transFace('.transfer-form');
      $("#transfer-channel-name").val($("#info-channel-name").text());
      $("#transfer-address").val($("#info-receiver-addr").text());
      $("#transfer-amount").val("");
      $("#channel-balance").text($("#info-sender-balance").text());
      } else {
        sweetAlert("Channel not in OPEN state.", "","error");
      }
    },
    closeChannelInfo:function(){
      $(".channel-info-form").hide();
      $(".curtain").hide();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel-info-form {
  background-color: white;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 478px;
  height: 550px;
  padding: 17px;
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -256px;
  margin-top: -275px;
  overflow: hidden;
  display: none;
  z-index: 99999; }

.channel-info-form span {
  color: #000000;
  font-size: 16px; }

.channel-info-form .close-btn {
  content: '×';
  font-size: 34px;
  color: #000000;
  display: block;
  position: absolute;
  right: 8px;
  top: 0px;
  cursor: pointer; }

.channel-info-form .close-btn:hover {
  color: #aaaaaa; }

.channel-info-form h1 {
  width: 100%;
  text-align: center;
  font-family: "yu gothic ui semibold";
  letter-spacing: 0px;
  font-size: 23px;
  color: #000000; }

.channel-info-form h3 {
  font-size: 19px;
  margin: 5px 0;
  font-weight: 500;
  color: #FC6686;
  cursor: pointer; }

.channel-info-form #add-deposit {
  margin-left: 20px;
  padding: 3px 11px;
  border: none;
  font-size: 16px;
  background: #FC6686;
  color: #ffffff;
  margin: 4px 0 30px 20px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -o-border-radius: 30px;
  border-radius: 30px;
  cursor: pointer; }

.channel-info-form .btn-totransfer {
  height: 58px;
  width: 300px;
  padding-right: 20px;
  padding-left: 20px;
  border: none;
  font-size: 18px;
  background: #FC6686;
  color: #ffffff;
  margin: 4px 0 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -o-border-radius: 30px;
  border-radius: 30px;
  -webkit-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  -moz-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  -o-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4); }

.btn-totransfer:hover,
.btn-totransfer:focus,
.btn-totransfer:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

</style>
