// 发布订阅 所有库中都存在发布订阅
// 发布订阅 与 观察者模式不同
// 订阅好一件事 当这件事发生的时候 触发对应的函数
// 订阅 on 发布 emit
// Promise内部也是基于发布订阅的
const fs = require('fs')

let e = {
    // 下划线表示私有变量
    _callback: [],
    _obj: {},
    on(func) {
        this._callback.push(func)
        // 111
    },
    emit(key, value) {
        this._obj[key] = value
        // 只要发布，就应该依次触发所有订阅的函数
        this._callback.forEach(function(method){
            method()
        })
    }
}
e.on(function(obj){
    // Object.keys() Object.values() Object.entries()
    if(Object.keys(obj).length === 2){
        console.log(obj)
    }
})
e.on(function(obj){
    console.log('获取第一个')
})
fs.readFile('blog/test1.txt', 'uft8', (error, data) {
    e.emit('test1', data)
})

fs.readFile('blog/test2.txt', 'uft8', (error, data) {
    e.emit('test2', data)
})