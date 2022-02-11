/*
 * @Description:
 * @FilePath: \DTSMv3\src\config\router.config.js
 * @Date: 2022-02-09 11:40:57
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-10 16:47:47
 * @author: Lin_kangjing
 */
// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
export const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

// 自动导入views文件中的路由
const routes = require.context('@/views', true, /.route.js$/)
const views = routes.keys().map(key => routes(key).default)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/test/blank',
    children: [
      ...views
      // {
      //   path: '/test',
      //   name: 'test',
      //   redirect: '/test/blank',
      //   component: RouteView,
      //   meta: { title: '测试', keepAlive: true, icon: 'warning', permission: ['test'] },
      //   children: [
      //     {
      //       path: '/test/blank',
      //       name: 'blank',
      //       component: () => import('@/views/test/Blank'),
      //       meta: { title: '空白页面', keepAlive: false, permission: ['test'] }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
