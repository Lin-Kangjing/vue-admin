/*
 * @Description:前端错误
 * @FilePath: \DTSMv3\src\utils\errorLog.js
 * @Date: 2022-02-11 10:53:52
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-11 11:33:43
 * @author: Lin_kangjing
 */
import Vue from 'vue'
import store from '@/store'
import settings from '@/config/defaultSettings'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed () {
  const env = process.env.NODE_ENV
  if (Array.isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return env === needErrorLog
}
if (checkNeed()) {
  Vue.config.errorHandler = function (err, vm, info) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('AddErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}
