<template>
  <div id="app">
    <head-nav/>
    <index/>
  </div>
</template>

<script>
import headNav from './components/headNav'
import index from './components/index'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  mounted:function(){
    this.$nextTick(function(){

    })
  },
  components: {
    headNav,
    index
  },
  methods:{

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
