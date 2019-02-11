<template>
  <div class="vue-calendar">
    <calendar-header :observer="vueCalendarObserver"></calendar-header>
    <calendar-body :observer="vueCalendarObserver"></calendar-body>
  </div>
</template>

<script>
import { initObserver } from './lib/Util.js'
import CalendarBody from './Component/CalendarBody'
import CalendarHeader from './Component/CalendarHeader'

export default {
  name: 'vue-calendar',
  components: {
    'calendar-body': CalendarBody,
    'calendar-header': CalendarHeader
  },
  props: {

  },
  data () {
    return {
      // 观察者对象
      vueCalendarObserver: {}
    }
  },
  created () {
    this.vueCalendarObserver = initObserver()
  }
}
</script>

<style lang="stylus" scoped>
.vue-calendar
  font-size 14px
  font-family sans-serif
</style>
