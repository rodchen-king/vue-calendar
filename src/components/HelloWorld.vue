<template>
  <div class="main">
    <vue-calendar
      :weekLabelIndex="weekLabelIndex"
      @dayClick="dayClick" />
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
      weekLabelIndex: 0
    }
  },
  methods: {
    dayClick (dayItem) {
      // Todo customer
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
