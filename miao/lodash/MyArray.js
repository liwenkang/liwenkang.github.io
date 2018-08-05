const log = console.log.bind(console)


var quickSort = function (array) {
    if (array.length <= 1) {
        return array
    }
    var pivot = array[Math.floor(Math.random() * array.length)]

    var left = []
    var mid = []
    var right = []

    for (var item of array) {
        if (item < pivot) {
            left.push(item)
        } else if (item > pivot) {
            right.push(item)
        } else {
            mid.push(item)
        }
    }

    return quickSort(left).concat(mid, quickSort(right))
}

var MyArray = (function () {
    var MyArray = function (...args) {
        var length = [...args].length
        if (length === 1 && typeof [...args][0] === "number") {
            for (var i = 0; i < [...args][0]; i++) {
                this[i] = undefined
            }
        } else {
            for (var index in args) {
                this[index] = args[index]
            }
        }
    }

    Object.defineProperty(MyArray.prototype, "length", {
        get: function () {
            var num = 0
            for (var index in this) {
                num++
            }
            return num
        },
        enumerable: false,
        configurable: true
    })

// 改变原数组

    // 没写
    Object.defineProperty(MyArray.prototype, "copyWithin", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "fill", {
        value: function (value, start = 0, end = this.length) {
            var length = this.length
            // If start is negative, it is treated as length+start where length is the length of the array. If end is negative, it is treated as length+end.

            while (start < 0) {
                start += length
            }

            while (end < 0) {
                end += length
            }

            for (var i = start; i < end && i < this.length; i++) {
                this[i] = value
            }
            return this
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "pop", {
        value: function () {
            // 删掉最后一个
            return this.splice(this.length - 1, 1)
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "push", {
        value: function (...args) {
            for (var i = 0; i < arguments.length; i++) {
                this[this.length + i] = arguments[i]
            }
            this.length += [...args].length
            return this.length
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "reverse", {
        value: function () {
            // 反向
            for (var i = 0; i < Math.floor(this.length / 2); i++) {
                var tmp = this[i]
                this[i] = this[this.length - 1 - i]
                this[this.length - 1 - i] = tmp
            }
            return this
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "shift", {
        value: function () {
            if (this.length >= 1) {
                return this.splice(0, 1)
            }
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // 没写
    Object.defineProperty(MyArray.prototype, "sort", {
        value: function (f) {
            // 排序

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "splice", {
        value: function (start, deleteCount, ...items) {
            var addLength = [...items].length

            // 切成两部分
            var preArr = this.slice(0, start)

            var deleteArr = this.slice(start, start + deleteCount)

            var remainArr = this.slice(start + deleteCount)

            // 也就是 从 start 到 start + addLength 这个范围内的值都会替换
            for (var i = 0; i < addLength; i++) {
                preArr[start + i] = [...items][i]
            }

            var preLength = preArr.length
            var remainLength = remainArr.length

            for (var i = 0; i < remainLength; i++) {
                preArr[preLength + i] = remainArr[i]
            }

            if (preArr.length >= this.length) {
                // 将 preArr 的长度 比 this 的长
                for (var i = 0; i < preArr.length; i++) {
                    this[i] = preArr[i]
                }
            } else {
                // this.length > preArr
                var len = this.length
                for (var i = 0; i < len; i++) {
                    this[i] = preArr[i]

                    if (i >= preArr.length) {
                        delete this[i]
                    }
                }
            }

            return deleteArr
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "unshift", {
        value: function (...args) {
            // 从前面插入
            var preArr = new MyArray()
            for (var i = 0; i < args.length; i++) {
                preArr.push(args[i])
            }

            for (var i = 0; i < this.length; i++) {
                preArr.push(this[i])
            }
            // 将 preArr 赋值给 this


            // 将 preArr 的长度 比 this 的长
            for (var i = 0; i < preArr.length; i++) {
                this[i] = preArr[i]
            }

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

// 不改变原函数
// Object.defineProperty(MyArray.prototype, "concat", {
//     value: function (...args) {
//         // ...args 可以传入 MyArray,以及数字的形式
//         var newArray = new MyArray()
//         Object.assign(newArray, this)
//         log("newArray1", newArray)
//         for (var i in args) {
//             if (args[i] instanceof MyArray || args[i] instanceof Array) {
//                 newArray.push(args[i])
//             }
//         }
//         log("newArray2",newArray)
//     },
//     writable: true,
//     enumerable: false,
//     configurable: true
// })
// 测试 concat
// var alpha = new MyArray('a', 'b', 'c')
// var numeric = new MyArray(1, 2, 3)
//
// // alpha.concat(numeric)
//
// log(alpha)
// log(alpha.concat(numeric, 1, 2))
// // // result in ['a', 'b', 'c', 1, 2, 3]

    Object.defineProperty(MyArray.prototype, "includes", {
        value: function (searchElement, fromIndex = 0) {
            if (fromIndex < 0) {
                fromIndex += this.length
            }
            if (fromIndex >= this.length) {
                return false
            }
            for (var i in this) {
                if (i >= fromIndex && this[i] === searchElement) {
                    return true
                }

                if (searchElement !== searchElement && this[i] !== this[i]) {
                    return true
                }
            }
            return false
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "indexOf", {
        value: function (searchElement, fromIndex = 0) {
            if (fromIndex < 0) {
                fromIndex += this.length
            }
            if (fromIndex >= this.length) {
                return -1
            }
            for (var i in this) {
                if (i >= fromIndex && this[i] === searchElement) {
                    return parseInt(i)
                }

                if (searchElement !== searchElement && this[i] !== this[i]) {
                    return parseInt(i)
                }
            }
            return -1
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "join", {
        value: function (str = ",") {
            var result = ""
            var length = this.length - 1
            for (var index in this) {
                if (index < length) {
                    result += (this[index] + str)
                } else {
                    result += this[index]
                }
            }
            return result
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "lastIndexOf", {
        value: function (searchElement, fromIndex = 0) {
            var arr = new MyArray()
            arr = this.reverse()

            if (fromIndex >= arr.length) {
                return -1
            }

            for (var i in arr) {
                if (i >= fromIndex && arr[i] === searchElement) {
                    return parseInt(i)
                }

                if (searchElement !== searchElement && arr[i] !== arr[i]) {
                    return parseInt(i)
                }
            }
            return -1

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "slice", {
        value: function (start = 0, end) {
            // 不改变 this
            var newArray = new MyArray()
            Object.assign(newArray, this)
            for (var i = 0; i < start; i++) {
                // 通过删除不要的获得新的
                delete newArray[i]
            }
            for (var i = end; i < this.length; i++) {
                // 通过删除不要的获得新的
                delete newArray[i]
            }

            var resultArray = new MyArray()
            var index = 0
            for (var prop in newArray) {
                resultArray[index++] = newArray[prop]
            }
            return resultArray
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "toSource", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "toString", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "toLocaleString", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

// 需要迭代的

    Object.defineProperty(MyArray.prototype, "entries", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "every", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "filter", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "find", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "findIndex", {
        value: function () {

        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "forEach", {
        value: function (f) {
            // f 是一个函数
            for (var i in this) {
                f(this[i], i)
            }
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    Object.defineProperty(MyArray.prototype, "keys", {
        value: function () {

        },
        enumerable: false,
        configurable: false,
        writable: true
    })

    Object.defineProperty(MyArray.prototype, "map", {
        value: function () {

        },
        enumerable: false,
        configurable: false,
        writable: true
    })

    Object.defineProperty(MyArray.prototype, "reduce", {
        value: function () {

        },
        enumerable: false,
        configurable: false,
        writable: true
    })

    Object.defineProperty(MyArray.prototype, "reduceRight", {
        value: function () {

        },
        enumerable: false,
        configurable: false,
        writable: true
    })

    Object.defineProperty(MyArray.prototype, "some", {
        value: function () {

        },
        enumerable: false,
        configurable: false,
        writable: true
    })

    Object.defineProperty(MyArray.prototype, "values", {
        value: function () {

        },
        enumerable: false,
        configurable: false,
        writable: true
    })
    return MyArray
})()

// forEach 测试
// var fruits = new MyArray('Apple', 'Banana')
// fruits.forEach(function (item, index, array) {
//     console.log(item, index)
// })

// push 测试
// var newLength = fruits.push('Orange')

// pop 测试
// var last = fruits.pop() // remove Orange (from the end)
// log(last)

// slice 测试
// var animals = new MyArray('ant', 'bison', 'camel', 'duck', 'elephant')
//
// console.log(animals.slice(2))
// // expected output: Array ["camel", "duck", "elephant"]
//
// console.log(animals.slice(2, 4))
// // // expected output: Array ["camel", "duck"]
// //
// console.log(animals.slice(1, 5))
// // // expected output: Array ["bison", "camel", "duck", "elephant"]

// splice 测试
// var myFish = new MyArray('angel', 'clown', 'mandarin', 'sturgeon')
// var removed = myFish.splice(2, 2, 'drum')
// log(myFish)
// log(removed)
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
// removed is [], no elements removed

// fill 测试
// [1, 2, 3].fill(4);               // [4, 4, 4]
// [1, 2, 3].fill(4, 1);            // [1, 4, 4]
// [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
// [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
// [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
// [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
// [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
// [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
// Array(3).fill(4);                // [4, 4, 4]
// [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
//
// // Objects by reference.
// var arr = Array(3).fill({}) // [{}, {}, {}];
// arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]

// reverse 测试
// const a = new MyArray(1, 2, 3)
//
// console.log(a) // [1, 2, 3]
//
// a.reverse()
//
// console.log(a) // [3, 2, 1]

// shift 测试
//
// var myFish = new MyArray('angel', 'clown', 'mandarin', 'surgeon')
//
// console.log('myFish before:', JSON.stringify(myFish))
// // myFish before: ['angel', 'clown', 'mandarin', 'surgeon']
//
// var shifted = myFish.shift()
//
// console.log('myFish after:', myFish)
// // myFish after: ['clown', 'mandarin', 'surgeon']
//
// console.log('Removed this element:', shifted)
// // Removed this element: angel

// sort 没写
// var numbers = new MyArray(4, 2, 5, 1, 3)
// numbers.sort(function (a, b) {
//     return a - b
// })
// console.log(numbers)

// unshift 测试
// var arr = new MyArray(1, 2)
//
// arr.unshift(0) // result of call is 3, the new array length
// // arr is [0, 1, 2]
// log(arr)
//
// arr.unshift(-2, -1) // = 5
// // arr is [-2, -1, 0, 1, 2]
// log(arr)
//
// arr.unshift([-3])
// //  // arr is [[-3], -2, -1, 0, 1, 2]
// log(arr)

// includes 测试
// log(new MyArray(1, 2, 3).includes(2))     // true
// log(new MyArray(1, 2, 3).includes(4))     // false
// log(new MyArray(1, 2, 3).includes(3, 3))  // false
// log(new MyArray(1, 2, 3).includes(3, -1)) // true
// log(new MyArray(1, 2, NaN).includes(NaN)) // true
// var arr = new MyArray('a', 'b', 'c')
//
// log(arr.includes('c', 3))   // false
// log(arr.includes('c', 100)) // false

// indexOf 测试
// var array = new MyArray(2, 9, 9)
// log(array.indexOf(2)) // 0
// log(array.indexOf(7))// -1
// log(array.indexOf(9, 2)) // 2
// log(array.indexOf(2, -1))// -1
// log(array.indexOf(2, -3)) // 0
// var indices = new MyArray()
// var array = new MyArray('a', 'b', 'a', 'c', 'a', 'd')
// var element = 'a'
// var idx = array.indexOf(element)
//
// while (idx !== -1) {
//     indices.push(idx)
//     idx = array.indexOf(element, idx + 1)
// }
// console.log(indices)
// [0, 2, 4]
// function updateVegetablesCollection (veggies, veggie) {
//     if (veggies.indexOf(veggie) === -1) {
//         veggies.push(veggie);
//         console.log('New veggies collection is : ' + veggies);
//     } else if (veggies.indexOf(veggie) > -1) {
//         console.log(veggie + ' already exists in the veggies collection.');
//     }
// }
//
// var veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];
//
// updateVegetablesCollection(veggies, 'spinach');
// // New veggies collection is : potato,tomato,chillies,green-pepper,spinach
// updateVegetablesCollection(veggies, 'spinach');
// // spinach already exists in the veggies collection.

// join 测试
// var a = new MyArray('Wind', 'Rain', 'Fire')
// log(a.join())      // 'Wind,Rain,Fire'
// log(a.join(', '))  // 'Wind, Rain, Fire'
// log(a.join(' + ')) // 'Wind + Rain + Fire'
// log(a.join(''))    // 'WindRainFire'
// function f(a, b, c) {
//     var s = MyArray.prototype.join.call(arguments);
//     console.log(s); // '1,a,true'
// }
// f(1, 'a', true);
// //expected output: "1,a,true"

// lastIndexOf 测试
var numbers = new MyArray(2, 5, 9, 2)
log(numbers.lastIndexOf(2)) // 3
// log(numbers.lastIndexOf(7))// -1
// log(numbers.lastIndexOf(2, 3)) // 3
log(numbers.lastIndexOf(2, 2)) // 0
// log(numbers.lastIndexOf(2, -2)) // 0
log(numbers.lastIndexOf(2, -1)) // 3



