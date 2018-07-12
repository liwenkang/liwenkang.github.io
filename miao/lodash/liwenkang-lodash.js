const log = console.log.bind(console)
var liwenkang = {
    /*
        _.chunk(['a', 'b', 'c', 'd'], 2);
        // => [['a', 'b'], ['c', 'd']]

        _.chunk(['a', 'b', 'c', 'd'], 3);
        // => [['a', 'b', 'c'], ['d']]
    */
    chunk: function (array, size) {
        var result = []
        for (var i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    },
    /*
        _.compact([0, 1, false, 2, '', 3]);
        // => [1, 2, 3]
    */
    compact: function (array) {
        var arr = array.slice(0)
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1)
                i--
            }
        }
        return arr
    },
}

liwenkang.chunk(['a', 'b', 'c', 'd'], 3)
liwenkang.compact([0, 1, 2, 3, false, null, 0, "", undefined, NaN])