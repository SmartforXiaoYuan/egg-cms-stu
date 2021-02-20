console.log('1=', module.exports) // 结果为：{}
console.log('2=', exports) // 结果为：{}

exports.a = 200 // 由于默认 exports=module.exports 故此时把module.exports的值也改变了 {a : 200}

console.log('3=', module.exports) // {a : 200}
console.log('4=', exports) // {a : 200}

exports = '我不在指向module'

console.log('5=', module.exports) // {a : 200}
console.log('6=', exports) // 我不在指向module

function selectDictLabel(datas, value) {
  const actions = []
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue === '' + value) {
      // datas[key].dictValue: '1',
      actions.push(datas[key].dictLabel)
      return false
    }
  })
  return actions.join('')
}

let statusOptions = [
  {
    dictLabel: '正常',
    dictValue: '1',
  },
  {
    dictLabel: '停用',
    dictValue: '0',
  },
]

let res = selectDictLabel(statusOptions, 0)

console.log(res)
//node test\app\controller\one.test.js
