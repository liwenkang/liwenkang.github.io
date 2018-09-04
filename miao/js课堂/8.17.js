const log = console.log.bind(console)

$0.onclick = function (event) {
    // 执行结束之前,页面的交互会卡死

    // 可以用于屏蔽默认点击事件,不能用于滚动(因为是先滚动,后触发)
    event.preventDefault()
}
/*
    <div>
        <p>
            <button>hello</button>
        </p>
    </div>

div, click 捕获
p, click 捕获

btn, click 冒泡
btn, click 捕获

p, click 冒泡
div, click 冒泡


*/
/*
* 捕获: 从外到内
* 目标阶段
* 冒泡: 从内到外
* */

/*
* 事件是自己的事件,不是冒泡来的
* mouseout
* mouseover
*
* relatedTarget: 从哪里来的
* */