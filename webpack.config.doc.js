const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.common');
const path = require('path');
const fs = require('fs-extra');

const distPath = path.join(__dirname, 'pages-build');
if (fs.existsSync(distPath)) {
  fs.removeSync(distPath);
}

config.entry('index').clear().add('./demo/index.tsx');
config.output.path(distPath);
config.output.filename('index.[contenthash].js');
config.mode('production');
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


module.exports = config.toConfig();
