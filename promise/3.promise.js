// promise 可以解决链式调用问题 jquery .then.then
// 先通过原生看效果 -> 根据 效果/功能 写原理

let promise = new Promise((resolve, reject) => {
    resolve('hello') // 普通值意味着不少一个 promise
})

promise.then(data => {
    return data  // then 方法中返回一个值，会把这个结果放到下一个 then 的成功回调中
}).then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello')
        }, 1000);
    })
}).then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            throw new Error('dududu')
        }, 1000);
    })
}).then(() => {}, (err) => {
    console.log(err)
    // 没有返回值，就相当于 return undefined 该 promise 的状态为 resolved
}).then(() => {
    console.log('then555')
})

// 什么时候走成功： then 中返回的是一个普通值 或者是一个成功的 Promise
// 什么时候走失败：then 中 throw 一个错误 或者是一个失败的 Promise

