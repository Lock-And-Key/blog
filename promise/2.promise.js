const Promise = require('./promise.js')

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('123')
    }, 2000);
})

// 发布订阅模式
// 一个 promise 可以多次then
promise.then((data) => {
    console.log('success', data)
}, (reason) => {
    console.log('failed', reason)
})

promise.then((data) => {
    console.log('success1', data)
}, (reason) => {
    console.log('failed1', reason)
})