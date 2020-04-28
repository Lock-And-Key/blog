import { initState } from "../observe";

function Vue(options) { // vue 中原始用户传入的数据
    this._init(options); //初始化Vue，并且将用户选项传入
}

Vue.prototype._init = function(options){
    // vue中初始化   this.$options表示的是vue中参数
    let vm = this;
    vm.$options = options;
    // MVVM原理 需要将数据初始化
    initState(vm);
}

export default Vue