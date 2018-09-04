var net = require("net")
var fs = require('fs')
var server = net.createServer()
const port = 80


var msgs = ['foo', 'bar']

server.on("connection", conn => {
    // console.log(conn.toString())
    conn.on('data', data => {
        var data = data.toString()
        var lines = data.split("\r\n")
        var firstLine = lines.shift()
        var [method, path] = firstLine.split(" ")

        if (path === "/msg.html") {
            if (method === "POST") {
                var lastLine = lines.pop()
                msgs.push(lastLine.split("=")[1])
            }
            conn.write(`HTTP/1.1 200 OK\r\n`)
            conn.write(`\r\n`)
            msgs.forEach(msg => {
                conn.write(`${msg}`)
            })
            conn.end()
        } else {
            try {
                var fileContent = fs.readFileSync('.' + path)
            } catch (e) {
                var fileContent = 'error'
            }
            conn.write(`HTTP/1.1 200 OK\r\n`)
            conn.write(`\r\n`)
            conn.write(fileContent)
            conn.end()
        }
    })
})

server.listen(port, () => {
    console.log(port, " is listening")
})