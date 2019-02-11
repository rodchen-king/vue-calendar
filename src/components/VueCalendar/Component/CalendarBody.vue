<template>
<div class="calendar-body">
  <div class="calendar-body-week-label">
    <div
      class="calendar-body-week-label-day"
      :class="{'red-font': index + weekLabelIndex === 6 || index + weekLabelIndex === 7 || (index === 0 && weekLabelIndex === 0)}"
      v-for="(weekLabelItem, index, key) in weekLabelArray"
      :key=key>
      <span>{{weekLabelItem}}</span>
    </div>
  </div>
  <div class="calendar-body-week" v-for="(weekItem, key) in weekList" :key=key>
    <div
      class="calendar-body-week-day"
      :class="{'calendar-body-current-month': dayItem.isCurrentMonth, 'calendar-body-current-day': dayItem.isCurrentDay, 'red-font': index + weekLabelIndex === 6 || index + weekLabelIndex === 7 || (index === 0 && weekLabelIndex === 0)}"
      @click="clickDay(dayItem)"
      v-for="(dayItem, index, key) in weekItem"
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
  isCurrentDay,
  getWeekLabelList
} from '../lib/Util.js'

export default {
  props: {
    // 观察者对象
    observer: {
      type: Object
    },
    weekLabelIndex: {
      type: Number
    }
  },
  data () {
    return {
      // 日历标识数据
      firstDayOfMonth: new Date(),
      // 二维数组 6*72
      weekList: [],
      // 周label数据
      weekLabelArray: []
    }
  },
  created () {
    // 注册观察者对象
    this.observer.addObserver({
      'update': this.update
    })

    // 设置当前月的第一天，用来数据初始话以及进行日期是否为当前月判断
    this.firstDayOfMonth = getFirstDayOfMonth(new Date())

    // 设置每周label标识数据
    this.weekLabelArray = getWeekLabelList(this.weekLabelIndex)

    // 初始设置当前月日历数据
    this.setWeekListValue(this.firstDayOfMonth)
  },
  methods: {
    /**
     * 日历方法
     */
    // 点击日历某天
    clickDay (dayItem) {
      this.$emit('dayClick', dayItem)
    },
    // 设置weekList值
    setWeekListValue (firstDayOfmonth) {
      this.weekList = []
      let dayOfCalendar = getFirstDayOfCalendar(firstDayOfmonth, this.weekLabelIndex)

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
      &-label
        font-weight bold
        display flex
        background white
        color #7BDCFE
        height 50px
        line-height 50px
        border-left 1px solid #E3ECF3
        &-day
          text-align left
          text-indent 20px
          width 20%
          border-right 1px solid #E3ECF3
          border-bottom 1px solid #E3ECF3
      &-day
        text-align left
        text-indent 20px
        width 20%
        min-height 90px
        line-height 50px
        border-right 1px solid #E3ECF3
        border-bottom 1px solid #E3ECF3
    .red-font
      color red
</style>
