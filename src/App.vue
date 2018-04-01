<template>
  <div id="app">
    <!-- <h1 @click="StoreChannel()">1111111</h1>
    <h1 @click="ChangeStoreFlag()">2222222</h1> -->
    <trinity-nav/>
    <sign-up-form @loginfun="loginfun()"/>
    <login-form @websocketsend="websocketsend(1)" @loginToApp="AppGetlogin" @walletJsonToApp="getWalletJson" :Address="Address" :PublicKeyEncode="PublicKeyEncode"/>
    <index-from :Address="Address" :PublicKeyEncode="PublicKeyEncode" :PrivateKey="PrivateKey" :PublicKey="PublicKey" :Script="Script" :ScriptHash="ScriptHash" :AddressQRCode="AddressQRCode" :gasBalance="gasBalance" :neoBalance="neoBalance" :tncBalance="tncBalance"/>
    <channel-list-form @channelListToApp="AppGetchannelList" @closeChannel="closeChannel" :ChannelItems="ChannelItems"/>
    <channel-list1-form/>
    <channel-info-form @addDeposit="addDeposit" :tncBalance="tncBalance" :ChannelInfo="ChannelInfo"/>
    <add-channel-form @initWebSocket="initWebSocket" :Address="Address" :tncBalance="tncBalance" :PrivateKey="PrivateKey" :PublicKeyEncode="PublicKeyEncode"/>
    <transfer-on-channel-form :tncBalance="tncBalance"/>
    <transfer-on-chain-form :tncBalance="tncBalance"/>
    <setting-form/>
    <add-deposit-form/>
    <record-form/>
    <curtain/>
  </div>
</template>

<script>
import Store from './store'
import trinityNav from './components/header'
import signUpForm from './components/signUp'
import loginForm from './components/login'
import indexFrom from './components/indexForm'
import channelListForm from './components/channelList'
import channelList1Form from './components/channelList1'
import channelInfoForm from './components/channelInfo'
import addChannelForm from './components/addChannel'
import transferOnChannelForm from './components/transferOnChannel'
import transferOnChainForm from './components/transferOnChain'
import settingForm from './components/setting'
import addDepositForm from './components/addDeposit'
import recordForm from './components/record'
import curtain from './components/curtain'

