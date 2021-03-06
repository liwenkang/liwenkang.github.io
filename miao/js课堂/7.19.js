const log = console.log.bind(console)

// 名字为 name 的 身上有多少 dna 来自 "Pauwels van Haverbeke"
function dnaShare(name, ary) {
    if (name === null) {
        return 0
    }
    if (name === "Pauwels van Haverbeke") {
        return 1
    }
    var people = byName[name]

    if (!people) {
        return 0
    }

    var from_mother = dnaShare(people.mother) / 2
    var from_father = dnaShare(people.father) / 2
    return from_mother + from_father
}


function bind(f, ...fixedArgs) {
    return function (...args) {
        return f(...fixedArgs, ...args)
    }
}

var postOrder = function (root) {
    if (root) {
        postOrder(root.left)
        console.log(root.val)
        postOrder(root.right)
    }
}

postOrder({
    val: 4,
    left: {
        val: 2,
        left: {
            val: 1,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    },
    right: {
        val: 6,
        left: {
            val: 5,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
})