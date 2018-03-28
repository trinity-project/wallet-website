<template>
  <form id="frm_deposit_password" action="#" class="deposit-pay-form animate-box" data-animate-effect="fadeInBottom">
    <a class="close-btn" id="deposit-pay-close-btn">×</a>
    <h2 class="comfirm-title">Payment</h2>
    <div>
      <h3>Comfirm info:   <span id="deposit-comfirm-info"></span></h3>
    </div>
    <div id="password-div">
      <h3 style="margin-top: 21px;">Password</h3>
      <div class="form-group">
        <label for="comfirm-password1" class="sr-only">Password</label>
        <img id="password_img1" onclick="hideShowPsw(comfirm-password1, password_img1)" src="images/visible.png">
        <input type="password" class="form-control" id="comfirm-password1" placeholder="Password" autocomplete="off">
      </div>
    </div>
    <div class="form-group" style="text-align: center;">
      <input type="button" value="Next" class="btn btn-deposit-pay">
    </div>
  </form>
</template>

<script>
export default {
  name: 'addDeposit',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.deposit-pay-form {
  background-color: white;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 478px;
  padding: 17px;
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -256px;
  margin-top: -200px;
  overflow: hidden;
  display: none;
  z-index: 99999; }

h2 {
  font-family: "yu gothic ui semibold";
  font-size: 23px;
  text-align: center;
  margin: 0 0 30px 0;
  color: #000000; }

.close-btn {
  content: '×';
  font-size: 34px;
  color: #000000;
  display: block;
  position: absolute;
  right: 8px;
  top: 0px; }

.close-btn:hover {
  color: #aaaaaa; }

h3 {
  font-family: "yu gothic ui semibold";
  font-size: 16px;
  margin: 0;
  color: #000000; }

.form-group {
  position: relative; }

.form-group p {
  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300; }

.form-group a {
  color: #000000; }

.form-group img {
  position: absolute;
  width: 34px;
  right: 4px;
  top: calc(50% - 14px);
  padding: 4px;
  cursor: pointer; }

label {
  font-size: 14px;
  font-weight: 300; }

.form-control {
  font-size: 20px;
  font-weight: 300;
  height: 60px;
  line-height: 60px;
  padding-left: 0;
  padding-right: 0;
  border: none;
  border-bottom: 2px solid #E7E6E6;
  background: none;
  color: #FF95AE;
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

.form-control::-webkit-input-placeholder {
  color: #E7E6E6;
  font-weight: 400; }

.btn-deposit-pay {
  height: 58px;
  width: 300px;
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 20px;
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

</style>
