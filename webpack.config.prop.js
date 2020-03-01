const config = require('./webpack.config.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs-extra');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.removeSync(distPath);
}

config.output.merge({
  library: 'react-viewer',
  libraryTarget: 'umd',
  globalObject: 'this'
});

config.mode('production');

config.externals({
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
});

if (process.env.ANALYZE) {
  config.plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin);
}

module.exports = config.toConfig();
