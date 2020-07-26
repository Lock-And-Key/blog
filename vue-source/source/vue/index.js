import { initState } from './observe'

function Vue (options) {
    this._init(options);  // 初始化Vue 并且将用户选项传入
}

Vue.prototype._init = function (options) {
    // Vue中初始化 this.$options 表示的是Vue中参数
    let vm = this;
    vm.$options = options;

    // mvvm原理 需要将数据重新初始化
    initState(vm) // data computed watch

    //初始化工作
    if (vm.$options.el) {
        vm.$mount()
    }
}

Vue.prototype.$mount = function () {
    let vm = this
    let el = 
}

export default Vue