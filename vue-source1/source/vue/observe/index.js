import Observer from './observer'
import Watcher from './watcher';
import Dep from './dep';
export function initState(vm){
    // 做不同的初始化工作
    let opts = vm.$options;
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm, opts.computed)
    }
    if (opts.watch) {
        initWatch()
    }
}

export function observe (data) {
    if (typeof data !== 'object' || data === null) {
        return // 不是对象或者是null的情况下，就不需要执行后续逻辑了
    }
    if (data.__ob__) {
        return data.__ob__ 
    }
    return new Observer(data)
}

function proxy (vm, source, key) {
    Object.defineProperty(vm, key, {
        get () {
            return vm[source][key]
        },
        set (newValue) {
            vm[source][key] = newValue 
        }
    })
}

function initData (vm) { // 将用户插入的数据 通过 Object.defineProperty 重新定义
    let data = vm.$options.data // 用户传入的 data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    for (let key in data) {
        proxy(vm, '_data', key)  // 会对 vm 上的取值和赋值操作代理给 vm._data 属性
    }

    observe(vm._data)  // 观察数据
}

function createComputedGetter(vm, key){
    // 用户取值时会执行此方法
    let watcher = vm._watchersComputed[key]
    return function() { 
        if(watcher){
            if(watcher.dirty){ // 如果页面取值，而且dirty是true，就会去调用watcher的get方法
                watcher.evaluate()
            }
            if(Dep.target){
                watcher.depend()
            }
            return watcher.value
        }
    }
}

// 计算属性 特点 默认不执行，等用户取值的时候再执行，会缓存取值的结果
// 如果依赖的值变化了，会更新dirty属性，再次取值时，可以重新求新值

// watch方法 不能用在模板里，监控的逻辑都放在watch中即可
// watcher有三类：渲染watcher 用户watcher 计算属性watcher
function initComputed (vm, computed) {
    // 将计算属性的配置放到 vm 上
    let watchers = vm._watchersComputed = Object.create(null) // 创建存储计算属性的watcher对象

    for(let key in computed){   // {fullName: () => this.firstName + this.lastName}
        let userDef = computed[key]

        // new Watcher此时什么都不会做 配置了lazy dirty
        watchers[key] = new Watcher(vm, userDef, () => {}, {lazy: true}) // 计算属性 watcher，默认刚开始这个方法不会执行

        Object.defineProperty(vm, key, {
            get: createComputedGetter(vm, key)
        })  // 将 computed 的属性名定义到 vm 上，vm.fullName
    }
}

function createWatcher(vm, key, handler){
    // 内部最终也会使用 $watch 方法
    return vm.$watch(key, handler)
}

function initWatch (vm) {
    let watch = vm.$options.watch
    for(let key in watch){
        let userDef = watch[key]
        let handler = userDef
        if(userDef.handler){
            handler = userDef.handler
        }
        createWatcher(vm, key, handler, {immediate: userDef.immediate})
    }
}