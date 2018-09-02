const log = console.log.bind(console)


var i = 0

// 解析字符串
function parseOneValue(str) {
    var c = str[i]
    if (c === "[") {
        // 扫描数组
        return parseArray()
    } else if (c === "{") {
        // 扫描对象
        return parseObject()
    } else if (c === '"') {
        // 扫描字符串
        return parseString(str)
    } else if (c === "t") {
        // true
        return parseTrue()
    } else if (c === "f") {
        // false
        return parseFalse()
    } else if (c === "n") {
        // null
        return parseNull()
    } else {
        return parseNum()
    }
}

function parseArray() {
    // 解析数组
    i++
    var result = []
    var val
    if (str[i] === "]") {
        return result
    }

    for (; ;) {
        val = parseOneValue()
        // parseValue 结束后,指向 , 或者 ]
        result.push(val)
        if (str[i] === ",") {
            i++
            continue
        } else if (str[i] === "]") {
            i++
            return result
        }
    }
}

function parseObject() {
    i++
    if (str[i] === "}") {
        return {}
    }
    var result = {}

    while (true) {
        var key = parseString()
        i++ // ++ 的是 :
        var value = parseOneValue()
        result[key] = value
        if (str[i] === ",") {
            i++
            continue
        } else if (str[i] === "}") {
            i++
            return result
        }
    }
}

function parseString(str) {
    // i 的值应该指向末尾
    for (var j = i + 1; ; j++) {
        // 下一个 "
        if (str[j] === '"') {
            break
        }
    }
    var result = str.slice(i + 1, j)
    i = j + 1
    return result
}

function parseTrue() {
    // 切 4 个
    var token = str.slice(i, i + 4)
    if (token === "true") {
        i = i + 4
        return true
    } else {
        throw new SyntaxError("unexpected token at position" + i)
    }
}

function parseFalse() {
    var token = str.slice(i, i + 5)
    if (token === "false") {
        i = i + 5
        return true
    } else {
        throw new SyntaxError("unexpected token at position" + i)
    }
}

function parseNull() {
    var token = str.slice(i, i + 4)
    if (token === "null") {
        i = i + 4
        return true
    } else {
        throw new SyntaxError("unexpected token at position" + i)
    }
}

function isNumberChar(c) {
    if (c >= "0" && c <= "9") {
        return true
    }
    if (c === "." ||
        c === "+" ||
        c === "+" ||
        c === "e" ||
        c === "E") {
        return true
    }
    return false
}

function parseNum() {
    // 正则
    // 扫描数字
    var j = i
    while (isNumberChar(str[j])) {
        j++
    }
    var numString = str.slice(i, j)
    i = j
    // 对 numString 校验
    return parseFloat(numString)
}

var str = '"foo"'
parse(str)
// var str = '{"a":1,"b":2}'
// var str = '[1,2,3,4]'

