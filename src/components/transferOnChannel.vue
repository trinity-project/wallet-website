<template>
  <form action="#" class="transfer-form animate-box">
    <div class="row">
      <img src="../assets/trinity_HD.png" style="width: 600px;height: 600px;position: fixed;left: -106px;bottom: 2px;opacity: 0.3;">
      <div class="transfer-box transfer-box-left" style="position: relative;">
        <section class="p10">
          <a>{{ explainTitle }}</a>
        </section>
        <h3>{{ explain }}</h3>
      </div>
      <div class="transfer-box" style="position: relative;">
        <div class="form-group" style="display: none;">
          <svg class="icon icon-channel-name" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
          <label for="transfer-channel-name" class="sr-only">Channel Name</label>
          <input type="text" class="form-control" id="transfer-channel-name" placeholder="Channel Name" readonly="true">
        </div>
        <div class="form-group">
          <label for="transfer-address" style="font-size: 20px;">WalletID : </label>
          <input type="text" class="form-control" id="transfer-address" placeholder="WalletID">
        </div>
        <div class="form-group">
          <label for="transfer-assets" style="font-size: 20px;">Assets : </label>
          <select class="form-control" id="transfer-assets" disabled="disabled">
            <option>TNC</option>
            <option>NEO</option>
            <option>GAS</option>
          </select>
        </div>
        <div class="form-group">
          <label for="transfer-amount" style="font-size: 20px;">Amount : </label>
          <input type="number" class="form-control form-amount" id="transfer-amount" placeholder="Amount" autocomplete="off">
        </div>
        <div class="form-group" style="display: none;">
          <label for="transferReceiptCode" style="font-size: 20px;">Remote Receipt Code : </label>
          <input type="text" class="form-control form-amount" id="transferReceiptCode" placeholder="Remote Receipt Code" autocomplete="off">
        </div>
        <div class="form-group">
          <p class="total-amount">&nbsp;(Balance amount: <span>{{ tncBalance }}</span>TNC)</p>
        </div>
        <div class="form-group form-btn">
          <input type="button" value="Next" class="btn btn-transfer">
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'transOnChannelForm',
  data () {
    return {
      explainTitle:'  Transfer   on channel',
      explain:'Channel transaction is settled through a smart contract on the chain and real-time transactions are performed in the channel under the chain, so as to realize the instant payment of assets, low transaction cost, scalability and privacy protection and other advantages.'
    }
  },
  props:["tncBalance"],
  methods:{
    transferOnChannel:function(){
        if (!$("#transfer-address").val()) {
          alert("Address can't be empty.");
          return;
        }
        if (!$("#transfer-assets").val()) {
          alert("Assets can't be empty.");
          return;
        }
        if (!$("#transfer-amount").val()) {
          alert("Amount can't be empty.");
          return;
        }
        if ($("#transfer-amount").val() > Number($(".total-balance").text())) {
          alert("The transfer amount should be less than the balance amount.");
          return;
        }
        swal({
          title: "Payment",
          text: "transfer " + $("#transfer-amount").val() + "TNC to<br/>" + $("#transfer-address").val(),
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          html:true
        },
        function(){
          $.ajax({
            //url: TrinityTestNet + ":5000",
            url: "http://47.254.39.10:20552",
            type: "POST",
            data: JSON.stringify({
              "jsonrpc": "2.0",
              "method": "sendertoreceiver",
              "params": [$("#wallet_add").text(),$("#transfer-address").val(),$("#transfer-channel-name").val(),"TNC",$("#transfer-amount").val()],
              "id": 1
            }),
            contentType: 'application/json',
            success: function(message) {
              if (message.result && message.result.error) {
                swal(message.result.error, "","error");
              } else if (message.error) {
                swal(message.error.message, "","error");
              } else {
                swal("Transfer success!", "","success");
                $("#nav-btn-channel").click();
              }
            },
            error: function(message) {
              alert("error");
            }
          });
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transfer-form {
  padding: 80px 30px 0 30px;
  min-height: 100vh;
  position: absolute !important;
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

.transfer-box {
  padding: 20px;
  height: 82%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 2% 2% 20px;
  overflow: hidden;
  transition: all .3s;}

.transfer-box:hover {
  box-shadow: 0px 4px 20px rgba(0,0,0,.3);
  border-radius: 10px;
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
  border: none;
  background: #fff;}

.transfer-box-left {
  float: left;
  height: 82%;
  width: 40%;
  word-break: break-all; }

h1 {
  font-family: "yu gothic ui semibold";
  font-size: 33px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

h3 {
  font-size: 27px;
  line-height: 49px;
  margin: 39% 0;
  word-wrap: break-word; }

.form-group {
  margin: 35px 0; }

.form-group p {
  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300; }

.form-group a {
  color: #000000; }

label {
  font-size: 14px;
  font-weight: 300; }

.form-control {
  font-size: 18px;
  font-weight: 300;
  height: 66px;
  width: 100%;
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

.form-control::-webkit-input-placeholder {
  color: #E7E6E6;
  font-weight: 400;
  padding-right: 20%; }

.form-control:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4); }

.btn-transfer {
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

.btn-transfer:hover,
.btn-transfer:focus,
.btn-transfer:active {
  color: #ffffff;
  background: #FD6E7E !important;
  outline: none; }

.total-amount {
  color: #FF95AE !important;
  margin-bottom: 0px;
  font-weight: 500; }

.form-remark {
  border-bottom: none !important; }

.form-btn {
  width: 100%;
  text-align: center;
}
section a {
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  font-size: 48px;
  font-weight: 900;
  color: inherit;
}
section a:after, section a:before {
  content: '';
}
section.p10 a {
  width: 353px;
  height: 94px;
  line-height: 47px;
  position: absolute;
  top: 6%;
  left: 50%;
  margin-left: -176.5px;
}
section.p10 a:before, section.p10 a:after {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border-color: #FD6E7E;
  border-style: solid;
  border-width: 0;
  -webkit-transition: all 0.5s cubic-bezier(1, 0.2, 0.26, 0.7);
  -moz-transition: all 0.5s cubic-bezier(1, 0.2, 0.26, 0.7);
  transition: all 0.5s cubic-bezier(1, 0.2, 0.26, 0.7);
  -webkit-transform: translate(0px, 0px) scale(0.8);
  -moz-transform: translate(0px, 0px) scale(0.8);
  -ms-transform: translate(0px, 0px) scale(0.8);
  -o-transform: translate(0px, 0px) scale(0.8);
  transform: translate(0px, 0px) scale(0.8);
  opacity: 0;
}
section.p10 a:before {
  left: 0;
  bottom: 0;
  border-bottom-width: 1px;
  border-left-width: 1px;
}
section.p10 a:after {
  top: 0;
  right: 0;
  border-top-width: 1px;
  border-right-width: 1px;
}
.transfer-box-left:hover section.p10 a:before, .transfer-box-left:hover section.p10 a:after {
  -webkit-transition: all 2s cubic-bezier(0.14, 1.13, 0, 0.91);
  -moz-transition: all 2s cubic-bezier(0.14, 1.13, 0, 0.91);
  transition: all 2s cubic-bezier(0.14, 1.13, 0, 0.91);
  opacity: 1;
}
.transfer-box-left:hover section.p10 a:before {
  -webkit-transform: translate(-30px, 20px) scale(1);
  -moz-transform: translate(-30px, 20px) scale(1);
  -ms-transform: translate(-30px, 20px) scale(1);
  -o-transform: translate(-30px, 20px) scale(1);
  transform: translate(-30px, 20px) scale(1);
  border-bottom-width: 12px;
  border-left-width: 12px;
}
.transfer-box-left:hover section.p10 a:after {
  -webkit-transform: translate(30px, -20px) scale(1);
  -moz-transform: translate(30px, -20px) scale(1);
  -ms-transform: translate(30px, -20px) scale(1);
  -o-transform: translate(30px, -20px) scale(1);
  transform: translate(30px, -20px) scale(1);
  border-top-width: 12px;
  border-right-width: 12px;
}
</style>
