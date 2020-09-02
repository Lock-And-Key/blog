import { observe } from './index'
import { arrayMethods, observeArray, dependArray } from './array'
import Dep from './dep'

export function defineReactive (data, key, value) {
    let childOb = observe(value)
    // vue 不支持 IE8 及其以下的浏览器

    // 如果 value 依旧是一个对象的话，需要深度观察 
    // observe(value) // 递归观察
    // 相同的属性用的是同一个dep
    let dep = new Dep();
    Object.defineProperty(data, key, {
        // ** 依赖收集
        get () { // 只要对这个属性进行了取值操作，就会将当前的 watcher 存入进去
            // 定义时没有 Dep.target，取值时就有了。
            if(Dep.target){
                // dep.addSub(Dep.target)
                dep.depend() // 让 dep可以存放 watcher，让 watcher 也可以存放 dep
                if(childOb){
                    childOb.dep.depend()
                    dependArray(value)
                }
            }
            return value
        },
        // ** 通知依赖的更新
        set (newValue) {
            if (newValue === value) {
                return
            }
            value = newValue
            dep.notify();
        }
    })
}

class Observer {
    constructor(data){
        this.dep = new Dep() // 为数组而设的 dep
        Object.defineProperty(data, '__ob__', {
            get: () => this
        })
        if(Array.isArray(data)){
            data.__proto__ = arrayMethods // 让数组通过链来查找我们自己编写的原型
        }else {
            this.walk(data);
        }
    }
    walk (data) {
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }
}
export default Observer