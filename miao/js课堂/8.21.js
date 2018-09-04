// 上午
// 箭头函数的特殊情况
console.log([1, 2, 3].map(it => {
    age: it
}))
// [ undefined, undefined, undefined ]

console.log([1, 2, 3].map(it => ({
    age: it
})))
// [ { age: 1 }, { age: 2 }, { age: 3 } ]

console.log([1, 2, 3].map(it => {
    return {
        age: it
    }
}))
// [ { age: 1 }, { age: 2 }, { age: 3 } ]

setTimeout(() => console.log(1), 1000)
for (; ;) {
}
// 页面会卡死,不会 1s 后输出 1

var cation = function() {

}

div.addEventListener('mousemove', function () {

})
// 下午
// 同一个站点的所有页面都能拿到
// localStorage
// localStorage 的 storage 事件
// 当 localStorage 发生改变的时候, window 触发 storage 事件

// 跨站点页面 win = window.open() 访问自己的网站
// postMessage
win.postMessage({a:1}, "http://127.0.0.0")

// drag 拖拽

// resize() 视口变化
// onhashchange 事件 xxx.xxx.xxx#foo

// touch start
// touch move
// touch end
// history.pushState 存储页面状态,通过 url 重现状态


