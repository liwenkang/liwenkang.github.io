const log = console.log.bind(console)

function restoreTree(inOrder, postOrder) {
    if (inOrder.length === 0 || postOrder.length === 0) {
        return null
    }
    // 中序, 后序
    // 后序的最后一个值就是根节点
    var value = postOrder[postOrder.length - 1]
    var index = inOrder.indexOf(value)
    var leftLength = index
    var rightLength = postOrder.length - (index + 1)
    var leftInOrderStr = inOrder.slice(0, index)
    var leftPostOrderStr = postOrder.slice(0, index)
    var rightInOrderStr = inOrder.slice(index + 1)
    var rightPostOrderStr = postOrder.slice(index, postOrder.length - 1)

    var tree = {
        val: value,
        left: restoreTree(leftInOrderStr, leftPostOrderStr),
        right: restoreTree(rightInOrderStr, rightPostOrderStr),
    }
    return tree
}


/*
27. 有一个员工列表（stuffList），每个人有姓名（name），性别（gender），年龄（age），入职时间(joinTime)，职位(position)等字段。现想要对该表进行排序，职位越高越往前排，职位相同的按入职时间排序，入职时间越早越往前排，请写出大致的代码*/

var StuffList = [
    {
        name: "lihua",
        gender: "male",
        age: 21,
        joinTime: "2018-6-1 10:0:0",
        position: "P5",
    },
    {
        name: "HanMeiMei",
        gender: "female",
        age: 25,
        joinTime: "2015-5-1 8:0:0",
        position: "P5",
    },
    {
        name: "XiaoMing",
        gender: "male",
        age: 30,
        joinTime: "2010-1-1 9:0:0",
        position: "P8",
    }
]


var sortStuffList = function (stuffList) {
    stuffList.sort(function (a, b) {
        if (parseInt(b.position.slice(1)) - parseInt(a.position.slice(1)) === 0) {
            var aTime = Date.parse(new Date(a.joinTime))
            var bTime = Date.parse(new Date(b.joinTime))
            //
            return aTime - bTime
        } else {
            return parseInt(b.position.slice(1)) - parseInt(a.position.slice(1))
        }
    })
    return stuffList
}

var arr = [3, 5, 2, 7, 8, 1, 4, 9]
var result = arr.reduce(function (memo, value, index, array) {
    if (index === 0) {
        arr.sort(function (a, b) {
            return a - b
        })
    }

    if (index > 0 && index < array.length - 1) {
        memo += value
        return memo
    } else if (index === 0) {
        return 0
    } else if (index === array.length - 1) {
        return memo / (array.length - 2)
    }
}, 0)

log(result)