const log = console.log.bind(console)

// function Rabbit(type) {
//     this.type = type
// }
//
// var killerRabbit = new Rabbit("killer")
// var blackRabbit = new Rabbit("black")
//
// Rabbit.prototype.teeth = "small"
// log(killerRabbit.teeth)
// // small
//
// // 向对象中添加属性的时候,将会覆盖之前原型中的同名属性
// killerRabbit.teeth = "long, sharp, and bloody"
// log(killerRabbit.teeth)
// //long, sharp, and bloody
//
// // 原型本身不会改变
// log(blackRabbit.teeth)
// // small
//
// // 将数组调用 对象上的 toString 方法
// log(Object.prototype.toString.call([1, 2]))
// // [object Array]
// // 将数组调用 数组上的 toString 方法
// log(Array.prototype.toString.call([1, 2]))
// // 1,2
//
// // 让兔子开始跳舞
//
// Rabbit.prototype.dance = function () {
//     log("The " + this.type + " rabbit dances a jig.")
// }
//
// killerRabbit.dance()
// blackRabbit.dance()
//
// var map = {}
//
// function storePhi(event, phi) {
//     map[event] = phi
// }
//
// // 可以枚举的, 也就是说, 会出现在 for in 中
// storePhi("pizza", 0.069)
// storePhi("touched tree", -0.081)
//
// // 人为的加入了一个方法
// // Object.prototype 中的标准属性都是不可枚举的
// Object.prototype.nonsense = "hi"
//
// for (var event in map) {
//     log(event)
//     /*
//         pizza
//         touched tree
//         nonsense
//     * */
// }
//
// log("nonsense" in map)
// log("pizza" in map)
// // toString 就是Object.prototype 中的标准属性
// log("toString" in map)
//
// Object.defineProperty(Object.prototype, "hiddenNonsense", {
//     enumerable: false,
//     value: "hi"
// })
// for (var event in map) {
//     log(event)
//     /*
//         pizza
//         touched tree
//         nonsense
//     * */
// }
//
// // 判断某个属性是否是自己的属性, 不是从原型上上获得的
// // Object.prototype.hasOwnProperty.call(map, "pizza")
//
// log(Object.prototype.hasOwnProperty.call(map, "pizza")) // true
// log(Object.prototype.hasOwnProperty.call(map, "touched tree")) // true
// log(Object.prototype.hasOwnProperty.call(map, "nonsense")) // false
// log(Object.prototype.hasOwnProperty.call(map, "hiddenNonsense")) // false


// 创建没有原型的对象
// var map = Object.create(null)
// map["pizza"] = 0.069
//
// log("pizza" in map)
// // true
// // toString 是原型上 的方法, 而 map 是没有原型的对象, 这样使用 for in 循环就可以获得自己的属性了
// log("toString" in map)
// // false

// 绘制表格:

var MOUNTAINS = [{
    name: "Kilimanjaro",
    height: 5895,
    country: "Tanzania"
}, {
    name: "Everest",
    height: 8848,
    country: "Nepal"
}, {
    name: "Mount Fuji",
    height: 3776,
    country: "Japan"
}, {
    name: "Mont Blanc",
    height: 4808,
    country: "Italy/France"
}, {
    name: "Vaalserberg",
    height: 323,
    country: "Netherlands"
}, {
    name: "Denali",
    height: 6168,
    country: "United States"
}, {
    name: "Popocatepetl",
    height: 5465,
    country: "Mexico"
}]

// 先将 MOUNTAINS 转换为二维数组

function mountainsToMatrix(array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
        var arr = []
        var obj = array[i]
        for (var value in obj) {
            arr.push(obj[value])
        }
        result.push(arr)
    }
    return result
}

var matrix = mountainsToMatrix(MOUNTAINS)
log(matrix)
//
// function minHeight(array) {
//     // 给定一个数组, 返回最小的行高
// }
//
// function minWidth(array) {
//     // 给定一个数组, 返回最小的字符宽度
// }
//
// function draw(width, height) {
//     // 返回一个数组, 数组长度为 height, 数组内元素均为字符串.且长度为 width
//
// }


