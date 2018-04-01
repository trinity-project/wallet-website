<template>
  <form action="#" class="txonchain-form">
      <div class="row">
      <img src="../assets/trinity_HD.png" style="width: 500px;height: 500px;position: fixed;left: -52px;z-index: -1;bottom: 2px;opacity: 0.3;">
        <div class="txonchain-box txonchain-box-left" style="position: relative;">
          <ul class="ca-menu">
              <li>
                  <a href="#">
                      <span class="ca-icon">Transfer</span>
                          <h2 class="ca-main">on chain</h2>
                  </a>
              </li>
          </ul>
          <h3>Transfer on chain is normal digital currency transfer.Transfer is the process of transferring data currency from one address to another. If you want to transfer to others, you need to enter your wallet address, recipient address, transfer amount. </h3>
        </div>

      <div class="txonchain-box" style="position: relative;">
        <div class="form-group">
          <label for="txonchain-address" style="font-size: 20px;">Address : </label>
          <input type="text" class="form-control" id="txonchain-address" placeholder="Address">
        </div>
        <div class="form-group">
          <label for="txonchain-assets" style="font-size: 20px;">Assets : </label>
          <select class="form-control" id="txonchain-assets" disabled="disabled">
            <option>TNC</option>
            <option>NEO</option>
            <option>GAS</option>
          </select>
        </div>
        <div class="form-group">
          <label for="txonchain-amount" style="font-size: 20px;">Amount : </label>
          <input type="number" class="form-control form-amount" id="txonchain-amount" placeholder="Amount" autocomplete="off">
        </div>
        <div class="form-group">
          <p class="total-amount">&nbsp;(Balance on chain: <span>{{ tncBalance }}</span>TNC)</p>
        </div>
        <div class="form-group" style="text-align: center;">
          <input type="button" value="Next" class="btn btn-txonchain" @click="transferOnChain()">
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'transOnChainForm',
  data () {
    return {

    }
  },
  props:["tncBalance"],
  methods:{
    transferOnChain:function(){
      if($("#txonchain-address").val().length != 34){
        swal({
          title: "Error!",
          text:"Address length check failed.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
      if (!$("#txonchain-assets").val()) {
        swal({
          title: "Error!",
          text: "Assets can't be empty.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
      if (!$("#txonchain-amount").val()) {
        swal({
          title: "Error!",
          text: "Amount can't be empty.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
      if ($("#txonchain-amount").val() > Number($(".total-balance").text())) {
        swal({
          title: "Error!",
          text: "The transfer amount should be less than the balance amount.",
          type: "error",
          showCancelButton: false
        });
        return;
      }
        swal({
          title: "Payment",
          text: "transfer " + $("#txonchain-amount").val()  + "TNC to<br/>" + $("#txonchain-address").val(),
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          html:true
        },function(isConfirm){
        if (isConfirm) {
        $.ajax({
        //url: TrinityTestNet + ":5000",
        url: "http://47.254.39.10:20552",
        type: "POST",
        data: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "txonchain",
          "params": [$("#wallet_add").text(),$("#txonchain-address").val(),"TNC",$("#txonchain-amount").val()],
          "id": 1
        }),
        contentType: 'application/json',
        success: function(message) {
          if (message.result.error) {
            swal("error1!", message.result.error,"error");
            return;
          }
            txRawDataTest = message.result.tx_info;
            var pubKeyEncoded =getPublicKeyEncoded(ab2hexstring(pubkey));
            var signre = signatureData( txRawDataTest, privateKey);
            $.ajax({
              //url: TrinityTestNet + ":5000",
              url: "http://47.254.39.10:20552",
              type: "POST",
              data: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "sendrawtransaction",
                "params": [txRawDataTest, signre, pubKeyEncoded],
                "id": 1
              }),
              contentType: 'application/json',
              success: function(message) {
                //if (message.error) {
                  //swal("error!", message.error.message,"error");
                //} else
                if(message.error){
                  swal("Error!", message.error,"error");
                } else {
                  swal("Transfer success!", message.result.tx_id,"success");
                }
              },
              error: function(message) {
                alert("error");
              }
            });

        },
        error: function(message) {
          alert("error");
        }
      });
      }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.txonchain-form {
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

.txonchain-form .txonchain-box {
  padding: 20px;
  height: 82%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 2% 2% 20px;
  overflow: hidden;
  transition: all .3s;}

.txonchain-form .txonchain-box:hover {
  box-shadow: 0px 4px 20px rgba(0,0,0,.3);
  border-radius: 10px;
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
  border: none;
  background: #fff;}

.txonchain-form .txonchain-box-left {
  float: left;
  height: 82%;
  width: 40%;
  word-break: break-all; }

.txonchain-form h1 {
  font-family: "yu gothic ui semibold";
  font-size: 33px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

.txonchain-form h3 {
  font-size: 22px;
  line-height: 49px;
  margin: 10px 0;
  word-wrap: break-word; }

.txonchain-form h4 {
  width: 50%;
  font-family: "yu gothic ui semibold";
  letter-spacing: 0px;
  font-size: 17px;
  color: #000000;
  margin: 0 0 30px 0; }

.txonchain-form .icon-left {
  width: 20px;
  height: 20px;
  margin-left: -18px;
  margin-bottom: 22px;
  color: #000000;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer; }

.txonchain-form .form-group {
  margin: 35px 0; }

.txonchain-form .form-group p {
  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300; }

.txonchain-form .form-group a {
  color: #000000; }

.txonchain-form .form-group svg {
  position: absolute;
  lineheight: 66px;
  /* margin: 20px 0; */
  right: 4px;
  font-size: 15px;
  /* float: right; */
  top: calc(50% - 15px);
  padding: 4px;
  border: 1px solid #E7E6E6;
  border-radius: 50%;
  cursor: pointer; }

.txonchain-form label {
  font-size: 14px;
  font-weight: 300; }

.txonchain-form .form-control {
  font-size: 18px;
  font-weight: 300;
  height: 66px;
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

.txonchain-form .form-control::-webkit-input-placeholder {
  color: #E7E6E6;
  font-weight: 400;
  padding-right: 20%; }

.txonchain-form .form-amount::-webkit-input-placeholder {
  color: #E7E6E6;
  font-weight: 400;
  font-size: 18px;
  line-height: 60px !important; }

.txonchain-form .form-control:focus,
.txonchain-form .form-control:active {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4); }

.txonchain-form #amount-svg1 {
  width: 49px;
  height: 30px;
  color: #FFFFFF;
  text-align: center;
  position: absolute;
  right: 4px;
  font-size: 15px;
  top: calc(50% - 15px);
  padding: 4px;
  background: #3E496A;
  border-radius: 8px; }

.txonchain-form .btn-txonchain {
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

.btn-txonchain:hover,
.btn-txonchain:focus,
.btn-txonchain:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

.total-amount {
  color: #FF95AE !important;
  margin-bottom: 0px;
  font-weight: 500; }

.clearfix:after{
  content: "";
  display: block;
  clear: both;
}

.ca-menu{
    padding:0;
    margin:20px auto;
    width: 1020px;
}
.ca-menu li{
    width: 230px;
    height: 230px;
    border: 10px solid #FC6686;
    overflow: hidden;
    position: relative;
    float:left;
    background: #fff;
    margin-right: 4px;
    -webkit-box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    -moz-box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    -webkit-border-radius: 125px;
    -moz-border-radius: 125px;
    border-radius: 125px;
    -webkit-transition: all 400ms linear;
    -moz-transition: all 400ms linear;
    -o-transition: all 400ms linear;
    -ms-transition: all 400ms linear;
    transition: all 400ms linear;
}
.ca-menu li:last-child{
    margin-right: 20px;
}
.ca-menu li a{
    text-align: left;
    width: 100%;
    height: 100%;
    display: block;
    color: #333;
    position: relative;
}
.ca-icon{
    font-family: 'WebSymbolsRegular', cursive;
    font-size: 40px;
    color: #FC6686;
    line-height: 60px;
    position: absolute;
    width: 100%;
    height: 60px;
    left: 0px;
    top: 50px;
    text-align: center;
    -webkit-transition: all 400ms linear;
    -moz-transition: all 400ms linear;
    -o-transition: all 400ms linear;
    -ms-transition: all 400ms linear;
    transition: all 400ms linear;
}
.ca-main{
    font-family: 'WebSymbolsRegular', cursive;
    font-size: 24px;
    color: #FC6686;
    position: absolute;
    top: 110px;
    height: 80px;
    width: 170px;
    left: 50%;
    margin-left: -85px;
    text-align: center;
    -webkit-transition: all 400ms linear;
    -moz-transition: all 400ms linear;
    -o-transition: all 400ms linear;
    -ms-transition: all 400ms linear;
    transition: all 400ms linear;
    opacity: 0.8;
}
.ca-menu li:hover{
    background: #f7f7f7;
    border-color: #fff;
    width: 250px;
    height: 250px;
    -webkit-transform: rotate(-30deg);
    -moz-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    transform: rotate(-30deg);
}
.ca-menu li:hover .ca-icon{
    color: #555;
    font-size: 46px;
}
.ca-menu li:hover .ca-main{
  color: #555;
}
</style>
