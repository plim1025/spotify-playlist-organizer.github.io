const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        historyApiFallback: true,
    },
};