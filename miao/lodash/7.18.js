const log = console.log.bind(console)
//
// var getXof = property("x")
//
// function property(propName) {
//     return function (obj) {
//         return obj[propName]
//     }
// }
//
// log(getXof({
//     a: 1,
//     x: 5
// }))

function identity(item) {
    return item
}

function sum(ary) {
    return sumBy(ary, identity(it))
}

function sumBy(ary, iteratee) {
    var sum = 0
    for (var i = 0; i < ary.length; i++) {
        sum += iteratee(ary[i])
    }
    return sum
}

function matches(src) {
    // 判断一个对象是否是他的超集
    // src 的每个属性都在 obj 上
    return function (obj) {
        for (var key in obj) {
            if (src[key] !== obj[key]) {
                return false
            }
        }
        return true
    }
}

// var flatten = function (array) {
//     var arr = []
//     array.forEach(value => {
//         arr = arr.concat(value)
//     })
//     return arr
// }

// var flatten = function (ary) {
//     return ary.reduce((result, item) => {
//         result.splice(result.length, 0, ...item)
//         return result
//     }, [])
// }

var flatten = function (ary) {
    return [].concat(...ary)
}


log(flatten([1, 2, 3, [1], [2, [1]], [2], [3]]))
