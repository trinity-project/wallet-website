<template>
  <form action="#" class="assets-form animate-box">
    <div class="row">
      <img src="../assets/trinity_HD.png" style="display: flex;width: 450px;height: 450px;position: absolute;z-index: -1;left: 800px;bottom: 25px;opacity: 0.3;">
      <div class="assets-box assets-box-left">
          <h1 style="font-size: 33px;">My Wallet</h1>
          <h2>Wallet Address : </h2><label id="assets-address"></label>
          <h2>Script Hash : </h2><label id="assets-script-hash"></label>
          <h2>Public Key : </h2><label id="assets-public-key"></label>
          <h2 style="display: inline;">Private Key : </h2><label id="private-key-show">Show</label><label id="assets-private-key" style="display: none;"></label>
          <h2>Download Wallet File: </h2><label id="assets-wallet-file">Coming soon...</label>
      </div>
      <div class="assets-box" style="position: relative;">
        <h1>Assets List</h1>
      </div>
      <div class="assets-box" style="position: relative;">
        <h1>NEO</h1>
        <h3>Balance On Chain : <span id="assets-neobalance">0</span> NEO</h3>
        <h3>Last Transactions : </h3>
        <img src="../assets/NEO.png" id="neo" href="javascript:;">
      </div>
      <div class="assets-box" style="position: relative;">
        <h1>TNC</h1>
        <h3>Balance On Chain : <span id="assets-tncbalance">0</span> TNC</h3>
        <h3>Last Transactions : </h3>
        <img src="../assets/trinity.png" id="tnc" href="javascript:;">
      </div>
      <div class="assets-box" style="position: relative;">
        <h1>GAS</h1>
        <h3>Balance On Chain : <span id="assets-gasbalance">0</span> GAS</h3>
        <h3>Last Transactions : <span id="index-balance"></span></h3>
        <img src="../assets/GAS.png" id="gas" href="javascript:;">
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'assetsForm',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assets-form {
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

.assets-form .assets-box {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 0 0 20px 0;
  overflow: hidden; }
  .assets-form .assets-box .record-a {
    color: #FF95AE;
    padding: 8px 20px 8px 8px; }

.assets-form .assets-box:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }

.assets-form .assets-box-left {
  position: relative;
  float: left;
  height: 82%;
  width: 40%;
  margin-right: 5%;
  word-break: break-all; }

.assets-form h1 {
  font-family: "yu gothic ui semibold";
  text-align: left;
  color: #000000;
  font-size: 29px;
  margin-top: 0; }

.assets-form h2 {
  font-size: 21px;
  margin: 10px 0;
  color: #000000; }

.assets-form h3 {
  font-size: 20px; }

.assets-form label {
  margin: 5px 0;
  font-weight: normal;
  font-size: 18px; }

.assets-form #private-key-show {
  cursor: pointer;
  padding-right: 10px;
  padding-left: 10px;
  border: none;
  font-size: 18px;
  background: #FC6686;
  margin: 15px 0 0;
  color: #ffffff;
  border-radius: 10px; }

.assets-form .assets-box img {
  width: 120px;
  height: 120px;
  position: absolute;
  top: 25px;
  right: 25px; }

.assets-form div p {
  display: inline;
  color: #000000;
  padding-left: 5px;
  font-weight: 500; }

</style>
