const log = console.log.bind(console)

function map(array, mapper) {
    // mapper 是一个函数
    var result = []
    for (var i = 0; i < array.length; i++) {
        result.push(mapper(array[i], i, array))
    }
    return result
}

function reduce(ary, reducer, initialValue) {
    for (var i = 0; i < ary.length; i++) {
        initialValue = reducer(initialValue, ary[i], i, ary)
    }
    return initialValue
}

// reduce 实现 filter

function filter(ary, test) {
    return ary.reduce(function (result, item, index, ary) {
        if (test(item, index, ary)) {
            result.push(item)
        }
        return result
    }, [])
}

log(filter([1, 2, 3], function (item) {
    return item > 1
}))