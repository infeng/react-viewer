const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: [ '.js' ],
    modules: [path.join(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
};