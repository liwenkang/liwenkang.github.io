const log = console.log.bind(console)

var liwenkang = {
    property: function (string) {
        return obj => obj[string]
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

    identity: function (value) {
        // 返回获得的第一个值
        return value
    },

    findIndex(array, predicate, fromIndex = 0) {
        // 默认是个函数
        if (typeof predicate === "function") {
            for (var i = fromIndex; i < array.length; i++) {
                if (predicate(array[i])) {
                    return i
                }
            }
            return -1
        } else if (Array.isArray(predicate)) {
            for (var i = 0; i < array.length; i++) {
                if (liwenkang.matchesProperty(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        } else if (typeof predicate === "object") {
            for (var i = 0; i < array.length; i++) {
                if (liwenkang.matches(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        } else if (typeof predicate === "string") {
            for (var i = 0; i < array.length; i++) {
                if (liwenkang.property(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        }
    }
}

var users = [
    {'user': 'barney', 'active': false},
    {'user': 'fred', 'active': false},
    {'user': 'pebbles', 'active': true}
]

log(liwenkang.findIndex(users, function (o) {
    return o.user == 'barney'
}))
// => 0

// The `_.matches` iteratee shorthand.
log(liwenkang.findIndex(users, {'user': 'fred', 'active': false}))
// => 1

// The `_.matchesProperty` iteratee shorthand.
log(liwenkang.findIndex(users, ['active', false]))
// => 0

// The `_.property` iteratee shorthand.
log(liwenkang.findIndex(users, 'active'))
// => 2