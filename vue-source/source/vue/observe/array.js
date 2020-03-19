import { observe } from "./index"

// 主要做的事是拦截用户调用的 push shift unshift pop reverse sort splice

// concat 这类不改变原数组的不需要重写

// 先获取老的数组的方法，只改写这7个方法
let oldArrayProtoMethods = Array.prototype

export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

export function observeArray (inserted) { // 要循环数组，依次对数组的每一项进行观测
    for (let i = 0; i < inserted.length; i++) {
        console.log(inserted[i])
        observe(inserted[i])
    }
}

methods.forEach((method) => {
    arrayMethods[method] = function (...args) { // 函数劫持 切片编程
        oldArrayProtoMethods[method].apply(this, args)
        // todo
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
            default:
                break
        }

        if (inserted) {
            observeArray(inserted)
        }
        console.log('调用了数组更新的方法')
    }
})