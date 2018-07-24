const log = console.log.bind(console)

var _ = {
    property: function (string) {
        return obj => {
            for (var props in obj) {
                if (props === string) {
                    // 匹配上了,不能删
                    return false
                }
            }
            return true
        }
    },

    matchesProperty: function (array) {
        return obj => {
            for (var i = 0; i < array.length; i += 2) {
                var prop = array[i]
                var value = array[i + 1]
                if (obj[prop] !== value) {
                    // 有值不同, 不能删
                    return false
                }
            }
            return true
        }
    },

    matches: function (object) {
        return obj => {
            for (var props in object) {
                // 如果 object 的所有属性 都能在 obj
                if (obj[props] !== object[props]) {
                    // 有不同的地方, 不能删
                    return false
                }
            }
            return true
        }
    },

    dropWhile: function (array, predicate) {
        // predicate 默认是一个函数
        var newArray = array.slice(0)
        if (typeof predicate === "function") {
            for (var i = 0; i < newArray.length; i++) {
                if (predicate(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (Array.isArray(predicate)) {
            for (var i = 0; i < newArray.length; i++) {
                if (_.matchesProperty(predicate)(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (typeof predicate === "object") {
            // 将 predicate 转换为一个函数
            for (var i = 0; i < newArray.length; i++) {
                if (_.matches(predicate)(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (typeof predicate === "string") {
            for (var i = 0; i < newArray.length; i++) {
                if (_.property(predicate)(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        }
        return newArray
    },

    dropRightWhile: function (array, predicate) {
        var newArray = array.slice(0).reverse()
        return _.dropWhile(newArray, predicate).reverse()
    },
}


log(_.dropRightWhile([
    {"user": "barney", "active": true},
    {"user": "fred", "active": false},
    {"user": "pebbles", "active": false}
], function (o) {
    return !o.active
}))
// 输出：[{"user":"barney","active":true},{"user":"fred","active":false}]
// 期望：[{"user":"barney","active":true}]

log(_.dropRightWhile([{"user": "barney", "active": true}, {
    "user": "fred",
    "active": false
}, {"user": "pebbles", "active": false}], {"user": "pebbles", "active": false}))
// // 输出/期望：[{"user":"barney","active":true},{"user":"fred","active":false}]
//
log(_.dropRightWhile([{"user": "barney", "active": true}, {
    "user": "fred",
    "active": false
}, {"user": "pebbles", "active": false}], ["active", false]))
// // 输出：[{"user":"barney","active":true},{"user":"fred","active":false},{"user":"pebbles","active":false}]
// // 期望：[{"user":"barney","active":true}]
//
log(_.dropRightWhile([{"user": "barney", "active": true}, {
    "user": "fred",
    "active": false
}, {"user": "pebbles", "active": false}], "active"))
// // 输出/期望：[{"user":"barney","active":true},{"user":"fred","active":false},{"user":"pebbles","active":false}]