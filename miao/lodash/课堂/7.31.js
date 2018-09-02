const log = console.log.bind(console)

// Function.prototype => {}  函数的原型
// Function.prototype.__proto__ => Object.prototype

// Function.__proto__ => Function.prototype
// Function.__proto__.__proto__ => Object.prototype

// Object.prototype =>  Function.prototype.__proto__
// Object.prototype.__proto__ => Object.prototype

// Object.__proto__
// Object.__proto__.__proto__

// 函数没有归属问题
// 对象调用函数，this 指向 对象
// 变量调用函数，this 指向 window

// this 指向全局

// 函数对象上的方法, call apply bind
// 使用 call apply bind 时, 第一个参数(this)是原始类型时, 转换为包装对象

// 字符串 数 布尔 针对(原始类型/包装类型)

// 原型链


