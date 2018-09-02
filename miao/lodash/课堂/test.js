const log = console.log.bind(console)

// * 队列是一种类似于数组的数据结构，但元素仅能从一边进入且仅能从另一边弹出队列，类似火车站
// * 设计良好的构造函数及接口以方便自己和他人使用
// * 至少需要实现的几个实例方法（其它方法按需实现）：
// * `Quene.prototype.next` 获取队列的下一个元素
// * `Quene.prototype.push` 将一个元素放进队列
// * `Quene.prorotype.length` 获取队列的长度（getter）

// 实现一个链表

class Quene {
    constructor() {
        this.quene = []
    }

    next() {
        // 啥是获取下一个元素 ???
        return this.quene.shift()
    }

    push(value) {
        this.quene.push(value)
    }

    get length() {
        return this.quene.length
    }

    front() {
        // 读取队首元素
        return this.quene[0]
    }

    back() {
        return this.quene[this.quene.length - 1]
    }

    toString() {
        return this.quene.join("\n")
    }

    claer() {
        this.quene.length = 0
    }

    empty() {
        return this.quene.length === 0
    }
}