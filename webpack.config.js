const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        // 根据模板产出内存中的主页，并注入JS
        new htmlWebPackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()

    ],
    // 第三方模块（编译型的）需要再次写规则（谁干什么）
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue$/, use: 'vue-loader' },
            // 关于babelrc：这个文件可以不要，plugins与presets可以按以下格式(babelrc仍会被检测)
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [require('@babel/plugin-proposal-class-properties')],
                    presets: ['@babel/preset-env']
                }
            },
            // {
            //     test: /\.js$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules/
            // },
            { test: /\.jpg|jpeg|png|bmp|gif$/, use: 'url-loader' },
            //bs的字体部分 （URL）
            { test: /\.eot|svg|ttf|woff|woff2$/, use: 'url-loader' },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
        ]
    },
    // 模块入口文件修改
    // resolve:{
    //     alias:{
    //         'vue$':'vue/dist/vue.js'
    //     }
    // }
}