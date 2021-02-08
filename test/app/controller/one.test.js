console.log('1=', module.exports) // 结果为：{}
console.log('2=', exports) // 结果为：{}

exports.a = 200 // 由于默认 exports=module.exports 故此时把module.exports的值也改变了 {a : 200}

console.log('3=', module.exports) // {a : 200}
console.log('4=', exports) // {a : 200}

exports = '我不在指向module'

console.log('5=', module.exports) // {a : 200}
console.log('6=', exports) // 我不在指向module
