<template>
  <div id="app">
    <head-nav/>
    <index :InstantPrivateKey="InstantPrivateKey"/>
  </div>
</template>

<script>
import headNav from './components/headNav'
import index from './components/index'

export default {
  name: 'App',
  data () {
    return {
      InstantPrivateKey:""
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      var _this = this;
      setTimeout(function (){
           _this.CreatePrivateKey();
       }, 2000);
    })
  },
  components: {
    headNav,
    index
  },
  methods:{
    CreatePrivateKey:function(){
      this.InstantPrivateKey = ab2hexstring(generatePrivateKey());
    }
  }
}
</script>

<style>
body{
  height: 100vh;
  width: 100%;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
