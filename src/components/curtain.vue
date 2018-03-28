<template>
  <div id="curtain" class="curtain"></div>
</template>

<script>
export default {
  name: 'curtain',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.curtain {
  background-color: black;
  /* IE8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";
  /* IE8 */
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* display: none; */
  z-index: 9999; }

</style>
