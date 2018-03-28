<template>
  <div action="#" class="sign-up-box">
    <h2>Create Wallet</h2>
    <div class="form-group">
      <label for="sign-up-password" class="sr-only">Password</label>
      <input type="password" class="form-control" id="sign-up-password" placeholder="Password" autocomplete="off">
    </div>
    <div class="form-group" style="margin-bottom: 10px;">
      <label for="sign-up-repassword" class="sr-only">Repeat Password</label>
      <input type="password" class="form-control" id="sign-up-repassword" placeholder="Repeat Password" autocomplete="off">
    </div>
    <div class="alert alert-danger" id="sign-up-danger" style="display: none;" role="alert"></div>
    <div class="form-group1" style="text-align: center;margin-bottom: 10px;">
      <input type="button" value="Import" @click="toLogin()" class="btn btn-sign-up-cancel">
      <input type="button" value="Create" @click="Create()" class="btn btn-sign-up">
    </div>
  </div>
</template>

<script>
export default {
  name: 'signUpForm',
  data () {
    return {
    }
  },
  methods:{
    toLogin:function(){
      $(".sign-up-box .form-group").show();
      $(".sign-up-box .form-group1 .btn-sign-up").show();
      $("#sign-up-password").val("");
      $("#sign-up-repassword").val("");
      $(".sign-up-box").hide();
      $("#sign-up-danger").hide();
      $("#sign-up-success").hide();
      $(".login-box").show();
    },
    Create:function(){
      var _this = this;
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
      var password = $("#sign-up-password").val();
      $(".sign-up-box").hide();
      $("#curtain").hide();
      createKeystore(privateKey,password);
      swal({
        title: "Create success",
        text: "<div style='word-break:break-all;font-size:20px'>This is your Private Key, Please keep it safe.<br><br><div class='alert alert-info' role='alert'>" + privateKey + "</div></div>",
        type: "success",
        confirmButtonColor: "#FC6686",
        confirmButtonText: "Import",
        closeOnConfirm: true,
        html: true
      },function(isConfirm){
      if (isConfirm) {
      _this.$emit('loginfun');
    }
    });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign-up-box {
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
  display: none;
  z-index: 99999; }

.sign-up-box .icon-left {
  width: 20px;
  height: 20px;
  margin-left: -18px;
  margin-bottom: 22px;
  color: #000000;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer; }

.sign-up-box h2 {
  color: #575757;
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  text-transform: none;
  position: relative;
  margin: 25px 0;
  padding: 0;
  line-height: 40px;
  display: block; }

.sign-up-box .form-group {
  margin-bottom: 23px; }

.sign-up-box .form-group p {
  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300;
  text-align: center; }

.sign-up-box .form-group p a {
  color: #000000; }

.sign-up-box label {
  font-weight: 300; }

.sign-up-box .form-control {
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

.sign-up-box .form-control:focus {
  outline: none;
  box-shadow: 0px 0px 3px #c4e6f5;
  border: 1px solid #b4dbed; }

.sign-up-box .form-control::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.3); }

.sign-up-box .remember {
  font-size: 13px;
  float: left; }

.sign-up-box .forget {
  font-size: 13px;
  float: right;
  margin-top: 1px; }

.sign-up-box .forget a {
  color: #FF95AE; }

.btn-sign-up {
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

.btn-sign-up-cancel {
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

.btn-sign-up-cancel:hover {
  background-color: #b9b9b9;
  color: #FFFFFF !important; }

.btn-sign-up:hover,
.btn-sign-up:focus,
.btn-sign-up:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

.sign-up-box .form-group p a {
  font-weight: 600;
  color: #FF95AE; }

</style>
