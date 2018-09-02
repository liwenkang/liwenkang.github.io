const log = console.log.bind(console)

// 上午
// // 动态特性
// // eval
// // new Function()
// // div onclick = ""
//
// // 给已存在的对象增加属性
// var obj = {}
// Object.defineProperty(obj, "foo", {
//     get: {},
//     set: {}
// })
//
// class A {
//     static foo() {
//         // 和该类型相关的常用函数
//         // 没在 prototype 上
//     }
//
//     constructor(values = []) {
//         this._values = []
//
//         values.forEach(this.add.bind(this))
//         values.forEach(this.add, this)
//         values.forEach(val => {
//             this.add(val)
//         })
//         values.forEach(function (val) {
//             this.add(val)
//         }, this)
//     }
//
//     // 在 prototype 上
//     get() {
//
//     }
//
//     set() {
//
//     }
// }
//
// a = new A()
//
// a.foo() // 访问不到
// a.__proto__ === A.prototype

// 正则表达式
// 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
var r = /x/g
var s = '_x_x'

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false

// 注意，带有g修饰符时，正则表达式内部会记住上一次的lastIndex属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。
var r = /bb/g
r.test('bb') // true
r.test('-bb-') // false

var str = '  #id div.class  '

log(str.replace(/^\s+|\s+$/g, ''))
// "#id div.class"

log("-----------------------------------------------")
log(/1\+1/.test('1+1'))
log((new RegExp('1\+1')).test('1+1'))
log((new RegExp('1\\+1')).test('1+1'))

log(/1\n1/.test('1\n1'))
log((new RegExp('1\n1')).test('1\n1'))
log((new RegExp('1\\n1')).test('1\n1'))

// 下午
log("----------------------------------------------------------")
log(/[abc]+/.test("aaa"))
log(/[abc]+/.test("aaab"))
log(/[abc]+/.test("ddd"))

log(/a{,5}/.test("a"))

// 实现 reload

Function.reload = function () {

}

Date = Function.reload([
    function (y,m,d) {

    },
    function (y) {

    }
])

//
// i18n
// internationalization

零宽断言