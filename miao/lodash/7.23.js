const log = console.log.bind(console)

// 冒泡排序
// 主要就是相邻的元素交换,将最大值,或者最小值放到数组末尾
function sortArray(ary) {
    var l = ary.length
    // 将最大值放到了末尾
    for (var j = 0; j < l; j++) {
        var flag = true
        for (var i = 1; i < l - j; i++) {
            if (ary[i - 1] > ary[i]) {
                // 交换
                flag = false
                var tmp = ary[i - 1]
                ary[i - 1] = ary[i]
                ary[i] = tmp
            }
        }
        if (flag) {
            break
        }
    }
    return ary
}

// 选择排序
// 将数组的第一项和后面最小的值交换
// 将数组的第二项和后面最小的值交换
function selectSort(array) {
    for (var i = 0; i < array.length - 1; i++) {
        var tmp = array[i]
        var minNum = Infinity
        var index
        for (var j = i + 1; j < array.length; j++) {
            if (array[j] < minNum) {
                minNum = array[j]
                index = j
            }
        }
        array[index] = tmp
        array[i] = minNum
    }
    return array
}

// 插入排序
// 从第 2 个元素开始,保证前 2 个是有序的
// 从第 3 个元素开始,保证前 3 个是有序的
function insertSort(array) {
    for (var i = 1; i < array.length; i++) {
        for (var j = 0; j < i; j++) {
            if (array[i] <= array[j]) {
                var tmp = array[i]
                for (var k = i - 1; k >= j; k--) {
                    array[k + 1] = array[k]
                }
                array[j] = tmp
                break
            }
        }
    }
    log(array)
}

// 二叉树排序
function inOrderTraverse(root, action) {
    if (root) {
        inOrderTraverse(root.left, action)
        action(root.val)
        inOrderTraverse(root.right, action)
    }
}

// 把 val 插入到 root 中, 返回新的树根
function insert(root, val) {
    if (!root) {
        return {
            val: val,
            left: null,
            right: null
        }
    } else {
        if (val > root.val) {
            root.right = insert(root.right, val)
        } else {
            root.left = insert(root.left, val)
        }
        return root
    }
}

function bstSort(ary) {
    var root = null
    for (var i = 0; i < ary.length; i++) {
        root = insert(root, ary[i])
    }
    var i = 0
    inOrderTraverse(root, val => {
        ary[i++] = val
    })
    return ary
}