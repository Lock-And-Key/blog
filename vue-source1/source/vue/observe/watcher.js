import { pushTarget, popTarget } from './dep'
import { util } from '../util';
let id = 0
class Watcher{ // 每次产生一个新 Watcher 都要有一个唯一的标识
    // vm: 当前组件的实例 new Vue
    // exprOrFn: 用户可能传入的是一个表达式，也可能是一个函数
    // cb: 用户传递的回调函数 vm.$watch('msg', cb)
    // opts: 一些其他参数
    constructor(vm, exprOrFn, cb, opts = {}){
        this.vm = vm
        this.exprOrFn = exprOrFn
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn; // getter 就是 new Watcher 传入的第二个函数
        } else {
            this.getter = function(){ // 如果调用此方法，会将 vm 上对应的表达式取出来
                return util.getValue(vm, exprOrFn)
            }
        }
        if(opts.user){  // 标识是用户自己写的watcher
            this.user = true
        }
        this.cb = cb
        this.deps = []
        this.depsId = new Set()
        this.opts = opts
        this.id = id++
        this.immediate = opts.immediate
        // 创建watcher的时候，先将表达式对应的值取出来(老值)
        this.value = this.get(); // 默认创建一个 Watcher 会调用自身的 get 方法
        if(this.immediate){
            this.cb(value, undefined)
        }
    }
    get() {
        pushTarget(this); // 渲染 Warcher Dep.target= watcher   msg变化了，需要让 watcher 重新执行
        // 默认创建watcher，会执行此方法
        let value = this.getter(); // 让这个当前传入的函数执行
        popTarget()
        return value
    }
    addDep(dep){ // 同一个 watcher 不应该重复记录 dep
        let id = dep.id // msg 的dep
        if(!this.depsId.has(id)){
            this.depsId.add(id)
            this.deps.push(dep) // 让 watcher 记住了当前的 dep
            dep.addSub(this)
        }
    }
    update(){
        queueWatcher(this)
    }
    run(){
        let value = this.get()
        if(this.value !== value){
            this.cb(value, this.value)
        } 
    }
}

let has = {}
let queue = []
function flushQueue(){
    // 等待当前这一轮全部更新后，再去让 watcher 依次执行
    queue.forEach(watcher => watcher.run())
    has = {}
    queue = []
}
function queueWatcher(watcher){
    let id = watcher.id
    if(has[id] === null || has[id] === undefined){
        has[id] = true
        queue.push(watcher) // 相同的 watcher 只会存一个到 queue 中

        // 延迟清空队列
        nextTick(flushQueue)
    }
}

let callbacks = []
function flushCallbacks(){
    callbacks.forEach(cb => cb())
}
function nextTick(cb){ // cb就是flushQueue
    callbacks.push(cb)

    // 要异步刷新这个 callbacks，获取一个异步的方法
    //                        微任务                        宏任务
    // 异步是分执行顺序的，依次是：promise，mutationObserver    setImediate setTimeout
    let timerFunc = () => {
        flushCallbacks()
    }
    if(Promise){
        return Promise.resolve().then(timerFunc)
    }
    if(MutationObserver){
        let observe = new MutationObserver(timerFunc)
        let textNode = document.createTextNode(1)
        observe.observe(textNode, {characterData: true})
        textNode.textContent = 2
        return
    }
    if(setImmediate){
        setImmediate(timerFunc)
    }
    setTimeout(timerFunc, 0);
}
// 用处
// 渲染
// 1.计算属性
// 2.vm.Watch
export default Watcher