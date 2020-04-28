import Observer from './observer'
export function initState(vm){
    // 做不同的初始化工作
    let opts = vm.$options;
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.watch) {
        initWatch()
    }
}

export function observe (data) {
    if (typeof data !== 'object' || data === null) {
        return // 不是对象或者是null的情况下，就不需要执行后续逻辑了
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

function initComputed () {

}

function initWatch () {
    
}