// 获得行高
// function rowHeights(rows) {
//     // 取到每一行,然后取到每一行的每个单元格
//     var result = []
//     for (var i = 0; i < rows.length; i++) {
//         var maxHeight = -Infinity
//         for (var j = 0; j < rows[i].length; j++) {
//             if (rows[i][j].minHeight() > maxHeight) {
//                 maxHeight = rows[i][j].minHeight()
//             }
//         }
//         result.push(maxHeight)
//     }
//     return result
// }

function rowHeights(rows) {
    return rows.map(function (row) {
        // row 就是行
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight())
        }, 0)
    })
}

// 获得列宽

// function colWidths(rows) {
//     // 取到每一行,然后取到每一行的每个单元格
//     var result = []
//     for (var i = 0; i < rows.length; i++) {
//         var maxWidth = -Infinity
//         for (var j = 0; j < rows[i].length; j++) {
//             if (rows[j][i].minWidth() > maxWidth) {
//                 maxWidth = rows[i][j].minWidth()
//             }
//         }
//         result.push(maxWidth)
//     }
//     return result
// }

//
function colWidths(rows) {
    return rows[0].map(function (_, i) {
        // 此处 _ 就是第一行中每个 cell 元素具体的值, i 是它们的下标
        return rows.reduce(function (max, row) {
            return Math.max(max, row[i].minWidth())
        }, 0)
    })
}

function drawTable(rows) {
    var heights = rowHeights(rows)
    var widths = colWidths(rows)

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo]
        }).join(" ")
    }

    function drawRow(row, rowNum) {
        // 画行,给定行的内容,以及是第几行
        var blocks = row.map(function (cell, colNum) {
            // cell 就是一行中的每个元素
            // colNum 就是 列序
            // cell 就是 row[colNum]
            // draw 传入一个单元格, 输入他的 width 和 height, 就自动画出来了
            return cell.draw(widths[colNum], heights[rowNum])
        })

        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo)
        }).join("\n")
    }

    return rows.map(drawRow).join("\n")
}


function repeat(string, times) {
    var result = ""
    for (var i = 0; i < times; i++) {
        result += string
    }
    return result
}

function TextCell(text) {
    this.text = text.split("\n")
}

TextCell.prototype.minWidth = function () {
    // 取到的是容下字符串后的 最小宽度
    return this.text.reduce(function (width, line) {
        return Math.max(width, line.length)
    }, 0)
}

TextCell.prototype.minHeight = function () {
    return this.text.length
}

TextCell.prototype.draw = function (width, height) {
    var result = []
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || ""
        // width 就是一个单元格的总宽度, line.length 就是字符所占的宽度
        // 两者的差值就是需要补空格的长度
        result.push(line + repeat(" ", width - line.length))
    }
    return result
}

// 棋盘程序

var rows = []

for (var i = 0; i < 5; i++) {
    var row = []
    for (var j = 0; j < 5; j++) {
        if ((i + j) % 2 === 0) {
            row.push(new TextCell("##"))
        } else {
            row.push(new TextCell("  "))
        }
    }
    rows.push(row)
}

function UnderlinedCell(inner) {
    this.inner = inner
}

UnderlinedCell.prototype.minWidth = function () {
    return this.inner.minWidth()
}
UnderlinedCell.prototype.minHeight = function () {
    return this.inner.minHeight() + 1
}

UnderlinedCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height - 1).concat([repeat("-", width)])
}

log("MOUNTAINS")
log(MOUNTAINS)

function dataTable(data) {
    var keys = Object.keys(data[0])
    log("keys", keys)

    var headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name))
    })
    log("headers", headers)

    var body = data.map(function (row) {
        return keys.map(function (name) {
            return new TextCell(String(row[name]))
        })
    })
    log("body", body)

    var result = [headers].concat(body)
    log("result", result)

    return result
}

log(drawTable(dataTable(MOUNTAINS)))