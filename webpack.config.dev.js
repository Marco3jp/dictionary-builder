const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig(true), {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'dist',
        port: 4500,
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true,
        inline: true,
        https: true,
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});

if (module.hot) {
    module.hot.accept();
}
