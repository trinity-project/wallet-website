<template>
  <div class="container">
    <div class="row mt-5">
        <div class="col-md-1 col-lg-2 col-xl-3"></div>
        <div class="col-md-10 col-lg-8 col-xl-6 main-column">
          <div class="panel panel-primary">
            <div class="panel-heading text-left">{{ MarketWallet }}</div>
            <div class="panel-body">
              <p>Balance on chain:{{ MarketBalance | FormatPrice }}</p>
              <p>Balance on channel:{{ MarketBalance | FormatPrice }}</p>
            </div>
          </div>
          <div class="page-header text-left">
            <h1>Commodity List</h1>
          </div>
          <div class="col-sm-6 col-md-4" style="margin-top:20px;" v-for="item in CommodityItem">
            <div class="thumbnail">
              <img :src="item.img">
              <div class="caption">
                <h3>{{ item.name }}</h3>
                <p><a @click="ChangeQuantity(item,1)"class="btn btn-primary" role="button">{{ item.price | FormatPrice}}</a>
                   <a @click="CommodityDetails(item)" class="btn btn-default" role="button" data-toggle="modal" data-target="#Details">Details</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-12 col-xl-12" style="margin-top:10px;">
            <div class="well">
              Current Invoice
            </div>
            <table v-if="Amount !== 0" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Commodity</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in FormatCommodityItem(CommodityItem)">
                <tr>
                  <td>{{ index | FormatNo }}</td>
                  <td>{{ item.name }}</td>
                  <td><a @click="ChangeQuantity(item,-1)"> - </a>{{ item.quantity }}<a @click="ChangeQuantity(item,1)"> + </a></td>
                  <td>{{ item.price * item.quantity | FormatPrice }}</td>
                  <td><span @click="ClearQuantity(item)" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td>
                </tr>
              </tbody>
            </table>
            <div v-if="Amount !== 0" class="text-right">Amount: {{ Amount | FormatPrice }}&nbsp;&nbsp;&nbsp;<button @click="CreatePaymentLink()" data-toggle="modal" data-target="#PaymentLinkForm" type="button" class="btn btn-primary">Payment</button></div>
          </div>
        </div>
        <div class="col-md-1 col-lg-2 col-xl-3"></div>
        <div class="modal fade" id="Details" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body clearfloat">
                <button type="button" class="close closeDetails" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <img :src="activeDetail.img">
                <h2>{{ activeDetail.name }}</h2>
                <p>Net Weight: {{ activeDetail.weight }}</p>
                <p>Price: {{ activeDetail.price | FormatPrice}}</p>
                <p>Place of origin: {{ activeDetail.origin }}</p>
                <button @click="DetailsChangeQuantity()" type="button" class="btn btn-primary" style="margin: 20px 0;">Add to Invoice</button>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      CommodityItem:[
        {
          "name": "Cucumber",
          "price": 1,
          "img": "static/img/cucumber.png",
          "origin": "China",
          "weight": "500g",
          "quantity": 0
        },
        {
          "name": "Pizza",
          "price": 2,
          "img": "static/img/pizza.jpg",
          "origin": "United States",
          "weight": "1kg",
          "quantity": 0
        },
        {
          "name": "Cherry",
          "price": 3,
          "img": "static/img/cherry.jpg",
          "origin": "Chile",
          "weight": "200g",
          "quantity": 0
        }
      ],
      activeDetail:{},
      Amount:0,
      WalletInfo:{
        "PrivateKey": "",
        "PublicKey": "",
        "ScriptHash": "",
        "Address": "Login in to transfer",
        "Balance": 0
      },
      MarketWallet:"AKauFqeT7ZGanD2p5LuSMUn3HpqsWdEdp9",
      MarketBalance:0,
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
      return val.toFixed(2) + 'TNC' ;
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
