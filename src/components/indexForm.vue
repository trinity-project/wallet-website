<template>
  <form action="#" class="index-form">
    <div class="row" style="overflow:visible">
    <img src="../assets/trinity_HD.png" style="width: 600px;position: fixed;z-index: -1;right: -216px;bottom: 20px;opacity: 0.3;">
    <div class="index-title"><span>My Wallet</span></div>
    <div class="index-box" style="position: relative;">

      <!-- <h2>Name : Wallet</h2> -->
      <h2>Wallet Address : <a id="wallet_add">{{ Address }}</a></h2><br>
      <h2>Script Hash : </h2><span>{{ ScriptHash }}</span><br>
      <h2>Public Key : </h2><span>{{ PublicKeyEncode }}</span><br/>
      <h2>Private Key : </h2><span id="private-key-show" @click="privateKeyShowFun()">{{ privateKeyShowBtn }}</span><span v-show="privateKeyShow">{{ PrivateKey }}</span><br/>
      <!-- <h2>Download Wallet File: </h2><span id="assets-wallet-file"><a href="javascript:;" id="testa">download</a></span> -->
      <img :src="AddressQRCode" id="wallet_qr" @click="walletQr()"/>
    </div>
    <div class="index-title"><span>Assets</span></div>
    <div class="index-box">
      <div class="assets-box">
        <h3>NEO</h3>
        <p>Balance On Chain : <span>{{ neoBalance }}</span> NEO</p>
        <img src="../assets/NEO.png" id="neo">
      </div>
      <div class="assets-box">
        <h3>TNC</h3>
        <p>Balance On Chain : <span>{{ tncBalance }}</span> TNC</p>
        <img src="../assets/trinity.png" id="tnc">
      </div>
      <div class="assets-box">
        <h3>GAS</h3>
        <p>Balance On Chain : <span>{{ gasBalance }}</span> GAS</p>
        <img src="../assets/GAS.png" id="gas">
      </div>
      <div class="assets-box">
        <h3 style="line-height: 156px;">Add New</h3>
      </div>
    </div>
    <div class="index-title"><span>Channel</span></div>
    <div class="index-box">
      <table class="table table-hover" style="margin-bottom: 0;" v-if="tableShow">
        <thead>
          <tr>
            <th>Channel Alias</th>
            <th>Deposit</th>
            <th>Balance</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in formatChannelList(ChannelItems)">
        			<td>{{ item.Name }}</td>
        			<td>{{ item.Deposit }}TNC</td>
              <td>{{ item.Balance }}TNC</td>
        			<td>Open</td>
        		</tr>
        </tbody>
      </table>
      <h4 v-else>Not yet have a channel.</h4>
    </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'indexForm',
  data () {
    return {
      privateKeyShowBtn:'Show',
      privateKeyShow:false,
      tableShow:false
    }
  },
  props:["ChannelItems","PrivateKey","PublicKey","PublicKeyEncode","Script","ScriptHash","Address","AddressQRCode","gasBalance","neoBalance","tncBalance"],
  watch: {
    'ChannelItems': {   //ChannelItems有值时
      handler: function (val, oldVal) {
        if(val.length !== 0){
          this.tableShow = true;
        }
      },
      deep: true
    }
  },
  methods:{
    walletQr:function(){
      swal({
        title: "Wallet Address",
        text: $("#wallet_add").html(),
        imageUrl: this.AddressQRCode,
        imageSize:  "200x200",
        confirmButtonText:"Close",
        allowOutsideClick:"ture"
      });
    },
    privateKeyShowFun:function() {
      if(this.privateKeyShowBtn == 'Show'){
        this.privateKeyShowBtn = 'Hide';
        this.privateKeyShow = true;
      } else {
        this.privateKeyShowBtn = 'Show';
        this.privateKeyShow = false;
      }
    },
    formatChannelList:function(item){
      var l = [];
      this.ChannelItems.forEach(function(data,index){
        if(data.Flag > 0){
          l.push(data);
        }
      });
      return l.slice(0,2);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-form {
  padding: 57px 30px 0 30px;
  min-height: 100vh;
  -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  background: url(../assets/bg_2.jpg) repeat;
  background-attachment: fixed;
  filter: blur(5px);
}
.index-title {
    position: relative;
    margin: 25px 0;
    text-align: center;
}
.index-title:before {
    position: absolute;
    top: 50%;
    left: 0;
    content: "";
    width: 100%;
    height: 1px;
    background: #ccc;
    z-index: 0;
}
.index-title span {
    position: relative;
    padding: 0 1em;
    background-color: rgba(245, 245, 245, 1);
    font-family: "moderat", sans-serif;
    font-weight: bold;
    font-size: 20px;
    color: #605F5F;
    z-index: 1;
}
.index-box {
  padding: 20px;
  width: 90%;
  margin:0 auto;
  transition: all .3s;
  box-sizing: border-box;
  padding: 20px;
}
.index-box .record-a {
    color: #FF95AE;
    padding: 8px 20px 8px 8px; }

.index-box:hover {
  box-shadow: 0px 4px 20px rgba(0,0,0,.3);
  border-radius: 10px;
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
  border: none;
  /*border: 1px solid #ccc;*/
  background: #fff;}

.index-box .assets-box{
  width: 25%;
  float: left;
  text-align: center;
}

.index-box .assets-box img{
  width: 100px;
  height: 100px;
}

.index-box:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
}

h1 {
  /* font-family: "yu gothic ui semibold"; */
  text-align: left;
  font-size: 26px;
  color: #000000;
  font-size: 28px;
  margin-top: 0; }

h2 {
  /* font-family: "yu gothic ui semibold"; */
  text-align: left;
  font-size: 20px;
  margin: 0 0 13px 0;
  color: #000000;
  display:inline-block;
  cursor:default}

h2 span {
  margin-left: 6px; }

h3 {
  /* font-family: "yu gothic ui semibold"; */
  font-size: 20px;
  margin: 10px 0;
  color: #000000;
  text-align: center; }

h4{
  text-align: center;
}

a {
  color: inherit;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease; }

a:hover {
  color: inherit;
  text-decoration: none;}

label{
  margin-left: 12px;
}

#private-key-show{
  cursor: pointer;
  margin: 0 10px;
}

.index-box #wallet_qr {
  position: absolute;
  width: 80px;
  bottom: 20px;
  right: 20px;
  cursor:pointer;}

@media screen and (max-width: 768px) {
  .index-form {
    padding: 46px 30px 30px 30px; }
  h2 {
    font-size: 24px;
    margin: 0 0 79px 0; }
  p {
    font-size: 13px; }
  h1 {
    margin: 13px 0 0px 0; }
  h3 {
    margin: 7px 0 79px 0; }
}
</style>
