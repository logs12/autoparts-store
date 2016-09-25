'use strict';

const webpack = require('webpack'),
    path = require('path');


module.exports = {
    // точки входа
    entry: [
        // Set up an ES6-ish environment
        'babel-polyfill',
        "./src/index.js"
    ],

    // то, что получим на выходе
    output: {
        path: "./build",
        filename: "[name].bundle.js",
        publicPath: '/build/',
        chunkFilename: "[id].bundle.js"
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                test: /\.js$/,
                plugins: ['transform-runtime'],
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /bower_components/, /public/]
            },
            {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            },
            {
                test   : /\.css$/,
                loaders: ['style', 'css', 'resolve-url']
            },
            {
                test   : /\.scss$/,
                loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
            }
        ]

    },

    /* Конфиг для webpack-dev-server*/
    devServer: {
        host: 'autoparts-store.loc',
        port: 8080,
        //contentBase: __dirname + '/public',
        contentBase: './',
        devtool: 'eval-source-map',
        historyApiFallback: true
        // все пути к статике которые WDS не нашел(катинки и т.п.) отдаются на

        /* proxy: {
         '*': 'http://help-kran.loc/'
         }*/
    }
    /*  plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoErrorsPlugin(),
     //Minification js
     new webpack.optimize.UglifyJsPlugin({
     compressor: {
     warnings: false
     }
     })
     ],*/

}
