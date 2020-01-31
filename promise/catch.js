// catch 行为
// 观察下面 promise 中，两个 reject 哪个被 catch 捕获了

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
            reject('111')
        }, 1000);
    })
}).then(() => {}).then(() => {
    return new Promise((resolve,  reject) => {
        setTimeout(() => {
            reject('222')
        }, 1000);
    })
}).catch((err) => {
    console.log('***catch', err)
})
