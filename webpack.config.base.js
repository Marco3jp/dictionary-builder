const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ASSET_PATH = '/';
const dist = __dirname + "/dist";
const path = require('path');

module.exports = (isDev) => {
    return {
        entry: {
            'main': './src/index.ts',
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
        plugins: [
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
