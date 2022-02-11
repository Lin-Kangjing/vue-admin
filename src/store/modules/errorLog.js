/*
 * @Description: 前端错误日志
 * @FilePath: \DTSMv3\src\store\modules\errorLog.js
 * @Date: 2022-02-11 11:11:07
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-11 11:19:04
 * @author: Lin_kangjing
 */
const errLog = {
  state: {
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    },
    CLEAR_ERROR_LOG: (state) => {
      state.logs.splice(0)
    }
  },
  actions: {
    AddErrorLog ({ commit }, { err, vm, info, url }) {
      commit('ADD_ERROR_LOG', { err, info, url })
    },
    ClearErrorLog ({ commit }) {
      commit('CLEAR_ERROR_LOG')
    }
  }
}

export default errLog