export default {
  name: 'App',
  data (){
    return {
      PrivateKey:'',
      PublicKey:'',
      PublicKeyEncode:'',
      Script:'',
      ScriptHash:'',
      Address:'',
      AddressQRCode:'',
      gasBalance:0,
      neoBalance:0,
      tncBalance:0,
      WalletJson:{},
      websock: null,
      ChannelItems:Store.fetch(this.Address + "@ChannelList"),
      url1:'',
      url2:'',
      ChannelInfo:{}
    }
  },
  components: {
    trinityNav,
    signUpForm,
    loginForm,
    indexFrom,
    channelListForm,
    channelList1Form,
    channelInfoForm,
    addChannelForm,
    transferOnChannelForm,
    transferOnChainForm,
    settingForm,
    addDepositForm,
    recordForm,
    curtain
  },
  mounted:function(){
    //需要用$nextTick来保证所有节点挂载后才执行方法
    this.$nextTick(function(){
      //this.threadPoxi();
    })
  },
  watch: {
      Address(newValue, oldValue) {
           //this.$options.methods.registeaddress.bind(this)(newValue,this.PublicKeyEncode);
           this.ChannelItems = Store.fetch(newValue + "@ChannelList");
      },
      ChannelItems:{
        handler:function(ChannelItems){
          Store.save(this.Address + "@ChannelList",this.ChannelItems);
        },
        deep:true
      }
  },
  methods:{
    threadPoxi(){  // 实际调用的方法
     //参数
     const agentData = "mymessage";
     //若是ws开启状态
     if (this.websock.readyState === this.websock.OPEN) {
        console.log("readyState1");
        this.websocketsend(agentData)
     }
     // 若是 正在开启状态，则等待300毫秒
     else if (this.websock.readyState === this.websock.CONNECTING) {
         let that = this;//保存当前对象this
         setTimeout(function () {
            console.log("readyState2");
             that.websocketsend(agentData)
         }, 300);
     }
     // 若未开启 ，则等待500毫秒
     else {
         this.initWebSocket();
         let that = this;//保存当前对象this
         setTimeout(function () {
           console.log("readyState3");
             that.websocketsend(agentData)
         }, 500);
     }
    },
    initWebSocket(ip,url1,url2,name,asstes,deposit,date){ //初始化weosocket
     //ws地址
     const wsuri = "ws://" + ip;
     this.websock = new WebSocket(wsuri);
     this.websock.onmessage = this.websocketonmessage;
     this.websock.onclose = this.websocketclose;

     var _this = this;
     setTimeout(function (){
          _this.AddChannel(url1,url2,name,asstes,deposit,date);
      }, 5000);
    },
    websocketonmessage(e){ //数据接收
     const redata = JSON.parse(e.data);
     const type = redata.type;
     if(type == "block_info"){
       this.websocketsend2(redata);
       //this.$options.methods.StoreChannel.bind(this)();
     }
     //console.log(redata);
    },
    websocketsend:function(agentData){//数据发送模板
     console.log("发送信息：" + agentData);
     this.websock.send(agentData);
     //console.log("11");
    },
    AddChannel:function(url1,url2,name,asstes,deposit,date){//添加通道请求
      // console.log(url1);
      // console.log(url2);
      // console.log(asstes);
      // console.log(deposit);
      // console.log(date);
     var Message = {
      "MessageType":"AddChannel",
      "Sender": url1,
      "Receiver":url2,
      "MessageBody": {
              "NodeID":url2,
              "Name" : name,
              "Asstes" : asstes,
              "Deposit": parseFloat(deposit),
              "Flag":2,
              "Date":date
          }
      }
      console.log(JSON.stringify(Message));
      this.StoreChannel(Message.MessageBody);
      this.websock.send(JSON.stringify(Message));
    },
    websocketsend2:function(agentData){//数据接收后调用
      console.log(agentData);
      console.log("发送信息：已收到消息,blance为" + agentData.body.blance);
      this.websock.send("已收到消息,blance为" + agentData.body.blance);
      // var Message = {
      //  "MessageType":"RequestSignatureData",
      //  "Sender": url1,
      //  "Receiver":url2,
      //  "MessageBody": {
      //          "Asstes" : asstes,
      //          "Deposit": deposit,
      //          "Flag":"0",
      //          "Date":date
      //      }
      //  }
      //  console.log(JSON.stringify(Message));
      //  //this.StoreChannel(Message);
      //  this.websock.send(JSON.stringify(Message);
    },
    websocketclose(e){  //关闭
     console.log("connection closed (" + e.code + ")");
    },
    StoreChannel:function(Message){
     Message.Balance = Message.Deposit;
     this.ChannelItems.push(Message);
     console.log(this.ChannelItems);
     Store.save(this.Address + "@ChannelList",this.ChannelItems);
    },
    ChangeStoreFlag:function(statu){
     var _this = this;
     //forEach()，val为数据的每一项，index为每一项的索引
     this.ChannelItems.forEach(function(val,index){
       if(val.aaa === 'aaaa1'){
         _this.$set(val,'bbb',111);
       }
     });
    },
    closeChannel:function(val){
     console.log("已收到关闭通道数据");
     console.log(val);
     console.log(val.Date);
     console.log("------------");
     console.log(this.ChannelItems);
     var _this = this;
     this.ChannelItems.forEach(function(data,index){
       if(data.Date === val.Date){
         _this.$set(data,'Flag',1);
       }
     });
    },
    addDeposit:function(val){
     console.log("已收到增加押金数据");
     console.log(val);
     console.log(val.Date);
     console.log("------------");
     console.log(this.ChannelItems);
     var _this = this;
     this.ChannelItems.forEach(function(data,index){
       if(data.Date === val.Date){
         _this.$set(data,'Deposit',"1");
       }
     });
    },
    Reconnect(ip){ //初始化weosocket
     //ws地址
     const wsuri = "ws://" + ip;
     this.websock = new WebSocket(wsuri);
     this.websock.onmessage = this.websocketonmessage;
     this.websock.onclose = this.websocketclose;

     // var _this = this;
     // setTimeout(function (){
     //      _this.AddChannel(url1,url2,name,asstes,deposit,date);
     //  }, 5000);
    },
    loginfun:function(){
      $(".login-box").show();
      $(".curtain").show();
    },
    AppGetlogin:function(data){
      this.$options.methods.getAddressInfo.bind(this)(data);
      this.$options.methods.getAssetsBalance.bind(this)();
    },
    AppGetchannelList:function(data){
      this.ChannelInfo = data;
    },
    getWalletJson:function(data){
      this.WalletJson = data;
    },
    getAddressInfo:function(a){
      this.PrivateKey = a; //私钥
      this.PublicKey = ab2hexstring(getPublicKey(this.PrivateKey,0)); //公钥
      this.PublicKeyEncode =getPublicKeyEncoded(this.PublicKey); //压缩
      this.Script =createSignatureScript(this.PublicKeyEncode);     //脚本
      this.ScriptHash = getHash(this.Script).toString();    //脚本哈希
      this.Address = ToAddress(this.ScriptHash); //钱包地址
      this.AddressQRCode = "http://qr.liantu.com/api.php?text=" + this.Address;
    },
    getAssetsBalance:function(){
      var _this = this;
      axios({
        method: 'post',
        url: 'http://47.88.35.235:21332',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "getBalance",
          "params": [this.Address],
          "id": 1
        })
      }).then(function(res){
        _this.gasBalance = res.data.result.gasBalance;
        _this.neoBalance = res.data.result.neoBalance;
        _this.tncBalance = res.data.result.tncBalance;
      });
    }
  },
  created(){
    //this.initWebSocket()
}
}
</script>

