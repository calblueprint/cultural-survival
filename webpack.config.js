const path = require('path');

module.exports = {
    entry: './App.tsx',
    // Bundle '.ts' files as well as '.js' files.
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cultural-survival-webpack.bundle.js',
    },
    module: {
        rules: [
            {
            test: /\.tsx$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    mode: 'development',

};