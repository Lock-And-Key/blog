new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello')
        }, 1000);
    }))
})

p.then(data => {
    console.log(data)
})