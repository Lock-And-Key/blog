// ?: 匹配不捕获
// + 至少一个
// ? 尽可能少匹配
// 源码里的模板编译 也是基于正则的
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export const util = {
    getValue(vm, expr){
        let keys = expr.split('.')
        return keys.reduce((memo, current) => {
            memo = memo[current]
            return memo
        }, vm)
    },
    compilerText (node, vm) { // 编译文本 替换 {{ xxx }}
        if(!node.expr){
            node.expr = node.textContent
        }
        node.textContent = node.expr.replace(defaultRE, function(...args){
            return util.getValue(vm, args[1])
        })
    }
}

export function compiler (node, vm) { // node 就是文档碎片
    let childNodes = node.childNodes // 只有儿子 没有孙子
    // 将类数组转换成数组
    childNodes = Array.from(childNodes)

    childNodes.forEach(child => {
        if (child.nodeType === 1) { // 1 元素 3 文本
            compiler(child, vm)
        } else if (child.nodeType === 3) {
            util.compilerText(child, vm)
        }
    })
}
