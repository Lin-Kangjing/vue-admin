/*
 * @Description:
 * @FilePath: \DTSM\src\http\index.js
 * @Date: 2022-01-24 15:18:57
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-30 00:21:09
 * @author: Lin_kangjing
 */
import axios from './axios'
import Qs from 'qs'

export function apiAxios (method, url, params, headers, setting) {
  // if (params) {
  //   params = filterNull(params)
  // }
  // if (headers) {
  //   headers = filterNull(headers)
  // }
  headers = headers || {}

  // 处理配置参数
  let config = {
    method: method,
    url: url,
    headers: headers,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    withCredentials: false
  }
  // 表单提交
  if (headers['Content-Type'] === 'multipart/form-data') {
    config.transformRequest = [
      data => {
        const formData = new FormData()
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            if (Array.isArray(data[key])) {
              for (const e of data[key]) {
                formData.append(key, e)
              }
            } else {
              formData.append(key, data[key])
            }
          }
        }
        return formData
      }
    ]
  } else if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    // 参数序列化提交
    config.transformRequest = [function (data) {
      data = Qs.stringify(data)
      return data
    }]
  }
  // 合并参数
  config = {
    ...config,
    ...setting
  }

  // 请求
  return axios(config)
}
// get
export function get (url, params, headers, setting) {
  return apiAxios('GET', url, params, headers, setting)
}
// post
export function post (url, params, headers, setting) {
  return apiAxios('POST', url, params, headers, setting)
}
// formData
export function formData (url, params, headers, setting) {
  headers = headers || {}
  headers['Content-Type'] = 'multipart/form-data'
  return apiAxios('POST', url, params, headers, setting)
}
