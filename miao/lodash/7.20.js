const log = console.log.bind(console)

function array2tree(ary, rootIndex) {
    // 数组保存的完全二叉树,转换为二叉链表形式
    if (ary[rootIndex] === null ||
        ary[rootIndex] === undefined) {
        return null
    }
    var rootNode = {
        val: ary[rootIndex],
        left: array2tree(ary, rootIndex * 2 + 1),
        right: array2tree(ary, rootIndex * 2 + 2)
    }

    return rootNode
}


function tree2Array(rootNode, rootIndex = 0, arr = []) {
    if (rootNode === null || rootNode === undefined) {
        return arr
    }
    arr[rootIndex] = rootNode.val
    var leftRootIndex = rootIndex * 2 + 1
    var rightRootIndex = rootIndex * 2 + 2

    tree2Array(rootNode.left, leftRootIndex, arr)
    tree2Array(rootNode.right, rightRootIndex, arr)
    return arr
}

function condensedArrayToTree(ary) {
    // 如果有 null 的情况 todo???
    if (ary.length === 0) {
        return null
    }
    var queue = []
    // 队列, 从后面进,从后面出
    var root = {
        val: ary[0],
        left: null,
        right: null,
    }
    queue.push(root)

    var node
    for (var i = 1; i < ary.length; i++) {
        // 从后面取到节点
        node = queue.shift()
        if (ary[i] !== null) {
            node.left = {
                val: ary[i],
                left: null,
                right: null
            }
            queue.push(node.left)
        }
        i++
        if (ary[i] !== null) {
            node.right = {
                val: ary[i],
                left: null,
                right: null
            }
            queue.push(node.right)
        }
    }
    return root
}


function tree2condensedArray(root) {
    // 根据树,生成数组
    if (!root) {
        return []
    }
    var result = [root.val]
    var queue = [root]
    var node
    while (node = queue.shift()) {
        if (node.left) {
            result.push(node.left.val)
            queue.push(node.left)
        } else {
            result.push(null)
        }

        if (node.right) {
            result.push(node.right.val)
            queue.push(node.right)
        } else {
            result.push(null)
        }
    }

    return result
}

// 遍历二叉树

function preOrderTraverse(root) {
    // preorder 先序, 前序 根节点=>左子树=>右子树
    if (root) {
        log(root.val)
        preOrderTraverse(root.left)
        preOrderTraverse(root.right)
    }
}


function preOrderTraverse(root) {
    // inorder
    if (root) {
        preOrderTraverse(root.left)
        log(root.val)
        preOrderTraverse(root.right)
    }
}

function preOrderTraverse(root) {
    // postorder
    if (root) {
        preOrderTraverse(root.left)
        preOrderTraverse(root.right)
        log(root.val)
    }
}