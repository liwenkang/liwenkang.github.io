const log = console.log.bind(console)

// Map，Set，Array
// 输入一个数组
var MyMap = (function () {
    var MyMap = function (array = []) {
        // 如果使用 var m = MyMap([[0,0],[1,1],[2,2]])
        // 也可以正常使用
        if (!(this instanceof MyMap)) {
            return new MyMap(array)
        }
        this.container = array
        this[Symbol.iterator] = function () {
            return this.container[Symbol.iterator]()
        }
    }

    MyMap.prototype.set = function (key, value) {
        if (!this.has(key)) {
            // 无重复的 key
            this.container.push([key, value])
        } else {
            // 如果有重复的 key ,直接覆盖
            for (var i = 0; i < this.container.length; i++) {
                if (this.container[i][0] === key ||
                    (key !== key && this.container[i][0] !== this.container[i][0])
                ) {
                    this.container[i][1] = value
                }
            }
        }
        return this.container
    }

    MyMap.prototype.get = function (key) {
        // this.container [[0,0],[1,1]]
        for (var i = 0; i < this.container.length; i++) {
            if (this.container[i][0] === key ||
                (key !== key && this.container[i][0] !== this.container[i][0])
            ) {
                return this.container[i][1]
            }
        }
        return undefined
    }

    MyMap.prototype.has = function (key) {
        for (var i = 0; i < this.container.length; i++) {
            if (this.container[i][0] === key ||
                (key !== key && this.container[i][0] !== this.container[i][0])
            ) {
                return true
            }
        }
        return false
    }

    MyMap.prototype.forEach = function (func) {
        for (var i = 0; i < this.container.length; i++) {
            var key = this.container[i][0]
            var value = this.container[i][1]
            var array = this.container[i]
            func(value, key)
        }
    }

    MyMap.prototype.keys = function () {
        var result = []
        for (var i = 0; i < this.container.length; i++) {
            result.push(this.container[i][0])
        }
        return result[Symbol.iterator]()
    }

    MyMap.prototype.clear = function () {
        this.container = []
    }

    MyMap.prototype.delete = function (key) {
        for (var i = 0; i < this.container.length; i++) {
            if (this.container[i][0] === key) {
                this.container.splice(i, 1)
                break
            }
            if (key !== key) {
                // key 为 NaN
                if (this.container[i][0] !== this.container[i][0]) {
                    this.container.splice(i, 1)
                    break
                }
            }
        }
    }

    MyMap.prototype.entries = function () {
        var result = []
        for (var i = 0; i < this.container.length; i++) {
            result.push(this.container[i])
        }
        return result[Symbol.iterator]()
    }

    MyMap.prototype.values = function () {
        var result = []
        for (var i = 0; i < this.container.length; i++) {
            result.push(this.container[i][1])
        }
        return result[Symbol.iterator]()
    }

    Object.defineProperty(MyMap.prototype, 'size', {
        get: function () {
            return this.container.length
        }
    })


    return MyMap
})()


var myMap = new MyMap()

// // get 和 set 测试
// var keyString = 'a string',
//     keyObj = {},
//     keyFunc = function () {
//     },
//     keyNull = null
//
// // setting the values
// myMap.set(keyString, "'a string'")
// myMap.set(keyObj, 'keyObj')
// myMap.set(keyFunc, 'keyFunc')
// myMap.set(keyNull, 'keyNull')
//
// // getting the values
// log(myMap.get(keyString))    // "'a string'"
// log(myMap.get(keyObj))    // "keyObj"
// log(myMap.get(keyFunc))    // "keyFunc"
// log(myMap.get(keyNull))    // "keyNull"
// //
// // // //
// log(myMap.get('a string'))   // "value associated with 'a string'"
// log(myMap.get({}))   // undefined, because keyObj !== {}
// log(myMap.get(function () {
// })) // undefined, because keyFunc !== function () {}
// log(myMap.get(null))     // keyNull

// NaN 测试
// myMap.set(NaN, 'not a number')
//
// log(myMap.get(NaN)) // "not a number"
//
// var otherNaN = Number('foo')
// log(myMap.get(otherNaN)) // "not a number"

// 支持 for of 迭代
// var myMap = new Map()
// myMap.set(0, 'zero')
// myMap.set(1, 'one')
// for (var [key, value] of myMap) {
//     console.log(key + ' = ' + value)
// }
// // 0 = zero
// // 1 = one
// // //
// for (var key of myMap.keys()) {
//     console.log(key)
// }
// 0
// 1
//
// for (var value of myMap.values()) {
//     console.log(value)
// }
// // zero
// // one
//
// for (var [key, value] of myMap.entries()) {
//     console.log(key + ' = ' + value)
// }
// // 0 = zero
// // 1 = one

