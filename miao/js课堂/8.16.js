const log = console.log.bind(console)

// selector = "div span .foo#bar"
function isMatchSelector(node, selector) {
    var comboSelectors = selector.split(" ")
    // 匹配不带空格的选择器

    if (isMatchComboSelector(node, comboSelectors[comboSelectors.length - 1])) {
        var p = node.parentNode
        var i = comboSelectors.length - 2

        while (p && i >= 0) {
            if (isMatchComboSelector(p, comboSelectors[i])) {
                p = p.parentNode
                i--
            } else {
                // p 换一下
                // i 不动
                p = p.parentNode
            }
        }

        if (i === -1) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

// div.foo#bar"
function isMatchComboSelector(node, selector) {
    var singleSelectors = selector.split(/(?= \.|\#|\[|\:)/)
    return singleSelectors.every(ss => {
        // ss 是单一选择器
        return ss.test(node)
    })
}

// div
function isMatchSingleSelector(node, selector) {
    switch (selector[0]) {
        case ".":
            return isMatchClassSelector(node, selector)
        case "#":
            return isMatchIdSelector(node, selector)
        case "[":
            return isMatchAttrSelector(node, selector)
        case ":":
            return isMatchPseudoClassSelector(node, selector)
        default:
            return isMatchElementSelector(node, selector)
    }
}

function isMatchClassSelector(node, selector) {
    return node.classList.contains(selector.slice(1))
}

function isMatchIdSelector(node, selector) {
    return node.id === selector.slice(1)
}

// [attr]
// [attr="value"]
function isMatchAttrSelector(node, selector) {
    selector = selector.slice(1, -1)
    var parts = selector.split("=")
    if (parts.length === 1) {
        return node.hasAttribute(parts[0])
    } else {
        return node.getAttribute(parts[0]) === parts[1].slice(1, -1)
    }
}

// 把伪类拆出来
function f() {

}

// :nth-child
function isMatchPseudoClassSelector(node, selector) {
    selector = selector.slice(1)
}

function isMatchElementSelector(node, selector) {
    return node.tagName === selector.toLowerCase()
}

// 队列

// 堆: 使用二叉树存储
// 最大堆: 根节点的值大于等于左子树和右子树
// 最小堆: 根节点的值小于等于左子树和右子树

class priorityQueue {
    constructor() {
        this.tree = []
    }

    _swap(i, j) {
        var t = this.tree[i]
        this.tree[i] = this.tree[j]
        this.tree[j] = t
    }

    reHeapUp(idx) {
        if (idx === 0) {

        }
        var parentIndex = idx - 1 >> 1
        if (this.tree[idx] < this.tree[parentIndex]) {
            // 最小堆
            this._swap(idx, parentIndex)
            this.reHeapUp(parentIndex)
        }
    }

    add(val) {
        this.tree.push(val)
        this.reHeapUp(this.tree.length - 1)

        // // 放到末尾后
        // this.tree.push(val)
        // // 当前添加值的 index
        // var idx = this.tree.length - 1
        // // n => 左子树 2*n+1
        // // 右子树 2*n+2
        // var parentIndex = Math.floor((idx + 1) / 2)
        // while (idx > 0) {
        //     if (this.tree[idx] < this.tree[parentIndex]) {
        //         // 最小堆
        //         this._swap(idx, parentIndex)
        //         idx = idx - 1 >> 1
        //         parentIndex = parentIndex - 1 >> 1
        //     } else {
        //         break
        //     }
        // }
    }

    // 把 根节点 再 idx 处的堆向下调整为一个正常的堆
    reHeapDown(idx) {
        var minIdx = idx

        var leftIdx = idx * 2 + 1
        var rightIdx = idx * 2 + 2

        if (this.tree[minIdx] > this.tree[leftIdx]) {
            minIdx = leftIdx
        }

        if (this.tree[minIdx] > this.tree[rightIdx]) {
            minIdx = rightIdx
        }

        if (idx !== minIdx) {
            this._swap(idx, minIdx)
            this.reHeapDown(minIdx)
        }
    }

    delete() {
        var result = this.tree[0]
        var last = this.tree.pop()
        this.tree[0] = last

        this, this.reHeapDown()

        // 下降
        var idx = 0
        var minIdx
        while (true) {
            minIdx = idx
            if (this.tree[idx * 2 + 1] < this.tree[minIdx]) {
                minIdx = idx * 2 + 1
            }
            if (this.tree[idx * 2 + 2] < this.tree[minIdx]) {
                minIdx = idx * 2 + 2
            }
            if (idx !== minIdx) {
                this._swap(idx, minIdx)
                idx = minIdx
            } else {
                break
            }
        }
        log(this.tree)
        return result
    }
}

function swap(ary, i, j) {
    var t = ary[i]
    ary[i] = ary[j]
    ary[j] = t
    return ary
}

function heapSort(ary) {
    for (var i = ary.length - 1; i >= 0; i--) {
        reHeapDown(ary, i)
    }

    for (var i = ary.length - 1; i >= 0; i--) {
        swap(ary, 0, i)
        reHeapDown(ary, 0, i - 1)
    }

    return ary
}

function reHeapDown(ary, idx, stop = ary.length - 1) {
    var minIdx = idx

    var leftIdx = idx * 2 + 1
    var rightIdx = idx * 2 + 2

    if (leftIdx <= stop && ary[minIdx] > ary[leftIdx]) {
        minIdx = leftIdx
    }

    if (rightIdx <= stop && ary[minIdx] > ary[rightIdx]) {
        minIdx = rightIdx
    }

    if (idx !== minIdx) {
        swap(ary, idx, minIdx)
        reHeapDown(ary, minIdx, stop)
    }
}

var pq = new priorityQueue()

pq.add(1)
pq.add(2)
pq.add(3)
pq.add(4)


















