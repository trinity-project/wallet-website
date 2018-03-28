<template>
  <form action="#" class="record-form scroll animate-box">
    <div class="row">
      <img src="images/trinity_HD.png" style="width: 600px;height: 600px;position: fixed;left: -241px;bottom: 180px;opacity: 0.3;">
      <div class="record-box record-box-left">
          <h1 style="font-size: 33px;">Record</h1>
          <h3>On the record page, you can see your previous transfer history.</h3>
      </div>
      <div class="record-box">
          <h1 style="margin-top: 10px;float: left;">Record List</h1>
      </div>
      <div id="records" class="record-body">
        <div class="record-box">
          <h2>Not yet have any record.</h2>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'channelRecord',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.record-form {
  padding: 80px 30px 0 30px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
  position: absolute !important;
  -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  background: url(../assets/bg_2.jpg) repeat;
  background-attachment: fixed; }

.record-form .record-box {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 0 0 20px 0;
  overflow: hidden; }

.record-form .record-box:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }

.record-form .record-box-left {
  position: relative;
  color: #000000;
  float: left;
  height: 82%;
  width: 40%;
  margin-right: 5%;
  word-break: break-all; }

.record-box h2 {
  display: inline;
  font-size: 21px;
  margin-top: 10px; }

.record-form h1 {
  font-family: "yu gothic ui semibold";
  font-size: 29px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

.record-form h3 {
  font-size: 20px;
  margin: 5px 0;
  display: inline-block; }

.record-form span {
  float: right;
  font-family: inherit;
  font-weight: 500;
  line-height: 23px;
  color: inherit;
  font-size: 18px; }

.record-form .icon-left {
  width: 24px;
  height: 24px;
  color: #000000;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
  float: left; }

.record-form div {
  position: relative; }

.record-form div p {
  color: #000000;
  font-weight: 500;
  margin-bottom: 0;
  max-width: 322px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; }

</style>
