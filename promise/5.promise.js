const Promise = require('./promise.js')

let promise = new Promise((resolve, reject) => {
    resolve('hi')
})
// 1） step1 引用同一个对象
// let promise2 = promise.then(() => {
//     return promise2
// })

// promise2.then((data) => {
//     console.log('success', data)
// }, (err) => {
//     console.log(err)
// })

// 2)
let promise2 = promise.then(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('hello')
        }, 1000);
    })
})

promise2.then((data) => {
    console.log('success', data)
}, (err) => {
    console.log(err)
})
