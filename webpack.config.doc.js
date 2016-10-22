const webpack = require('atool-build/lib/webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var conf = {
  filename: 'index.html',
  template: './demo/index.html',
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: false
  },
  hash: true,
}

module.exports = function (webpackConfig) {
  webpackConfig.entry = {
    index: './demo/index.tsx',
  };

  webpackConfig.output.path = './docs';
  webpackConfig.output.publicPath = '/react-viewer/';

  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (loader.test.toString().indexOf('html') > 0) {
      loader.loader = 'html';
    }
  });

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin(conf)
  );

  webpackConfig.plugins.some(function (plugin, i) {
    if (plugin instanceof webpack.optimize.CommonsChunkPlugin) {
      webpackConfig.plugins.splice(i, 1);

      return true;
    }
  });

  return webpackConfig;
};