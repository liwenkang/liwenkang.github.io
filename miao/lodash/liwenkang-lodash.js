const log = console.log.bind(console)

var liwenkang = {

    isEqual: function (value, other) {
/*
Performs a deep comparison between two values to determine if they are equivalent.

Note: This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. Object objects are compared by their own, not inherited, enumerable properties. Functions and DOM nodes are compared by strict equality, i.e. ===.
*/


    },
    // Array
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

    differenceWith: function (array, values, comparator) {
        // 非对象类型的比较时

        return array
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

    drop: function (array, n = 1) {
        return array.slice(n)
    },

    dropRight: function (array, n = 1) {
        if (array.length - n < 0) {
            return []
        }
        return array.slice(0, array.length - n)
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
                if (liwenkang.matchesProperty(predicate)(newArray[i])) {
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
                if (liwenkang.matches(predicate)(newArray[i])) {
                    // 返回true
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (typeof predicate === "string") {
            for (var i = 0; i < newArray.length; i++) {
                var flag = false
                var obj = newArray[i]
                for (var props in obj) {
                    if (props === liwenkang.property(predicate)(obj)) {
                        // 不用删
                        flag = false
                    }
                }
                if (flag) {
                    // 没找到合适的属性, 需要删除
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
        return liwenkang.dropWhile(newArray, predicate).reverse()
    },

    fill: function (array, value, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value
        }
        return array
    },

    findIndex: function (array, predicate, fromIndex = 0) {

    },

    findLastIndex: function () {

    },

    flatten: function (array) {
        return [].concat(...array)
    },

    flattenDeep: function (array) {
        // 检测到数组中不包含数组
        while (true) {
            var flag = true
            array = liwenkang.flatten(array)
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i] === "object") {
                    // 仍有
                    flag = false
                }
            }
            if (flag) {
                return array
            }
        }
    },

    flattenDepth: function (array, depth = 1) {
        for (var i = 0; i < depth; i++) {
            array = liwenkang.flatten(array)
        }
        return array
    },

    fromPairs: function (pairs) {
        // array => pairs
        var dict = {}
        for (var i = 0; i < pairs.length; i++) {
            dict[pairs[i][0]] = pairs[i][1]
        }
        return dict
    },

    head: function (array) {
        return array[0]
    },

    indexOf: function (array, value, fromIndex = 0) {
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] === value) {
                return i
            }
        }
        return -1
    },

    initial: function (array) {
        return array.slice(0, array.length - 1)
    },

    intersection: function (...args) {
        // 取所有数组的交集
        var length = arguments.length
        var count = 1
        var arr = arguments[0]
        while (count < length) {
            var result = []
            var arr2 = arguments[count]
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr2.length; j++) {
                    if (arr[i] === arr2[j]) {
                        result.push(arr[i])
                        break
                    }
                }
            }
            arr = result
            count++
            if (count === length) {
                return result
            }
        }
    },

    intersectionBy: function () {

    },

    intersectionWith: function () {

    },

    join: function (array, separator = ',') {
        if (array.length >= 1) {
            var str = "" + array[0]
            for (var i = 1; i < array.length; i++) {
                str += (separator + "" + array[i])
            }
            return str
        } else {
            return []
        }
    },

    last: function (array) {
        return array[array.length - 1]
    },

    lastIndexOf: function (array, value, fromIndex = array.length - 1) {
        for (var i = fromIndex; i >= 0; i--) {
            if (array[i] === value) {
                return i
            }
        }
        return -1
    },

    nth: function (array, n = 0) {
        if (n < 0) {
            return array[array.length + n]
        }
        return array[n]
    },

    pull: function (array, ...value) {
        var arr = [].concat(...value)
        for (var i = 0; i < array.length; i++) {
            if (arr.includes(array[i])) {
                array.splice(i, 1)
                i--
            }
        }
        return array
    },

    pullAll: function (array, values) {
        for (var i = 0; i < array.length; i++) {
            if (values.includes(array[i])) {
                array.splice(i, 1)
                i--
            }
        }
        return array
    },

    pullAllBy: function () {

    },

    pullAllWith: function () {

    },

    pullAt: function (array, indexArr) {
        var result = []
        for (var i = 0; i < indexArr.length; i++) {
            result.push(array[indexArr[i]])
        }

        for (var i = 0; i < indexArr.length; i++) {
            array.splice(indexArr[i] - i, 1)
        }
        return result
    },

    remove: function (array, predicate) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                result.push(array[i])
                array.splice(i, 1)
                i--
            }
        }
        return result
    },

    reverse: function (array) {
        // 修改原数组
        var length = Math.floor(array.length / 2)
        for (var i = 0; i < length; i++) {
            var temp = array[i]
            array[i] = array[array.length - 1 - i]
            array[array.length - 1 - i] = temp
        }
        return array
    },

    slice: function (array, start = 0, end = array.length) {
        return array.slice(start, end)
    },

    sortedIndex: function (array, value) {
        if (value <= array[0]) {
            return 0
        }
        // array 是已经排序过的
        var lowIndex = 0
        var highIndex = array.length - 1
        var midIndex = (lowIndex + highIndex) >> 1

        while (true) {
            if (value > array[midIndex]) {
                lowIndex = midIndex
                midIndex = (lowIndex + highIndex) >> 1
            } else if (value <= array[midIndex]) {
                highIndex = midIndex
                midIndex = (lowIndex + highIndex) >> 1
            }
            if (highIndex - lowIndex === 1) {
                return lowIndex + 1
            }
        }
    },

    sortedIndexBy: function () {

    },

    sortedIndexOf: function (array, value) {
        return liwenkang.sortedIndex(array, value)
    },

    sortedLastIndex: function (array, value) {
        if (value >= array[array.length - 1]) {
            return array.length - 1
        }
        // array 是已经排序过的
        var lowIndex = 0
        var highIndex = array.length - 1
        var midIndex = (lowIndex + highIndex) >> 1

        while (true) {
            if (value >= array[midIndex]) {
                lowIndex = midIndex
                midIndex = (lowIndex + highIndex) >> 1
            } else if (value < array[midIndex]) {
                highIndex = midIndex
                midIndex = (lowIndex + highIndex) >> 1
            }
            if (highIndex - lowIndex === 1) {
                return lowIndex
            }
        }
    },

    sortedUniq: function (array) {
        var result = array.slice(0)
        for (var i = 1; i < result.length; i++) {
            if (result[i] === result[i - 1]) {
                result.splice(i, 1)
                i--
            }
        }
        return result
    },

    sortedUniqBy: function (array, iteratee) {
        var result = array.slice(0)
        for (var i = 1; i < result.length; i++) {
            if (iteratee(result[i]) === iteratee(result[i - 1])) {
                result.splice(i, 1)
                i--
            }
        }
        return result
    },

    tail: function (array) {
        return array.slice(1)
    },

    take: function (array, n = 1) {
        if (n < 0) {
            return []
        } else {
            return array.slice(0, n)
        }
    },

    takeRight: function (array, n = 1) {
        if (n <= 0) {
            return []
        } else {
            return array.slice(-n)
        }
    },

    takeRightWhile: function (array, predicate) {

    },

    takeWhile: function (array, [predicate = _.identity]) {

    },

    union: function (...args) {
        // 数组连起来之后去重
        var result = liwenkang.flatten([].concat(args))
        return Array.from(new Set(result))
    },

    unionBy: function () {

    },

    unionWith: function () {

    },

    uniq: function (array) {
        return Array.from(new Set(array))
    },

    uniqBy: function () {

    },

    uniqWith: function () {

    },

    unzip: function (array) {
        var length = array[0].length
        var result = []
        for (var i = 0; i < length; i++) {
            var arr = []
            for (var j = 0; j < array.length; j++) {
                arr.push(array[j][i])
            }
            result.push(arr)
        }
        return result
    },

    unzipWith: function (array, iteratee) {
        // 将 arrray 里的 两个数组通过 iteratee 合并
        var arr0 = array[0]
        var arr1 = array[1]
        var result = []
        for (var i = 0; i < arr0.length; i++) {
            result.push(iteratee(arr0[i], arr1[i]))
        }
        return result
    },

    without: function (array, ...value) {
        var arr = [].concat(...value)
        var result = []
        for (var i = 0; i < array.length; i++) {
            if (!arr.includes(array[i])) {
                result.push(array[i])
            }
        }
        return result
    },

    xor: function (...arrays) {
        // 保留不一样的地方,很多数组都传入
        var result = []
        for (var i = 0; i < arguments.length; i++) {
            arguments[i] = Array.from(new Set(arguments[i]))
            for (var j = 0; j < arguments[i].length; j++) {
                if (!result.includes(arguments[i][j])) {
                    result.push(arguments[i][j])
                } else {
                    result.splice(result.indexOf(arguments[i][j]), 1)
                }
            }
        }
        return result
    },

    xorBy: function () {

    },

    xorWith: function (arrays, comparator) {

    },

    zip: function (array) {
        var length = arguments[0].length
        var result = []
        for (var i = 0; i < length; i++) {
            var arr = []
            for (var j = 0; j < arguments.length; j++) {
                arr.push(arguments[j][i])
            }
            result.push(arr)
        }
        return result
    },

    zipObject: function (props = [], values = []) {
        var obj = {}
        for (var i = 0; i < props.length; i++) {
            obj[props[i]] = values[i]
        }
        return obj
    },

    zipObjectDeep: function () {

    },

    zipWith: function () {

    },

