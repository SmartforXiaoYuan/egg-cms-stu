function setTimeout1() {
  setTimeout(() => {
    console.log('咦， 有好心人给宝宝浇水了')
  }, 2500)
}

function setImmediate1() {
  setImmediate(() => {
    console.log('咦， setImmediate延迟')
  })
}

function foo() {
  console.log('nextTick')
}

// console.log('1')
// setTimeout1()
// console.log('2')
// setImmediate1()
// console.log('3')
// process.nextTick(foo)
// console.error('bar')
// console.log('4')

// let map = new Map()
// // map.set('title', 'Understanding ES6')
// // map.set('year', 2017)
// // map.set('year', 2012) //会覆盖
// // console.log(map)
// const k1 = ['a']
// const k2 = ['a']

// map.set(k1, 111).set(k2, 222)
// console.log(map)

let list = [
  { id: 1, name: '汉族1', EndTime: '2021-01-02 12:12;12' },
  { id: 3, name: '汉族1', EndTime: '2021-01-11 12:12;12' },
  { id: 2, name: '汉族2', EndTime: '2021-01-12 12:12;12' },
]
// list.forEach((item) => {
//   item.name = '汉族3'
// })
// console.log(list)
// const fi = list.filter((x) => x.name == '汉族1')
// console.log(fi)
// const fd = list.find((x) => x.name == '汉族1')
// console.log(fd)

const map1 = list.map(function (item) {
  item.EndTime = 123
  return {
    id: item.id,
    name: item.name,
    EndTime: item.EndTime,
  }
})
console.log(list)
list[0].EndTime = 456
console.log(list)
console.log(map1)
// const map2 = list.map((item) => (item.EndTime = 123))
// console.log(map2)

// let user = { id: 1, name: '汉族1', EndTime: '2021-01-02 12:12;12' }
// user.age = 10
// console.log(user)
