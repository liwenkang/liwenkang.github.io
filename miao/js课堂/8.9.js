const log = console.log.bind(console)

//
// var reg = /.(?=.{4})/g

// c|[a-z]?C[a-z]?

// 通配符(?*)转换为 .

function replace(str, re, replacement) {
    return str.replace(re, function (...args) {
        return replacement.replace(/\$(\d)/g, function (_, num) {
            return args[+num] || ''
        }).replace(/\$\&/g, function () {
            return args[0] || ''
        })
    })
}

log(replace("foobar", /f(.\2)/g, "b$1"))
// foobarfbbfccfdd
// foobarfbbfccfdd
// log("foobarfbbfccfdd".replace(/f(.\2)/g, "b$1"))

// 回溯


function restoreIpAddresses(string) {
    var parts = []
    var result = []

    function repeate(string) {
        if (parts.length === 3) {
            if (string <= 255) {
                parts.push(string)
                result.push(parts.join("."))
                parts.pop()
            }
            return
        }

        for (var i = 1; i <= 3 && i <= string.length; i++) {
            var part = string.slice(0, i)
            if (part <= 255) {
                parts.push(part)
                repeate(string.slice(i))
                parts.pop()
            }
        }
    }

    repeate(string)
    log("result", result)
}

restoreIpAddresses("111111")

// 队列实现栈

// 有左子树,进栈
// 出栈,看右子树

// 中序
function inOrderTraverse(root) {
    var stack = [root]
    var node
    var result = []

    while (root) {
        while (root) {
            stack.push(root.left)
            root = root.left
        }

        do {
            node = stack.pop()
            result.push(node.val)
            root = node.right
            if(!root && stack.length === 0) {
                return result
            }
        } while (!root)
    }

    return result
}

inOrderTraverse({})

