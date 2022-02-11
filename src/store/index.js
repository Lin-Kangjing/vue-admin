/*
 * @Description:
 * @FilePath: \DTSMv3\src\store\index.js
 * @Date: 2022-01-28 02:37:33
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-11 11:14:21
 * @author: Lin_kangjing
 */
import Vue from 'vue'
import Vuex from 'vuex'

import settings from '@/config/defaultSettings'

import app from './modules/app'
import user from './modules/user'
import errorLog from './modules/errorLog'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    // 前端错误
    errorLog: settings.errorLog ? errorLog : null
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
