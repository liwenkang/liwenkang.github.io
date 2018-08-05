const log = console.log.bind(console)

// 严格模式
// 严格模式的变化 全局必须 window.xxx
/**
 * 不能给 NaN 赋值
 * 对象内属性名唯一
 * 函数不能有重复的形参
 * 禁止8进制的数字语法
 * primitive(常量)不能赋值
 *
 * var run = eval 时
 * run(xxx) 会在全局作用域执行
 *
 * var x = 8
 * delete x 报错
 *
 * 严格模式下
 * arguments 形参和 arguments 不会绑定
 */

var context = null

function withContext(newContext, body) {
    var originalContext = context
    context = newContext
    // body 是一个函数
    try {
        var result = body()

        // 错误部分

        // xxx(这块就不会执行了)
    } catch (e) {
        return e
    } finally {
        // 一定会执行(用来清理)
        context = originalContext
        return result
    }
}


