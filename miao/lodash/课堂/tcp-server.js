const log = console.log.bind(console)
// 服务器端
var net = require('net')
var server = net.createServer()
server.on("connection", conn => {
    console.log("a connection")

    conn.on('data', data => {
        conn.write(data.toString())
    })

    conn.on("error", () => 1)
})

server.listen(10010, () => {
    console, log("server on", 10010)
})

// 客户端
var conn = net.connect(10010, "192.168.31.1")

conn.on("connect", ()=>{
    conn.write("hello")
    conn.on('data', data => {
        console.log(data.toString())
    })
    conn.close()
})