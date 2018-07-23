const log = console.log.bind(console)

var liwenkang = {
    // Array

    chunk: function (array, size) {
        var result = []
        for (var i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    },

    compact: function (array) {
        var arr = array.slice(0)
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1)
                i--
            }
        }
        return arr
    },

    concat: function (array, ...args) {
        return array.concat(...args)
    },

    difference: function (array, ...args) {
        // 先把
        var result = []
        var arr = [].concat(...args)
        arr = Array.from(new Set(arr))
        for (var i = 0; i < array.length; i++) {
            if (!arr.includes(array[i])) {
                result.push(array[i])
            }
        }
        return result
    },

    differenceBy: function (array, values, iteratee) {
        // 非对象类型的比较时
        var allArray = []
        var funcFlag = false
        var propFlag = false
        if (typeof arguments[arguments.length - 1] === "string") {
            propFlag = true
            var property = arguments[arguments.length - 1]
        } else if (typeof arguments[arguments.length - 1] === "function") {
            funcFlag = true
            var func = arguments[arguments.length - 1]
        }

        for (var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === "object") {
                allArray = allArray.concat(arguments[i])
            }
        }

        log("allArray", allArray)

        if (funcFlag) {
            for (var i = 0; i < allArray.length; i++) {
                allArray[i] = func(allArray[i])
            }
            // 需要进过处理后,如果有重复的,就删除
            for (var i = 0; i < array.length; i++) {
                if (allArray.includes(func(array[i]))) {
                    array.splice(i, 1)
                    i--
                }
            }
        } else if (propFlag) {
            // 需要进过处理后,如果有重复的,就删除
            for (var i = 0; i < allArray.length; i++) {
                allArray[i] = allArray[i][property]
            }
            // 需要进过处理后,如果有重复的,就删除
            for (var i = 0; i < array.length; i++) {
                if (allArray.includes(array[i][property])) {
                    array.splice(i, 1)
                    i--
                }
            }
        } else {
            // 需要进过处理后,如果有重复的,就删除
            for (var i = 0; i < array.length; i++) {
                if (allArray.includes(array[i])) {
                    array.splice(i, 1)
                    i--
                }
            }
        }
        return array
    },
}