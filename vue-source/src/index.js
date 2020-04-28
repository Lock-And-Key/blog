import Vue from '../source/vue/index'
let vm = new Vue({
    el: '#app',
    data () {
        return {
            msg: 'hello',
            school: { name: 'zf', age: 10 },
            // arr: [{a: 1}, 2, 3]
        }
    },
    computed: {

    },
    watch: {

    }
})

// 什么样的数组【不会】被观测到 arr = [0, 1, 2]
// 1) arr[0] = 5
// 2) arr.length = 2

// 什么样的数组【会】被观测到 arr = [{ a: 1 }, 1, 2]
// arr[0][a] = 5
// [].push splice unshift shift pop sort reverse vm.$set 内部调用的就是数组的 splice
