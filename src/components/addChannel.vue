<template>
  <form action="#" class="channel-form animate-box">
    <div class="row">
      <img src="../assets/trinity_HD.png" style="width: 550px;height: 550px;position: fixed;left: 200px;bottom: -147px;opacity: 0.3;">
      <div class="channel-box channel-box-left" style="position: relative;">
        <h1>{{ explainTitle }}</h1>
        <h3>{{ explain }}</h3>
      </div>
      <div class="channel-box" style="position: relative;">
      <div class="form-group">
        <label for="regist-channel-address">URL : </label><span class="commentary" data-toggle="tooltip" data-placement="right"
        title="对URL的注释">?</span>
        <input type="text" class="form-control" id="regist-channel-address" v-model="registChannelUrl" placeholder="URL">
      </div>
      <div class="form-group">
        <label>Name : </label><span class="commentary" data-toggle="tooltip" data-placement="right" title="对name的注释">?</span>
        <input type="text" class="form-control" v-model="registChannelName" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="regist-channel-assets">Assets : </label>
        <select class="form-control" id="regist-channel-assets" v-model="registChannelAssets" disabled="disabled">
          <option>TNC</option>
          <option>NEO</option>
          <option>GAS</option>
        </select>
      </div>
      <div class="form-group">
        <label for="regist-channel-deposit">Deposit : </label>
        <input type="text" class="form-control" id="regist-channel-deposit" v-model="registChannelDeposit" placeholder="Deposit">
      </div>
      <div class="form-group">
          <p class="total-amount">&nbsp;(Balance on chain: <span class="total-balance">{{ tncBalance }}</span>TNC)</p>
      </div>
      <div class="form-group">
          <div class="alert alert-info" role="alert">You will pay an additional 1TNC as a processing fee for this transaction.Detail:..........</div>
      </div>
      <div class="form-group form-btn">
        <input type="button" value="Add" @click="addChannelFun()" class="btn btn-channel">
      </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'addChannelForm',
  data () {
    return {
      explainTitle:'Add Channel',
      explain:'The transaction is settled through a smart contract on the chain and real-time transactions are performed in the channel under the chain, so as to realize the instant payment of assets, low transaction cost, scalability and privacy protection.If you want to use the status channel, you need to add a channel by entering your address, asset type and deposit.',
      registChannelUrl:"",
      registChannelName:"",
      registChannelAssets:"TNC",
      registChannelDeposit:"",
      txRawDataTest:"",

    }
  },
  props:["tncBalance","Address","PrivateKey","PublicKeyEncode"],
  watch: {
      txRawDataTest(newValue, oldValue) {
          this.$options.methods.sendrawtransaction.bind(this)(newValue,this.PrivateKey,this.PublicKeyEncode);
      }
  },
  methods:{
    addChannelFun:function(){
      var _this = this;
      var registePublicKeyEncod = _this.registChannelUrl.split("@")[0];
      var registeIP =  _this.registChannelUrl.split("@")[1];
      var registeLocalUrl = _this.PublicKeyEncode + "@" + registeIP;
      if(registePublicKeyEncod.length != 66){
        swal({
          title: "Error!",
          text: "URL length check failed.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
      if (_this.registChannelDeposit=="") {
        swal({
          title: "Error!",
          text: "Deposit can't be empty.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
      if (Number(_this.registChannelDeposit) > Number(_this.tncBalance)) {
        swal({
          title: "Error!",
          text: "Deposit amount should be less than the balance on chain.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
      swal({
          title: "Add Channel",
          text: "You will add a new channel. <br />Receiver address : " + _this.registChannelUrl + "<br>Deposit : " + _this.registChannelDeposit + _this.registChannelAssets,
          type: "info",
          showCancelButton: true,
          closeOnConfirm: true,
          //showLoaderOnConfirm: true,
          html:true
        },function(isConfirm){
        if (isConfirm) {
            var data = new Date().getTime();
            _this.$emit('initWebSocket',registeIP,registeLocalUrl, _this.registChannelUrl, _this.registChannelName, _this.registChannelAssets, _this.registChannelDeposit,data)
            //_this.$emit('websocketsend1',registeLocalUrl, _this.registChannelUrl, _this.registChannelAssets, _this.registChannelDeposit,data);
        }
      });
    },
    sendrawtransaction:function(txRawDataTest,PrivateKey,PublicKeyEncode){
      var signre = signatureData(txRawDataTest, PrivateKey);
      var _this = this;
      axios({
        method: 'post',
        url: 'http://47.254.39.10:20552',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "sendrawtransaction",
          "params": [txRawDataTest, signre, PublicKeyEncode],
          "id": 1
        })
      }).then(function(res){
        if(res.result =="fail"){
          swal("fail!", res.result,"error");
        } else {
          $("#nav-btn-channel").click();
          swal("Add success!", "","success");
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel-form {
  padding: 80px 30px 0 30px;
  min-height: 100vh;
  position: absolute !important;
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

.channel-form .channel-box {
  padding: 20px;
  height: 82%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 0 0 20px 0;
  overflow: hidden; }

.assets-form .assets-box .record-a {
  color: #FF95AE;
  padding: 8px 20px 8px 8px; }

.channel-form .channel-box:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }

.channel-form .channel-box-left {
  float: left;
  height: 82%;
  width: 40%;
  margin-right: 5%;
  word-break: break-all; }

.channel-form h2 {
  font-family: "yu gothic ui semibold";
  font-size: 37px;
  color: #FF95AE;
  margin-top: 0; }

.channel-form h3 {
  font-size: 26px;
  line-height: 43px;
  margin: 10px 0;
  word-wrap: break-word; }

.channel-form h1 {
  font-family: "yu gothic ui semibold";
  font-size: 33px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

.channel-form label {
  font-size: 20px;
  font-weight: 300; }

.commentary{
  margin-left: 6px;
  background: #848484;
  width: 20px;
  height: 20px;
  display: inline-block;
  color: #FFFFFF;
  text-align: center;
  line-height: 21px;
  border-radius: 50%;
  cursor: help;
}

.channel-form .icon-left {
  width: 20px;
  height: 20px;
  margin-left: -18px;
  margin-bottom: 22px;
  color: #000000;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer; }

.channel-form .form-group {
  margin: 17px 0; }

.channel-form .form-group p {
  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300; }

.channel-form .form-group a {
  color: #000000; }

.channel-form .form-control {
  font-size: 18px;
  font-weight: 300;
  height: 56px;
  line-height: 66px;
  padding-left: 0;
  padding-right: 40px;
  border: none;
  border-bottom: 2px solid #E7E6E6;
  background: none;
  font-family: "yu gothic ui semibold";
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -o-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  -ms-border-radius: 0px;
  border-radius: 0px;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease; }

.channel-form .form-control::-webkit-input-placeholder {
  color: #E7E6E6;
  font-weight: 400; }

.channel-form .form-amount::-webkit-input-placeholder {
  color: #E7E6E6;
  font-weight: 400;
  font-size: 18px;
  line-height: 60px !important; }

.channel-form .form-control:focus,
.login-form .form-control:active {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4); }

.channel-form .btn-channel {
  height: 58px;
  width: 300px;
  padding-right: 20px;
  padding-left: 20px;
  border: none;
  font-size: 18px;
  background: #FC6686;
  color: #ffffff;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -o-border-radius: 30px;
  border-radius: 30px;
  -webkit-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  -moz-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  -o-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4); }

@media screen and (max-width: 993px) {
  .btn-channel {
    width: 300px; } }

.btn-channel:hover,
.btn-channel:focus,
.btn-channel:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

.total-amount {
  color: #FF95AE !important;
  margin-bottom: 0px;
  font-weight: 500; }

.form-remark {
  border-bottom: none !important; }

.channel-form .form-btn {
  width: 100%;
  text-align: center;
  margin-top: 4%; }

</style>
