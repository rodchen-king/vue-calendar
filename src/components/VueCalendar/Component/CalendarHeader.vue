<template>
  <div class="vue-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <span class="prev-month" @click.stop="goPrev">
        {{leftArrow}}
      </span>
      <span class="title">{{headerContent}}</span>
      <span class="next-month" @click.stop="goNext">
        {{rightArrow}}
      </span>
    </div>
    <div class="header-right">
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script>
import {
  getHeaderContent,
  getFirstDayOfMonth,
  getFirstDayOfNextMonth,
  getFirstDayOfPrevMonth
} from '../lib/Util.js'

export default {
  created () {
    // 获取当前日历header的内容
    this.headerContent = getHeaderContent(new Date())
    this.firstDayOfMonth = getFirstDayOfMonth(new Date())
  },
  props: {
    // 观察者对象
    observer: {
      type: Object
    }
  },
  data () {
    return {
      // 页面绑定数据
      headerContent: '',
      leftArrow: '<',
      rightArrow: '>',
      firstDayOfMonth: new Date()
    }
  },
  methods: {
    /**
     * 页面操作
     */
    goPrev () {
      this.firstDayOfMonth = getFirstDayOfPrevMonth(this.firstDayOfMonth)
      this.observerNotify()
    },
    goNext () {
      this.firstDayOfMonth = getFirstDayOfNextMonth(this.firstDayOfMonth)
      this.observerNotify()
    },

    /**
     * 主题发布信息，通知观察者
     */
    observerNotify () {
      this.headerContent = getHeaderContent(this.firstDayOfMonth)
      this.observer.notify(this.firstDayOfMonth)
    }
  }
}
</script>

<style lang="stylus" scoped>
.vue-calendar-header{
  font-size: 20px;
  color: #19243B;
  border: 1px solid #E3ECF3;
  height: 40px;
  display: flex;
  align-items: center;
  .header-left,.header-right{
    flex:1;
  }
  .header-center{
    text-align: center
    .title, .next-month {
      margin-left: 20px
    }
    .prev-month,.next-month{
      cursor: pointer;
      color: #00A7FF;
    }
  }
}
</style>
