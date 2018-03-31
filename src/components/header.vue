<template>
  <div class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse"
          data-target="#example-navbar-collapse">
        <span class="sr-only">Change Nav</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- <img src="../assets/logo.png" id="nav-logo" @click="showFormFun(0)"> -->
      <img src="../assets/logo.png" id="nav-logo">
      <h1 class="nav-title">Trinity</h1>
      <!-- <div id="gatewaySetting" style="float:left">
        <select>
            <option>http://localhost</option>
            <option>http://TrinityTestNet</option>
        </select>
        <button type="button" name="gatewayButton" v-on:click="navthreadPoxi()">连接</button>
      </div> -->
    </div>
    <div class="collapse navbar-collapse" id="example-navbar-collapse">
      <ul class="nav navbar-nav">
        <li v-for="(item, index) in items" :class="{ active: isact == index }"><a href="javascript:;" @click="showFormFun(index)">{{ item.select }}</a></li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trinityNav',
  data () {
    return {
     isact: 0,
     items:[
        {select:'Home'},
        {select:'Transfer'},
        {select:'Channel'},
        // {select:'Setting'}
     ]
    }
  },
  methods: {
  navthreadPoxi:function(){  // 实际调用的方法
    this.$emit('threadPoxi');
    // if ("WebSocket" in window)
    //   {
    //      alert("您的浏览器支持 WebSocket!");        // 打开一个 web socket
    //      var ws = new WebSocket("ws://192.168.204.207:8765");
    //      ws.onopen = function()           // Web Socket 已连接上，使用 send() 方法发送数据
    //      {
    //         ws.send("发送数据");
    //         console.log("数据发送中...");
    //      };
    //      ws.onmessage = function (evt)
    //      {
    //         var received_msg = evt.data;
    //         console.log(received_msg);
    //         console.log("数据已接收...");
    //      };
    //      ws.onclose = function()          // 关闭 websocket
    //      {
    //         console.log("连接已关闭...");
    //      };
    //   }
    //   else
    //   {
    //      alert("您的浏览器不支持 WebSocket!");       // 浏览器不支持 WebSocket
    //   }
    },
    showFormFun:function(index){
      this.$options.methods.hideall.bind(this)();
      this.isact = index;
      switch(index)
      {
        case 0:
          $(".index-form").show();
          //this.$emit(getAssetsBalance());
          getchannelstate();
          break;
        case 1:
          $(".txonchain-form").show();
          $("#txonchain-address").val("");
          $("#txonchain-amount").val("");
          break;
        case 2:
          $(".channel-edit-form").show();
          getchannelstate();
          break;
        case 3:
          $(".setting-form").show();
          break;
      }
    },
    hideall:function(){
      $(".index-form").hide();
      $(".assets-form").hide();
      $(".txonchain-form").hide();
      $(".channel-edit-form").hide();
      $(".channel-form").hide();
      $(".transfer-form").hide();
      $(".record-form").hide();
      $(".setting-form").hide();
    },
    activeNav:function(item, index){
      this.$nextTick(function () {
        this.items.forEach(function (item) {
          Vue.set(item,'active',false);
        });
        Vue.set(item,'active',true);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  width: 100%;
  max-width: 1050px;
  min-width: 755px;
  height: 58px;
  position: fixed !important;
  top: 0;
  z-index: 333;
  margin: auto;
  left: 0;
  right: 0;
  margin-bottom: 0;
  filter: blur(5px);
}
#nav-logo {
  width: 58px;
  padding: 8px;
  float: left;
  transform: rotate(0);
  animation: rotating 9s linear infinite;
  transform-origin: 50% 54%;
}

.nav-title{
  display: block;
  margin: 0 0 0 10px;
  padding: 1px 0 0 0;
  font-size: 29px;
  line-height: 58px;
  float: left;
  color: #000000;
  font-weight: 400;
}

/* #gatewaySetting select {
  border: solid 0px #000;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
  padding-right: 14px;
  position: relative;
  transform: translateY(70%);
}
#gatewaySetting select::-ms-expand {
  display: none;
} */
.navbar-nav {
  height: 40px;
  position: absolute;
  top: 50%;
  right: 20px;
  margin-top: -20px;
}

.nav>li {
  height: 40px;
  margin: 0 0 0 20px;
}

.navbar-nav > li > a {
  padding: 10px;
  font-weight: 600;
  line-height: 20px;
  background-color: transparent; }

.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:focus,
.navbar-default .navbar-nav > .active > a:hover {
  color: #FF95AE;
  background-color: transparent;
  border: 2px #FF95AE solid;
  padding: 9px;
  border-radius: 5px;}

@media screen and (max-width: 768px) {
  .navbar-nav > li > a {
    padding-top: 22px;
    padding-bottom: 22px; } }

  @keyframes rotating{
  0%   {transform:rotate(0);}
  16%  {transform:rotate(120deg);}
  33%  {transform:rotate(120deg);}
  49%  {transform:rotate(240deg);}
  66%  {transform:rotate(240deg);}
  83%  {transform:rotate(360deg);}
  100% {transform:rotate(360deg);}
  }
</style>
