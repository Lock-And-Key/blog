// 观察者模式和发布订阅 之间有什么关系？
// 观察者模式是基于发布订阅的

class Subject{ // 被观察者 小宝宝
    constructor(name) {
        this.name = name;
        this.arr = [];
        this.state = '我很开心';
    }
    attach(observer) { // 注册观察者 基于发布订阅
        this.arr.push(observer);
    }
    setState(newState){
        this.state = newState;
        this.arr.forEach(o => {
            o.update(this)
        });
    }
}

class Observer{ // 观察者 我
    constructor(name) {
        this.name = name
    }
    update(s){
        console.log(s.name + '当前状态是' + s.state)
    }

}
let s = new Subject('小宝宝')
let o1 = new Observer('我')
let o2 = new Observer('我媳妇')

// 注册，产生关联
s.attach(o1)
s.attach(o2)
s.setState('不开心了')