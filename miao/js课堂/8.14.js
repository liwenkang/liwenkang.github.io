const log = console.log.bind(console)

function getElementsByTagName(node, tagName, result = []) {
    tagName = tagName.toUpperCase()
    // 查找 node 中
    for (var i = 0; i < node.children; i++) {
        if (node[i].tagName === tagName) {
            result.push(node[i])
        }
        getElementsByTagName(node[i], tagName, result)
    }
    return result
}

function getElementById(id, node = document.documentElement) {
    if (node.id === id) {
        return node
    } else {
        for (var i = 0; i < node.children; i++) {
            var result = getElementById(id, node[i])
            if (result) {
                return result
            }
        }
    }
    return null
}

function getElementById(id, node = document.documentElement) {
    var result = null
    // 先序遍历整个 dom 树

    traverseDom(document.documentElement, e => {
        if (e.id === id) {
            result = e
            return false
        }
    })


    function traverseDom(node, action) {
        var status = action(node)
        if (status === false) {
            return false
        }
        for (var child of node.children) {
            status = traverseDom(child, action)
            if (status === false) {
                return false
            }
        }
    }
}

function ElementsByClassName(node = document, className, result = []) {
    // 查找 node 中
    for (var child of node.childNodes) {
        if (child.nodeType === document.ELEMENT_NODE) {
            if (className.split(" ").filter(it => it).every(name => child.classList.contains(name))) {
                result.push(child)
            }
            ElementsByClassName(child, className, result)
        }
    }
    return result
}

// 性能好一点
function elt(tagName, ...children) {
    var node = document.createElement(tagName)
    children.forEach(child => {
        if (typeof child === "string") {
            node.appendChild(document.createTextNode(child))
        } else {
            node.append(child)
        }
    })
    return node
}

var a = elt("a", "bbb")

function t(parts) {
    var node = document.createElement('div')
    node.innerHTML = parts.join("")
    return node.firstElementChild
}

var dom = t`
<a>
    <p></p>
</a>
`