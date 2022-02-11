/**
 * @description: 打招呼
 * @param {*}
 * @return {*}
 * @author: Lin_kangjing
 */
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/**
 * @description: 打招呼
 * @param {*}
 * @return {*}
 * @author: Lin_kangjing
 */
export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
/**
 * 是否为外部链接
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 10000 => "10,000"
 * @param {number} num
 */
 export function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
 function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}
/**
 * 验证参数是否为空
 * @param {*要验证的参数} str
 * @return 为空返回true
 */
 export function isEmpty (str) {
  let s = str
  if (typeof str === 'string') {
    s = str.replace(/(^\s*)|(\s*$)/g, '')
  } // 去除空格;
  if (s === undefined || s === null || s === '') {
    return true
  }
}
// 把一维数组转成树 tool
// data，要转换的数组
// key, string类型是  数组中id,parentId的前缀
// key, object类型时  格式为{id,parentId,order}
export function dataToTree (data, key) {
  if (!data.length) {
    return data
  }
  let id = 'id'
  let parentId = 'parentId'
  let order = 'order'
  if (typeof key === 'string') {
    id = key + 'Id'
    parentId = key + 'ParentId'
    order = key + 'Order'
  } else if (typeof key === 'object') {
    id = key[id] || id
    parentId = key[parentId] || parentId
    order = key[order] || null
  }

  const parents = data.filter((value) => value[parentId] === null)
  const children = data.filter((value) => value[parentId] !== null)
  if (order) {
    parents.sort((a, b) => {
      return a[order] - b[order]
    })
  }
  // let levelsMap={}
  //  定义遍历的方法
  const translator = (parents, children) => {
    //  遍历父节点的数组
    parents.forEach((parent) => {
      //  遍历子节点的数组
      children.forEach((current, index) => {
        //  找到父节点对应的子节点
        if (current[parentId] === parent[id]) {
          // 对子节点数据进行深复制，这里只支持部分类型的数据深复制
          const temp = JSON.parse(JSON.stringify(children))
          //  从temp中移除当前节点，减少递归
          temp.splice(index, 1)
          //  让当前子节点作为唯一的父节点，去递归查找其对应的子节点
          translator([current], temp)
          //  把找到子节点放入父节点的children属性中
          let childArray = parent.children
          if (!childArray) {
            childArray = []
          }
          childArray.push(current)
          if (order) {
            childArray.sort((a, b) => {
              return a[order] - b[order]
            })
          }

          parent.children = childArray
        }
      })
    })
  }
  //  调用转换方法
  translator(parents, children)
  return parents
}
// 下载文件
export function download (data) {
  if (!data) {
    return
  }
  const docName = data.slice(data.lastIndexOf('/') + 1, data.lastIndexOf('.'))
  const suffixName = data.slice(data.lastIndexOf('.') + 1, data.length)
  // const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = data
  link.target = '_blank'
  link.setAttribute('download', docName + '.' + suffixName)
  document.body.appendChild(link)
  link.click()
}
