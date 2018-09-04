const log = console.log.bind(console)

var randomArr = function (num) {
    // num 个随机数
    var result = []
    for (var i = 0; i < num; i++) {
        result.push(Math.floor(Math.random() * 100))
    }
    return result
}

// 冒泡排序 (Bubble Sort)
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

// 选择排序 (Selection Sort)
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

// 插入排序 (Insertion Sort)
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
    return array
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