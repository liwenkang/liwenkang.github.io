const log = console.log.bind(console)

// 作业：补全两个TODO中间的代码，使后面的forof循环可以log出1 2 5 9 3或3 9 5 2 1

// TODO
// Number.prototype.digits = function* () {
//     var that = this.toString()
//     var length = that.length
//     for (var i = 0; i < length; i++) {
//         yield parseInt(that[i])
//     }
// }

// Number.prototype.digits = function* () {
//     var that = this.toString()
//     var length = that.length
//     for (var i = length - 1; i >= 0; i--) {
//         yield parseInt(that[i])
//     }
// }
// TODO

var n = 12593
for (var digit of n.digits()) {
    console.log(digit)
}