const log = console.log.bind(console)

// 作业：输入三个数，把此三个数按升序输出
const sortNum = function (a, b, c) {
    let arr = [a, b, c]
    arr = arr.sort(function (x, y) {
        return x - y
    })
    log(arr)
    return arr
}

// 题目：水仙花数。水仙花数是指一个N位的十进制数，其各位数的N次方的和等于它自己。
// 如：153 =　1的三次方+5的三次方+3的三次方，则153就是一个水仙花数
// 或：1634 =　1的四次方+6的四次方+3的四次方+4的四次方
// 因为1634是一个四位数。
// 找出100到100000以内所有的水仙花数。
const judgeDaffodil = function (num) {
    const arr = num.toString().split("")
    let result = 0
    for (let i = 0; i < arr.length; i++) {
        result += Math.pow(parseInt(arr[i]), arr.length)
    }
    if (result === num) {
        return true
    }
}

const logDaffodil = function () {
    for (let i = 100; i <= 100000; i++) {
        if (judgeDaffodil(i)) {
            log(i)
        }
    }
}


// 题目：在控制输出九九乘法表。

const logMultiplicationTable = function () {
    for (let i = 1; i <= 9; i++) {
        let result = ""
        for (let j = 1; j <= i; j++) {
            result += (i + "*" + j + "=" + i * j) + " "
        }
        log(result)
    }
}


// 题目：判断一个非负整数是否为回文数字，回文是指从左往右与从右往左读是一样的。
// 例如：12321是回文数。12344321也是回文数。

const judgePalindromeNum = function (num) {
    const arr = num.toString().split("")
    return parseInt(arr.reverse().join("")) === num
}

// 题目：求s=a+aa+aaa+aaaa+aa...a的值，其中a是一个数字。例如2+22+222+2222+22222(此时共有5个数相加)，具体有几个数相加有通过输入或者函数的实际参数决定。

const returnNum = function (a, length) {
    // 返回 2
    let str = ""
    for (let i = 0; i < length; i++) {
        str += a
    }
    log(str)
    return str
}

const fn = function (a, length) {
    let s = 0
    for (let i = 1; i <= length; i++) {
        s += parseInt(returnNum(a, i))
    }
    log(s)
    return s
}

// 题目：输入年份与月份，给出该年该月的第一天是星期几。
// 例如，输入2016年，11月，输出“星期2”
// 为了简化复杂性，可以只考虑2000年以后的时间。做为参考，2000年的1月1日是星期六。
// 输入年 和 月份

const getDayWeek = function (year, month) {
    if (month < 10) {
        month = "0" + month
    }
    let str = year + "-" + month + "-01T08:00:00"
    return ((parseInt(Date.parse(str) / 86400000) % 7) + 5) % 7
}


// 题目：完全数。如果一个数的所有小于它的约数之和等于它自己，则它是一个完全数，例如6（1，2，3都是它的约数，它们的和正好为6）。找出10000以内所有的完全数

const judgeCompleteNum = function (num) {
    let sum = 0
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            sum += i
        }
    }
    return (sum === num)
}

const logCompleteNum = function (num = 10000) {
    for (let i = 1; i <= num; i++) {
        if (judgeCompleteNum(i)) {
            log(i)
        }
    }
}
//
logCompleteNum()

// 给定M和N，求从M个物体中选出N个的排列与组合的数量：
// Ｃ（ｍ，ｎ）
// Ａ（ｍ，ｎ）

const factorial = function (num) {
    let result = 1
    for (let i = 1; i <= num; i++) {
        result *= i
    }
    log(result)
    return result
}

const cFn = function (m, n) {
    return factorial(n) / (factorial(m) * factorial(n - m))
}

const aFn = function (m, n) {
    return factorial(n) / factorial(n - m)
}

// 题目：给定一个数，对其进行四舍五入，如1.4返回1，1.6返回2

const numRound = function (num) {
    return Math.round(num)
}

// 题目：把一个数字转换成字符串；当然不能使用String(123)了，也不能使用任意内置的方法比如：""+123
const numToString = function (num) {
    return num.toString()
}


// 题目：给定两个数，求它们的最小公倍数和最大公约数。
const GCD = function (a, b) {
    return a % b === 0 ? b : GCD(b, a % b)
}
const LCM = function (a, b) {
    return (a * b / GCD(a, b))
}

// 题目：敲7。输出1到100以内所有7的倍数以及数字中包含7的数，如7（7的倍数），37（不是倍数但数位中包含7）都需要输出，依次类推
const haveSeven = function (num) {
    if (num % 7 === 0) {
        return true
    }
    let arr = num.toString().split("")
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "7") {
            return true
        }
    }
}

const logHaveSeven = function (num = 100) {
    for (let i = 1; i <= num; i++) {
        if (haveSeven(i)) {
            log(i)
        }
    }
}

// 题目：不使用Math.sqrt，求一个非负数的平方根

const tooSmall = function (num, i) {
    if (num * num < i) {
        return true
    } else if (num * num > i) {
        return false
    } else {
        return "正好"
    }
}

const sqrtNum = function (num) {
    // 二分方式
    var midNum = parseInt((1 + num) / 2)

    var arr = [1, midNum, n]

    while (arr[2] - arr[0] !== 1) {
        if (tooSmall(arr[1], num)) {
            /* true 向后追溯 */
            arr = [arr[0], parseInt((arr[0] + midNum) / 2), midNum]
            midNum = parseInt((arr[0] + midNum) / 2)
        } else if (tooSmall(arr[1], num) === false) {
            /* false 向前追溯 */
            arr = [midNum, parseInt((midNum + arr[2]) / 2), arr[2]]
            midNum = parseInt((midNum + arr[2]) / 2)
        } else {
            //
            log("ok")
            return "正好"
        }
    }

    if (tooSmall(arr[0], num)) {
        return arr[0]
    }

    if (tooSmall(arr[2]), num) {
        return arr[2]
    }
}

// 题目：判断一个数是否是素数。
const isPrime = function (num) {
    if (num <= 1) {
        return false
    }
    if (num === 2 || num === 3) {
        return true
    }

    if (num % 6 !== 1 && n % 6 !== 5) {
        return false
    }

    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            return false
        }
    }
    return true
}

// 题目：输出100以内所有的素数。
const logPrime = function (num = 100) {
    for (var i = 0; i <= num; i++) {
        if (isPrime(i)) {
            log(i)
        }
    }
}