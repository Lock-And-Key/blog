import { pushTarget, popTarget } from './dep'
let id = 0
class Watcher{ // 每次产生一个新 Watcher 都要有一个唯一的标识
    // vm: 当前组件的实例 new Vue
    // exprOrFn: 用户可能传入的是一个表达式，也可能是一个函数
    // cb: 用户传递的回调函数 vm.$watch('msg', cb)
    // opts: 一些其他参数
    constructor(vm, exprOrFn, cb, opts){
        this.vm = vm
        this.exprOrFn = exprOrFn
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn; // getter 就是 new Watcher 传入的第二个函数
        }
        this.cb = cb
        this.deps = []
        this.depsId = new Set()
        this.opts = opts
        this.id = id++

        this.get(); // 默认创建一个 Watcher 会调用自身的 get 方法 
    }
    get() {
        pushTarget(this); // 渲染 Warcher Dep.target= watcher   msg变化了，需要让 watcher 重新执行
        this.getter(); // 让这个当前传入的函数执行
        popTarget()
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
        this.get()
    }
}

// 用处
// 渲染
// 1.计算属性
// 2.vm.Watch
export default Watcher