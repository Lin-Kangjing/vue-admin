/*
 * @Description:
 * @FilePath: \DTSM\src\utils\routeConvert.js
 * @Date: 2022-01-28 02:37:33
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-30 22:33:53
 * @author: Lin_kangjing
 */
import cloneDeep from 'lodash.clonedeep'

export function convertRoutes (nodes) {
  if (!nodes) return null

  nodes = cloneDeep(nodes)

  let queue = Array.isArray(nodes) ? nodes.concat() : [nodes]

  while (queue.length) {
    const levelSize = queue.length

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()

      if (!node.children || !node.children.length) continue

      node.children.forEach(child => {
        // 转化相对路径
        if (child.path[0] !== '/' && !child.path.startsWith('http')) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })

      queue = queue.concat(node.children)
    }
  }

  return nodes
}
