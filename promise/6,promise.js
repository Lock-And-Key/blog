// promise 周边方法
let fs = require('fs')

// 下面这样错误处理，非常麻烦，异步回调地域
// fs.readFile('./name.txt', 'utf8', function(err, data){
//     if(err) {

//     }
//     fs.readFile(data, 'utf8', function(err, data){
//         if(err) {

//         }
//         console.log(data)
//     })
// })

// 封装一个 promise 版的read
function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(...arguments, function)
    });
}

read('./name.txt', 'utf-8').then(data => {

}, function(err) {

})
