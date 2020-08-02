const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebPackPlugin({ template: './src/index.html', filename: './index.html' })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.(t|j)sx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            { test: /\.(png|svg|jpg|gif)$/, use: [ 'file-loader' ]},
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
}