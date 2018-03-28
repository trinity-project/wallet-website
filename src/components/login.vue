<template>
  <div action="#" class="login-box">
    <h2>{{ title }}</h2>
    <div class="clearfloat">
      <div class="radio">
        <label>
          <input type="radio" name="optionsRadios" id="optionsRadios1" value="login1" checked @click="toggleCheck(1)">
          From Private Key
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="optionsRadios" id="optionsRadios2" value="login2" @click="toggleCheck(-1)">
          Keystore File (JSON)
        </label>
      </div>
    </div>
    <div class="form-group" v-show="isCheck">
      <label for="loginPrivateKey" class="sr-only">Private Key</label>
      <input type="text" class="form-control" id="loginPrivateKey" v-model="loginPrivateKey" placeholder="Private Key" autocomplete="off">
    </div>
    <div class="form-group" v-show="!isCheck">
        <input id="keystoreFile" type="file" accept=".json" />
        <input type="password" class="form-control" id="loginPassword" v-model="loginPassword" placeholder="Password" autocomplete="off">
    </div>
    <div class="alert alert-danger" id="login-danger" style="display: none;" role="alert"></div>
    <div class="form-group" style="text-align: center;margin-bottom: 10px;" v-if="isCheck">
      <input type="button" value="Create" class="btn btn-login-cancel" @click="toSignUp()">
      <input type="button" value="Import" class="btn btn-login" @click="login1Fun()">
    </div>
    <div class="form-group" style="text-align: center;margin-bottom: 10px;" v-if="!isCheck">
      <input type="button" value="Create" class="btn btn-login-cancel" @click="toSignUp()">
      <input type="button" value="Import" class="btn btn-login" @click="login2Fun()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      title:'Import Your Wallet',
      isCheck:true,
      isLogin:false,
      loginPrivateKey:'',
      loginPassword:''
    }
  },
  watch: {
      Address(newValue, oldValue) {
          this.$options.methods.registeaddress.bind(this)(newValue,this.PublicKeyEncode);
      }
  },
  props:["Address","PublicKeyEncode"],
  methods:{
    toggleCheck:function(flag){
      $("#login-danger").val('');
      $("#login-danger").hide();
      if(flag > 0){
        this.isCheck = true;
      } else {
        this.isCheck = false;
      }
    },
    login1Fun:function(){
      if ($("#loginPrivateKey").val() === "") {
        $("#login-danger").text("PrivateKey can't be empty.");
        $("#login-danger").slideDown("slow");
        return
      }
      if ($("#loginPrivateKey").val().length !== 64) {
        $("#login-danger").text("PrivateKey length check failed.");
        $("#login-danger").slideDown("slow");
        return
      }
      $(".login-box").hide();
      swal({
        title: "Success!",
        timer: 1000,
        type: "success",
        cancelButtonText: "Close"
      });
      $(".curtain").hide();
      $(".navbar").css("filter","blur(0px)");
      $(".index-form").css("filter","blur(0px)");
      this.$emit("loginToApp",this.loginPrivateKey);
      //getchannelstate();
    },
    login2Fun:function(){
      if ($("#keystoreFile").val() === "") {
        $("#login-danger").text("KeystoreFile can't be empty.");
        $("#login-danger").slideDown("slow");
        return
      }
      if ($("#loginPassword").val() === "") {
        $("#login-danger").text("Password can't be empty.");
        $("#login-danger").slideDown("slow");
        return
      }
      //$(".curtain").hide();
      $(".login-box").hide();
      $(".curtain").hide();
      this.$options.methods.LoginByKeystore.bind(this)();
    },
    toSignUp:function(){
      $(".login-box").hide();
      $(".sign-up-box").show();
      $("#login-danger").val('');
      $("#login-danger").hide();
    },
    registeaddress:function(a,b){
      var _this = this;
      axios({
        method: 'post',
        url: 'http://47.254.39.10:20552',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "registeaddress",
          "params": [a,"",b],
          "id": 1
        })
      }).then(function(res){

      });
    },
    LoginByKeystore:function(){
      var _this = this;
      var selectedFile = document.getElementById("keystoreFile").files[0];
      var reader = new FileReader();
      reader.readAsText(selectedFile);

      reader.onload = function(){
          console.log(this.result);
          var result = $.parseJSON(this.result);
          var WalletScript = result.accounts[0].key;
          var address = result.accounts[0].address;
          var req = scrypt_module_factory(DecryptWalletByPassword, {}, {'WalletScript':WalletScript,'password':_this.loginPassword,'address':address});
          if (req == false){
            swal({
              title: "Import Fail!",
              timer: 2000,
              type: "error",
              cancelButtonText: "Close"
            });
            $(".login-box").show();
            $(".curtain").show();
            return
          } else {
            swal({
              title: "Success!",
              timer: 1000,
              type: "success",
              cancelButtonText: "Close"
            });
            $(".navbar").css("filter","blur(0px)");
            $(".index-form").css("filter","blur(0px)");
            _this.$emit("loginToApp",req);
            //getchannelstate();
          }
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  background-color: white;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 478px;
  padding: 17px;
  border-radius: 5px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -256px;
  margin-top: -200px;
  overflow: hidden;
  /* display: none; */
  z-index: 99999; }

.icon-left {
  width: 20px;
  height: 20px;
  margin-left: -18px;
  margin-bottom: 22px;
  color: #000000;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer; }

h2 {
  color: #575757;
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  text-transform: none;
  position: relative;
  margin: 25px 0 10px;
  padding: 0;
  line-height: 40px;
  display: block; }

.radio{
  text-align: center;
  padding: 10px;
  width: 50%;
  float: left;
  margin: 0 0 20px 0;
  cursor: pointer;
}
.filterFun{
  filter:blur(5px);
}
.form-group {
  margin-bottom: 23px; }

.form-group p {
  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300;
  text-align: center; }

.form-group p a {
  color: #000000; }

. label {
  font-weight: 300; }

.form-control {
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #d7d7d7;
  height: 43px;
  margin-top: 10px;
  margin-bottom: 17px;
  font-size: 18px;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.06);
  padding: 0 12px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s; }

.form-control:focus {
  outline: none;
  box-shadow: 0px 0px 3px #c4e6f5;
  border: 1px solid #b4dbed; }

.form-control::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.3); }

.remember {
  font-size: 13px;
  float: left; }

.btn-login {
  background-color: #FC6686;
  color: white;
  border: none;
  box-shadow: none;
  font-size: 17px;
  font-weight: 500;
  -webkit-border-radius: 4px;
  border-radius: 5px;
  padding: 10px 32px;
  margin: 26px 5px 0 5px;
  cursor: pointer; }

.btn-login-cancel {
  background-color: #C1C1C1;
  color: #FFFFFF !important;
  border: none;
  box-shadow: none;
  font-size: 17px;
  font-weight: 500;
  -webkit-border-radius: 4px;
  border-radius: 5px;
  padding: 10px 32px;
  margin: 26px 5px 0 5px;
  cursor: pointer; }

.btn-login-cancel:hover {
  background-color: #b9b9b9;
  color: #FFFFFF !important; }

.btn-login:hover,
.btn-login:focus,
.btn-login:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

.form-group p a {
  font-weight: 600;
  color: #FF95AE; }

input[type=file] {
  width: 100%;}

.clearfloat:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0}
</style>
