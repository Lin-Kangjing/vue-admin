
import message from 'ant-design-vue/es/message'
// 全局loading
const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0
}

/**
 * 开启一个全局loading
 * @param {*} config
 */
export function startLoading (config) {
  if (config.loading) {
    LoadingInstance._count++
    if (LoadingInstance._count === 1) {
      LoadingInstance._target = message.loading('loading...', 0)
    }
  }
}
/**
 * 所有接口请求完毕后关闭全局loading
 * @param {*} config
 */
export function closeLoading (config) {
  if (config.loading) {
    if (LoadingInstance._count > 0) {
      LoadingInstance._count--
    }
    if (LoadingInstance._count === 0) {
      LoadingInstance._target && LoadingInstance._target()
      LoadingInstance._target = null
    }
  }
}
