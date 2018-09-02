const log = console.log.bind(console)

// 匹配两个相同的字符 高(圆圆)
/*
var reg = /(.)\1/

reg.test(str)
    判断 str 中是否有匹配 reg 的模式

re.exec(str)
    在 str 中匹配re,如果能找到匹配,则返回匹配及捕获组成的数组,同时数组还有 index 属性表明匹配开始的位置

当 reg 有 "g" 时, str 的 reg.lastIndex 位置开始匹配

str.search(reg)
    在 str 中找到匹配 re 的部分,返回匹配开始的位置,如果找不到就返回 -1

str.match(reg)
    无 "g" 时:
        从头开始查找,返回捕获及捕获组成的数组,数组有一个 index 表明匹配发生的位置
        基本相当于 re.exec(str)中 re 没有 g 标志的用法
    有 "g" 时
        返回 str 中 reg 的所有匹配组成的数组,每一个匹配的完整内容占数组中的一项,
        reg 中捕获分组不会出现在返回的数组中, 返回的数组也没有index属性

str.split(reg)
    按 reg 的匹配将 str 分割成数组, 如果 re 中捕获分组, 则捕获分组会相应出现在分隔的位置/

str.replace(re, str | func)
    re 没有 g ,则只替换第一个匹配,有 g 才替换所有匹配
    第一个参数为字符串, 仅替换第一个匹配
    第二个参数为字符串时, 字符串中的 $1 会分别代表正则中的每个捕获, $& 代表整个正则匹配到的内容

    第二个参数为函数时, 则对于每一个匹配,函数的返回值将作为被替换元素,插入字符串的相应位置
    函数每次运行的时候, 接受的参数为  reg.exec(str) 返回的数组的每一项  (match, p1, p2)
*/

