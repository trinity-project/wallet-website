<template>
  <form action="#" class="setting-form">
    <div class="row">
      <img src="../assets/trinity_HD.png" style="display: flex;width: 600px;height: 600px;position: absolute;z-index: -1;left: -241px;
    bottom: 330px;opacity: 0.3;">
      <div class="setting-box setting-box-left" style="position: relative;">
          <h1 style="font-size: 33px;">Setting</h1>
          <h3>In the setting page, you can Change Gateway and Close Wallet,more setting function will meet with you in the near future.</h3>
      </div>
      <div class="setting-box" style="position: relative;cursor: not-allowed;">
        <h3>Change Name (Coming soon...)</h3>
      </div>
      <div class="setting-box" style="position: relative;cursor: not-allowed;">
        <h3>Change Password (Coming soon...)</h3>
      </div>
      <div class="setting-box" style="position: relative;">
        <h3 id="setting-btn3" style="cursor: pointer;">Change Gateway</h3>
        <div id="setting-gateway" style="padding: 0 14px;display: none">
          <span>Gateway : </span>
          <input type="text" class="setting-input" value="http://localhost">
          <a style="font-size: 16px;" id="setting-reset">Reset</a>
            <input type="button" value="Save" class="setting-save-btn">
        </div>
      </div>
      <div class="setting-box" style="position: relative;">
        <h3 id="setting-btn4" style="cursor: pointer;">Close Wallet</h3>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'settingForm',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting-form {
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

.setting-box {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 0 0 20px 0;
  overflow: hidden; }
.setting-box .record-a {
  color: #FF95AE;
  padding: 8px 20px 8px 8px; }

.setting-box-left {
  position: relative;
  float: left;
  height: 82%;
  width: 40%;
  margin-right: 5%;
  word-break: break-all; }

.setting-box:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }

.setting-close-btn {
  font-size: 34px;
  color: #000000;
  display: block; }

h1 {
  font-family: "yu gothic ui semibold";
  font-size: 29px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

h3 {
  margin: 10px 0;
  word-wrap: break-word; }

.form-group {
  margin-bottom: 30px;
  text-align: center;
  position: relative; }

.form-group p {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #FD6E7E;
  display: inline;
  cursor: pointer; }

.form-group a {
  color: #000000; }

.form-group img {
  width: 266px;
  cursor: pointer; }

.setting-input {
  width: calc(100% - 120px); }

.setting-save-btn {
  width: 82px;
  padding-right: 20px;
  padding-left: 20px;
  border: none;
  font-size: 18px;
  background: #FC6686;
  margin: 15px 0 0;
  color: #ffffff;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -o-border-radius: 30px;
  border-radius: 30px;
  -webkit-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  -moz-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  -o-box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4);
  box-shadow: -2px 10px 20px -1px rgba(252, 102, 134, 0.4); }

.setting-save-btn:hover,
.setting-save-btn:focus,
.setting-save-btn:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

</style>
