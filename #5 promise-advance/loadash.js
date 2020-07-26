// after方法
// 期望调用某个函数 3次之后 再去执行

function after (times, fn) { // 高阶函数
    return function () {
        if(--times){
            if(--times === 0){
                say()
            }
        }
    }
}

let newSay = after(3, function say(){
    console.log('say')
})

newSay()
newSay()
newSay()

