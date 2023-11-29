// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // entry point
    entry: './src/index.js',
    // output path and filename
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // loaders
    module: {
        rules: [
            // process JavaScript files with babel-loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // process CSS files with css-loader and mini-css-extract-plugin
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    // plugins
    plugins: [
        // generate HTML file with script tag
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        // extract CSS file from bundle
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    // optimization
    optimization: {
        // minify and optimize output files with terser-webpack-plugin
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    // development server
    devServer: {
        // enable livereload
        liveReload: true,
        // open the browser automatically
        open: true,
        // specify the port number
        port: 8080
    },
};
