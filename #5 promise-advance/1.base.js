// 什么是 promise 解决哪些问题的（基于回调）
// 1. 回调地域（代码不好维护，错误处理非常的麻烦，不能统一处理错误）
// 2. 多个请求的并发问题

// Promise 是一个类 类只需要用的时候 new 一下

// 在new Promise 是需要传递一个执行器函数，executor 这个函数默认会被执行 立即执行
// 每个 promise 都有三个状态 pending, fulfilled rejected
// 默认创建一个 promise 是等待态
// 默认提供两个函数  resolve让promise变成成功态，reject让promise变成失败态（throw Error也可以）
// 每个promise的实例都具备then方法，then方法中传递两个参数：1.成功的回调 2.失败的回调
let Promise = require('./7.promise')

// let promise = new Promise((resolve, reject) => {
//     console.log(1);
//     // resolve(1)
//     throw new Error('失败了')
//     reject(2)
// })
// promise.then((success) => {
//     console.log(success)
// }, (err) => {
//     console.log(err)
// })
// console.log(2);
let promise = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
        return 1
    }))
}).then((aaa) => {
    console.log(aaa)
}, null)
