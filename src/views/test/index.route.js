/*
 * @Description:
 * @FilePath: \DTSMv3\src\views\test\index.route.js
 * @Date: 2022-02-10 15:35:25
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-10 16:44:57
 * @author: Lin_kangjing
 */
import { RouteView } from '@/config/router.config'
export default {
  path: '/test',
  name: 'test',
  redirect: '/test/blank',
  component: RouteView,
  meta: { title: '测试', keepAlive: true, icon: 'warning', permission: ['test'] },
  children: [
    {
      path: '/test/blank',
      name: 'blank',
      component: () => import('@/views/test/Blank'),
      meta: { title: '空白页面', keepAlive: false, permission: ['test'] }
    }
  ]
}
