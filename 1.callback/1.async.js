// 高阶函数 参数或者返回值是函数的函数

let toString = Object.prototype.toString

// isFunction 判断变量类型是否是函数
function isFunction(o) {
    return toString.call(o) === '[object Function]'
}
// console.log(isFunction(function(){}));

// isType 批量生成，判断变量类型是否是type
function isType(type) {
    return function(obj) {
        console.log(obj, toString.call(obj), `[Object ${type}]`)
        return toString.call(obj) === `[object ${type}]`
    }
}

// let isString = isType('String');
// console.log(isString('222'));


// 面向切片编程
function say() {
    console.log('say')
}

Function.prototype.before = function(callback) {
    // 箭头函数中没有 this，没有arguments
    // 第一个...args 剩余参数
    // 第二个...args 展开运算符
    return (...args) => {
        callback(...args)
        this() //存疑
    }
}

let newSay = say.before(function(){
    console.log('刷牙')
})

newSay()

// 异步
// setTimeout(function(){
//     console.log('dududu')
// }, 1000)

// while(true){
    
// }

// try catch 无法捕获异步操作的错误
// 注意：以下fs文件操作的错误无法被捕获
let fs = require('fs')
try {
    fs.readFile('./notExist.js', function(){
       
    })
} catch(err) {
    
}

// node中的回调函数的第一个参数，永远是error
fs.readFile('dududu.js', function(error, data){
    console.log(error, data)

})

// 曾经的异步解决方案：回调地域
// 这样不好: 1. 多层嵌套不好看 2. 串行执行效率低
let renderObj = {}
fs.readFile('blog/test1.txt', 'utf8', function(error, data){
    renderObj['test1'] = data
    fs.readFile('blog/test2.txt', 'utf8', function(error, data){
        renderObj['test2'] = data
        console.log(renderObj);
    })    
})

// 并行解决方案
let renderObj1 = {}
function after(times, callback) {
    return function(key, value) {
        renderObj1[key] = value
        if(--times === 0){
            callback(renderObj1)
        }
    }
}
let out = after(2, function(o){
    console.log(o)
})
fs.readFile('blog/test2.txt', 'utf8', function(error, data){
    out('test1', data)
})

fs.readFile('blog/test2.txt', 'utf8', function(error, data){
    out('test1', data)
})