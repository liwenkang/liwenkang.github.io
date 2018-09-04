const log = console.log.bind(console)

// 6.14.1 向量类型

function Vector(x, y) {
    this.x = x
    this.y = y
}

Vector.prototype.plus = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
}

Vector.prototype.minus = function (vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
}

Object.defineProperty(Vector.prototype, "length", {
    get: function () {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
})

// console.log(new Vector(1, 2).plus(new Vector(2, 3)))
// // → Vec{x: 3, y: 5}
// console.log(new Vector(1, 2).minus(new Vector(2, 3)))
// // → Vec{x: -1, y: -1}
// console.log(new Vector(3, 4).length)
// // → 5

// 6.14.2 另一种单元格

function Vector(x, y) {
    this.x = x
    this.y = y
}

Vector.prototype.plus = function (v) {
    var x = this.x + v.x
    var y = this.y + v.y
    return new Vector(x, y)
}

Vector.prototype.minus = function (v) {
    var x = this.x - v.x
    var y = this.y - v.y
    return new Vector(x, y)
}

Vector.prototype.times = function(n) {
    return new Vector(this.x * n, this.y * n)
}


function StretchCell(inner, width, height) {
    this.inner = inner
    this.width = width
    this.height = height
}

StretchCell.prototype.minWidth = function(){
    var originalMinWidth = this.inner.minWidth()

    if (originalMinWidth < this.width) {
        return this.width
    } else {
        return originalMinWidth
    }
}

StretchCell.prototype.minHeight = function(){
    var originalMinHeight = this.inner.minHeight()

    if (originalMinHeight < this.height) {
        return this.height
    } else {
        return originalMinHeight
    }
}

StretchCell.prototype.draw = function(w,h) {
    return this.inner.draw(w,h)
}

