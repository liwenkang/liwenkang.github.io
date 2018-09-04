const log = console.log.bind(console)

// 构造时, 构造函数的 prototype 为原型, 返回的是 this

// 箭头函数
// 1. 箭头函数 没有 this , 里面的 this 是外面的 this (取决于怎么被调用)
// 2. 没有 arguments
// 3. 没有 prototype 属性, 不能作为构造函数, 也就是不能 new xxx
// 4. 原型链上写对象, 不要用箭头函数(防止 this 指向出错)
// 5. this 不随层次发生变化的时候, 直接用箭头函数

// 模拟一个数组的实现
// var ary = {
//     0: 1,
//     1: 2,
//     2: 3,
//     3: 4,
//     _length: 4,
//     push: function (val) {
//         this[this._length++] = val
//         return this._length
//     },
//     pop: function () {
//         // 从末尾删掉
//         var tmp = this[this._length - 1]
//         delete this[--this._length]
//         return tmp
//     },

// ary.length 我们希望是用过函数获得 数组的长度
// ary.length = 5 我们希望是通过函数改变 数组的长度
// get length() {
//     return this._length
// },
//
// set length(l) {
//     // 如果设定的长度,小于当前数组的长度,那么超过的部分删除 属性名和属性值
//     if (l < this._length) {
//         for (var i = l; i < this._length; i++) {
//             delete this[i]
//         }
//     } else {
//         this._length = l
//     }
// }
// }


// Object.defineProperty(ary, "length", {
//     // configurable 可配置,只有可配置之后才能设置其他属性
//     // writable 可写
//     // enumerable 可遍历
//     enumerable: true,
//     configurable: true,
//     // 有了 get 和 set 不能有 value
//     get: function () {
//         return this._length
//     },
//     set: function (l) {
//         if (l < this._length) {
//             for (var i = l; i < this._length; i++) {
//                 delete this[i]
//             }
//         } else {
//             this._length = l
//         }
//     }
// })

// 实现 obj 上的 toString 方法
function objToString(val) {
    if (val === null) {
        return "[object Null]"
    }
    if (val === undefined) {
        return "[object Undefined]"
    }
    return "[object " + val.constructor.name + "]"
}

// log(Object.prototype.toString.call({a: 1}) === objToString({a: 1}))
// log(Object.prototype.toString.call([1, 2, 3]) === objToString([1, 2, 3]))
// log(Object.prototype.toString.call(5) === objToString(5))
// log(Object.prototype.toString.call("a") === objToString("a"))
// log(Object.prototype.toString.call(null) === objToString(null))
// log(Object.prototype.toString.call(undefined) === objToString(undefined))
// log(Object.prototype.toString.call(true) === objToString(true))
// log(Object.prototype.toString.call(Boolean(true)) === objToString(Boolean(true)))
// log(Object.prototype.toString.call(NaN) === objToString(NaN))


// // 时间复杂度 n*log(n)
// // 空间复杂度 n + log(n)
var randomArr = function (num) {
    // num 个随机数
    var result = []
    for (var i = 0; i < num; i++) {
        result.push(Math.floor(Math.random() * 100))
    }
    return result
}

// // 快排
function quickSort(ary) {
    // 不修改原数组的条件下
    if (ary.length <= 1) {
        return [...ary]
    }
    // 1. 随机取到一个数
    var pivot = ary[Math.floor(ary.length * Math.random())]

    // 2. 分三组保存数
    var left = []
    var mid = []
    var right = []

    // 3. 将数组中的数字和哨兵数比较后,放入左中右三个数组中
    for (var item of ary) {
        if (item < pivot) {
            // 小于哨兵的数放在左侧的数组中,
            left.push(item)
        } else if (item > pivot) {
            // 大于哨兵的数放在右侧的数组中
            right.push(item)
        } else {
            // 将哨兵数放到中间
            mid.push(item)
        }
    }
    // 返回新数组
    return quickSort(left).concat(mid, quickSort(right))
}

// 以哨兵数字为比较对象,不使用额外的空间
function quickSortInPlace(ary, left = 0, right = ary.length - 1) {
    if (left > right) {
        return
    }
    var pivot = ary[left]
    var i = left
    var j = right
    while (i < j) {
        while (ary[j] >= pivot && j > i) {
            j--
        }
        while (ary[i] <= pivot && i < j) {
            i++
        }
        if (i < j) {
            swap(ary, i, j)
        } else {
            break
        }
    }
    swap(ary, i, left)
    quickSortInPlace(ary, left, i - 1)
    quickSortInPlace(ary, i + 1, right)
    return ary
}

function swap(ary, i, j) {
    var temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
}

// 和前面的快排差不多啊
function parttition(ary, start = 0, end = ary.length - 1) {
    // log("刚开始ary", ary)
    if (start >= end) {
        return
    }

    var pivotIndex = Math.floor((end - start + 1) * Math.random() + start)
    // 随机选取一位
    var pivot = ary[pivotIndex]

    // 第一步, 将随机挑选出的数字放到末尾
    swap(ary, pivotIndex, end)

    // 第二步 ,根据两个指针 i j 的状态, 遍历数组,如果检测到小于等于哨兵数的数字, 就交换
    for (var i = start - 1, j = start; j <= end; j++) {
        if (ary[j] <= pivot) {
            i++
            if (i !== j) {
                swap(ary, i, j)
            }
        }
    }
    // 此时 第 i 个位置之前的元素全都小于 pivot
    // log("pivot", pivot)
    // log("修改后ary", ary)

    parttition(ary, start, i - 1)
    parttition(ary, i + 1, end)
    return ary
}

// parttition([1, 3, 2, 4, 5])

// 归并排序
var mergeSort = function (ary) {
    if (ary.length <= 1) {
        return ary
    }

    var mid = Math.floor(ary.length / 2)
    var left = mergeSort(ary.slice(0, mid))
    var right = mergeSort(ary.slice(mid))

    var result = []

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left[0])
            left = left.slice(1)
        } else {
            result.push(right[0])
            right = right.slice(1)
        }
    }

    return result.concat(left, right)
}
var isNotPrime = function (num) {
    var primeArr = [2, 3, 5, 7]
    if (primeArr.includes(num)) {
        return false
    } else {
        return true
    }
}

var foo = function(){
    return 9
}

var obj = {
    foo: function(){
        return 8
    }
}

function bar(f) {
    console.log(f())
}

bar(obj.foo)