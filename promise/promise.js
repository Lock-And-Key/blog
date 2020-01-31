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
class Promise{
    constructor(executor) {
        console.log('Welcome to My Promise')
        this.status = PENDING // 默认是等待态
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        let resolve = (value) => {
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
        if(this.status === RESOLVED) {
            onfulfilled(this.value)
        }
        if(this.status === REJECTED) {
            onrejected(this.reason)
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
    }
}

module.exports = Promise