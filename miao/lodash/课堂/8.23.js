const log = console.log.bind(console)

// E68891
// 转换为二进制 111001 101000 100010 010001
// 转换为      57     40     34     17
// base64      5      o      i      R
//
// base64         FiR4
// 转换为          5           34       17          56
// 转换为二进制     000101    100010     010001      111000
// 结果            000101100010010001111000
//                 162478

// 任务管理器曲线为正弦函数

// for(var i = 1; i < 5; i++) {
//     new Worker('./cpu.js')
// }
//
// setTimeout(function () {
//     var time = (Math.sin(Date.now()/5000) + 1) / 2 * 1000
//     var start = Date.now()
//     for (; ;) {
//         if (Date.now() - start > time) {
//             break
//         }
//     }
// }, 1000)

// 哈希表--散列(替代对象存在)
class HashMap {
    constructor(initSize = 17) {
        this.size = initSize
        this.keyCount = 0
        this.keys = new Array(this.size)
        this.values = new Array(this.size)
    }

    hash(key) {
        var hash = 0
        var seed = 131
        for (var i = 0; i < key.length; i++) {
            hash = hash * seed + key.charCodeAt(i)
        }
        return hash % 17
    }

    // hash(key) {
    //     // 算出下标
    //     return key.split("").map(it => it.charCodeAt(0)).reduce((init, code, index) => {
    //         return init + code * (index + 1) ** 2
    //     }, 0) % 17
    // }

    get(key) {
        var pos = this.hash(key)
        if (this.keys[pos] === key) {
            return this.values(pos)
        } else {
            // 有重复的
            for (var i = 1; i < this.size; i++) {
                pos = ++pos % this.size
                if (this.keys[pos] === key) {
                    return this.values[pos]
                }
            }
            return undefined
        }
    }

    set(key, value) {
        var pos = this.hash(key)
        if (this.keys[pos] === key) {
            this.values[pos] = value
        } else {
            if (!this.keys.hasOwnProperty(pos)) {
                this.keys[pos] = key
                this.values[pos] = value
                this.keyCount++
                if (this.keyCount / this.size > 0.7) {
                    var hm = new HashMap(this.size * 2)
                }
            } else {
                // 被占了
                for (var i = 1; i < this.size; i++) {
                    pos = ++pos % this.size
                    if (!this.keys.hasOwnProperty(pos)) {
                        this.keys[pos] = key
                        this.values[pos] = value
                        this.keyCount++
                        if (this.keyCount / this.size > 0.7) {

                        }
                    } else if (this.keys[pos] === key) {
                        this.values[pos] = value
                    } else {
                        // 直接下去
                    }
                }

            }
        }
    }

    rehash() {
        var hm = new HashMap(this.size * 2)
        for (var key in keys) {
            hm.set(key, this.get(key))
        }
        this.size = hm.size
        this.values = hm.values
        this.keys = hm.keys
        this.keyCount = hm.keyCount
    }

    has(key) {

    }

    delete(key) {

    }
}
// 布隆过滤器
// 邮箱黑名单
