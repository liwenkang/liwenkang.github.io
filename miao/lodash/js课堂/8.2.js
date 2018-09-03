const log = console.log.bind(console)

function assert(test, message) {
    if(!test) {
        throw new Error(message)
    }
}

function f() {
    assert(arguments.length === 0, "description")
}