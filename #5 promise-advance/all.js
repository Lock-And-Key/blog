// 异步并发问题： 同时发送多个请求，希望拿到所有的结果之后再进行处理
// Promise.all

const fs = require('fs'); // fs是异步的

// node中异步方法都有回调

const after = (times, fn) => () =>  --times == 0 && fn();
let renderObj = {};

let out = after(2, () =>  {
    console.log('out', renderObj)
})
fs.readFile('./name.txt', 'utf8', function(err, data){
    renderObj.name = data;
    out();
})

fs.readFile('./age.txt', 'utf8', function(err, data){
    renderObj.age = data;
    out();
})