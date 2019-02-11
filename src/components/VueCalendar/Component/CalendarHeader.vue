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
  created () {
    // 获取当前日历header的内容
    this.headerContent = getHeaderContent(new Date())
    this.firstDayOfMonth = getFirstDayOfMonth(new Date())
  },
  methods: {
    /**
     * 主题发布信息，通知观察者
     */
    observerNotify () {
      this.headerContent = getHeaderContent(this.firstDayOfMonth)
      this.observer.notify(this.firstDayOfMonth)
    },

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
    }
  }
}
</script>

<style lang="stylus" scoped>
.vue-calendar-header {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select:none;
  -khtml-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
  font-size: 20px;
  color: white;
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
