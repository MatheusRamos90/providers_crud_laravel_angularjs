//webpack.config.js
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;

const minify = env === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var WebpackNotifierPlugin = require('webpack-notifier');

const config = {
    mode: env,
    entry: './src/dependencies.app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './src/assets/js')
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=../fonts/[name].[ext]'
            },
            {
                test: /\.txt$/, use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'bower_components')
        ],
        extensions: ['.js', '.json'],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'index.html'}),
        new WebpackNotifierPlugin(),
        new ExtractTextPlugin('../css/app.css'),
        new webpack.ProvidePlugin({
            // inject ES5 modules as global vars
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

if (minify) {
    config.optimization.minimizer = [
        new OptimizeCSSAssetsPlugin(),
        // Enabled by default in production mode if
        // the `minimizer` option isn't overridden.
        new UglifyJsPlugin({
            cache: true,
            parallel: true
        })
    ];
}

module.exports = config;