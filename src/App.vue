<template>
  <div id="app">
    <trinity-nav/>
    <sign-up-form/>
    <login-form v-on:loginToApp="AppGetlogin" :Address="Address" :PublicKeyEncode="PublicKeyEncode"/>
    <index-from :Address="Address" :PublicKeyEncode="PublicKeyEncode" :PrivateKey="PrivateKey" :PublicKey="PublicKey" :Script="Script" :ScriptHash="ScriptHash" :AddressQRCode="AddressQRCode" :gasBalance="gasBalance" :neoBalance="neoBalance" :tncBalance="tncBalance"/>
    <channel-list-form/>
    <channel-info-form/>
    <add-channel-form :Address="Address" :tncBalance="tncBalance" :PrivateKey="PrivateKey" :PublicKeyEncode="PublicKeyEncode"/>
    <transfer-on-channel-form/>
    <transfer-on-chain-form/>
    <setting-form/>
    <add-deposit-form/>
    <record-form/>
    <curtain/>
  </div>
</template>

<script>
import trinityNav from './components/header'
import signUpForm from './components/signUp'
import loginForm from './components/login'
import indexFrom from './components/indexForm'
import channelListForm from './components/channelList'
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
      tncBalance:0
    }
  },
  components: {
    trinityNav,
    signUpForm,
    loginForm,
    indexFrom,
    channelListForm,
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

    })
  },
  methods:{
    loginfun:function(){
      $(".login-box").show();
      $(".curtain").show();
    },
    AppGetlogin:function(data){
      this.$options.methods.getAddressInfo.bind(this)(data);
      this.$options.methods.getAssetsBalance.bind(this)();
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
  color: #000000;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease; }

a:hover {
  color: #000000; }

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
