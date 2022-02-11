/*
 * @Description:
 * @FilePath: \DTSMv3\src\router\index.js
 * @Date: 2022-02-09 11:40:57
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-11 10:38:36
 * @author: Lin_kangjing
 */
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRouterMap
})
const router = createRouter()

/**
 * @description:  登录退出的时候之前保存的路由还在，所以这里为重置路由的方法
 * @param {*}
 * @return {*}
 * @author: Lin_kangjing
 */
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// export default new Router({
//   mode: 'history',
//   routes: constantRouterMap
// })
