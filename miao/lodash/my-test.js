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
        // predicate 默认是一个函数
        var newArray = array.slice(0)
        if (typeof predicate === "function") {
            for (var i = newArray.length - 1; i >= 0; i--) {
                if (predicate(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (Array.isArray(predicate)) {
            for (var i = newArray.length - 1; i >= 0; i--) {
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
            for (var i = newArray.length - 1; i >= 0; i--) {
                if (_.matches(predicate)(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (typeof predicate === "string") {
            for (var i = newArray.length - 1; i >= 0; i--) {
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
}

var users = [
    {'user': 'a', 'active': false},
    {'user': 'b', 'active': false},
    {'user': 'c', 'active': true},
    {'user': 'd', 'active': false},
    {'user': 'e', 'active': false}
]
log(_.dropWhile(users, function (o) {
    return !o.active
}))
// // => objects for ['pebbles']

// The `_.matches` iteratee shorthand.
log(_.dropWhile(users, {'user': 'barney', 'active': false}))
// => objects for ['fred', 'pebbles']

// // The `_.matchesProperty` iteratee shorthand.
log(_.dropWhile(users, ['active', false]))
// // => objects for ['pebbles']
//
// // The `_.property` iteratee shorthand.
log(_.dropWhile(users, 'active'))
// // => objects for ['barney', 'fred', 'pebbles']