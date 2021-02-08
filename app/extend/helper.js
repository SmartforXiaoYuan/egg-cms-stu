'use strict'
module.exports = {
  // 转数字类型
  parseInt(string) {
    if (typeof string === 'number') return string
    if (!string) return string
    return parseInt(string) || 0
  },

  //递归的方式实现深拷贝
  deepClone(source) {
    let target
    if (typeof source === 'object') {
      target = Array.isArray(source) ? [] : {}
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          if (typeof source[key] !== 'object') {
            target[key] = source[key]
          } else {
            target[key] = _deepClone(source[key])
          }
        }
      }
    } else {
      target = source
    }
    return target
  },
}
