const log = console.log.bind(console)

var obj = {}
var f = function () {
}
obj[f] = 55
for (var key in obj) {
    log(typeof key)
    log(typeof f)
    if (key === f) {
        console.log("ok")
    }
}
console.log("buok")
