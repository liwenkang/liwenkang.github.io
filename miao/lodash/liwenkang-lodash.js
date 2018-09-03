const log = console.log.bind(console)

// 完成除 zipObjectDeep 的数组部分
// 完成 Coleection 部分
var liwenkang = {
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

    differenceBy: function (array, values, iteratee) {
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
            for (var i = 0; i < array.length; i++) {
                if (allArray.includes(func(array[i]))) {
                    array.splice(i, 1)
                    i--
                }
            }
        } else if (propFlag) {
            for (var i = 0; i < allArray.length; i++) {
                allArray[i] = allArray[i][property]
            }
            for (var i = 0; i < array.length; i++) {
                if (allArray.includes(array[i][property])) {
                    array.splice(i, 1)
                    i--
                }
            }
        } else {
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
        var newArray = array.slice(0)
        if (typeof predicate === "function") {
            for (var i = 0; i < newArray.length; i++) {
                if (predicate(newArray[i])) {
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (Array.isArray(predicate)) {
            for (var i = 0; i < newArray.length; i++) {
                if (liwenkang.matchesProperty(predicate)(newArray[i])) {
                    newArray.splice(i, 1)
                    i--
                } else {
                    break
                }
            }
        } else if (typeof predicate === "object") {
            for (var i = 0; i < newArray.length; i++) {
                if (liwenkang.matches(predicate)(newArray[i])) {
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
                        flag = false
                    }
                }
                if (flag) {
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
        if (typeof predicate === "function") {
            for (var i = fromIndex; i < array.length; i++) {
                if (predicate(array[i])) {
                    return i
                }
            }
            return -1
        } else if (typeof predicate === "string") {
            for (var i = fromIndex; i < array.length; i++) {
                if (liwenkang.property(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        } else if (Array.isArray(predicate)) {
            for (var i = fromIndex; i < array.length; i++) {
                if (liwenkang.matchesProperty(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        } else if (typeof predicate === "object") {
            for (var i = fromIndex; i < array.length; i++) {
                if (liwenkang.matches(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        }
    },

    findLastIndex: function (array, predicate, fromIndex = array.length - 1) {
        if (typeof predicate === "function") {
            for (var i = fromIndex; i >= 0; i--) {
                if (predicate(array[i])) {
                    return i
                }
            }
            return -1
        } else if (typeof predicate === "string") {
            for (var i = fromIndex; i >= 0; i--) {
                if (liwenkang.property(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        } else if (Array.isArray(predicate)) {
            for (var i = fromIndex; i >= 0; i--) {
                if (liwenkang.matchesProperty(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        } else if (typeof predicate === "object") {
            for (var i = fromIndex; i >= 0; i--) {
                if (liwenkang.matches(predicate)(array[i])) {
                    return i
                }
            }
            return -1
        }
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
        if (typeof iteratee === "function") {
            for (var i = 0; i < restArray.length; i++) {
                restArray[i] = iteratee(restArray[i])
            }
            var array = Array.from(args[0])
            for (var i = 0; i < array.length; i++) {
                var needCheck = iteratee(array[i])
                if (!restArray.includes(needCheck)) {
                    array.splice(i, 1)
                    i--
                }
            }
            return array
        } else if (typeof iteratee === "string") {
            for (var i = 0; i < restArray.length; i++) {
                restArray[i] = liwenkang.property(iteratee)(restArray[i])
            }
            var array = Array.from(args[0])
            for (var i = 0; i < array.length; i++) {
                var needCheck = liwenkang.property(iteratee)(array[i])
                if (!restArray.includes(needCheck)) {
                    array.splice(i, 1)
                    i--
                }
            }
            return array
        }
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
        if (typeof iteratee === "string") {
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < values.length; j++) {
                    if (liwenkang.property(iteratee)(array[i]) === liwenkang.property(iteratee)(values[j])) {
                        array.splice(i, 1)
                        i--
                        break
                    }
                }
            }
        } else if (typeof iteratee === "function") {
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < values.length; j++) {
                    if (iteratee(array[i]) === iteratee(values[j])) {
                        array.splice(i, 1)
                        i--
                        break
                    }
                }
            }
        }
        return array
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
            if (predicate(array[i])) {
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
        if (typeof iteratee === "function") {
            for (var i = 0; i < array.length; i++) {
                if (iteratee(array[i]) === iteratee(value)) {
                    return i
                }
            }
            return -1
        } else if (typeof iteratee === "string") {
            for (var i = 0; i < array.length; i++) {
                if (liwenkang.property(iteratee)(array[i]) === liwenkang.property(iteratee)(value)) {
                    return i
                }
            }
            return -1
        }
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
        if (typeof iteratee === "function") {
            for (var i = 0; i < array.length; i++) {
                if (iteratee(array[i]) > iteratee(value)) {
                    return i
                }
            }
            return array.length
        } else if (typeof  iteratee === "string") {
            for (var i = 0; i < array.length; i++) {
                if (liwenkang.property(iteratee)(array[i]) > liwenkang.property(iteratee)(value)) {
                    return i
                }
            }
            return array.length
        }
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
        if (typeof predicate === "function") {
            var index = 0
            for (var i = array.length - 1; i >= 0; i--) {
                if (!predicate(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(index + 1)
        } else if (typeof predicate === "string") {
            var index = 0
            for (var i = array.length - 1; i >= 0; i--) {
                if (!liwenkang.property(predicate)(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(index + 1)
        } else if (Array.isArray(predicate)) {
            var index = 0
            for (var i = array.length - 1; i >= 0; i--) {
                if (!liwenkang.matchesProperty(predicate)(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(index + 1)
        } else if (typeof predicate === "object") {
            var index = 0
            for (var i = array.length - 1; i >= 0; i--) {
                if (!liwenkang.matches(predicate)(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(index + 1)
        }
    },

    takeWhile: function (array, predicate) {
        if (typeof predicate === "function") {
            var index = 0
            for (var i = 0; i < array.length; i++) {
                if (!predicate(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(0, index)
        } else if (typeof predicate === "string") {
            var index = 0
            for (var i = 0; i < array.length; i++) {
                if (!liwenkang.property(predicate)(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(0, index)
        } else if (Array.isArray(predicate)) {
            var index = 0
            for (var i = 0; i < array.length; i++) {
                if (!liwenkang.matchesProperty(predicate)(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(0, index)
        } else if (typeof predicate === "object") {
            var index = 0
            for (var i = 0; i < array.length; i++) {
                if (!liwenkang.matches(predicate)(array[i])) {
                    index = i
                    break
                }
            }
            return array.slice(0, index)
        }
    },

    union: function (...args) {
        var result = liwenkang.flatten([].concat(args))
        return Array.from(new Set(result))
    },

    unionBy: function (...args) {
        var iteratee = args[args.length - 1]
        var array = [].concat(...args).slice(0, args.length)

        if (typeof  iteratee === "function") {
            for (var i = 0; i < array.length; i++) {
                for (var j = i + 1; j < array.length; j++) {
                    if (iteratee(array[i]) === iteratee(array[j])) {
                        array.splice(j, 1)
                        j--
                    }
                }
            }
            return array
        } else if (typeof iteratee === "string") {
            for (var i = 0; i < array.length; i++) {
                for (var j = i + 1; j < array.length; j++) {
                    if (liwenkang.property(iteratee)(array[i]) === liwenkang.property(iteratee)(array[j])) {
                        array.splice(j, 1)
                        j--
                    }
                }
            }
            return array
        }
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
        if (typeof iteratee === "function") {
            for (var i = 0; i < newArray.length; i++) {
                for (var j = i + 1; j < newArray.length; j++) {
                    if (iteratee(newArray[i]) === iteratee(newArray[j])) {
                        newArray.splice(j, 1)
                        j--
                    }
                }
            }
            return newArray
        } else if (typeof iteratee === "string") {
            for (var i = 0; i < newArray.length; i++) {
                for (var j = i + 1; j < newArray.length; j++) {
                    if (liwenkang.property(iteratee)(newArray[i]) === liwenkang.property(iteratee)(newArray[j])) {
                        newArray.splice(j, 1)
                        j--
                    }
                }
            }
            return newArray
        }
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
        if (typeof iteratee === "function") {
            for (var i = 0; i < arr.length; i++) {
                var item = iteratee(arr[i])
                var flag = false
                for (var j = i + 1; j < arr.length; j++) {
                    if (iteratee(arr[j]) === item) {
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
        } else if (typeof  iteratee === "string") {
            for (var i = 0; i < arr.length; i++) {
                var item = liwenkang.property(iteratee)(arr[i])
                var flag = false
                for (var j = i + 1; j < arr.length; j++) {
                    if (liwenkang.property(iteratee)(arr[j]) === item) {
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
                var func = iteratee
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
            if (typeof iteratee === "function") {
                array = array.map(value => iteratee(value))
            } else if (typeof  iteratee === "string") {
                array = array.map(value => liwenkang.property(iteratee)(value))
            }
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
            if (typeof predicate === "function") {
                return collection.every(value => predicate(value))
            } else if (typeof predicate === "string") {
                return collection.every(value => liwenkang.property(predicate)(value))
            } else if (Array.isArray(predicate)) {
                return collection.every(value => liwenkang.matchesProperty(predicate)(value))
            } else if (typeof predicate === "object") {
                return collection.every(value => liwenkang.matches(predicate)(value))
            }
        }
    },

    filter: function (collection, predicate) {
        if (Array.isArray(collection)) {
            if (typeof predicate === "function") {
                return collection.filter(value => predicate(value))
            } else if (typeof predicate === "string") {
                return collection.filter(value => liwenkang.property(predicate)(value))
            } else if (Array.isArray(predicate)) {
                return collection.filter(value => liwenkang.matchesProperty(predicate)(value))
            } else if (typeof predicate === "object") {
                return collection.filter(value => liwenkang.matches(predicate)(value))
            }
        }
    },

    find: function (collection, predicate, fromIndex = 0) {
        if (Array.isArray(collection)) {
            if (typeof predicate === "function") {
                for (var i = fromIndex; i < collection.length; i++) {
                    if (predicate(collection[i])) {
                        return collection[i]
                    }
                }
            } else if (typeof predicate === "string") {
                for (var i = fromIndex; i < collection.length; i++) {
                    if (liwenkang.property(predicate)(collection[i])) {
                        return collection[i]
                    }
                }
            } else if (Array.isArray(predicate)) {
                for (var i = fromIndex; i < collection.length; i++) {
                    if (liwenkang.matchesProperty(predicate)(collection[i])) {
                        return collection[i]
                    }
                }
            } else if (typeof predicate === "object") {
                for (var i = fromIndex; i < collection.length; i++) {
                    if (liwenkang.matches(predicate)(collection[i])) {
                        return collection[i]
                    }
                }
            }
        }
    },

    findLast: function (collection, predicate, fromIndex = collection.length - 1) {
        if (Array.isArray(collection)) {
            if (typeof predicate === "function") {
                for (var i = fromIndex; i >= 0; i--) {
                    if (predicate(collection[i])) {
                        return collection[i]
                    }
                }
            } else if (typeof predicate === "string") {
                for (var i = fromIndex; i >= 0; i--) {
                    if (liwenkang.property(predicate)(collection[i])) {
                        return collection[i]
                    }
                }
            } else if (Array.isArray(predicate)) {
                for (var i = fromIndex; i >= 0; i--) {
                    if (liwenkang.matchesProperty(predicate)(collection[i])) {
                        return collection[i]
                    }
                }
            } else if (typeof predicate === "object") {
                for (var i = fromIndex; i >= 0; i--) {
                    if (liwenkang.matches(predicate)(collection[i])) {
                        return collection[i]
                    }
                }
            }
        }
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
        if (Array.isArray(collection)) {
            if (typeof iteratee === "function") {
                collection.forEach(value => {
                    iteratee(value)
                })
            }
        } else if (typeof collection === "object") {
            if (typeof iteratee === "function") {
                for (var key in collection) {
                    iteratee(collection[key], key)
                }
            }
        }
    },

    forEachRight: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            if (typeof iteratee === "function") {
                for (var i = collection.length - 1; i >= 0; i--) {
                    iteratee(collection[i])
                }
            }
        } else if (typeof collection === "object") {
            if (typeof iteratee === "function") {
                for (var key in collection) {
                    iteratee(collection[key], key)
                }
            }
        }
    },

    groupBy: function (collection, iteratee) {
        var dict = {}
        if (Array.isArray(collection)) {
            if (typeof iteratee === "function") {
                for (var i = 0; i < collection.length; i++) {
                    if (dict[iteratee(collection[i])]) {
                        dict[iteratee(collection[i])].push(collection[i])
                    } else {
                        dict[iteratee(collection[i])] = [collection[i]]
                    }
                }
            } else if (typeof iteratee === "string") {
                for (var i = 0; i < collection.length; i++) {
                    if (dict[liwenkang.property(iteratee)(collection[i])]) {
                        dict[liwenkang.property(iteratee)(collection[i])].push(collection[i])
                    } else {
                        dict[liwenkang.property(iteratee)(collection[i])] = [collection[i]]
                    }
                }
            }
            return dict
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
            var array = path.split(/\[|\]\.|\./)
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
        if (typeof iteratee === "function") {
            for (var i = 0; i < collection.length; i++) {
                dict[iteratee(collection[i])] = collection[i]
            }
        } else if (typeof iteratee === "string") {
            for (var i = 0; i < collection.length; i++) {
                dict[liwenkang.property(iteratee)(collection[i])] = collection[i]
            }
        }
        return dict
    },

    map: function (collection, iteratee) {
        if (Array.isArray(collection)) {
            if (typeof iteratee === "function") {
                return collection.map(value => iteratee(value))
            } else if (typeof iteratee === "string") {
                return collection.map(value => liwenkang.property(iteratee)(value))
            }
        } else if (typeof collection === "object") {
            var result = []
            if (typeof iteratee === "function") {
                for (var key in collection) {
                    result.push(iteratee(collection[key]))
                }
            } else if (typeof iteratee === "string") {
                for (var key in collection) {
                    result.push(liwenkang.property(iteratee)(collection[key]))
                }
            }
            return result
        }
    },

    orderBy: function (collection, iteratees, orders) {
        var i = 0
        var newArray = collection.slice()
        newArray.sort((a, b) => {
            while (liwenkang.property(iteratees[i])(a) === liwenkang.property(iteratees[i])(b)) {
                i++
            }
            var result
            if (orders[i] === "asc") {
                if (typeof liwenkang.property(iteratees[i])(a) === "string") {
                    result = liwenkang.property(iteratees[i])(a).charCodeAt() - liwenkang.property(iteratees[i])(b).charCodeAt()
                } else if (typeof liwenkang.property(iteratees[i])(a) === "number") {
                    result = liwenkang.property(iteratees[i])(a) - liwenkang.property(iteratees[i])(b)
                }
            } else if (orders[i] === "desc") {
                if (typeof liwenkang.property(iteratees[i])(a) === "string") {
                    result = liwenkang.property(iteratees[i])(b).charCodeAt() - liwenkang.property(iteratees[i])(a).charCodeAt()
                } else if (typeof liwenkang.property(iteratees[i])(a) === "number") {
                    result = liwenkang.property(iteratees[i])(b) - liwenkang.property(iteratees[i])(a)
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
                if (typeof predicate === "function") {
                    if (predicate(collection[i])) {
                        result[0].push(collection[i])
                    } else {
                        result[1].push(collection[i])
                    }
                } else if (typeof  predicate === "string") {
                    if (liwenkang.property(predicate)(collection[i])) {
                        result[0].push(collection[i])
                    } else {
                        result[1].push(collection[i])
                    }
                } else if (Array.isArray(predicate)) {
                    if (liwenkang.matchesProperty(predicate)(collection[i])) {
                        result[0].push(collection[i])
                    } else {
                        result[1].push(collection[i])
                    }
                } else if (typeof predicate === "object") {
                    if (liwenkang.matches(predicate)(collection[i])) {
                        result[0].push(collection[i])
                    } else {
                        result[1].push(collection[i])
                    }
                }
            }
        }
        return result
    },

    reduce: function (collection, iteratee, accumulator) {
        if (Array.isArray(collection)) {
            return collection.reduce(iteratee, accumulator)
        } else if (typeof collection === "object") {
            for (var key in collection) {
                accumulator = iteratee(accumulator, collection[key], key)
            }
            return accumulator
        }
    },

    reduceRight: function (collection, iteratee, accumulator) {
        if (Array.isArray(collection)) {
            for (var i = collection.length - 1; i >= 0; i--) {
                accumulator = iteratee(accumulator, collection[i])
            }
            return accumulator
        }
    },

    reject: function (collection, predicate) {
        var result = []
        if (typeof predicate === "function") {
            for (var i = 0; i < collection.length; i++) {
                if (!predicate(collection[i])) {
                    result.push(collection[i])
                }
            }
        }

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

        if (typeof predicate === "string") {
            for (var i = 0; i < collection.length; i++) {
                if (!collection[i][predicate]) {
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
        if (typeof predicate === "function") {
            return collection.some(value => predicate(value))
        } else if (typeof predicate === "string") {
            return collection.some(value => liwenkang.property(predicate)(value))
        } else if (Array.isArray(predicate)) {
            return collection.some(value => liwenkang.matchesProperty(predicate)(value))
        } else if (typeof predicate === "object") {
            return collection.some(value => liwenkang.matches(predicate)(value))
        }
    },

    sortBy: function (collection, iteratees) {
        var i = 0
        var newArray = collection.slice()
        newArray.sort((a, b) => {
            if (typeof iteratees[i] === "function") {
                while (iteratees[i](a).localeCompare(iteratees[i](b)) === 0) {
                    if (i + 1 < iteratees.length) {
                        i++
                    } else {
                        break
                    }
                }
                var result = iteratees[i](a).localeCompare(iteratees[i](b))
                i = 0
                return result
            } else if (typeof iteratees[i] === "string") {
                while (("" + liwenkang.property(iteratees[i])(a)).localeCompare("" + liwenkang.property(iteratees[i])(b)) === 0) {
                    if (i + 1 < iteratees.length) {
                        i++
                    } else {
                        break
                    }
                }
                var result = ("" + liwenkang.property(iteratees[i])(a)).localeCompare("" + liwenkang.property(iteratees[i])(b))
                i = 0
                return result
            }
        })
        return newArray
    },

    now: function () {
        return new Date().getTime();
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

    bind: function (func, ...partials) {
        return function (...args) {
            return func(...partials, ...args)
        }
    },

    bindKey: function (object, key, partials) {
        var func = object[key]
        return function (string) {
            this.user = object.user
            return func(partials, string)
        }
    },

    curry: function (func, arity = func.length) {
        return function (...args) {
            var length = arguments.length
            if (length < arity) {
                var result = liwenkang.curry(func.bind(null, ...args))
            } else if (length === arity) {
                var result = func(...args)
            }
            return result
        }
    },

    curryRight: function (func, arity = func.length) {
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
        string = string.replace(/&/g, "&amp;")
        string = string.replace(/</g, "&lt;")
        string = string.replace(/>/g, "&gt;")
        string = string.replace(/"/g, "&quot;")
        string = string.replace(/'/g, "&#39")
        return string
    },

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
        if (Array.isArray(value)) {
            var result = value.slice(0)
            return result
        } else if (typeof value === "object") {
            return JSON.parse(JSON.stringify(value))
        } else {
            return value
        }
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