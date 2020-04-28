import { observe } from './index'
import { arrayMethods  } from './array'

export function defineReactive (data, key, value) {
    // vue 不支持 IE8 及其以下的浏览器

    // 如果 value 依旧是一个对象的话，需要深度观察 
    observe(value) // 递归观察
    Object.defineProperty(data, key, {
        get () {
            console.log('11获取数据', value)
            return value
        },
        set (newValue) {
            console.log('11设置数据')
            if (newValue === value) {
                return
            }
            value = newValue
        }
    })
}

class Observer {
    constructor(data){
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