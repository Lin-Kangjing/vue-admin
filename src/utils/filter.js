/*
 * @Description:
 * @FilePath: \DTSMv3\src\utils\filter.js
 * @Date: 2022-02-09 11:40:57
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-11 11:55:51
 * @author: Lin_kangjing
 */
import Vue from 'vue'
import moment from 'moment'
import { timeAgo } from './util'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('timeAgo', timeAgo)
