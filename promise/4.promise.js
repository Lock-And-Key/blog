// .then.then 返回的是一个全新的 Promise，这点与 jQuery很不相同，jQuery 返回的是一个 this。

// let p = new Promise((resolve, reject) => {
//     resolve(1)
// })

// let p1 = p.then(() => {
//     console.log('p1')
// })

// let p2 = p1.then(() => {
//     console.log('p2')
// })

// console.log(p1 == p2)
const Promise = require('./promise.js')

let promise = new Promise((resolve, reject) => {
    resolve('hello')
})

let promise2 = promise.then(() => {
    return 100
})

promise2.then((data) => {
    console.log(data)
})