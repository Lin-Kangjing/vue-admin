/*
 * @Description:用户模块
 * @FilePath: \DTSMv3\src\api\user.js
 * @Date: 2022-01-24 15:22:06
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-09 16:43:59
 * @author: Lin_kangjing
 */
/*
 * @Description:登录接口模块
 * @FilePath: \DTSM\src\api\login.js
 * @Date: 2022-01-28 02:37:33
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-30 00:22:45
 * @author: Lin_kangjing
 */
import { post, get } from '@/http/index'

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return post(userApi.Login, parameter)
}

export function getSmsCaptcha (parameter) {
  return get(userApi.SendSms, parameter)
}

export function getInfo () {
  return get(userApi.UserInfo, null, null, { resultCorrectValue: 0 })
}

export function getCurrentUserNav () {
  return get(userApi.UserMenu)
}

export function logout () {
  return post(userApi.Logout, null, null, { resultCorrectValue: 0 })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return post(userApi.twoStepCode, parameter)
}
// export function saveService (parameter) {
//   return request({
//     url: api.service,
//     method: parameter.id === 0 ? 'post' : 'put',
//     data: parameter
//   })
// }