<style>
body {
  font-family: "Open Sans", Arial, sans-serif;
  line-height: 1.5;
  font-size: 16px;
  color: #848484;
  background-color: #f0f0f0;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  background: #ffffff url(./assets/bg_3.png) repeat;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0; }

input[type="number"] {
  -moz-appearance: textfield; }

input {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; }

a {
  color: inherit;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease; }

a:hover {
  color: inherit; }

.icon {
  width: 30px;
  height: 30px;
  color: #FF95AE;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden; }

.menu {
  padding: 0;
  margin: 30px 0 0 0; }

.menu li {
  list-style: none;
  margin-bottom: 10px;
  display: -moz-inline-stack;
  display: inline-block;
  zoom: 1;
  *display: inline; }

.menu li a {
  padding: 5px; }

.menu li.active a {
  color: #b3b3b3; }

.container,
.row {
  height: 100%; }

.form-box {
  position: relative;
  padding: 0;
  height: 100%; }

input,
textarea {
  color: #000; }

.placeholder {
  color: #aaa; }

.js .animate-box {
  opacity: 0; }

.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto; }

::-webkit-scrollbar {
  display: none; }

.row {
  width: 100%;
  max-width: 1050px;
  min-width: 755px;
  margin: 0 auto;
  overflow: hidden; }

.demo-label {
  margin: 0;
  display: inline-block; }

.demo-radio {
  display: none; }

.demo-radioInput {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  display: inline-block;
  height: 16px;
  margin-right: 10px;
  margin-top: -1px;
  vertical-align: middle;
  width: 16px;
  line-height: 1; }

.demo-radio:checked + .demo-radioInput:after {
  background-color: #FF95AE;
  border-radius: 100%;
  content: '\2714';
  color: #ffffff;
  font-size: 16px;
  display: inline-block;
  height: 14px;
  margin: 0;
  width: 14px; }

.demo-checkbox.demo-radioInput, .demo-radio:checked + .demo-checkbox.demo-radioInput:after {
  border-radius: 0; }
</style>
