const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const ASSET_PATH = '/';
const dist = __dirname + "/dist";
const path = require('path');

module.exports = (isDev) => {
    return {
        entry: {
            'main': './src/index.js',
        },
        mode: isDev ? "development" : "production",
        output: {
            path: dist,
            filename: '[name]_[hash].js',
            publicPath: ASSET_PATH
        },
        resolve: {
            extensions: ['*', '.js', '.vue', '.json', '.tsx', '.ts'],
            alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@scripts': path.resolve(__dirname, 'src/scripts'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [/\.vue$/]
                            }
                        }
                    ]
                },
                {
                    test: /\.css/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.s([ca])ss/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'vue-style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                implementation: require('sass'),
                                sassOptions: {
                                    fiber: require('fibers'),
                                },
                            }
                        },

                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src']
                        }
                    }
                },
            ]
        },
        plugins: [
            new VuetifyLoaderPlugin(),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                inject: "body",
                chunks: ['main'],
                template: "./index.html",
                filename: "./index.html"
            }),
        ],
    }
};
