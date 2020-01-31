// Promise规范： https://promisesaplus.com/
// 目前低版本浏览器 ie 不支持 需要 polyfill es6-promise（这个包实现了promise）

// 高版本都支持了promise

// new Promise(() => {
//     console.log(1);
// })
// console.log(2)


const Promise = require('./promise.js')

let promise = new Promise((resolve, reject) => {
    console.log('111')
    resolve('xxx')
    reject('reject val')
})

promise.then((data) => {
    console.log('success', data)
}, (reason) => {
    console.log('failed', reason)
})