// Collection
    countBy: function (collection, iteratee) {
        // 数组,对象应该都可以
        // 数组
        for (var i = 0; i < collection.length; i++) {
            collection[i] = liwenkang.property(iteratee, collection[i])
        }
        var dict = {}
        for (var i = 0; i < collection.length; i++) {
            if (dict[collection[i]] === undefined) {
                dict[collection[i]] = 1
            } else {
                dict[collection[i]]++
            }
        }
        // 没写对象的 todo
        return dict
    },

    every: function (collection, predicate) {
        // 是数组的情况下
        for (var i = 0; i < collection.length; i++) {
            if (!liwenkang.property(predicate, collection[i])) {
                return false
            }
        }
        return true
        // 是对象的情况下 todo
    },

    filter: function (collection, predicate) {
        var result = []
        var type = typeof predicate
        if (type === "function" || type === "string") {
            // predicate 是函数, 或者是属性
            for (var i = 0; i < collection.length; i++) {
                if (liwenkang.property(predicate, collection[i])) {
                    result.push(collection[i])
                }
            }
        } else if (type === "object") {
            // predicate 是对象, 数组时
            if (Array.isArray(predicate)) {
                for (var i = 0; i < collection.length; i++) {
                    var obj = collection[i]
                    if (obj[predicate[0]] === predicate[1]) {
                        result.push(obj)
                    }
                }
            } else if (predicate instanceof Object) {
                for (var i = 0; i < collection.length; i++) {
                    var obj = collection[i]
                    var flag = true
                    for (var prop in predicate) {
                        if (predicate[prop] !== obj[prop]) {
                            flag = false
                        }
                    }
                    if (flag) {
                        result.push(obj)
                    }
                }
            }
        }
        return result
    },

    find: function (collection, predicate, fromIndex = 0) {
        var result = []
        var type = typeof predicate
        if (type === "function" || type === "string") {
            // predicate 是函数, 或者是属性
            for (var i = fromIndex; i < collection.length; i++) {
                if (liwenkang.property(predicate, collection[i])) {
                    result.push(collection[i])
                    break
                }
            }
        } else if (type === "object") {
            // predicate 是对象, 数组时
            if (Array.isArray(predicate)) {
                for (var i = fromIndex; i < collection.length; i++) {
                    var obj = collection[i]
                    if (obj[predicate[0]] === predicate[1]) {
                        result.push(obj)
                        break
                    }
                }
            } else if (predicate instanceof Object) {
                for (var i = fromIndex; i < collection.length; i++) {
                    var obj = collection[i]
                    var flag = true
                    for (var prop in predicate) {
                        if (predicate[prop] !== obj[prop]) {
                            flag = false
                        }
                    }
                    if (flag) {
                        result.push(obj)
                        break
                    }
                }
            }
        }
        return result
    },

    findLast: function (collection, predicate, fromIndex = collection.length - 1) {
        var result = []
        var type = typeof predicate
        if (type === "function" || type === "string") {
            // predicate 是函数, 或者是属性
            for (var i = fromIndex; i >= 0; i--) {
                if (liwenkang.property(predicate, collection[i])) {
                    result.push(collection[i])
                    break
                }
            }
        } else if (type === "object") {
            // predicate 是对象, 数组时
            if (Array.isArray(predicate)) {
                for (var i = fromIndex; i >= 0; i--) {
                    var obj = collection[i]
                    if (obj[predicate[0]] === predicate[1]) {
                        result.push(obj)
                        break
                    }
                }
            } else if (predicate instanceof Object) {
                for (var i = fromIndex; i >= 0; i--) {
                    var obj = collection[i]
                    var flag = true
                    for (var prop in predicate) {
                        if (predicate[prop] !== obj[prop]) {
                            flag = false
                        }
                    }
                    if (flag) {
                        result.push(obj)
                        break
                    }
                }
            }
        }
        log(result)
        return result
    },

    flatMap: function (collection, iteratee) {
        var result = []
        for (var i = 0; i < collection.length; i++) {
            result[i] = iteratee(collection[i])
        }
        return liwenkang.flatten(result)
    },

    flatMapDeep: function (collection, iteratee) {
        return liwenkang.flattenDeep(liwenkang.flatMap(collection, iteratee))
    },

    flatMapDepth: function (collection, iteratee, depth = 1) {
        var result = liwenkang.flatMap(collection, iteratee)
        return liwenkang.flattenDepth(result, depth - 1)
    },

    forEach: function (collection, iteratee) {
        for (var key in collection) {
            iteratee(collection[key], key)
        }
    },

    forEachRight: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            collection = collection.reverse()
            for (var key in collection) {
                iteratee(collection[key])
            }
        } else {
            // 针对对象来说, 本来就该是无序的,为啥要反向呢??? todo
        }
    },

    identity: function (item) {
        return item
    },

    sum: function (ary) {
        return sumBy(ary, it => it)
    },

    sumBy: function (ary, iteratee) {
        var sum = 0
        for (var i = 0; i < ary.length; i++) {
            sum += iteratee(ary[i])
        }
        return sum
    },
    /*
        groupBy: function (collection, iteratee) {
            // 如果 collection 是一个数组
            var obj = {}
            for (var i = 0; i < collection.length; i++) {
                if (obj[liwenkang.property(iteratee, collection[i])] === undefined) {
                    obj[liwenkang.property(iteratee, collection[i])] = [collection[i]]
                } else {
                    obj[liwenkang.property(iteratee, collection[i])].push(collection[i])
                }
            }
            // 如果是一个对象 后面是是属性
            for (var item of collection) {
                var key = item[iteratee]
                if (key in map) {
                    obj[key].push(item)
                } else {
                    obj[key] = [item]
                }
            }


            return obj
        },
        */
    groupBy: function (collection, iteratee) {
        return ary.reduce(function (result, item, index, collection) {
            var key = item[iteratee]
            if (key in result) {
                result[key].push(item)
            } else {
                result[key] = [item]
            }
            return result
        }, {})
    },

    includes: function (collection, value, fromIndex = 0) {
        // 字符串
        if (typeof collection === "string") {
            for (var i = fromIndex; i < collection.length; i++) {
                var str = collection.slice(i, i + value.length)
                if (str === value) {
                    return true
                }
            }
            return false
        } else if (Array.isArray(collection)) {
            // 数组
            for (var i = fromIndex; i < collection.length; i++) {
                if (collection[i] === value) {
                    return true
                }
            }
            return false
        } else if (typeof collection === "object") {
            // 对象
            for (var prop in collection) {
                if (collection[prop] === value) {
                    return true
                }
            }
            return false
        }
    }
    ,

    invokeMap: function (collection, path, args) {
        // 懵逼 todo
    }
    ,

    keyBy: function (collection, iteratee) {

    }
    ,

    map: function (collection, iteratee) {
        // collection 是数组
        var arr = []
        for (var prop in collection) {
            arr.push(liwenkang.property(iteratee, collection[prop]))
        }
        return arr
    }
    ,

    orderBy: function (collection, iteratees, orders) {

    }
    ,

    partition: function (collection, predicate) {

    }
    ,

    reduce: function (collection, iteratee, accumulator) {
        // collection 是数组, iteratee 是函数
        for (var i = 0; i < collection.length; i++) {
            accumulator = iteratee(accumulator, collection[i])
        }
        return accumulator
    }
    ,

    reduceRight: function (collection, iteratee, accumulator) {
        for (var i = collection.length - 1; i >= 0; i--) {
            accumulator = iteratee(accumulator, collection[i])
        }
        return accumulator
    }
    ,

    reject: function (collection, predicate) {
        // predicate 是函数
        var result = []
        if (typeof predicate === "function") {
            for (var i = 0; i < collection.length; i++) {
                if (!predicate(collection[i])) {
                    result.push(collection[i])
                }
            }
        }

        // predicate 是数组
        if (Array.isArray(predicate)) {
            for (var i = 0; i < collection.length; i++) {
                var flag = true
                for (var j = 0; j < predicate.length; j += 2) {
                    var prop = predicate[j]
                    var value = predicate[j + 1]
                    if (collection[i][prop] !== value) {
                        flag = false
                    }
                }
                if (!flag) {
                    result.push(collection[i])
                }
            }
            return result
        }

        // predicate 是对象
        if (typeof predicate === "object") {
            for (var i = 0; i < collection.length; i++) {
                var flag = true
                for (var prop in predicate) {
                    if (collection[i][prop] !== predicate[prop]) {
                        flag = false
                    }
                }
                if (!flag) {
                    result.push(collection[i])
                }
            }
        }

        // predicate 是字符串,实际当属性用
        if (typeof predicate === "string") {
            for (var i = 0; i < collection.length; i++) {
                if (!collection[i][predicate]) {
                    result.push(collection[i])
                }
            }
        }
        return result
    }
    ,

    sample: function (collection) {
        // [0~collection.length-1]
        var index = Math.floor(Math.random() * collection.length)
        return collection[index]
    }
    ,

    sampleSize: function (collection, n = 1) {
        var result = []
        for (var i = 0; i < n && i < collection.length; i++) {
            var index = Math.floor(Math.random() * collection.length)
            if (result.includes(collection[index])) {
                i--
            } else {
                result.push(collection[index])
            }
        }
        return result
    }
    ,

    shuffle: function (collection) {
        return liwenkang.sampleSize(collection, collection.length)
    }
    ,

    size: function (collection) {
        if (Array.isArray(collection) || typeof collection === "string") {
            return collection.length
        }

        if (typeof collection === "object") {
            var length = 0
            for (var prop in collection) {
                length++
            }
            return length
        }
    }
    ,

    some: function (collection, predicate) {
        // collection 是 数组, predicate 是函数
        if (typeof predicate === "function") {
            for (var i = 0; i < collection.length; i++) {
                if (predicate(collection[i])) {
                    return true
                }
            }
            return false
        }

        // collection 是 数组, predicate 是数组
        if (Array.isArray(predicate)) {
            for (var i = 0; i < collection.length; i++) {
                var obj = collection[i]
                var flag = true
                for (var j = 0; j < predicate.length; j += 2) {
                    var prop = predicate[j]
                    var value = predicate[j + 1]
                    if (obj[prop] !== value) {
                        flag = false
                    }
                }
                if (flag) {
                    return true
                }
            }
            return false
        }

        // collection 是 数组, predicate 是对象
        if (typeof predicate === "object") {
            for (var i = 0; i < collection.length; i++) {
                var obj = collection[i]
                var flag = true
                for (var prop in predicate) {
                    if (obj[prop] !== predicate[prop]) {
                        flag = false
                    }
                }
                if (flag) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
    ,

    sortBy: function (collection, iteratees) {

    }
    ,

    now: function () {
        // 这是啥???
        return new Date()
    }
    ,

    after: function (n, func) {
        // 次数到了,才返回
        var count = 0
        return function (...args) {
            count++
            if (count >= n) {
                return func(...args)
            }
        }
    },

    ary: function (func, n = func.length) {
        // 最多给原函数传 n 个参数
        return function (...args) {
            return func(...args.slice(0, n))
        }
    },

    before: function (n, func) {
        var count = 0
        var lastResult
        return function (...args) {
            count++
            if (count < n) {
                lastResult = func(...args)
            }
            return lastResult
        }
    },

    bind: function (func, ...partials) {
        // 首先实现一个不考虑this指向,而且不跳的 todo
        return function (...args) {
            return func(...partials, ...args)
        }
    },

    bindKey: function (object, key, partials) {
        var func = object[key]
        log("func", func)
        return function (string) {
            // 如何改变函数中 this的 指向??? todo
            this.user = object.user
            return func(partials, string)
        }
    },

    curry: function (func, arity = func.length) {
        // 函数柯里化
        // 没有考虑 _ 的情况
        return function (...args) {
            var length = arguments.length
            if (length < arity) {
                // 参数不够
                var result = liwenkang.curry(func.bind(null, ...args))
            } else if (length === arity) {
                var result = func(...args)
            }
            return result
        }
    },

    curryRight: function (func, arity = func.length) {
        // 必须解决倒着存储参数的问题 todo???
        return function (...args) {
            log(...args)
            var length = arguments.length
            if (length < arity) {
                var result = liwenkang.curry(func.bind(null, ...args))
            } else if (length === arity) {
                var result = func(...args)
            }
            return result
        }
    },

    debounce: function (func, [wait = 0], [options = {}]) {
        // 异步???
    },

    defer: function (func, args) {

    },

    delay: function (func, wait, args) {

    },

    flip: function (func) {
        return function (...args) {
            var arr = [].concat(...args).reverse()
            return func(...arr)
        }
    },

    values: function (object) {
        // 注意, todo 修改后, result 会出错
        if (object === null) {
            return []
        }
        var result = []
        for (var i in object) {
            result.push(object[i])
        }
        return result
    },

    memoize: function (func, resolver) {

    },

    negate: function (func) {
        return function (...args) {
            return !func(...args)
        }
    },

    once: function (func) {

    },

    overArgs(func, transforms) {
        // 将 transforms 是一个数组
        return function (...args) {
            var result = []
            var item = [].concat(...args)
            var funcs = transforms
            for (var i = 0; i < transforms.length; i++) {
                result.push(funcs[i]([item[i]]))
            }
            return result
        }
    },

    partial: function (func, partials) {
        // 如果 bind _ 会出错
        return func.bind(null, partials)
    },

    partialRight: function (func, partials) {
        return function (...args) {
            var func2 = func.bind(null, ...args)
            return func2(partials)
        }
    },

    rearg: function (func, indexes) {
        return function (...args) {
            var result = []
            var item = [].concat(...args)
            for (var i = 0; i < indexes.length; i++) {
                result.push(item[indexes[i]])
            }
            return result
        }
    },

    rest: function (func, start = func.length - 1) {
        return function () {

        }
    },

    flip: function (func) {
        return function (...args) {
            return func(...args.reverse())
        }
    },


    spread: function (func, start = 0) {
        // todo start 是干啥的???
        return function (ary) {
            return func.apply(null, ary)
        }
    },

    throttle: function () {

    },

    unary: function (func) {
        return function (...arg) {
            var value = [].concat(...arg)[0]
            return func(arg)
        }
    },

    wrap: function (value, wrapper) {
        return function (string) {
            return wrapper(value, string)
        }
    },

    escape: function (string = '') {
        /*"&", "<", ">", '"', and "'" */
        string = string.replace(/&/g, "&amp;")
        string = string.replace(/</g, "&lt;")
        string = string.replace(/>/g, "&gt;")
        string = string.replace(/"/g, "&quot;")
        string = string.replace(/'/g, "&#39")
        return string
    },

// Lang method

    castArray: function (value) {
        if (arguments.length === 0) {
            log([])
            return []
        }
        if (Array.isArray(value)) {
            log(value)
            return value
        } else {
            log([value])
            return [value]
        }
    },

    clone: function (value) {
        /* arrays, array buffers, booleans, date objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. 可以复制,
        */
        /*
         An empty object is returned for uncloneable values such as error objects, functions, DOM nodes, and WeakMaps.
        * */
        if (Array.isArray(value)) {
            // 如果是数组,那么就分别一个一个对比
            var result = value.slice(0)
            return result
        } else if (typeof value === "object") {
            // 如果是对象
            return JSON.parse(JSON.stringify(value))
        } else {
            return value
        }
    },

    cloneDeep: function (value) {
        // 复制出来的数组,是全部重新
        // 递归才能实现
    },

    cloneDeepWith: function (value, customizer) {

    },

    cloneWith: function (value, customizer) {

    },

    conformsTo: function (object, source) {
        for (var props in source) {
            return source[props](object[props])
        }
    },

    eq: function (value, other) {
        /*
            If Type(x) is different from Type(y), return false.
            If Type(x) is Number, then
                If x is NaN and y is NaN, return true.
                If x is +0 and y is -0, return true.
                If x is -0 and y is +0, return true.
                If x is the same Number value as y, return true.

                Return false.
            Return SameValueNonNumber(x, y).
            NOTE
            SameValueZero differs from SameValue only in its treatment of +0 and -0.
        */
        if (typeof value !== typeof other) {
            return false
        }

        if (typeof value === "number") {
            if (value !== value && other !== other) {
                return true
            } else {
                return value === other
            }
        }
    }
}