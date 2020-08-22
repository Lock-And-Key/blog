let fs = require('fs');

// fs.readFile('./name.txt', 'utf8', function(err, data){
//     fs.readFile(data, 'utf8', function(err, data){
//         console.log(data)
//     })
// })

//封装一个promise版的readfile

function read(...args){
    return new Promise((resolve, reject) => {
        fs.readFile(...args, function(err, data){
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// #1 如果返回的是一个promise，那么会让这个promise执行，并且采用他的状态，将成功或失败传递给下一个promise中
// #2 如果返回的是一个普通值，会把这个值作为下一个值的成功的回调中。
// #3 抛出一个异常，会进入下个promise的失败的promise
// #4 如果没有返回也没有异常抛出，默认return undefined，进入下一个promise的then中。

read('name.txt', 'utf8').then((data) => {
    return read(data, 'utf8')
}).then((data) => {
    console.log(data)
}, err => {
    return 100 // #2
}).then(data => {
    console.log(data)
    throw new Error('error');
}).then(null, err => {
    throw new Error('error2');
}).catch(err => {
    console.log('111');
})

let promise = new Promise((resolve, reject) => {
    resolve('hello')
})

let promise2 = promise.then(() => {
    return new Promise((resolve, reject) => {
        resolve('hello')
    })
})

promise2.then((data) => {
    console.log(data)
}, err => {
    console.log(err)
})