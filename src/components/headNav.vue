<template>
  <nav class="navbar">
    <div class="container-fluid">
        <h1><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>{{ title }}</h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'headNav',
  data () {
    return {
      title: 'Trinity SuperMarket'
    }
  },
  mounted() {

  },
  methods:{

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
  margin: 10px 0;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
}
span{
  margin-right: 10px;
}
.container-fluid{
  width: 50%;
  float: left;
  height: 56px;
  padding: 8px 16px;
}
</style>
