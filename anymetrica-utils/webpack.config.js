const cloneDeep = require('lodash.clonedeep');
const fs = require('fs');
const get = require('lodash.get');
const path = require('path');
const set = require('lodash.set');
const Webpack = require('webpack');
const WebpackNodeExternals = require('webpack-node-externals');
const { getRevision } = require('./src/utils/git');

const makeMin = (config) => {
  const resConfig = cloneDeep(config);
  set(resConfig, 'optimization.minimize', true);
  const fnParts = get(resConfig, 'output.filename', 'index.js').split('.');
  set(
    resConfig,
    'output.filename',
    [...(fnParts.slice(0, -1)), 'min', fnParts[fnParts.length - 1]].join('.'),
  );
  return resConfig;
};

const ubiqConf = {
  plugins: [
    // For flexible nodejs/browser switch
    new Webpack.DefinePlugin({
      'process.env.ANYMETRICA_UTILS_VERSION': fs.readFileSync('./package.json').version,
      'process.env.ANYMETRICA_UTILS_GIT_REVISION': getRevision('.'),
    }),
  ],
  target: 'node',
  externals: [WebpackNodeExternals()],
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  entry: {
    index: ['babel-polyfill', './src/index-node.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['remove-flow-types-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  devtool: 'source-map',
  mode: 'production',
};

/*
  const nodeConfig = {
    ...ubiqConf,
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'anymetrica-utils.js',
    },
  };
*/

const webConfig = {
  ...ubiqConf,
  target: 'web',
  node: {
    fs: 'empty',
    path: 'empty',
  },
  entry: {
    index: ['babel-polyfill', './src/index-web.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'AnymetricaUtils',
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'anymetrica-utils.js',
  },
  optimization: {
    minimize: false,
  },
};

module.exports = [
  webConfig, makeMin(webConfig),
];
