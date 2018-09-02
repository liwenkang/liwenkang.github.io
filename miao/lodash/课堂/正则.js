const log = console.log.bind(console)

function regexTicTacToeWinChecker(board) {
    // your code here

    // 行的问题
    var reg1 = /^((XXX)|(OOO))/
    var reg2 = /^.{3}((XXX)|(OOO))/
    var reg3 = /^.{6}((XXX)|(OOO))/
    if (reg1.test(board) || reg2.test(board) || reg3.test(board)) {
        return true
    }

    // 列的问题
    // 将字符串 翻转
    var arr = []
    for (var i = 0; i < board.length; i += 3) {
        var item = board.slice(i, i + 3).split("")
        arr.push(item)
    }

    // 列的问题
    for (var i = 0; i < arr.length; i++) {
        if (arr[0][i] === arr[1][i] &&  arr[1][i] === arr[2][i] && arr[2][i] === "X") {
            return true
        }
        if (arr[0][i] === arr[1][i] &&  arr[1][i] === arr[2][i] && arr[2][i] === "O") {
            return true
        }
    }

    // 斜着的问题
    if (arr[0][0] === arr[1][1] &&  arr[1][1] === arr[2][2] && arr[2][2] === "O") {
        return true
    }
    if (arr[0][0] === arr[1][1] &&  arr[1][1] === arr[2][2] && arr[2][2] === "X") {
        return true
    }

    if (arr[0][2] === arr[1][1] &&  arr[1][1] === arr[2][0] && arr[2][0] === "O") {
        return true
    }
    if (arr[0][2] === arr[1][1] &&  arr[1][1] === arr[2][0] && arr[2][0] === "X") {
        return true
    }

    return false
}


log(regexTicTacToeWinChecker("XXX-O-O-O"))
log(regexTicTacToeWinChecker("X--OOOX-X"))
log(regexTicTacToeWinChecker("O--OO-XXX"))

log(regexTicTacToeWinChecker("O-XOX-O-X"))
log(regexTicTacToeWinChecker("OXOOXOXX-"))
log(regexTicTacToeWinChecker("X-O-OOXXO"))
log(regexTicTacToeWinChecker("XO--X-OOX"))
log(regexTicTacToeWinChecker("X-OXOOOXX"))
log("true-----------------------------------------")

// log("false-----------------------------------------")
log(regexTicTacToeWinChecker("XO-------"))
log(regexTicTacToeWinChecker("XX-XOO---"))
log(regexTicTacToeWinChecker("-XX-OO-O-"))
log(regexTicTacToeWinChecker("OXO--XXO-"))
log(regexTicTacToeWinChecker("OOXXXO---"))
log(regexTicTacToeWinChecker("OXXX-XOO-"))
log(regexTicTacToeWinChecker("OOXXX----"))
log(regexTicTacToeWinChecker("XXOOXXOO-"))
log(regexTicTacToeWinChecker("OXOXOX---"))