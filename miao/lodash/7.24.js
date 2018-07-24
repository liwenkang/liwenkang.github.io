const log = console.log.bind(console)
//
// // 方法
// // var rabbit = {}
// //
// // rabbit.speak = function (line) {
// //     log("This rabbit says '" + line + "'")
// // }
// //
// // rabbit.speak("I'm alive")
//
// // function speak(line) {
// //     log("The " + this.type + " rabbit says '" + line + "'")
// // }
// //
// // var whiteRabbit = {
// //     type: "white",
// //     speak: speak
// // }
// //
// // var fatRabbit = {
// //     type: "fat",
// //     speak: speak
// // }
// //
// // whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!")
//
// function bind(f, thisArg, ...fixedArgs) {
//     return function (...restArgs) {
//         return f.apply(thisArg, [...fixedArgs, ...restArgs])
//     }
// }
//
// function f(a) {
//     return a + this.val
// }
//
// // bind用来固定参数
//
// var f2 = bind(f, {val: 1}, 2)
// // bind 的第二个参数指定了 this 的指向
// // 所以
// f2 = function (...restArgs) {
//     // this 就是 {val: 1}
//     f.apply({val: 1}, [...restArgs])
// }
//
// log(f2(2))
//
// // f2 函数的 this 指向不会发生改变 !!
// log(f2.call({val: 2}, 3))
//
// function getProperty(obj, prop) {
//     if (obj.hasOwnProperty(prop)) {
//         return obj.prop
//     } else {
//         if (obj 有原型) {
//             return getProperty(obj的原型, prop)
//         } else {
//             return undefined
//         }
//     }
// }
//
// // 构造函数
// // 析构函数: 释放内存空间
//
// function F() {
//     this.foo = 8
// }
//
// new F()
//
// // this 指向空对象 {}
// // 返回对象
//
// function test(){
//     this.bar = 8
//     return {}
// }
//
// new test()
// // 返回空对象
// // 构造函数的功能就是为了添加一些属性,不需要返回东西
//
// // 原型 __proto__
//
// a = new A()
//
// a.__proto__ === A.prototype

// 基本数据类型: Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object） Symbol.

log(typeof undefined)  // undefined
log(typeof 10)          // number
log(typeof 'abc')       // string
log(typeof true)        // boolean

// 引用数据类型: Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型 等。

log(typeof function () {
})  //function

log(typeof [1, 'a', true])  //object
log(typeof {a: 10, b: 20})  //object
log(typeof null)  //object
log(typeof new Number(10))  //object
log(typeof new String(10))  //object
log(typeof new Boolean(10))  //object
log(typeof new Number(10))   //object
