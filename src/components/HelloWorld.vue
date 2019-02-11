<template>
  <div class="main">
    <vue-calendar></vue-calendar>
  </div>
</template>

<script>
import VueCalendar from './VueCalendar'
export default {
  name: 'HelloWorld',
  components: {
    'vue-calendar': VueCalendar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    width: 70%;
  }
</style>
