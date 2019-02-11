<template>
  <div class="vue-calendar">
    <calendar-header
      :observer="vueCalendarObserver"/>
    <calendar-body
      :observer="vueCalendarObserver"
      :weekLabelIndex="weekLabelIndex"
      @dayClick="dayClick" />
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
    weekLabelIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // 观察者对象
      vueCalendarObserver: {}
    }
  },
  created () {
    this.vueCalendarObserver = initObserver()
  },
  methods: {
    dayClick (dayItem) {
      this.$emit('dayClick', dayItem)
    }
  }
}
</script>

<style lang="stylus" scoped>
.vue-calendar
  font-size 14px
  font-family sans-serif
</style>