// forEach 测试
// myMap.set(0, 'zero')
// myMap.set(1, 'one')
//
// myMap.forEach(function (value, key) {
//     console.log(key + ' = ' + value)
// })
// // Will show 2 logs; first with
// // "0 = zero"
// // "1 = one"
//
// function logMapElements(value, key, map) {
//     console.log(`m[${key}] = ${value}`);
// }
// new Map([['foo', 3], ['bar', {}], ['baz', undefined]]).forEach(logMapElements);
// logs:
// "m[foo] = 3"
// "m[bar] = [object Object]"
// "m[baz] = undefined"

// keys() 测试
// var myMap = new MyMap()
// myMap.set('0', 'foo')
// myMap.set(1, 'bar')
// myMap.set({}, 'baz')
//
// var mapIter = myMap.keys()
//
// console.log(mapIter.next().value) // "0"
// console.log(mapIter.next().value) // 1
// console.log(mapIter.next().value) // Object

// 数组 和 map 转换
// var kvArray = [['key1', 'value1'], ['key2', 'value2']]
//
// // Use the regular Map constructor to transform a 2D key-value Array into a map
// var myMap = new MyMap(kvArray)
//
// myMap.get('key1') // returns "value1"
//
// // Use the Array.from function to transform a map into a 2D key-value Array
// console.log(Array.from(myMap)) // Will show you exactly the same Array as kvArray
//
// // Or use the keys or values iterators and convert them to an array
// console.log(Array.from(myMap.keys())) // Will show ["key1", "key2"]

// var original = new Map([
//     [1, 'one']
// ]);
//
// var clone = new Map(original);
//
// console.log(clone.get(1)); // one
// console.log(original === clone); // false. Useful for shallow comparison

// var first = new Map([
//     [1, 'one'],
//     [2, 'two'],
//     [3, 'three'],
// ]);
//
// var second = new Map([
//     [1, 'uno'],
//     [2, 'dos']
// ]);
//
// // Merge two maps. The last repeated key wins.
// // Spread operator essentially converts a Map to an Array
// var merged = new Map([...first, ...second]);
//
// console.log(merged.get(1)); // uno
// console.log(merged.get(2)); // dos
// console.log(merged.get(3)); // three

// var first = new Map([
//     [1, 'one'],
//     [2, 'two'],
//     [3, 'three'],
// ]);
//
// var second = new Map([
//     [1, 'uno'],
//     [2, 'dos']
// ]);
//
// // Merge maps with an array. The last repeated key wins.
// var merged = new Map([...first, ...second, [1, 'eins']]);
//
// console.log(merged.get(1)); // eins
// console.log(merged.get(2)); // dos
// console.log(merged.get(3)); // three

// clear 测试
// var myMap = new MyMap()
// myMap.set('bar', 'baz')
// myMap.set(1, 'foo')
//
// log(myMap.size)  //2
// log(myMap.has('bar')) // true
//
// myMap.clear();
//
// log(myMap.size)       // 0
// log(myMap.has('bar'))  // false

// delete 测试
// var myMap = new MyMap()
// myMap.set('bar', 'foo')
//
// myMap.delete('bar') // Returns true. Successfully removed.
// log(myMap.size)
// log(myMap.container)
// log(myMap.has('bar'))    // Returns false. The "bar" element is no longer present.

// entries 测试
// var myMap = new MyMap()
// myMap.set('0', 'foo')
// myMap.set(1, 'bar')
// myMap.set({a:1}, 'baz')
//
// var mapIter = myMap.entries()
//
// console.log(mapIter.next().value) // ["0", "foo"]
// console.log(mapIter.next().value) // [1, "bar"]
// console.log(mapIter.next().value) // [Object, "baz"]

// values() 测试
// var myMap = new MyMap()
// myMap.set('0', 'foo')
// myMap.set(1, 'bar')
// myMap.set({}, 'baz')
//
// var mapIter = myMap.values()
//
// console.log(mapIter.next().value) // "foo"
// console.log(mapIter.next().value) // "bar"
// console.log(mapIter.next().value) // "baz"

// map.@@iterator 测试
// const myMap = new MyMap()
// myMap.set('0', 'foo')
// myMap.set(1, 'bar')
// myMap.set({}, 'baz')
//
// const mapIter = myMap[Symbol.iterator]()
//
// console.log(mapIter.next().value) // ["0", "foo"]
// console.log(mapIter.next().value) // [1, "bar"]
// console.log(mapIter.next().value) // [Object, "baz"]

// const myMap = new Map();
// myMap.set('0', 'foo');
// myMap.set(1, 'bar');
// myMap.set({}, 'baz');
//
// for (const entry of myMap) {
//     console.log(entry);
// }
// // ["0", "foo"]
// // [1, "bar"]
// // [{}, "baz"]
//
// for (const [key, value] of myMap) {
//     console.log(`${key}: ${value}`);
// }
// 0: foo
// 1: bar
// [Object]: baz