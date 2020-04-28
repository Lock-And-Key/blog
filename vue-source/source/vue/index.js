import { initState } from './observe'
import Watcher from './observe/watcher';

function Vue (options) {
    this._init(options);  // 初始化Vue 并且将用户选项传入
}

Vue.prototype._init = function (options) {
    console.log(333)
    // Vue中初始化 this.$options 表示的是Vue中参数
    let vm = this;
    vm.$options = options;

    // mvvm原理 需要将数据重新初始化
    // 拦截数组的方法 和 对象的属性
    initState(vm) // data computed watch

    //初始化工作
    if (vm.$options.el) {
        vm.$mount()
    }
}

function query (el) {
    if (typeof el === 'string') {
        return document.querySelector(el)
    }
    // el 也可能是一个 dom 元素
    return el
}

// ?: 匹配不捕获
// + 至少一个
// ? 尽可能少匹配
// 源码里的模板编译 也是基于正则的
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/
const util = {
    compilerText (node, vm) { // 编译文本 替换 {{ xxx }}
        node.textContext = node.textContext.replace(defaultRE, function(...args){
            console.log(args)
        })
    }
}
function compiler (node, vm) { // node 就是文档碎片
    let childNodes = node.childNodes
    // 将类数组转换成数组
    childNodes = Array.from(childNodes)

    childNodes.forEach(child => {
        if (child.nodeType === 1) { // 1 元素 3 文本

        } else if (child.nodeType === 3) {
            util.compilerText(child)
        }
    })
}

Vue.prototype._update = function () {
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
    
    el.appendChild(node)
}

Vue.prototype.$mount = function () {
    console.log(111)
    let vm = this
    let el = vm.$options.el  // 获取元素 // #app
    el = vm.$el = query(el);
    // 渲染时通过 watcher 来渲染的
    // 渲染 watcher : 用于渲染的 watcher
    // Vue2.0 组件级别更新: new Vue 产生一个组件

    let updateComponent = () => { // 更新组件，渲染的逻辑
        vm._update() // 更新组件
    }

    new Watcher(vm, updateComponent) // 渲染 Watcher
}

export default Vue