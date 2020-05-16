let id = 0
class Dep{
    constructor(){
        this.id = id++
        this.subs = []
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
    depend(){
        if(Dep.target){ // 为了防止直接调用depend方法
            // Dep.target是一个渲染 watcher
            Dep.target.addDep(this) // 希望可以在 watcher 中互相记忆

        }
    }
}

let stack = []
export function pushTarget(watcher){
    Dep.target = watcher
    stack.push(watcher)
}

export function popTarget(){
    stack.pop()
    Dep.target = stack[stack.length - 1]
}
// 用于收集依赖，收集的是一个个的依赖
export default Dep

// let dep = new Dep()
// dep.addSub({
//     update(){
//         console.log(1)
//     }
// })
// dep.addSub({
//     update(){
//         console.log(2)
//     }
// })
// dep.notify()