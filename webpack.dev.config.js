const HtmlWebpackPlugin = require('html-webpack-plugin');
//const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const name = pkg.name;
let plugins = [];
let optimization = {};


module.exports = (env = {}) => {
    if (env.production) {
        optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        compress: {
                            //drop_console: true,
                        }
                    }
                })
            ]
        };
        
        plugins = [
            new webpack.BannerPlugin(`${name} - ${pkg.version}`),
            /*new MiniCssExtractPlugin({
                filename: `${name}-app.css`,
                ignoreOrder: true,
            }),*/
        ]
    } else {
        const index = 'public/index.html';
        const indexDev = 'public/index.html';
        plugins=[
            /*new MiniCssExtractPlugin({
                filename: `${name}-app.css`,
                ignoreOrder: true,
            }),*/
            new HtmlWebpackPlugin({
                template: fs.existsSync(indexDev) ? indexDev : index
            })
        ];
        
    }

    let output = {
        filename: `${name}-app.js`,
        path: path.resolve(__dirname, './dist'),
    }

    /*if (env.production) {
        output = { ...output, library: name, libraryTarget: 'umd', }
    }*/

    return {
        devtool: env.production ? false : 'inline-source-map',
        watch: true,
        mode: env.production ? 'production' : 'development',
        entry: './src/index.js',
        output: output,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /src/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        //MiniCssExtractPlugin.loader,
                        "style-loader",
                        'css-loader'
                    ]

                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.svg$/i,
                    type: 'asset/inline'
                },
                {
                    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                    include: /node_modules/,
                    use: [
                        'url-loader'
                    ]
                }
            ],
        },
        externals: [],
        optimization: optimization,
        plugins: plugins,
        watchOptions: {
            ignored: /node_modules/
        },
        devServer: {
            //watch:true,
            port: 3300,
            hot: true,
            proxy:{
                "/api": {
                    target: "https://test.flowtrack.co",
                    //target: "https://app.flowtrack.co",
                    //target: "https://login.flowtrack.co.beta.procrm.co",
                    changeOrigin: true,
                    secure: false,
                },
                "/resources": {
                    target: "https://test.flowtrack.co",
                    //target: "https://app.flowtrack.co",
                    //target: "https://login.flowtrack.co.beta.procrm.co",
                    changeOrigin: true,
                    secure: false,
                },
            }
            
        },
        resolve: {
            alias: {
                '@': path.resolve("src")
            },
        }
    };
};
