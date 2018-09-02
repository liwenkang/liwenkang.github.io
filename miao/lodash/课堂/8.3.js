const log = console.log.bind(console)

flatten = [].concat.apply.bind([].concat, [], xxx)

function flatten(ary) {
    return [].concat.apply([], ary)
}

class MySet {
    constructor(values = []) {
        // 构造函数
        this._values = values
        values.forEach(this.add.bind(this))
    }

    get size() {
        return this._values.length
    }

    forEach(iterator) {
        for (var i = 0; i < this._values.length; i++) {
            iterator(this._values[i], this._values[i], this)
        }
        return this
    }

    // 原型上的方法

    _indexOf(val) {

    }

    add(val) {
        if (this.has(val)) {
            return this
        } else {
            this._values.push(val)
        }
    }

    has(val) {
        return this._indexOf(val) >= 0
    }

    delete() {
        var idx = this._indexOf(val)
        if (idx >= 0) {
            this._values.splice(idx, 1)
        }
    }

    set(val) {

    }

    clear() {
        this._values = []
        return this
    }

    keys() {
        return this._values.slice()
    }

    values() {
        return this._values.slice()
    }


}

class MyArray {
    constructor(len) {
        this._length = len
    }

    get length() {
        var maxIndex = 0

        for (var idx in this) {
            // idx 必须是整数
            if (idx >= 0 && parseInt(idx) == idx) {
                maxIndex = parseInt(idx)
            }
        }
        if (maxIndex + 1 > this._length) {
            this._length = maxIndex + 1
            return this._length
        } else {
            return this._length
        }
    }

    set length(l) {
        if (this.length > l) {
            // 截断
            for (var i = l; i < this.length; i++) {
                delete this[i]
            }
        } else {
            // 添加空
            this._length = l
        }
    }
}

function table(ary) {
    // 画成表
    // 生成表头
    var table = ""
    var keys = Array.from(new Set([].concat(...ary.map(Object.keys))))

    table += `<table><tr>`

    for (var key of keys) {
        table += `<th>${head}</th>`
    }

    table += `</tr>`

    for (var item of ary) {
        table += `<tr>`
        for (var p of keys) {
            if (p in item) {
                table += `<td>i${item[p]}</td>`
            } else {
                table += `<td></td>`
            }
        }
        table += `</tr>`
    }

    table += `</table>`

    document.write(table)
}

describe('foo', function FOO() {
    describe('bar', function FOO() {
        describe('a', function FOO() {
            describe('a.a', function FOO() {})
        })
        describe('b', function FOO() {})
    })
    describe('baz', function FOO() {
        describe('aa', function FOO() {})
        describe('bb', function FOO() {})
    })
})


var d = 0

function describe(text, f) {
    //debugger
    d++
    console.log(' '.repeat(d * 2) + text)
    f()
    d--
}
// 16:25:46
// 知乎网大喵老师 2018/8/3 16:25:46

// 利用 WeakMap 实现 私有属性
var Person = function(){
    var wm = new WeakMap()

    return class Person {
        constructor(name,age) {
            this.name = name
            wm.set(this, {
                age: age
            })
        }

        get age() {
            return wm.get(this).age
        }

    }
}()