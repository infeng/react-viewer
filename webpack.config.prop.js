const webpack = require('atool-build/lib/webpack');
var path = require('path');

const packageName = require(path.join(process.cwd(), 'package.json')).name;

const entry = './src/index.tsx';

module.exports = function (webpackConfig) {

  webpackConfig.entry = Object.assign({}, webpackConfig.entry, {
    ['index.min']: entry,
  });

  webpackConfig.externals = {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  };

  webpackConfig.output = {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: packageName,
    libraryTarget: 'umd',
  };

  webpackConfig.plugins.some(function (plugin, i) {
    if (plugin instanceof webpack.optimize.CommonsChunkPlugin) {
      webpackConfig.plugins.splice(i, 1);

      return true;
    }
  });

  const uncompressedWebpackConfig = Object.assign({}, webpackConfig);

  uncompressedWebpackConfig.entry = {
    [`index`]: entry,
  };

  uncompressedWebpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    const ret = !(plugin instanceof webpack.optimize.UglifyJsPlugin);
    return ret;
  });

  uncompressedWebpackConfig.plugins = uncompressedWebpackConfig.plugins.filter((plugin) => {
    const ret = !(plugin instanceof webpack.DefinePlugin);
    return ret;
  });

  uncompressedWebpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }));

  return [
    webpackConfig,
    uncompressedWebpackConfig,
  ];
};