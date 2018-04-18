<template>
  <div class="container">
    <div class="row mt-5">
        <div class="col-md-1 col-lg-2 col-xl-3"></div>
        <div class="col-md-10 col-lg-8 col-xl-6 main-column">
          <div class="panel panel-primary">
            <div class="panel-heading text-left">{{ WalletInfo.Address }}</div>
            <div class="panel-body">
              <p>Current Wallet Balance</p>
              <p>{{ WalletInfo.Balance | FormatPrice }}</p>
            </div>
          </div>
          <div class="alert alert-success" role="alert">...</div>
          <div class="panel panel-default">
            <div class="panel-body">
              <ul id="myTab" class="nav nav-tabs">
                  <li class="active"><a href="#Send" data-toggle="tab">Send</a></li>
                  <li><a href="#Receive" data-toggle="tab">Receive</a></li>
                  <li><a href="#Network" data-toggle="tab">Channel</a></li>
              </ul>
              <div id="myTabContent" class="tab-content">
                  <form class="tab-pane fade in active" id="Send">
                    <div class="form-group">
                      <label for="InputInvoice">Lightning Invoice:</label>
                      <input type="text" class="form-control" id="InputInvoice" placeholder="">
                    </div>
                    <button type="submit" class="btn btn-default btn-lg">Transfer</button>
                  </form>
                  <form class="tab-pane fade" id="Receive">
                    <div class="form-group">
                      <label for="InputReceive">Receive:</label>
                        <div class="input-group">
                          <input v-model="Amount" class="form-control request-amount" min="0.00001" max="50" placeholder="0.00000" step="0.00001" type="number">
                          <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Create</button>
                          </span>
                        </div>
                    </div>
                  </form>
                  <form class="tab-pane fade" id="Network">
                    <div class="form-group">
                      <label for="InputChannel">Channel:</label>
                      <input type="text" class="form-control" id="InputChannel" placeholder="">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1 col-lg-2 col-xl-3"></div>
        <div class="modal fade" id="PaymentLinkForm" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body clearfloat">
                <button type="button" class="close closeLoginIn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3>Requested Payment</h3>
                <h4>
                  <span style="color:red;">Amount: {{ Amount | FormatPrice }}</span><br>
                  Lightning Invoice:<br>
                </h4>
                <div class="input-group">
                  <input v-model="PaymentLink" id="Paymentlink" readonly="readonly" class="form-control request-amount" placeholder="PaymentLink" type="text">
                  <span class="input-group-btn">
                    <button @click="copyfun" data-clipboard-target="#Paymentlink" class="btn btn-default btncopy" type="button"><span class="glyphicon glyphicon-file" aria-hidden="true"></span>Copy</button>
                  </span>
                </div>
                <img :src="PaymentQRCode"/>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="Login" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body clearfloat">
                <button type="button" class="close closeLoginIn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3>Welcome to Trinity SuperMarket!</h3>
                <h4>Welcome to your very own instant wallet! You are almost ready to send and receive tBTC on the Lightning Network.<br>
                  <span style="color:red;">Write down your recovery secret to come back to this wallet.<br>
                  Do not lose or share this recovery secret. Without it, your wallet will be lost.</span>
                </h4>
                <h4>Recovery Secret:</h4>
                <div class="alert alert-info" role="alert">{{ InstantPrivateKey }}</div>
                <button @click="Login(InstantPrivateKey)" type="button" class="btn btn-primary">Got it, I wrote it down!</button>
                <button data-toggle="modal" data-target="#LoginForm" data-dismiss="modal" aria-label="Close"  type="button" class="btn btn-link">Recover existing wallet...</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="LoginForm" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body clearfloat">
                <button type="button" class="close closeLoginIn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3>Wallet Recovery</h3>
                <h4>Already have an existing wallet? Awesome! You can restore your wallet with your recovery secret that you wrote down when you started up your wallet last time.
                </h4>
                <br>
                <div class="form-group">
                  <h4>Recovery Secret:</h4>
                  <input v-model="WalletInfo.PrivateKey" type="text" class="form-control" placeholder="">
                </div>
                <button @click="Login(WalletInfo.PrivateKey)" type="button" class="btn btn-primary">Recover Wallet</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bus from './bus.js'

