<template>
  <form action="#" class="channel-info-form animate-box">
    <a class="close-btn" id="info-close-btn" @click="closeChannelInfo()">×</a>
    <h1 id="info-remark">Channel Info</h1>
    <label>Alias:</label><p style="display:inline">{{ Alias }}</p><br>
    <label>NodeID:</label><br>
      <p>{{ ChannelInfo}}</p>
    <label>Remote Address:</label><br>
      <p></p>
    <label>Contract Address:</label><br>
      <p></p>
    <label>Deposit:</label><p style="display:inline">{{ Deposit}}TNC</p><a id="add-deposit" @click="addDeposit()">Add</a><br>
    <label>Balance:</label><p style="display:inline">{{ Balance }}TNC</p><br>
    <label>Channel State:<span id="info-state">{{ ChannelState }}</span></label><br>
    <h3 @click="openRecord()" style="">Transaction Record</h3>
    <div style="text-align: center;margin-top: 10%">
      <input type="button" value="Transfer" class="btn btn-totransfer" @click="toTransfer()">
      <br><a id="btn_closechannel" style="color: #FC6686;font-size: 14px;cursor: pointer;">Close Channel</a>
    </div>
  </form>
</template>

<script>
export default {
  name: 'channelInfo',
  data () {
    return {
      Alias:'',
      NodeID:'',
      Deposit:'',
      Balance:'',
      ChannelState:''
    }
  },
  props:["tncBalance","ChannelInfo"],
  computed: {
    // reversedMessage: function () {
    //   return this.ChannelInfo.MessageBody
    // }
  },
  watch: {
    ChannelInfo:{
      handler:function(ChannelInfo){
        this.Alias = ChannelInfo.Name;
        this.NodeID = ChannelInfo.Receiver;
        this.Deposit = ChannelInfo.Deposit;
        this.Balance = ChannelInfo.Balance;
        this.ChannelState = ChannelInfo.Flag;
      },
      deep:true
    }
  },
  methods:{
    openRecord:function(){
      transFace('.record-form');
      $(".curtain").hide();
      // $.ajax({
      //   //url: TrinityTestNet + ":5000",
      //   url: "http://47.254.39.10:20552",
      //   type: "POST",
      //   data: JSON.stringify({
      //     "jsonrpc": "2.0",
      //     "method": "gethistory",
      //     "params": [$("#info-channel-name").text(), index=0, count=100],
      //     "id": 1
      //   }),
      //   contentType: 'application/json',
      //   success: function(message) {
      //     //if (message.error) {
      //       //swal("error!", message.error.message,"error");
      //     //} else
      //     if(message.error){
      //       swal("Error!", message.error,"error");
      //     } else {
      //         $('#records').html('');
      //         message.result.forEach((item) => {
      //             if (item.tx_detail) {
      //              $(`<div class='record-box' style='position: relative;'><h2>${item.tx_detail[1].address}</h2><span style="text-align:right">${item.tx_detail[0].trans}TNC</span><h3>${item.tx_detail[0].time}</h3><span style="line-height: 32px;">Deposit:${item.tx_detail[0].balance}TNC</span></div>`)
      //             .appendTo('#records');
      //             }
      //       });
      //     }
      //   },
      //   error: function(message) {
      //     alert("error");
      //   }
      // });
      // event.stopPropagation();
      //return false;
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
            this.$emit("addDeposit",this.ChannelInfo);
          });
        });
    },
    toTransfer:function(){
      //if ($("#info-state").text() == "OPEN") {
      transFace('.transfer-form');
      $(".curtain").hide();
      $("#transfer-channel-name").val($("#info-channel-name").text());
      $("#transfer-address").val($("#info-receiver-addr").text());
      $("#transfer-amount").val("");
      $("#channel-balance").text($("#info-sender-balance").text());
      // } else {
      //   sweetAlert("Channel not in OPEN state.", "","error");
      // }
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

.channel-info-form p {
  color: #000000;
  word-break: break-word;}

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
