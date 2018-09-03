const log = console.log.bind(console)

var MyMap = (function () {
    function indexOf(ary, val) {
        // 因为 indexOf 无法查找 NaN ,所以,使用单独的函数处理
        if (val !== val) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] !== ary[i]) {
                    return i
                }
            }
            return -1
        } else {
            return ary.indexOf(val)
        }
    }


    function MyMap(maps) {
        // 如果使用 var m = MyMap([[0,0],[1,1],[2,2]])
        // 也可以正常使用
        if (!(this instanceof MyMap)) {
            return new MyMap(maps)
        }

        if (Array.isArray(maps)) {
            this._keys = []
            this._values = []
            for (var pair in maps) {
                this.set(maps[pair][0], maps[pair][1])
            }
        } else {
            throw new Error('MyMap 仅支持接受数组作为参数')
        }
    }

    var x = {
        get: function () {

        },
        set:function () {

        }
    }



    MyMap.prototype.indexOf = function (val) {

    }

    MyMap.prototype.get = function (key) {
        var idx = indexOf(this._keys, key)
        if (idx >= 0) {
            return this._values[idx]
        } else {
            return undefined
        }
    }

    MyMap.prototype.set = function (key, value) {
        var idx = indexOf(this._keys, key)
        if (idx >= 0) {
            this._values[idx] = value
        } else {
            this._keys.push(key)
            this._values.push(value)
        }
    }
    MyMap.prototype.has = function (key, value) {
        return indexOf(this._keys, key) >= 0
    }

    MyMap.prototype.delete = function (key) {
        var idx = indexOf(this._keys, key)
        if (idx >= 0) {
            this._keys.splice(idx, 1)
            this._values.splice(idx, 1)
        }
    }

    MyMap.prototype.clear = function () {
        this._keys = []
        this._values = []
    }

    Object.defineProperty(MyMap.prototype, 'size', {
        get: function () {
            return this._keys.length
        }
    })

    return MyMap
})()

var m = MyMap([[1, 2], [NaN, 1]])
