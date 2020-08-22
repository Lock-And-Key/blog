// 函数柯里化

// 判断一个变量的类型

// 判断类型 有四种方式 constructor instanceof typeof Object.prototype.toString.call
function checkType(content, type){
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

let bool = checkType('hello', 'String');

// console.log(bool)

// 函数科里化：把一个函数的范围进行缩小，让函数变得更具体一些

function checkType(type) {
    // 私有化，这个函数 可以拿到上层函数的参数，这个空间不会被释放掉
    return function (content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let isString = checkType('String');
let isBool = checkType('Boolean')

console.log(isBool(false))

// 实现是一个通用的函数柯里化

const add = (a, b, c, d, e) =>  {
    return a + b + c + d + e
}

const curring = (fn, arr = []) => {
    let len = fn.length;
    return (...args) => { // 保存用户传入的参数
        arr = [...arr, ...args];
        if(arr.length < len){
            return curring(fn, arr)
        }
        return fn(...arr)
    }
}

// console.log(curring(add, 1, 2)(3)(4)(5)) // 15
const  util =  {}
['Number', 'String', 'Boolean'].forEach(item => {
    util['is' + item] = curring(checkType)(item)
});

console.log(util.isString('hello'))

// 函数柯里化：     范围变小
// 函数反柯里化：   范围变大

const nums = [1, 3, 4, 5, 6, 7, 8, 10]
for(let i = 1; i < nums.length; i++){
    if(nums[i] - nums[i - 1] % 2 === 1){
        
    }
}