export default {
  name: 'index',
  data () {
    return {
      Amount:0,
      WalletInfo:{
        "PrivateKey": "",
        "PublicKey": "",
        "ScriptHash": "",
        "Address": "Login in to transfer",
        "Balance": 0
      },
      PaymentLink:"",
      PaymentQRCode:"",
      Websock: null,
      LoginFlag:false
    }
  },
  props:["InstantPrivateKey"],
  filters:{
    FormatNo:function(val){
      return val+1;
    },
    FormatPrice:function(val){
      if(!val) return '0TNC';
      return val + 'TNC' ;
    }
  },
  watch: {
    CommodityItem:{
      handler:function(CommodityItem){
        this.CalcTotalmoney();
      },
      deep:true
    },
    WalletInfo:{
      handler:function(WalletInfo){
        this.GetAssetsBalance();
      },
      deep:true
    },
    PaymentLink:{
      handler:function(PaymentLink){
        this.PaymentQRCode = "http://qr.liantu.com/api.php?text=" + PaymentLink;
      },
      deep:true
    }
  },
  mounted() {
    this.$nextTick(function(){
        var _this = this;
        setTimeout(function (){
             _this.GetMarketBalance();
         }, 1000);
  	}),
    Bus.$on('SignOutFlag', (e) => {
         if(e){
           this.WalletInfo = {
             "PrivateKey": "",
             "PublicKey": "",
             "ScriptHash": "",
             "Address": "Login in to transfer",
             "Balance": 0
           }
         }
     })
  },
  methods:{
    CommodityDetails:function(item){
      this.activeDetail = item;
    },
    FormatCommodityItem:function(item){
      let l = [];
      item.forEach(function(data,index){
        if(data.quantity > 0){
          l.push(data);
        }
      });
      return l
    },
    ChangeQuantity:function(item,type){
      if (type>0) {
        item.quantity++;
      } else{
        if(item.quantity < 1){
          item.quantity = 0;
        }else{
          item.quantity--;
        }
      }
    },
    DetailsChangeQuantity:function(){
      let _this = this;
      _this.CommodityItem.forEach(function(data,index){
        if(data.name === _this.activeDetail.name){
          data.quantity++;
        }
      });
      $(".closeDetails").click();
    },
    ClearQuantity:function(item){
      item.quantity = 0;
    },
    CalcTotalmoney:function(){
			let _this = this;
			this.Amount = 0;
			this.CommodityItem.forEach(function(data,index){
				_this.Amount += data.price * data.quantity;
			});
		},
    GetMarketBalance:function(){
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
          "params": [this.MarketWallet],
          "id": 1
        })
      }).then(function(res){
        _this.MarketBalance = res.data.result.tncBalance;
      });
    },
    copyfun:function(){
      var clipboard = new ClipboardJS('.btncopy');
      //成功回调
      clipboard.on('success', function(e) {
          e.clearSelection();
      });
      //失败回调
      clipboard.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
      });
    },
    threadPoxiForTxid(){  // 实际调用的方法
     //参数
     const agentData = "mymessage";
     //若是ws开启状态
     if (this.WebsockForTxid.readyState === this.WebsockForTxid.OPEN) {
       var _this = this;
        _this.WebsocketSendForTxid(agentData)
     }
     // 若是 正在开启状态，则等待300毫秒
     else if (this.WebsockForTxid.readyState === this.WebsockForTxid.CONNECTING) {
         var _this = this;//保存当前对象this
         setTimeout(function () {
             _this.WebsocketSendForTxid(agentData)
         }, 300);
     }
     // 若未开启 ，则等待500毫秒
     else {
         this.initWebSocketForTxid();
         var _this = this;//保存当前对象this
         setTimeout(function () {
             _this.WebsocketSendForTxid(agentData)
         }, 500);
     }
    },
    initWebSocket(){ //初始化weosocket
     //ws地址
     const wsuri = "ws://118.89.44.106:8766";
     this.WebsockForTxid = new WebSocket(wsuri);
     this.WebsockForTxid.onmessage = this.WebsocketOnmessageForTxid;
     this.WebsockForTxid.onclose = this.WebsocketCloseForTxid;

     var _this = this;
     setTimeout(function (){
          _this.WebsocketSendForTxid();
      }, 3000);
    },
    WebsocketOnmessage(e){ //数据接收
     const redata = JSON.parse(e.data);
     const type = redata.type;
     // if(type == "block_info"){
     //   this.websocketsend2(redata);
     //   //this.$options.methods.StoreChannel.bind(this)();
     // }
     console.log(redata);
    },
    WebsocketSend:function(){//数据发送模板
     //console.log("发送信息：" + "1");
     //this.WebsockForTxid.send("1");
    },
    WebsocketClose(e){  //关闭
     console.log("connection closed (" + e.code + ")");
    },
    CreatePaymentLink:function(){
      this.PaymentLink = "";
      this.PaymentLink += this.MarketWallet+"/";
      this.PaymentLink += this.Amount;
    },
    Login:function(a){
      this.WalletInfo.PrivateKey = a; //私钥
      var b = ab2hexstring(getPublicKey(this.WalletInfo.PrivateKey,0)); //公钥
      this.WalletInfo.PublicKey =getPublicKeyEncoded(b); //压缩
      var c =createSignatureScript(this.WalletInfo.PublicKey);     //脚本
      this.WalletInfo.ScriptHash = getHash(c).toString();     //脚本哈希
      this.WalletInfo.Address = ToAddress(this.WalletInfo.ScriptHash); //钱包地址
      this.LoginFlag = true;
      Bus.$emit('flag', this.LoginFlag);
      $(".closeLoginIn").click();
    },
    GetAssetsBalance:function(){
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
          "params": [this.WalletInfo.Address],
          "id": 1
        })
      }).then(function(res){
        _this.WalletInfo.Balance = res.data.result.tncBalance;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  min-height: 600px;
}
h2{
  float: left;
  width: calc(100% - 315px);
  margin-top: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
h3{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
h4{
  font-size: 16px;
  line-height: 24px;
}
p .btn{
  width: 48%;
}
.modal-body p{
  float: left;
  width: calc(100% - 315px);
  color: #67919c;
  font-size: 16px;
  margin-top: 10px;
}
li a{
  padding: 8px 16px;
  color: #0062cc;
  font-size: 16px;
}
.page-header{
  margin: 0;
}
.thumbnail btn{
  cursor: pointer;
}
.thumbnail img{
  width: 211px;
  height: 167px;
}
.panel-heading{
  font-size: 19px;
  font-weight: 400;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.panel-body{
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.panel-body p{
  margin: 0;
}
.tab-pane{
  padding-top:15px;
}
.form-group{
  text-align: left;
}
.modal-dialog {
  margin: 300px auto;
}
.modal-body{
  text-align: left;
}
.modal-body img{
  width: 300px;
  float: left;
  margin-right: 15px;
}
#PaymentLinkForm .modal-dialog{
  margin: 170px auto;
}
.well{
  font-size: 19px;
  font-weight: 400;
  text-align: left;
}
thead th{
  text-align: center;
}
tbody tr td a,tbody tr td span{
  cursor: pointer;
}
.alert-info{
  font-size: 15px;
}
.form-control,.input-group .btn{
  height: 44px;
}
.clearfloat:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
}
.clearfloat{
  zoom:1
}
</style>
