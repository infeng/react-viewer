var config = require('./webpack.config.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

config.entry('index').clear().add('./demo/index.tsx');
config.mode('development');
config.devtool('eval-source-map');
config.plugin('html-webpack-plugin')
  .use(HtmlWebpackPlugin, [{
    filename: 'index.html',
    template: './demo/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    hash: true,
  }]);
config.devServer.merge({
  contentBase: path.join(__dirname, 'dist'),
  compress: false,
  port: 8001,
  host: '0.0.0.0',
});
config.module.rule('less')
  .use('css-loader')
    .tap(options => {
      return {
        ...options,
        sourceMap: true,
      };
    });
config.module.rule('less')
  .use('less-loader')
    .tap(options => {
      return {
        ...options,
        sourceMap: true,
      };
    });

module.exports = config.toConfig();
