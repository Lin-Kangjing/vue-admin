/*
 * @Description:svg图标入口
 * @FilePath: \DTSMv3\src\assets\svgIcon\index.js
 * @Date: 2022-02-09 11:21:39
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-09 17:19:32
 * @author: Lin_kangjing
 */
import Vue from 'vue'
import SvgIcon from '@@/SvgIcon/SvgIcon'// svg component
import './icons/user.svg'
// register globally
Vue.component('svg-icon', SvgIcon)

// 自动导入文件夹中的svg图标，使得增加新图标不用更改之前的代码
const req = require.context('./icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
