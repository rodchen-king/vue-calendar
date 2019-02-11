<template>
<div class="calendar-body">
  <div class="calendar-body-week" v-for="(weekItem, key) in weekList" :key=key>
    <div
      class="calendar-body-week-day"
      :class="{'calendar-body-current-month': dayItem.isCurrentMonth, 'calendar-body-current-day': dayItem.isCurrentDay}"
      v-for="(dayItem, key) in weekItem"
      :key=key>
      <span>{{dayItem.monthDay}}</span>
    </div>
  </div>
</div>
</template>

<script>
import {
  getFirstDayOfMonth,
  getFirstDayOfCalendar,
  formatDayWithTwoWords,
  isCurrentMonth,
  isCurrentDay
} from '../lib/Util.js'

export default {
  props: {
    // 观察者对象
    observer: {
      type: Object
    }
  },
  created () {
    // 注册观察者对象
    this.observer.addObserver({
      'update': this.update
    })

    // 设置当前月的第一天，用来数据初始话以及进行日期是否为当前月判断
    this.firstDayOfMonth = getFirstDayOfMonth(new Date())

    // 初始设置当前月日历数据
    this.setWeekListValue(this.firstDayOfMonth)
  },
  data () {
    return {
      // 日历标识数据
      firstDayOfMonth: new Date(),
      // 二维数组 6*7
      weekList: []
    }
  },
  methods: {
    /**
     * 日历方法
     */
    // 设置weekList值
    setWeekListValue (firstDayOfmonth) {
      this.weekList = []
      let dayOfCalendar = getFirstDayOfCalendar(firstDayOfmonth)

      // 遍历层数为6，因为日历显示当前月数据为6行
      for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
        let weekItem = []
        // 每一周为7天
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          let dayItem = {
            date: dayOfCalendar,
            monthDay: formatDayWithTwoWords(dayOfCalendar.getDate()),
            isCurrentMonth: isCurrentMonth(this.firstDayOfMonth, dayOfCalendar),
            isCurrentDay: isCurrentDay(dayOfCalendar)
          }
          weekItem.push(dayItem)

          // 当前日期加1，以此类推得到42条记录
          dayOfCalendar.setDate(dayOfCalendar.getDate() + 1)
        }

        this.weekList.push(weekItem)
      }
    },
    /**
     * 观察者模式相关方法
     */
    // 切换月份更新body数据
    update (content) {
      this.firstDayOfMonth = content
      this.setWeekListValue(content)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .calendar-body
    color #798999
    background #F7F8FA
    &-current-month
      color black
      background white
      cursor pointer
    &-current-day
      span
        background #7BDCFE
        border-radius 5px
    &-week
      display flex
      border-left 1px solid #E3ECF3
      &-day
        text-align left
        text-indent 20px
        width 20%
        min-height 90px
        line-height 50px
        border-right 1px solid #E3ECF3
        border-bottom 1px solid #E3ECF3
</style>
