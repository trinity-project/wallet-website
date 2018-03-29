<template>
  <form action="#" class="channel-info1-form">
    <div class="row">
      <img src="../assets/trinity_HD.png">
      <div class="channel-info1-box channel-info1-box-left">
          <h1>{{ explainTitle }}</h1>
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
            <input type="button" value="Close Channel" class="btn btn-closeChannel" @click="closeChannel()">
          </div>
      </div>
      <div class="channel-info1-box">
          <h1 style="margin-top: 10px;float: left;">{{ title }}</h1>
          <!-- <a id="channel-regist">Add Channel</a>
          <label class="iosCheck"><input type="checkbox" v-model="isCheck"><i @click="toggleCheck()"></i></label> -->
      </div>
      <div class="channel-info1-box">
        <button type="button" class="btn btn-default" style="margin-left:0" @click="toTransfer()">付款</button>
        <button type="button" class="btn btn-default" style="margin-right:0" @click="receiptFun()">收款</button>
      </div>
      <ul class="nav nav-tabs nav-justified">
        <li :class="{active:isActive}" @click="toggleActive(1)">待付款</li>
        <li :class="{active:!isActive}" @click="toggleActive(-1)">待收款</li>
      </ul>
      <div class="transfer-msg-box" v-show="isActive">
        <a>1</a>
      </div>
      <div class="transfer-msg-box" v-show="!isActive">
        <a>2</a>
      </div>
      <div id="channels" class="channel-body">

      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'channelList1Form',
  data () {
    return {
      title:'Channel List',
      //isCheck:false,
      isActive:true,
      explainTitle:'Channel Transfer',
      explain:'The status channel is a technical realization of a chain expansion solution. Click on the channel, you can view the channel details, add a deposit, channel transfer and closing channels and other functions.'
    }
  },
  watch: {//深度 watcher
    // 'isCheck': {
    //   handler: function (val, oldVal) {
    //     if (this.isCheck) {
    //       this.checked=true;
    //     }else{
    //       this.checked=false;
    //     }
    //   },
    //   deep: true
    // }
  },
  methods:{
    toggleActive:function(flag){
      if(flag>0){
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    paymentFun:function(){
      transFace('.transfer-form');
      $("#transfer-channel-name").val("");
      $("#transfer-address").val("");
      $("#transfer-amount").val("");
      $("#channel-balance").text("");
    },
    receiptFun:function(){
        var R = getR();
        var hashR = getHashR(R);
        swal({
          title: "Receipt Code",
          text: "<div style='word-break:break-all;font-size: 17px;'>This is your receipt code, share it with each other for receipt.<br><br><div class='alert alert-info' role='alert' style='font-size: 20px;margin:0'>" + hashR + "</div></div>",
          imageUrl: "http://qr.liantu.com/api.php?text=" + hashR,
          imageSize:  "200x200",
          confirmButtonText:"Close",
          allowOutsideClick:"ture",
          html: true
        });
      },
      toTransfer:function(){
        transFace('.transfer-form');
        $("#transfer-channel-name").val($("#info-channel-name").text());
        $("#transfer-address").val($("#info-receiver-addr").text());
        $("#transfer-amount").val("");
        $("#channel-balance").text($("#info-sender-balance").text());
      },
      closeChannel:function(){
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
      }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel-info1-form {
  padding: 80px 30px 0 30px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
  -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  background: url(../assets/bg_2.jpg) repeat;
  background-attachment: fixed; }

.channel-info1-box {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 0 0 20px 0;
  overflow: hidden;
  position: relative;}

.channel-info1-box:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }

.channel-info1-box-left {
  float: left;
  height: 82%;
  width: 40%;
  margin-right: 5%;
  word-break: break-all; }

.channel-info1-form #channel-regist {
  /* float: right; */
  font-size: 18px;
  line-height: 50px;
  color: #FD6E7E;
  cursor: pointer; }

.channel-info1-form #channel-button {
  display: inline;
  float: right;
  line-height: 55px; }

.nav-tabs{
  height: 44px;
}
.nav-tabs li{
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
  margin: 0 0 20px 0;
  cursor: pointer;
}
.nav-tabs .active{
  color: rgba(0, 0, 0, 1);
  background: rgba(255, 255, 255, 1);
}
.transfer-msg-box{
  height: 426px;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #e1e1e1;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
.channel-info1-box button{
  width: 45.5%;
  margin: 0 20px;
}
.channel-info1-form h1 {
  font-family: "yu gothic ui semibold";
  font-size: 33px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

.channel-info1-form h2 {
  margin: 10px 0;
  font-size: 22px; }

.channel-info1-form h3 {
  font-size: 26px;
  line-height: 49px;
  margin: 10px 0;
  word-wrap: break-word; }

.channel-info1-form h4 {
  display: inline;
  margin-right: 40px; }

img{
  display: flex;
  width: 900px;
  height: 900px;
  position: absolute;
  z-index: -1;
  right:-400px;
  bottom: 0px;
  opacity: 0.3;
}

.channel-info1-form div p {
  color: #000000;
  font-weight: 500;
  margin-bottom: 0;
  max-width: 322px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.iosCheck{
  height: 30px;
  margin-bottom: 0px;
  position: absolute;
  top: 50%;
  right: 34px;
  transform: translateY(-50%);
}
.iosCheck input {
  display: none;
}
.iosCheck i {
  display: inline-block;
  cursor: pointer;
  padding-right: 40px;
  transition: all ease 0.4s;
  -webkit-transition: all ease 0.4s;
  border-radius: 25px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}
.iosCheck i:before {
  display: block;
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.iosCheck :checked + i {
  padding-right: 0;
  padding-left: 40px;
  background: #FD6E7E;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 40px #FD6E7E;
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 40px #FD6E7E;
}
.sweet-alert h2 {
    font-size: 21px !important;
    margin: 18px 0 !important;
}

.btn-closeChannel {
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

.btn-closeChannel:hover,
.btn-closeChannel:focus,
.btn-closeChannel:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

</style>
