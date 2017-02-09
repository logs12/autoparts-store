'use strict';

const webpack = require('webpack');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

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
    plugins:[
        new webpack.ProvidePlugin({
            classNames: 'classNames',
            underscore:'lodash',
            $: "jquery/dist/jquery.js",
            jQuery: "jquery/dist/jquery.js",
            "window.jQuery": "jquery/dist/jquery.js"
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                test: /\.js$/,
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
                loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
            },
            {
                test: /\.scss$/, use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                ]
            },
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
    },

};

// Плагин для минификации
if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}  else {
    module.exports.devtool = 'cheap-module-source-map';
}