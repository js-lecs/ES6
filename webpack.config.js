
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    // eslint options (if necessary)
                }
            },
            {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ['css-loader', 'sass-loader'],
                    publicPath: './dist'
                })
                // use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: ['babel-loader']
            }
        ]
    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, './dist'),
        inline: true, // hot reload
        compress: true, // gzip compression,
        open: true // open window on run
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhiteSpace: true // minify html
            }
        }),
        new ExtractTextPlugin({ // create a css bundle
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }),
    ]
}