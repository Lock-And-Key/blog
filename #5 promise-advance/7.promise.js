console.log('-----my promise-----')
// 1.Promise是一个类 天生的，类中需要传入一个 executor 执行器，默认会立即执行

// promise 内部会提供两个方法 可以更改 promise 的状态，3个状态：等待态 成功态 失败态
// resolve 触发成功态（成功的内容），reject 触发失败（失败的原因） undefined
// 一旦进入成功态或者失败态，状态就不可逆

// promise 是为了解决异步问题的 回调地域 并发异步处理

// promise 的实现，可以是一个类或者一个函数，通常的实现是一个类
// 每个 promise 实例都要有 then 方法，一个处理成功回调, 一个处理失败回调

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject){
    // 此方法 为了兼容所有的 Promise，保证不同库中间 执行的流程是一样的
    // 所以此方法要保证尽可能的详细与不出错

    // 针对以下情况
    // let promise2 = promise.then(() => {
    //     return promise2
    // })

    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise> ---'))
    }

    // 2) 判断 x 的类型，如果是对象或者函数，说明他有可能是一个 promise
    if((typeof x === 'object' && x != null) || typeof x === 'function') {
        // 有可能是 promise
        let called = false;
        try {
            let then = x.then
            if(typeof then === 'function'){
                // 到这里，只能认为 x 是一个 promise 了
                // 这样写的目的是，只能 x.then 的 getter 不再触发, 如以下
                // let obj = {
                //     get then() {
                //         if(a++ === 2){
                //             throw new Error()
                //         }
                //     }
                // }
                then.call(x, (y) => {
                    if(called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch(e) {
            if(called) {
                return
            }
            called = true
            reject(e)
        }
    } else {
        // 普通值
        resolve(x)
    }
}

class Promise{
    constructor(executor) {
        console.log('Welcome to My Promise')
        this.status = PENDING // 默认是等待态
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        let resolve = (value) => {
            if(value instanceof Promise){
                return value.then(resolve, reject)
            }
            // 保证只有在状态是等待态时，状态才可以更改
            if(this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if(this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            } 
        }
        try{
            executor(resolve, reject)
        } catch(e) {
            //如果内部出错，手动的调用reject
            console.log(e)
            reject(e)
        }
    }
    then(onfulfilled, onrejected) {
        // 为了实现链式调用就创建一个新的 promise 实例
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === RESOLVED) {
                // 执行 then 中的方法，可能返回的是一个普通值，或者是 promise
                // 我要判断 x 的类型是不是一个 promise，如果 promise 的话，
                // 需要让这个 promise 执行，并且采用这个 promise 的状态
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) { // then 方法中监听 throw Error
                        reject(e)
                    }    
                }, 0);

            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }                    
                }, 0);
            }
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    // 切片编程
                    onfulfilled(this.value)
                })
                this.onRejectedCallbacks.push(() => {
                    onrejected(this.reason)
                })
            }
        })
        return promise2
    }

    catch(errCallback){
        return this.then(null, err => {
            console.log(err)
        })
    }
}

module.exports = Promise