<template>
  <form action="#" class="channel-edit-form">
    <div class="row">
      <img src="../assets/trinity_HD.png">

      <div class="channel-edit-box-left">
        <section class="p11">
          <a href="">
             {{ explainTitle }}
          </a>
        </section>
          <h3>{{ explain }}</h3>
      </div>
      <!-- <div class="channel-edit-box">
          <h1 style="margin-top: 10px;float: left;">{{ title }}</h1>
          <a id="channel-regist">Add Channel</a>
          <label class="iosCheck"><input type="checkbox" v-model="isCheck"><i @click="toggleCheck()"></i></label>
      </div> -->
      <div class="channel-edit-box">
          <h1 style="margin-top: 10px;display: inline-block;">{{ title }}</h1>
          <section class="p3">
            <a href="#" data-cont="Add Channel" @click="toAddChannel()">Add Channel</a>
          </section>
          <!-- <a id="channel-regist" @click="toAddChannel()">Add Channel</a> -->
          <hr style="margin-bottom: 0px;">
          <div id="channels">
            <div class="channelBody" v-for="(item,index) in formatChannelList(ChannelItems)" @click="clickfun(item,index)" style="position:relative">
              <h2>{{ item.Name }}</h2>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary" v-if="item.Flag==4" @click="Reconnect(item)">
                  <span class="glyphicon glyphicon-refresh"></span> Reconnect
                </button>
                <button type="button" class="btn btn-default" @click="closeChannel(item)">
                  <span class="glyphicon glyphicon-remove-circle"></span> Close
                </button>
              </div>
              <label>Deposit:{{ item.Deposit }}TNC</label>
              <label>Balance:{{ item.Balance }}TNC</label>
              <label>Status:{{ item.Flag | formatStatus }}</label>
              <hr>
            </div>
          </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'channelListForm',
  data () {
    return {
      title:'Channel List',
      isCheck:false,
      isActive:true,
      explainTitle:'Channel',
      explain:'The status channel is a technical realization of a chain expansion solution. Click on the channel, you can view the channel details, add a deposit, channel transfer and closing channels and other functions.',
      ChannelInfo:{}
    }
  },
  props:["ChannelItems"],
  computed:{

  },
  filters:{
    formatStatus:function(val){
      var x;
      switch (val)
      {
      case -1:
        x="Close";
        break;
      case 1:
        x="Closing";
        break;
      case 2:
        x="Opening";
        break;
      case 3:
        x="Open";
        break;
      case 4:
        x="Not connected";
        break;
      default:
        x="Error";
      }
      return x;
    }
  },
  watch: {//深度 watcher
    'isCheck': {
      handler: function (val, oldVal) {
        if (this.isCheck) {
          this.checked=true;
        }else{
          this.checked=false;
        }
      },
      deep: true
    },
    'ChannelInfo': {
      handler: function (val, oldVal) {
        this.$emit("channelListToApp",val);
      },
      deep: true
    }
  },
  computed: {

  },
  methods:{
    toAddChannel:function(){
      $('.channel-form').show();
      $(".channel-edit-form").hide();
      $("#regist-channel-address").val("");
      $("#regist-channel-deposit").val("");
      $("#regist-channel-name").val("");
    },
    toggleCheck:function(){
      if(this.isCheck){
        this.isCheck = false;
        alert("close fun")
      } else {
        this.isCheck = true;
        $('.channel-form').show();
        $(".channel-edit-form").hide();
        $("#regist-channel-address").val("");
        $("#regist-channel-deposit").val("");
        $("#regist-channel-time").val("");
      }
    },
    clickfun:function(item,index){
      this.ChannelInfo = item;
      $(".channel-info-form").show();
      $(".curtain").show();
    },
    formatChannelList:function(item){
          var l = [];
          this.ChannelItems.forEach(function(data,index){
            if(data.Flag > 0){
              l.push(data);
            }
          });
          return l
    },
    Reconnect:function(item){
      var ip = item.NodeID.split('@')[1];
      console.log(ip);
      this.$emit("Reconnect",ip,item.NodeID);
      event.stopPropagation();
      return false;
    },
    closeChannel:function(item){
      // if ($("#info-state").text() == "OPEN") {
      //     $(".channel-info-form").hide();
      //     $(".curtain").hide();
      //     swal({
      //       title: "Comfirm close channel?",
      //       type: "info",
      //       showCancelButton: true,
      //       closeOnConfirm: false,
      //       showLoaderOnConfirm: true,
      //     },
      //     function(){
      //
      //       });
      // } else {
      //   sweetAlert("Channel not in OPEN state.", "","error");
      // }
      //console.log(item);
      this.$emit("closeChannel",item);
      event.stopPropagation();
      return false;
    },
    formatDateTime:function(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel-edit-form {
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

.channel-edit-box {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 2% 2% 20px;
  overflow: hidden;
  height: 82%;
  position: relative;
  transition: all .3s;}

.channel-edit-box:hover {
  box-shadow: 0px 4px 20px rgba(0,0,0,.3);
  border-radius: 10px;
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
  border: none;
  background: #fff;}

.channel-edit-box-left {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 0 0 20px 0;
  overflow: hidden;
  position: relative;
  float: left;
  height: 82%;
  width: 40%;
  margin: 2% 2% 20px;
  transition: all .3s;}

.channel-edit-box-left:hover {
  box-shadow: 0px 4px 20px rgba(0,0,0,.3);
  border-radius: 10px;
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
  border: none;
  background: #fff;}

.channel-edit-form #channel-regist {
  float: right;
  font-size: 18px;
  line-height: 50px;
  color: #FD6E7E;
  cursor: pointer; }

.channel-edit-form #channel-button {
  display: inline;
  float: right;
  line-height: 55px; }

.nav-tabs{
  height: 44px;
}
.nav-tabs li{
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e1e1e1;
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
  margin: 0 0 20px 0;
  cursor: pointer;
}
.nav-tabs .active{
  color: rgba(0, 0, 0, 1);
  background: rgba(255, 255, 255, 1);
}
.transfer-msg-box{
  height: 426px;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #e1e1e1;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
/* .channel-edit-box button{
  width: 45.5%;
  margin: 0 20px;
} */
.btn-group{
  position: absolute;
  top: -5px;
  right: 5%;
}

#channels{
  height: calc(100% - 102px);
  overflow: auto;
}

h1 {
  font-family: "yu gothic ui semibold";
  font-size: 33px;
  margin-top: 4%;
  color: inherit;
  text-align: center; }

h2 {
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; }

h3 {
    margin: 36% 0;
    font-size: 22px;
    line-height: 49px;
    word-wrap: break-word;}

label {
  font-weight: normal;
  margin: 0 20px 0 0;}

img{
  display: flex;
  width: 900px;
  height: 900px;
  position: absolute;
  z-index: -1;
  right:-400px;
  bottom: 0px;
  opacity: 0.3;
}
.btn-primary{
  border: 1px solid rgb(173, 173, 173);
  background: #FF95AE;
}

.btn-primary:hover{
  background: #FD6E7E;
}

.channel-edit-form div p {
  color: #000000;
  font-weight: 500;
  margin-bottom: 0;
  max-width: 322px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.iosCheck{
  height: 30px;
  margin-bottom: 0px;
  position: absolute;
  top: 50%;
  right: 34px;
  transform: translateY(-50%);
}
.iosCheck input {
  display: none;
}
.iosCheck i {
  display: inline-block;
  cursor: pointer;
  padding-right: 40px;
  transition: all ease 0.4s;
  -webkit-transition: all ease 0.4s;
  border-radius: 25px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
}
.iosCheck i:before {
  display: block;
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.iosCheck :checked + i {
  padding-right: 0;
  padding-left: 40px;
  background: #FD6E7E;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 40px #FD6E7E;
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 40px #FD6E7E;
}
.sweet-alert h2 {
  font-size: 21px !important;
  margin: 18px 0 !important;
}
section.p11 a {
  width: 314px;
  height: 78px;
  line-height: 78px;
  position: absolute;
  top: 5%;
  left: 50%;
  margin-left: -157px;
  text-transform: uppercase;
}
section.p11 a:before, section.p11 a:after {
  content: '';
  position: absolute;
  height: 7px;
  left: 0;
  right: 0;
  -webkit-transform: translate(0, 30px);
  -moz-transform: translate(0, 30px);
  -ms-transform: translate(0, 30px);
  -o-transform: translate(0, 30px);
  transform: translate(0, 30px);
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
  transition: 0.3s all;
  opacity: 0;
}
section a {
  text-align: center;
  text-decoration: none;
  font-size: 48px;
  font-weight: 900;
  color: inherit;
}

.channel-edit-box-left:hover .p11 a{
  color: #FD6E7E;
}

section.p11 a:before {
  bottom: -6px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAAHCAYAAABumAQDAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAW5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4K72CKvQAAAI9JREFUaAXt1MENgCAMhWFgM1ZwD0fwxGKO5AJGJ+iF5iXNy89RYtN+j7S/5/W1omcca/bZ7t32mG1XLvcfucV+vMnYRnmTfZND2Ry1EUAAAQcBFqVDisyAAAJSARallJfiCCDgIMCidEiRGRBAQCrAopTyUhwBBBwEqi/KxwE5mIHZApjin8mteEBBe6ncftynI64eY6RAAAAAAElFTkSuQmCC);
  -webkit-animation: road 0.9s infinite linear;
  -moz-animation: road 0.9s infinite linear;
  animation: road 0.9s infinite linear;
}
section.p11 a:after {
  bottom: 8px;
  background-color: #FD6E7E;
}

.channel-edit-box-left:hover .p11 a:before,.channel-edit-box-left:hover .p11 a:after {
  -webkit-transform: translate(0, 0px);
  -moz-transform: translate(0, 0px);
  -ms-transform: translate(0, 0px);
  -o-transform: translate(0, 0px);
  transform: translate(0, 0px);
  opacity: 1;
}

@keyframes road {
  from {
    background-position: 0;
  }
  to {
    background-position: -330px;
  }
}

section.p3 a {
  width: 242px;
  height: 94px;
  line-height: 94px;
  position: absolute;
  top: 3px;
  left: 58%;
  font-weight: 300;
  z-index: 10;
  font-size: 25px;
  color: #FF95AE;
}
section.p3 a:before,
section.p3 a:after {
  content: attr(data-cont);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
section.p3 a:before {
  color: #FF0000;
}
section.p3 a:after {
  color: #FFBF00;
}
.channel-edit-box:hover .p3 a{
  color: #FD6E7E;
}
.channel-edit-box:hover section.p3 a:before {
  -webkit-animation: fire 3s infinite;
  -moz-animation: fire 3s infinite;
  -ms-animation: fire 3s infinite;
  animation: fire 3s infinite;
}

@keyframes fire {
  0% {
    -webkit-filter: blur(27px);
    filter: blur(27px);
  }
  10% {
    -webkit-filter: blur(37px);
    filter: blur(37px);
  }
  20% {
    -webkit-filter: blur(42px);
    filter: blur(42px);
  }
  30% {
    -webkit-filter: blur(28px);
    filter: blur(28px);
  }
  40% {
    -webkit-filter: blur(18px);
    filter: blur(18px);
  }
  50% {
    -webkit-filter: blur(25px);
    filter: blur(25px);
  }
  60% {
    -webkit-filter: blur(29px);
    filter: blur(29px);
  }
  70% {
    -webkit-filter: blur(32px);
    filter: blur(32px);
  }
  80% {
    -webkit-filter: blur(30px);
    filter: blur(30px);
  }
  90% {
    -webkit-filter: blur(35px);
    filter: blur(35px);
  }
  100% {
    -webkit-filter: blur(27px);
    filter: blur(27px);
  }
}
.channel-edit-box:hover section.p3 a:after {
  -webkit-animation: fire2 1.5s infinite;
  -moz-animation: fire2 1.5s infinite;
  -ms-animation: fire2 1.5s infinite;
  animation: fire2 1.5s infinite;
}
@keyframes fire2 {
  0% {
    -webkit-filter: blur(7px);
    filter: blur(7px);
  }
  10% {
    -webkit-filter: blur(17px);
    filter: blur(17px);
  }
  20% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
  }
  30% {
    -webkit-filter: blur(8px);
    filter: blur(8px);
  }
  40% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
  }
  50% {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }
  60% {
    -webkit-filter: blur(9px);
    filter: blur(9px);
  }
  70% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
  }
  80% {
    -webkit-filter: blur(10px);
    filter: blur(10px);
  }
  90% {
    -webkit-filter: blur(15px);
    filter: blur(15px);
  }
  100% {
    -webkit-filter: blur(17px);
    filter: blur(17px);
  }
}
</style>
