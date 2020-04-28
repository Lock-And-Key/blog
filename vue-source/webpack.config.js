const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')  
    },
    module: {
        rules: [{
            test: /\.js$/, //Regular expression 
            exclude: /(node_modules|bower_components)/,//excluded node_modules 
            use: {
            loader: "babel-loader", 
            options: {
              presets: ["@babel/preset-env"]  //Preset used for env setup
             }
            }
        }]
    },
    devtool: 'source-map', //可以产生 source-map
    plugin: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    resolve: { // 更改解析模块的查找方式
        modules:  [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    }
}
