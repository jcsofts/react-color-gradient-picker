//const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
//const fs = require('fs');
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
                            drop_console: false,
                        }
                    }
                })
            ]
        };
        plugins = [
            new CleanWebpackPlugin(),
            new webpack.BannerPlugin(`${name} - ${pkg.version}`),
            new MiniCssExtractPlugin({
                filename: `index.css`,
                ignoreOrder: true,
            }),
        ]
    } else {
        plugins = [
            /*new MiniCssExtractPlugin({
                filename: `${name}.css`,
                ignoreOrder: true,
            }),*/
        ]
    }

    let output = {
        filename: `index.js`,
        path: path.resolve(__dirname, './dist'),
        library: name, 
        libraryTarget: 'umd'
    }

    return {
        devtool: env.production ? false : 'inline-source-map',
        //watch: env.production ? false : true,
        mode: env.production ? 'production' : 'development',
        entry: './src',
        output: output,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
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
        externals: [nodeExternals()],
        optimization: optimization,
        plugins: plugins,
        watchOptions: {
            ignored: /node_modules/
        },
        devServer: {
            port: 8000,
            hot: true
        },
        resolve: {
            extensions: ['.js', ".jsx", '.json', '.ts', '.tsx'],
            alias: {
                '@': path.resolve(__dirname,"./src"),
                'lib':path.resolve(__dirname,"./src/lib"),
            },
            fallback: {
                fs: false
            }
        }
    };
};
