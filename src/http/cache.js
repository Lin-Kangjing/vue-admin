
import axios from 'axios'
import { getPendingKey, customConfig, STATUS_CODE } from './config'
// 初始化
(function () {
  const cache = window.localStorage.getItem(customConfig.cacheStorageKey)
  if (cache) {
    const { storageExpire } = JSON.parse(cache)
    // 未超时不做处理
    if (storageExpire && getNowTime() - storageExpire < customConfig.cacheStorageExpire) {
      return
    }
  }
  window.localStorage.setItem(customConfig.cacheStorageKey, JSON.stringify({ data: {}, storageExpire: getNowTime() }))
})()

function getCacheItem (key) {
  const cache = window.localStorage.getItem(customConfig.cacheStorageKey)
  const { data } = JSON.parse(cache)
  return (data && data[key]) || null
}
function setCacheItem (key, value) {
  const cache = window.localStorage.getItem(customConfig.cacheStorageKey)
  const { data, storageExpire } = JSON.parse(cache)
  data[key] = value
  window.localStorage.setItem(customConfig.cacheStorageKey, JSON.stringify({ data, storageExpire }))
}

const _CACHES = {}
// 使用Proxy代理
const cacheHandler = {
  get: function (target, key) {
    let value = target[key]
    // console.log(`${key} 被读取`, value)
    if (customConfig.cacheStorage && !value) {
      value = getCacheItem(key)
    }
    return value
  },
  set: function (target, key, value) {
    // console.log(`${key} 被设置为 ${value}`)
    target[key] = value
    if (customConfig.cacheStorage) {
      setCacheItem(key, value)
    }

    return true
  }
}
const CACHES = new Proxy(_CACHES, cacheHandler)

export function requestInterceptor (config) {
  // 开启缓存则保存请求结果和cancel 函数
  if (config.cache) {
    const data = CACHES[`${getPendingKey(config)}`]
    // 这里用于存储是默认时间还是用户传递过来的时间
    let cacheExpire
    config.cacheExpire ? (cacheExpire = config.cacheExpire) : (cacheExpire = customConfig.cacheExpire)
    // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
    if (data && getNowTime() - data.expire < cacheExpire) {
      config.cancelToken = new axios.CancelToken(cancel => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(data.data)
      }) // 传递结果到catch中
    }
  }
}

export function responseInterceptor (response) {
  // 返回的code === 200 时候才会缓存下来
  if (response && response.config.cache && response.data[STATUS_CODE] === 0) {
    const data = {
      expire: getNowTime(),
      data: response
    }

    CACHES[`${getPendingKey(response.config)}`] = data
  }
}

// 获取当前时间戳
function getNowTime () {
  return new Date().getTime()
}
