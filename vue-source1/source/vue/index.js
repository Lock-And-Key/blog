import { initState } from "./observe";
import Watcher from "./observe/watcher";
import { util, compiler } from './util'
import { popTarget } from "./observe/dep";

function Vue(options) { // vue 中原始用户传入的数据
    this._init(options); //初始化Vue，并且将用户选项传入
}

Vue.prototype._init = function(options){
    // vue中初始化   this.$options表示的是vue中参数
    let vm = this;
    vm.$options = options;
    // MVVM原理 需要将数据初始化
    initState(vm);

    // 初始化所做 vue1.0
    if(vm.$options.el){
        vm.$mount()
    }
}

function query(el){
    if(typeof el === 'string'){
        return document.querySelector(el)
    }
    return el
}


Vue.prototype._update = function () {
    console.log('更新操作')
    // 利用用户传入的数据更新试图
    let vm = this
    let el = vm.$el
    // 要循环这个元素，将里面的内容换成我们的数据
    // 以下逻辑后面会用虚拟dom重写
    let node = document.createDocumentFragment()
    let firstChild;
    while (firstChild = el.firstChild) { // 每次拿到第一个元素就将这个元素放入到文档碎片中
        node.appendChild(firstChild) //appendChild 具有移动的功能
    }
    compiler(node, vm)
    el.appendChild(node)

    // 需要匹配 {{}} de 方式来替换

    // 依赖收集 属性变化了 需要重新渲染 watcher
}


Vue.prototype.$mount = function(){
    let vm = this
    let el = vm.$options.el  // 获取元素  // #app
    el = vm.$el = query(el)  // 获取当前挂载的节点 vm.$el 就是要挂载的一个元素

    let updateComponent = () => {
        vm._update() // 更新组件
    }

    new Watcher(vm, updateComponent) // 渲染 watcher
    // 渲染时通过 watcher 来渲染
    // 渲染 watcher 用于渲染的 watcher
    // vue2.0 组件级别更新 new Vue产生一个组件

    
}

export default Vue

// 初次渲染的依赖收集，思路整理一下：
// 1.默认会创建一个渲染 watcher 这个渲染 watcher 默认会被执行

// 2. pushTarget(this)
// this.getter() 调用当前属性的 get 方法 给当前的属性加了一个 dep dep.addSub(watcher)
// popTarget()

// 3. 当用户修改了属性的变化后 会调用set方法
// dep.notify() dep.subs.forEach(watcher => watcher.update())