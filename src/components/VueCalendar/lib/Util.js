import { Subject } from './Subject.js'

let transfer = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return fmt
}

/**
 * 用于format日期格式
 * @param {*} timeSpan
 * @param {*} fmt
 * @param {*} formatDateNullValue
 */
export const dateFormat = function (timeSpan, fmt, formatDateNullValue) {
  if (!timeSpan) {
    if (formatDateNullValue) {
      return formatDateNullValue
    }
    return '无'
  }

  let date = new Date(timeSpan)

  return transfer.call(date, fmt)
}

/**
 * 获取日历header内容 格式为：****年 **月
 * @param {*} date
 */
export const getHeaderContent = function (date) {
  let _date = new Date(date)

  return dateFormat(_date, 'yyyy年 MM月')
}

/**
 * 获取当前月的第一天
 * @param {*} date
 */
export const getFirstDayOfMonth = function (date) {
  let _date = new Date(date)
  _date.setDate(1)

  return _date
}

/**
 * 获取当前月日历的第一天
 * @param {*} date
 */
export const getFirstDayOfCalendar = function (date) {
  let _date = new Date(date)
  return new Date(_date.setDate(_date.getDate() - _date.getDay() + 1))
}

/**
 * 启动观察者模式，并且初始化
 */
export const initObserver = function () {
  let subject = new Subject()

  return subject
}

/**
 * 格式化日期为两个单词，例如：‘1’号 格式为 ‘01’
 * @param {*} dateNumber
 */
export const formatDayWithTwoWords = function (dateNumber) {
  if (dateNumber < 10) {
    return '0' + dateNumber
  }

  return dateNumber
}

/**
 * 比较当前日期是否为本月日期，用于进行本月数据高亮显示
 * @param {*} firstDayOfMonth
 * @param {*} date
 */
export const isCurrentMonth = function (firstDayOfMonth, date) {
  return firstDayOfMonth.getMonth() === date.getMonth()
}

/**
 * 比较当前日期是否为系统当前日期
 * @param {*} date
 */
export const isCurrentDay = function (date) {
  let _date = new Date()
  return date.getFullYear() === _date.getFullYear() &&
    date.getMonth() === _date.getMonth() &&
    date.getDate() === _date.getDate()
}

/**
 * 以传入参数作为基准获取下个月的第一天日期
 * @param {*} firstDayOfCurrentMonth
 */
export const getFirstDayOfNextMonth = function (firstDayOfCurrentMonth) {
  return new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() + 1, 1)
}

/**
 * 以传入参数作为基准获取上个月的第一天日期
 * @param {*} firstDayOfCurrentMonth
 */
export const getFirstDayOfPrevMonth = function (firstDayOfCurrentMonth) {
  return new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() - 1, 1)
}
