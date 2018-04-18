<template>
  <nav class="navbar">
    <div class="container-fluid">
        <h1><span class="glyphicon glyphicon-credit-card" aria-hidden="true"></span>{{ title }}</h1>
        <a v-if="!LoginFlag" data-toggle="modal" data-target="#Login" class="navbar-link navbar-right"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>Sign In</a>
        <a v-if="LoginFlag" @click="SignOutFun()" class="navbar-link navbar-right"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>Sign Out</a>
    </div>
  </nav>
</template>

<script>
import Bus from './bus.js'
export default {
  name: 'headNav',
  data () {
    return {
      title: 'Trinity Wallet',
      LoginFlag:false
    }
  },
  mounted() {
     Bus.$on('flag', (e) => {
         this.LoginFlag = e
     })
  },
  methods:{
    SignOutFun:function(){
      Bus.$emit('SignOutFlag', true);
      this.LoginFlag = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-weight: normal;
  float: left;
  font-size: 21px;
  margin: 7px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a{
  color: #343a40;
  /* margin: 12px 0; */
  line-height: 44px;
  font-size: 19px;
  font-weight: 400;
  cursor: pointer;
}
span{
  margin-right: 10px;
}
.container-fluid{
  height: 56px;
  padding: 8px 16px;
}
.navbar-right{
  margin-right: 20px;
}
</style>
