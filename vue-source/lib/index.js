'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vm = new _vue2.default({
    el: '#app',
    data: function data() {
        return {
            msg: 'hello',
            school: { name: 'zf', age: 10 },
            arr: [{ a: 1 }, 2, 3]
        };
    },

    computed: {},
    watch: {}
});

// 什么样的数组【不会】被观测到 arr = [0, 1, 2]
// 1) arr[0] = 5
// 2) arr.length = 2

// 什么样的数组【会】被观测到 arr = [{ a: 1 }, 1, 2]
// arr[0][a] = 5
// [].push splice unshift shift pop sort reverse vm.$set 内部调用的就是数组的 splice