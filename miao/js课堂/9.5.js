const log = console.log.bind(console)

get(url, callback)

function syncGet(url) {

    get(url, function (data) {
        return data
    })
}

var data = syncGet(url)