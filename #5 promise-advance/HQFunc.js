// 高阶函数

// 什么叫高阶函数 如果一个函数的参数是一个函数（回调函数）  一个函数返回一个函数（函数柯里化里化）

// 写代码时我们希望不要破坏原有逻辑，而增加一些功能

// 对函数进行包装（装饰）切片编（我们可以把核心抽离出来）包装上自己的内容 切片AOP

const say = (...args) => {
    console.log('说话', args);
}

// say.before = function name(params) {

// }

Function.prototype.before = function (cb) { // 高阶函数

    return (...args) => {
        cb(); // 调用用户提前传入的 before方法
        this(...args); // 这里指代的是 say 方法
    }
}

let newSay = say.before(function(){
    console.log('before say')
})

newSay('a', 'b', 'c');