const log = console.log.bind(console)

// Array 部分的 zipObjectDeep 未完成
// Lang 部分 clone 未完成
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
                    return false
                }
            }
            return true
        }
    },

    matches: function (object) {
        return obj => {
            for (var props in object) {
                if (obj[props] !== object[props]) {
                    return false
                }
            }
            return true
        }
    },

    identity: function (item) {
        if (typeof item === "function") {
            return item
        } else if (typeof item === "string") {
            return liwenkang.property(item)
        } else if (Array.isArray(item)) {
            return liwenkang.matchesProperty(item)
        } else if (typeof  item === "object") {
            return liwenkang.matches(item)
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

        var result = array.slice()
        if (comparator === undefined) {
            return result
        }

        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (comparator(result[i], values[j])) {
                    result.splice(i, 1)
                    i--
                    break
                }
            }
        }
        return result
    },

    differenceBy: function (array, ...args) {
        if (Array.isArray(args[args.length - 1])) {
            // 没有最后一项
            var rest = [].concat(...Array.from(args))
            return array.filter(value => {
                return !rest.includes(value)
            })
        } else {
            // 有最后一项
            var iteratee = liwenkang.identity(args[args.length - 1])
            var rest = [].concat(...Array.from(args).slice(0, args.length - 1))
            rest = rest.map(value => iteratee(value))
            return array.filter(value => {
                return !rest.includes(iteratee(value))
            })
        }
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
        var newArray = array.slice(0)
        for (var i = 0; i < newArray.length; i++) {
            if (liwenkang.identity(predicate)(newArray[i])) {
                newArray.splice(i, 1)
                i--
            } else {
                break
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
        for (var i = fromIndex; i < array.length; i++) {
            if (liwenkang.identity(predicate)(array[i])) {
                return i
            }
        }
        return -1
    },

    findLastIndex: function (array, predicate, fromIndex = array.length - 1) {
        for (var i = fromIndex; i >= 0; i--) {
            if (liwenkang.identity(predicate)(array[i])) {
                return i
            }
        }
        return -1
    },

    flatten: function (array) {
        return [].concat(...array)
    },

    flattenDeep: function (array) {
        while (true) {
            var flag = true
            array = liwenkang.flatten(array)
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i] === "object") {
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

    intersectionBy: function (...args) {
        var iteratee = args[args.length - 1]
        var restArray = [].concat(...Array.from(args).slice(1, args.length - 1))
        for (var i = 0; i < restArray.length; i++) {
            restArray[i] = liwenkang.identity(iteratee)(restArray[i])
        }
        var array = Array.from(args[0])
        for (var i = 0; i < array.length; i++) {
            var needCheck = liwenkang.identity(iteratee)(array[i])
            if (!restArray.includes(needCheck)) {
                array.splice(i, 1)
                i--
            }
        }
        return array
    },

    intersectionWith: function (arrays, comparator) {
        var compare = Array.from(arguments).slice(1, arguments.length - 1)
        var func = arguments[arguments.length - 1]
        var obj = Array.from(arguments[0])


        for (var i = 0; i < compare.length; i++) {
            var needCompare = compare[i]
            for (var j = 0; j < obj.length; j++) {
                var item = obj[j]
                var flag = false
                for (var k = 0; k < needCompare.length; k++) {
                    if (func(item, needCompare[k])) {
                        flag = true
                        break
                    }
                }
                if (flag === false) {
                    obj.splice(j, 1)
                    j--
                }
            }
        }
        return obj
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

    pullAllBy: function (array, values, iteratee) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (liwenkang.identity(iteratee)(array[i]) === liwenkang.identity(iteratee)(values[j])) {
                    array.splice(i, 1)
                    i--
                    break
                }
            }
        }
    },

    pullAllWith: function (array, values, comparator) {
        if (typeof comparator === "function") {
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < values.length; j++) {
                    if (comparator(array[i], values[j])) {
                        array.splice(i, 1)
                        i--
                        break
                    }
                }
            }
        }
        return array
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
            if (liwenkang.identity(predicate)(array[i])) {
                result.push(array[i])
                array.splice(i, 1)
                i--
            }
        }
        return result
    },

    reverse: function (array) {
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

    sortedIndexBy: function (array, value, iteratee) {
        for (var i = 0; i < array.length; i++) {
            if (liwenkang.identity(iteratee)(array[i]) === liwenkang.identity(iteratee)(value)) {
                return i
            }
        }
        return -1
    },

    sortedIndexOf: function (array, value) {
        return liwenkang.sortedIndex(array, value)
    },

    sortedLastIndex: function (array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] > value) {
                return i
            }
        }
        return array.length
    },

    sortedLastIndexBy(array, value, iteratee) {
        for (var i = 0; i < array.length; i++) {
            if (liwenkang.identity(iteratee)(array[i]) > liwenkang.identity(iteratee)(value)) {
                return i
            }
        }
        return array.length
    },

    sortedLastIndexOf(array, value) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (value < array[i + 1] && value >= array[i]) {
                return i
            }
        }
        return -1
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
            if (liwenkang.identity(iteratee)(result[i]) === liwenkang.identity(iteratee)(result[i - 1])) {
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
        var index = 0
        for (var i = array.length - 1; i >= 0; i--) {
            if (!liwenkang.identity(predicate)(array[i])) {
                index = i
                break
            }
        }
        return array.slice(index + 1)
    },

    takeWhile: function (array, predicate) {
        var index = 0
        for (var i = 0; i < array.length; i++) {
            if (!liwenkang.identity(predicate)(array[i])) {
                index = i
                break
            }
        }
        return array.slice(0, index)
    },

    union: function (...args) {
        var result = liwenkang.flatten([].concat(args))
        return Array.from(new Set(result))
    },


    unionBy: function (...args) {
        var iteratee = args[args.length - 1]
        var array = [].concat(...args).slice(0, args.length)
        for (var i = 0; i < array.length; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (liwenkang.identity(iteratee)(array[i]) === liwenkang.identity(iteratee)(array[j])) {
                    array.splice(j, 1)
                    j--
                }
            }
        }
        return array
    },

    unionWith: function (...args) {
        var iteratee = args[args.length - 1]
        var array = [].concat(...args).slice(0, args.length)

        if (typeof  iteratee === "function") {
            for (var i = 0; i < array.length; i++) {
                for (var j = i + 1; j < array.length; j++) {
                    if (iteratee(array[i], array[j])) {
                        array.splice(j, 1)
                        j--
                    }
                }
            }
            return array
        }
    },

    uniq: function (array) {
        return Array.from(new Set(array))
    },

    uniqBy: function (array, iteratee) {
        var newArray = array.slice()
        for (var i = 0; i < newArray.length; i++) {
            for (var j = i + 1; j < newArray.length; j++) {
                if (liwenkang.identity(iteratee)(newArray[i]) === liwenkang.identity(iteratee)(newArray[j])) {
                    newArray.splice(j, 1)
                    j--
                }
            }
        }
        return newArray
    },

    uniqWith: function (array, comparator) {
        var newArray = array.slice()
        if (typeof comparator === "function") {
            for (var i = 0; i < newArray.length; i++) {
                for (var j = i + 1; j < newArray.length; j++) {
                    if (comparator(newArray[i], newArray[j])) {
                        newArray.splice(j, 1)
                        j--
                    }
                }
            }
            return newArray
        }
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
        var arr0 = array[0]
        var arr1 = array[1]
        var result = []
        for (var i = 0; i < arr0.length; i++) {
            result.push(liwenkang.identity(iteratee)(arr0[i], arr1[i]))
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
        var allArray = [].concat(...arrays)
        for (var i = 0; i < allArray.length; i++) {
            var flag = false
            for (var j = i + 1; j < allArray.length; j++) {
                if (allArray[i] === allArray[j]) {
                    flag = true
                    allArray.splice(j, 1)
                    j--
                }
            }
            if (flag) {
                allArray.splice(i, 1)
                i--
            }
        }
        return allArray
    },


    xorBy: function (...args) {
        var iteratee = args[args.length - 1]
        var arr = [].concat(...args.slice(0, args.length - 1))
        for (var i = 0; i < arr.length; i++) {
            var flag = false
            for (var j = i + 1; j < arr.length; j++) {
                if (liwenkang.identity(iteratee)(arr[j]) === liwenkang.identity(iteratee)(arr[i])) {
                    flag = true
                    arr.splice(j, 1)
                    j--
                }
            }
            if (flag) {
                arr.splice(i, 1)
                i--
            }
        }
        return arr
    },

    xorWith: function (...args) {
        var iteratee = args[args.length - 1]
        var arr = [].concat(...args.slice(0, args.length - 1))
        if (typeof iteratee === "function") {
            for (var i = 0; i < arr.length; i++) {
                var flag = false
                for (var j = i + 1; j < arr.length; j++) {
                    if (iteratee(arr[j], arr[i])) {
                        flag = true
                        arr.splice(j, 1)
                        j--
                    }
                }
                if (flag) {
                    arr.splice(i, 1)
                    i--
                }
            }
            return arr
        }
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

    zipObjectDeep: function (props, values) {

    },

    zipWith: function (...args) {
        var iteratee = args[args.length - 1]
        var array = Array.from(args).slice(0, args.length - 1)
        var result = []
        if (typeof iteratee === "function") {
            for (var i = 0; i < array[0].length; i++) {
                var func = liwenkang.identity(iteratee)
                for (var j = 0; j < array.length; j++) {
                    func = func.bind(null, array[j][i])
                }
                result.push(func())
            }
        }
        return result
    },

    countBy: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            var array = collection.slice()
            var dict = {}
            array = array.map(value => liwenkang.identity(iteratee)(value))
            for (var i = 0; i < array.length; i++) {
                if (dict[array[i]]) {
                    dict[array[i]]++
                } else {
                    dict[array[i]] = 1
                }
            }
            return dict
        }
    },

    every: function (collection, predicate) {
        if (Array.isArray(collection)) {
            return collection.every(value => liwenkang.identity(predicate)(value))
        }
    },

    filter: function (collection, predicate) {
        if (Array.isArray(collection)) {
            return collection.filter(value => liwenkang.identity(predicate)(value))
        }
    },

    find: function (collection, predicate, fromIndex = 0) {
        if (Array.isArray(collection)) {
            for (var i = fromIndex; i < collection.length; i++) {
                if (liwenkang.identity(predicate)(collection[i])) {
                    return collection[i]
                }
            }
        }
    },

    findLast: function (collection, predicate, fromIndex = collection.length - 1) {
        if (Array.isArray(collection)) {
            for (var i = fromIndex; i >= 0; i--) {
                if (liwenkang.identity(predicate)(collection[i])) {
                    return collection[i]
                }
            }
        }
    },

    flatMap: function (collection, iteratee) {
        var result = []
        for (var i = 0; i < collection.length; i++) {
            result[i] = liwenkang.identity(iteratee)(collection[i])
        }
        return liwenkang.flatten(result)
    },

    flatMapDeep: function (collection, iteratee) {
        return liwenkang.flattenDeep(liwenkang.flatMap(collection, liwenkang.identity(iteratee)))
    },

    flatMapDepth: function (collection, iteratee, depth = 1) {
        var result = liwenkang.flatMap(collection, liwenkang.identity(iteratee))
        return liwenkang.flattenDepth(result, depth - 1)
    },

    forEach: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            collection.forEach(value => {
                liwenkang.identity(iteratee)(value)
            })
        } else if (typeof collection === "object") {
            for (var key in collection) {
                liwenkang.identity(iteratee)(collection[key], key)
            }
        }
        return collection
    },

    forEachRight: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            for (var i = collection.length - 1; i >= 0; i--) {
                liwenkang.identity(iteratee)(collection[i])
            }
        } else if (typeof collection === "object") {
            for (var key in collection) {
                liwenkang.identity(iteratee)(collection[key], key)
            }
        }
        return collection
    },

    groupBy: function (collection, iteratee) {
        var dict = {}
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                if (dict[liwenkang.identity(iteratee)(collection[i])]) {
                    dict[liwenkang.identity(iteratee)(collection[i])].push(collection[i])
                } else {
                    dict[liwenkang.identity(iteratee)(collection[i])] = [collection[i]]
                }
            }
            return dict
        }
    },

    includes: function (collection, value, fromIndex = 0) {
        if (typeof collection === "string") {
            for (var i = fromIndex; i < collection.length; i++) {
                var str = collection.slice(i, i + value.length)
                if (str === value) {
                    return true
                }
            }
            return false
        } else if (Array.isArray(collection)) {
            for (var i = fromIndex; i < collection.length; i++) {
                if (collection[i] === value) {
                    return true
                }
            }
            return false
        } else if (typeof collection === "object") {
            for (var prop in collection) {
                if (collection[prop] === value) {
                    return true
                }
            }
            return false
        }
    },

    get: function (object, path, defaultValue) {
        if (typeof path === "string") {
            var array = path.split(/\]\[|\[|\]\.|\]|\./)
            for (var i = 0; i < array.length; i++) {
                if (object[array[i]]) {
                    object = object[array[i]]
                } else {
                    return defaultValue
                }
            }
            return object
        } else if (Array.isArray(path)) {
            for (var i = 0; i < path.length; i++) {
                if (object[path[i]]) {
                    object = object[path[i]]
                } else {
                    return defaultValue
                }
            }
            return object
        }
    },

    invokeMap: function (collection, path, ...args) {
        if (Array.isArray(collection)) {
            if (args.length > 0) {
                // 有绑定的
                if (typeof path === "string") {
                    for (var i = 0; i < collection.length; i++) {
                        collection[i] = eval("[" + collection[i].toString() + "]." + path + ".bind(null, " + args + ")" + "()")
                    }
                    return collection
                } else if (typeof path === "function") {
                    for (var i = 0; i < collection.length; i++) {
                        collection[i] = path.bind(collection[i], args)()
                    }
                    return collection
                }
            } else {
                // 没有绑定的数字
                if (typeof path === "string") {
                    for (var i = 0; i < collection.length; i++) {
                        collection[i] = eval("[" + collection[i].toString() + "]." + path + "()")
                    }
                    return collection
                } else if (typeof path === "function") {
                    for (var i = 0; i < collection.length; i++) {
                        collection[i] = path.bind(collection[i])()
                    }
                    return collection
                }
            }
        }
    },

    keyBy: function (collection, iteratee) {
        var dict = {}
        for (var i = 0; i < collection.length; i++) {
            dict[liwenkang.identity(iteratee)(collection[i])] = collection[i]
        }
        return dict
    },

    map: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            return collection.map((value, key, collection) => liwenkang.identity(iteratee)(value, key, collection))
        } else if (typeof collection === "object") {
            var result = []
            for (var key in collection) {
                result.push(liwenkang.identity(iteratee)(collection[key], key, collection))
            }
            return result
        }
    },

    orderBy: function (collection, iteratees, orders) {
        var i = 0
        var newArray = collection.slice()
        newArray.sort((a, b) => {
            while (liwenkang.identity(iteratees[i])(a) === liwenkang.identity(iteratees[i])(b)) {
                i++
            }
            var result
            if (orders[i] === "asc") {
                if (typeof liwenkang.identity(iteratees[i])(a) === "string") {
                    result = liwenkang.identity(iteratees[i])(a).charCodeAt() - liwenkang.identity(iteratees[i])(b).charCodeAt()
                } else if (typeof liwenkang.identity(iteratees[i])(a) === "number") {
                    result = liwenkang.identity(iteratees[i])(a) - liwenkang.identity(iteratees[i])(b)
                }
            } else if (orders[i] === "desc") {
                if (typeof liwenkang.identity(iteratees[i])(a) === "string") {
                    result = liwenkang.identity(iteratees[i])(b).charCodeAt() - liwenkang.identity(iteratees[i])(a).charCodeAt()
                } else if (typeof liwenkang.identity(iteratees[i])(a) === "number") {
                    result = liwenkang.identity(iteratees[i])(b) - liwenkang.identity(iteratees[i])(a)
                }
            }
            i = 0
            return result
        })
        return newArray
    },

    partition: function (collection, predicate) {
        var result = [[], []]
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                if (liwenkang.identity(predicate)(collection[i])) {
                    result[0].push(collection[i])
                } else {
                    result[1].push(collection[i])
                }
            }
        }
        return result
    },

    reduce: function (collection, iteratee, accumulator) {
        if (Array.isArray(collection)) {
            if (accumulator) {
                for (var i = 0; i < collection.length; i++) {
                    accumulator = liwenkang.identity(iteratee)(accumulator, collection[i])
                }
                return accumulator
            } else {
                return collection.reduce(liwenkang.identity(iteratee))
            }
        } else if (typeof collection === "object") {
            var flag = true
            if (accumulator === undefined) {
                for (var key in collection) {
                    if (flag) {
                        accumulator = collection[key]
                        flag = false
                    } else {
                        accumulator = liwenkang.identity(iteratee)(accumulator, collection[key], key)
                    }
                }
            } else {
                for (var key in collection) {
                    accumulator = liwenkang.identity(iteratee)(accumulator, collection[key], key)
                }
            }
            return accumulator
        }
    },

    reduceRight: function (collection, iteratee, accumulator) {
        if (Array.isArray(collection)) {
            for (var i = collection.length - 1; i >= 0; i--) {
                accumulator = liwenkang.identity(iteratee)(accumulator, collection[i])
            }
            return accumulator
        }
    },

    reject: function (collection, predicate) {
        var result = []
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                if (!liwenkang.identity(predicate)(collection[i])) {
                    result.push(collection[i])
                }
            }
        }
        return result
    },

    sample: function (collection) {
        var index = Math.floor(Math.random() * collection.length)
        return collection[index]
    },

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
    },

    shuffle: function (collection) {
        return liwenkang.sampleSize(collection, collection.length)
    },

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
    },

    some: function (collection, predicate) {
        return collection.some(value => liwenkang.identity(predicate)(value))
    },

    sortBy: function (collection, iteratees) {
        var i = 0
        var newArray = collection.slice()
        newArray.sort((a, b) => {
            while (("" + liwenkang.identity(iteratees[i])(a)).localeCompare("" + liwenkang.identity(iteratees[i])(b)) === 0) {
                if (i + 1 < iteratees.length) {
                    i++
                } else {
                    break
                }
            }
            var result = ("" + liwenkang.identity(iteratees[i])(a)).localeCompare("" + liwenkang.identity(iteratees[i])(b))
            i = 0
            return result
        })
        return newArray
    },

    now: function () {
        return new Date().getTime()
    },

    after: function (n, func) {
        var count = 0
        return function (...args) {
            count++
            if (count >= n) {
                return func(...args)
            }
        }
    },

    ary: function (func, n = func.length) {
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

    bind: function (func, thisArg, ...partials) {
        return function (...args) {
            return func.bind(thisArg, ...partials)(...args)
        }
    },

    bindKey: function (object, key, ...partials) {
        return function (...args) {
            var func = object[key]
            return func.bind(object, ...partials)(...args)
        }
    },

    curry: function (func, arity = func.length) {
        return function (...args) {
            var length = arguments.length
            if (length < arity) {
                var result = liwenkang.curry(func.bind(null, ...args))
            } else if (length === arity) {
                // 直到参数数量符合要求,再输出
                var result = func(...args)
            }
            return result
        }
    },

    curryRight: function (func, arity = func.length, input = []) {
        return function (...args) {
            if (input.length < arity) {
                input.unshift(...args)
                if (input.length === arity) {
                    var result = input.slice()
                    input.length = 0
                    return func(...result)
                } else {
                    return liwenkang.curryRight(func, arity, input)
                }
            }
        }
    },

    debounce: function (func, wait = 0) {
        var timer
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    },

    defer: function (func, ...args) {
        setTimeout(() => {
            func.apply(null, args)
        }, 1)
    },

    delay: function (func, wait, ...args) {
        setTimeout(() => {
            func.apply(null, args)
        }, wait)
    },

    flip: function (func) {
        return function (...args) {
            return func(...[].concat(...args).reverse())
        }
    },

    memoize(func, resolver) {

    },

    values: function (object) {
        if (object === null) {
            return []
        }
        if (typeof object === "string") {
            return Array.from(object)
        }
        var result = []
        for (var i in object) {
            result.push(object[i])
        }
        return result
    },

    negate: function (func) {
        return function (...args) {
            return !func(...args)
        }
    },

    once: function (func) {

    },

    overArgs(func, transforms) {
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
        // 没有考虑占位符
        return func.bind(null, partials)
    },

    partialRight: function (func, partials) {
        // 没有考虑占位符
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

    rest: function (func) {
        return function (first, ...rest) {
            return func.bind(null, first)(rest)
        }
    },

    spread: function (func, start = 0) {
        return function (ary) {
            return func.apply(null, ary)
        }
    },

    throttle: function (func, wait) {
        var last
        var timer
        return function (...args) {
            var now = +new Date()
            if (last && now < last + wait) {
                clearTimeout(timer)
                last = now
                timer = setTimeout(() => {
                    func.apply(this, args)
                }, wait)
            } else {
                last = now
                func.apply(this, args)
            }
        }
    },

    unary: function (func) {
        return function (arg) {
            return func(arg)
        }
    },

    wrap: function (value, wrapper) {
        return function (string) {
            return wrapper(value, string)
        }
    },

    escape: function (string = '') {
        string = string.replace(/&/g, "&amp;")
        string = string.replace(/</g, "&lt;")
        string = string.replace(/>/g, "&gt;")
        string = string.replace(/"/g, "&quot;")
        string = string.replace(/'/g, "&#39")
        return string
    },

    castArray: function (value) {
        if (arguments.length === 0) {
            return []
        }
        if (Array.isArray(value)) {
            return value
        } else {
            return [value]
        }
    },

    clone: function (value) {

    },

    cloneDeep: function (value) {

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
        if (typeof value === "number" && typeof other === "number") {
            if (isNaN(value) && isNaN(other)) {
                return true
            }
        }
        return value === other
    },

    gt(value, other) {
        return value > other
    },

    gte(value, other) {
        return value >= other
    },

    isArguments(value) {
        return value.toString().slice(-10, -1) === "Arguments"
    },

    isArray(value) {
        return Array.isArray(value)
    },

    isArrayBuffer(value) {
        return value instanceof ArrayBuffer
    },

    isArrayLike(value) {
        if (typeof value === "function") {
            return false
        }
        if (value.length >= 0 && value.length < Number.MAX_SAFE_INTEGER) {
            return true
        }
    },

    isArrayLikeObject(value) {
        return liwenkang.isArrayLike(value) && typeof value === "object"
    },

    isBoolean(value) {
        return Object.prototype.toString.call(value) === '[object Boolean]'
    },

    isBuffer(value) {
        return value instanceof Buffer
    },

    isDate(value) {
        return value instanceof Date
    },

    isElement(value) {

    },

    isEmpty(value) {
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return true
            } else {
                return false
            }
        } else if (typeof value === "object") {
            var flag = true
            for (var i in value) {
                flag = false
            }
            return flag
        } else if (value instanceof Map) {
            return value.size === 0
        } else if (value instanceof Set) {
            return value.size === 0
        } else {
            return true
        }
    },

    isEqual: function (value, other) {
        var typeOne = typeof value
        var typeTwo = typeof other
        if (typeOne !== typeTwo) {
            return false
        }
        if (typeOne === "object") {
            if (Array.isArray(value) && Array.isArray(other)) {
                return value.toString() === other.toString()
            } else if (Array.isArray(value) === false && Array.isArray(other) === false) {
                for (var key in value) {
                    if (!liwenkang.isEqual(value[key], other[key])) {
                        return false
                    }
                }
                for (var key in other) {
                    if (!liwenkang.isEqual(value[key], other[key])) {
                        return false
                    }
                }
                return true
            } else {
                return false
            }
        } else {
            return value === other
        }
    },

    isEqualWith(value, other, customizer) {
        if (Array.isArray(value) && Array.isArray(other)) {
            for (var i = 0; i < value.length; i++) {
                if (customizer(value[i], other[i]) === undefined) {
                    if (!liwenkang.isEqual(value[i], other[i])) {
                        return false
                    }
                } else if (!customizer(value[i], other[i])) {
                    return false
                }
            }
            return true
        }
    },

    isError(value) {
        return value instanceof Error
    },

    isFinite(value) {
        return Number.isFinite(value)
    },

    isFunction(value) {
        return value instanceof Function
    },

    isInteger(value) {
        return Number.isInteger(value)
    },

    isLength(value) {
        if (typeof value === "number" && liwenkang.isInteger(value)) {
            if (value >= 0 && value < Number.MAX_SAFE_INTEGER) {
                return true
            }
        }
        return false
    },

    isMap(value) {
        return value instanceof Map
    },

    isMatch(object, source) {
        if (typeof object === "object") {
            for (var key in source) {
                if (!liwenkang.isEqual(source[key], object[key])) {
                    return false
                }
            }
            return true
        }
    },

    isMatchWith(object, source, customizer) {

    },

    isNaN(value) {
        if (value === undefined) {
            return false
        }
        if (typeof value !== "number") {
            return true
        }
        return isNaN(value)
    },

    isNative(value) {

    },

    isNil(value) {
        return value === null || value === undefined
    },

    isNull(value) {
        return value === null
    },

    isNumber(value) {
        return typeof value === "number"
    },

    isObject(value) {
        if (value === null) {
            return false
        }
        if (value === undefined) {
            return true
        }
        if (typeof value === "function") {
            return true
        }
        return typeof value === "object"
    },

    isObjectLike(value) {
        if (value !== null && typeof value === "object") {
            return true
        } else {
            return false
        }
    },

    isPlainObject(value) {
        if (Object.prototype.constructor === value.constructor) {
            return true
        }
        return typeof value === "object" && value.constructor === undefined
    },

    noop: undefined,

    isRegExp(value) {
        return value instanceof RegExp
    },

    isSafeInteger(value) {
        return Number.isSafeInteger(value)
    },

    isSet(value) {
        return value instanceof Set
    },

    isString(value) {
        return typeof value === "string"
    },

    isSymbol(value) {
        return typeof value === "symbol"
    },

    isTypedArray(value) {

    },

    isUndefined(value) {
        return value === undefined
    },

    isWeakMap(value) {
        return value instanceof WeakMap
    },

    isWeakSet(value) {
        return value instanceof WeakSet
    },

    lt(value, other) {
        return value < other
    },

    lte(value, other) {
        return value <= other
    },

    toArray(value) {
        if (typeof value === "object") {
            var result = []
            for (var key in value) {
                result.push(value[key])
            }
            return result
        }
        if (value === null || value === undefined) {
            return []
        }
        return Array.from(value)
    },

    toFinite(value) {
        if (value === Infinity) {
            return 1.7976931348623157e+308
        }
        return Number(value)
    },

    toInteger(value) {
        return liwenkang.toFinite(Math.floor(value))
    },

    toLength(value) {

    },

    toNumber(value) {
        return Number(value)
    },

    toPlainObject(value) {

    },

    toSafeInteger(value) {
        if (value > Number.MAX_SAFE_INTEGER) {
            return Number.MAX_SAFE_INTEGER
        } else if (value < Number.MIN_SAFE_INTEGER) {
            return Number.MIN_SAFE_INTEGER
        } else {
            return Math.floor(value)
        }
    },

    toString(value) {
        if (value === null || value === undefined) {
            return ""
        }
        if (value === -0) {
            return "-0"
        }
        return value.toString()
    },

    add(augend, addend) {
        return augend + addend
    },

    ceil(number, precision = 0) {
        number = number * Math.pow(10, precision)
        return Math.ceil(number) / Math.pow(10, precision)
    },

    divide(dividend, divisor) {
        return dividend / divisor
    },

    floor(number, precision = 0) {
        number = number * Math.pow(10, precision)
        return Math.floor(number) / Math.pow(10, precision)
    },

    max(array) {
        if (array.length === 0) {
            return undefined
        }
        return Math.max(...array)
    },

    maxBy(array, iteratee) {
        var max = -Infinity
        var result
        for (var i = 0; i < array.length; i++) {
            if (liwenkang.identity(iteratee)(array[i]) > max) {
                max = liwenkang.identity(iteratee)(array[i])
                result = array[i]
            }
        }
        return result
    },

    mean(array) {
        return liwenkang.sum(array) / array.length
    },

    meanBy(array, iteratee) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            result.push(liwenkang.identity(iteratee)(array[i]))
        }
        return liwenkang.mean(result)
    },

    min(array) {
        if (array.length === 0) {
            return undefined
        }
        return Math.min(...array)
    },

    minBy(array, iteratee) {
        var min = Infinity
        var result
        for (var i = 0; i < array.length; i++) {
            if (liwenkang.identity(iteratee)(array[i]) < min) {
                min = liwenkang.identity(iteratee)(array[i])
                result = array[i]
            }
        }
        return result
    },

    multiply(multiplier, multiplicand) {
        return multiplier * multiplicand
    },

    round(number, precision = 0) {
        number = number * Math.pow(10, precision)
        return Math.round(number) / Math.pow(10, precision)
    },

    subtract(minuend, subtrahend) {
        return minuend - subtrahend
    },

    sum: function (ary) {
        var result = 0
        for (var i = 0; i < ary.length; i++) {
            result += ary[i]
        }
        return result
    },

    sumBy: function (ary, iteratee) {
        var sum = 0
        for (var i = 0; i < ary.length; i++) {
            sum += liwenkang.identity(iteratee)(ary[i])
        }
        return sum
    }
}