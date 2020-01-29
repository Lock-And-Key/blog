// 发布订阅模式中 发布方与订阅方无直接相关
// 但在观察者模式中，中插着和被观察者是有关联的
// 观察者需要将自己放到被观察者之上，当被观察者状态发生变化时，需要通知所有的观察者
// 观察者模式基于发布订阅模式

// 被观察者
class Subject {
    constructor(name){
        this.name = name
        this.state = '开心'
        this.observers = []
        this.sate
    }
    attach(o) { // 将观察者绑定到被观察者上 相当于 on
        this.observers.push(o) 
    }
    setState(state) { // 更新被观察者的状态 相当于 emit
        this.state = state
        this.observers.forEach((o) => {
            o.update(this)
        })
    }
}

//观察者
class Observer {
    constructor(name){
        this.name = name
    }
    update(s) { // 当被观察者发生变化时会调用这个方法
        console.log(this.name, ':', s.name, s.state)
    }
}

let baby = new Subject('baby')
let papa = new Observer('papa')
let mama = new Observer('mama')
baby.attach(papa)
baby.attach(mama)
baby.setState('不开心')