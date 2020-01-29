let after = function(times, callback) {
    return function() {
        if(--times === 0){
            callback.apply(this, arguments)
        }
    }
}

let fn = after(3, function(){
    console.log('dududu')
})
fn();
// fn();
// fn();
