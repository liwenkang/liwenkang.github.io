const log = console.log.bind(console)

var MySet = function (array = []) {
    if (typeof MySet === "string") {
        array = Array.from(array)
    }
    this.container = array
    this.size = array.length
    this.iterable = this.container[Symbol.iterator]()
    this[Symbol.iterator] = function () {
        return this.container[Symbol.iterator]()
    }
}

MySet.prototype.add = function (value) {
    // log("this.container", this.container)
    if (!this.container.includes(value)) {
        this.container.push(value)
        this.size++
    }
}

MySet.prototype.has = function (value) {
    if (this.container.includes(value)) {
        return true
    } else {
        return false
    }
}

MySet.prototype.delete = function (value) {
    var index = this.container.indexOf(value)
    if (index > -1) {
        this.container.splice(index, 1)
        this.size--
    }
}

MySet.prototype.keys = function () {
    return this.container[Symbol.iterator]()
}

MySet.prototype.entries = function () {
    var result = []
    for (var i = 0; i < this.container.length; i++) {
        result.push([this.container[i], this.container[i]])
    }
    return result[Symbol.iterator]()
}

MySet.prototype.values = function () {
    return this.container[Symbol.iterator]()
}

MySet.prototype.forEach = function (func) {
    for (var i = 0; i < this.container.length; i++) {
        var key = this.container[i]
        func(key)
    }
}

MySet.prototype.clear = function () {
    this.size = 0
    this.container = []
}

function isSuperset(set, subset) {
    // 后面的是不是前面的子集
    for (var elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}

function union(setA, setB) {
    // 并集, 把 setB 中的元素都加到 setA 中,并返回 setA
    var tmp = new MySet()
    for (var elem of setA) {
        tmp.add(elem)
    }
    for (var elem of setB) {
        tmp.add(elem)
    }
    return tmp
}

function intersection(setA, setB) {
    // 交集
    var _intersection = new MySet()
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function difference(setA, setB) {
    // 差集, setA - setB
    var _difference = new MySet()
    for (var elem of setA) {
        _difference.add(elem)
        if (setB.has(elem)) {
            _difference.delete(elem)
        }
    }
    return _difference
}

// 子集, 并集, 交集, 差集
// var setA = new MySet([1, 2, 3, 4]),
//     setB = new MySet([2, 3]),
//     setC = new MySet([3, 4, 5, 6])
// //
// log(isSuperset(setA, setB))// => true
// log(union(setA, setC)) // => Set [1, 2, 3, 4, 5, 6]
// log(intersection(setA, setC)) // => Set [3, 4]
// log(difference(setA, setC)) // => Set [1, 2]

// add() has() size 测试
// var mySet = new MySet()
//
// mySet.add(1) // Set [ 1 ]
// mySet.add(5) // Set [ 1, 5 ]
// mySet.add(5) // Set [ 1, 5 ]
// mySet.add('some text') // Set [ 1, 5, 'some text' ]
//
// var o = {a: 1, b: 2}
// mySet.add(o)
//
// mySet.add({a: 1, b: 2}) // o is referencing a different object so this is okay
//
// mySet.has(1) // true
// mySet.has(3) // false, 3 has not been added to the set
// mySet.has(5)              // true
// mySet.has(Math.sqrt(25))  // true
// mySet.has('Some Text'.toLowerCase()) // true
// mySet.has(o) // true
// //
// log(mySet.size) // 5
// //
// mySet.delete(5) // removes 5 from the set
// mySet.has(5)    // false, 5 has been removed
// //
// log(mySet.size) // 4, we just removed one value
// console.log(mySet)// Set [ 1, "some text", Object {a: 1, b: 2}, Object {a: 1, b: 2} ]
//
// log("中间")

// iterate over items in set

// for of 测试
// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
// for (let item of mySet) console.log(item)

// keys() 测试
// // logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
// for (let item of mySet.keys()) console.log(item)

// values() 测试
// // logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
// for (let item of mySet.values()) console.log(item)

// entries() 测试
// // logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
// //(key and value are the same here)
// for (let [key, value] of mySet.entries()) console.log(key)

// var mySet = new MySet()
// mySet.add('foobar')
// mySet.add(1)
// mySet.add('baz')
//
// var setIter = mySet.entries()
//
// console.log(setIter.next().value) // ["foobar", "foobar"]
// console.log(setIter.next().value) // [1, 1]
// console.log(setIter.next().value) // ["baz", "baz"]

// 转换为数组 测试
// convert Set object to an Array object, with Array.from 测试
// var myArr = Array.from(mySet) // [1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}]
// //
// log(myArr)
// // // the following will also work if run in an HTML document
// mySet.add(document.body)
// mySet.has(document.querySelector('body')) // true
//

// ...转换为数组 测试
// converting between Set and Array
// var mySet2 = new Set([1, 2, 3, 4])
// log(mySet2.size) // 4
// log([...mySet2]) // [1, 2, 3, 4]
//
// // intersect can be simulated via
// var intersection = new Set([...set1].filter(x => set2.has(x)))
// //
// // difference can be simulated via
// var difference = new Set([...set1].filter(x => !set2.has(x)))

// forEach() 测试
// Iterate set entries with forEach
// mySet.forEach(function(value) {
//     console.log(value);
// });
//
// // 1
// // 2
// // 3
// // 4

// 数组转换为 Set 测试
// var myArray = ['value1', 'value2', 'value3']
//
// // Use the regular Set constructor to transform an Array into a Set
// var mySet = new Set(myArray)
//
// log(mySet.has('value1')) // returns true
//
// // Use the spread operator to transform a set into an Array.
// console.log([...mySet]) // Will show you exactly the same Array as myArray

// Relation with Strings 测试
// var text = 'India'
//
// var mySet = new Set(text)  // Set ['I', 'n', 'd', 'i', 'a']
// mySet.size  // 5

// celar() 测试
// var mySet = new MySet()
// mySet.add(1)
// mySet.add('foo')
//
// log(mySet.size)       // 2
// log(mySet.has('foo')) // true
//
// mySet.clear()
//
// log(mySet.size)       // 0
// log(mySet.has('bar'))  // false