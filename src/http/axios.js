import axios from 'axios'
import router from '@/router'
import store from '@/store'
import storage from 'store'
import message from 'ant-design-vue/es/message'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axiosConfig, customConfig, getPendingKey, STATUS_CODE } from './config'
import { requestInterceptor as cacheReqInterceptor, responseInterceptor as cacheResInterceptor } from './cache'
import { startLoading, closeLoading } from './loading'
// 取消重复请求的map
const pendingMap = new Map()

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求，如果已经存了，就取消这次的请求
 * @param {*} config
 */
function addPending (config) {
  if (config.cancelRequest) {
    const key = getPendingKey(config)
    if (pendingMap.has(key)) {
      config.cancelToken = new axios.CancelToken(cancel => {
        cancel(config)
      })
      pendingMap.delete(key)
    } else {
      config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        pendingMap.set(key, cancel)
      })
    }
  }
}
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending (config) {
  const key = getPendingKey(config)
  if (pendingMap.has(key)) {
    const cancelToken = pendingMap.get(key)
    cancelToken(config)
    pendingMap.delete(key)
  }
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle (error) {
  if (axios.isCancel(error)) return console.warn('重复的请求：' + error.message.url)
  let msg = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        msg = '参数不正确！'
        break
      case 401:
        msg = '您未登录，或者登录已经超时，请先登录！'
        const token = storage.get(ACCESS_TOKEN)
        if (token) {
          store.dispatch('Logout').then(() => {
            router.replace({
              path: '/user/login',
              query: { redirect: router.currentRoute.fullPath }
            })
            // setTimeout(() => {
            //   window.location.reload()
            // }, 1500)
          })
        }
        break
      case 404:
        msg = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 500:
        msg = '服务器内部错误！'
        break
      default:
        msg = '内部错误，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) msg = '网络请求超时！'
  if (error.message.includes('Network')) msg = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  // 全局提醒
  message.error(msg)
}

// axios 实例
const service = axios.create(axiosConfig)
// 请求拦截
service.interceptors.request.use(
  config => {
    // 合并默认参数
    config = { ...customConfig, ...config }
    // 处理token
    const token = storage.get(ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = 'bearer ' + token.access_token
    }
    // 取消重复请求
    addPending(config)
    // 全局loading
    startLoading(config)
    // 缓存
    cacheReqInterceptor(config)

    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    // 缓存
    cacheResInterceptor(response)
    // 请求成功了就删除map中的请求
    removePending(response.config)
    // 关闭loading
    closeLoading(response.config)
    //  是否开启接口请求结果错误信息提示
    if (response.config.resultErrorMessageShow && response.data && response.data[STATUS_CODE] !== response.config.resultCorrectValue) {
        message.error(response.data.message)
        return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    // error.config 一般情况
    // error.message 取消请求
    if (error.message) {
      // 删除map中的重复请求
      removePending(error.message.config || error.message)
      // 关闭loading
      closeLoading(error.message.config || error.message)
      // 请求缓存处理方式
      if (axios.isCancel(error) && error.message && error.message.config.cache) {
        return Promise.resolve(error.message.data) // 返回结果数据
      }
      error.message.errorMessageShow && httpErrorStatusHandle(error)
    } else if (error.config) {
      // 是否开启接口错 错误提示
      error.config.errorMessageShow && httpErrorStatusHandle(error)
    }

    return Promise.reject(error)
  }
)

export default service
