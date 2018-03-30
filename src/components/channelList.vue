<template>
  <form action="#" class="channel-edit-form">
    <div class="row">
      <img src="../assets/trinity_HD.png">

      <div class="channel-edit-box-left">
          <h1>{{ explainTitle }}</h1>
          <h3>{{ explain }}</h3>
      </div>
      <!-- <div class="channel-edit-box">
          <h1 style="margin-top: 10px;float: left;">{{ title }}</h1>
          <a id="channel-regist">Add Channel</a>
          <label class="iosCheck"><input type="checkbox" v-model="isCheck"><i @click="toggleCheck()"></i></label>
      </div> -->
      <div class="channel-edit-box">
          <h1 style="margin-top: 10px;display: inline-block;">{{ title }}</h1>
          <a id="channel-regist" @click="toAddChannel()">Add Channel</a>
          <hr style="margin-bottom: 0px;">
          <div id="channels">
            <div class="channelBody" v-for="(item,index) in ChannelItems" @click="clickfun(item,index)">
              <h2>{{ item.MessageBody.Name }}</h2>
              <label>Deposit:{{ item.MessageBody.Deposit }}</label><label>Date:{{ item.MessageBody.Date }}</label><label>Assets:{{ item.MessageBody.Asstes }}</label>
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
  props:["ChannelItems"],
  methods:{
    toAddChannel:function(){
      $('.channel-form').show();
      $(".channel-edit-form").hide();
      $("#regist-channel-address").val("");
      $("#regist-channel-deposit").val("");
      $("#regist-channel-time").val("");
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
  margin: 0 0 20px 0;
  overflow: hidden;
  height: 82%;
  position: relative;}

.channel-edit-box:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }

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
  margin-right: 5%;
  word-break: break-all; }

.channel-edit-box-left:hover {
  background: white;
  -webkit-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 6px 46px 2px rgba(0, 0, 0, 0.1); }


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
.channel-edit-box button{
  width: 45.5%;
  margin: 0 20px;
}

#channels{
  height: calc(100% - 102px);
  overflow: auto;
}

.channel-edit-form h1 {
  font-family: "yu gothic ui semibold";
  font-size: 33px;
  margin-top: 4%;
  color: #000000;
  text-align: center; }

.channel-edit-form h2 {
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; }

.channel-edit-form h3 {
  font-size: 26px;
  line-height: 49px;
  margin: 10px 0;
  word-wrap: break-word; }

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
</style>
