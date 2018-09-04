const log = console.log.bind(console)

function get(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.addEventListener("load", () => {
        callback(xhr.responseText)
    })
    xhr.send()
}