let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (name, env, dirname) => {
    return [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','stage-0']
                }
            },
            {
                test: /.js$/,
                enforce: 'post', // post-loader处理
                loader: 'es3ify-loader'
            }
    ]
}