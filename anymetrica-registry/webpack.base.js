const fs = require('fs');
const path = require('path');
const Webpack = require('webpack');
const WebpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { getRevision } = require('anymetrica-utils');

const rules = [
  {
    test: /\.jsx?$/,
    enforce: 'pre',
    use: ['remove-flow-types-loader'],
    include: path.join(__dirname, 'src'),
  },
];
const plugins = [
  // For flexible nodejs/browser switch
  new Webpack.DefinePlugin({
    'process.env.ANYMETRICA_UTILS_VERSION': fs.readFileSync('./package.json').version,
    'process.env.ANYMETRICA_UTILS_GIT_REVISION': getRevision('.'),
  }),
  new CopyWebpackPlugin(
    [
      {
        from: 'node_modules/anymetrica-api/protos/',
        to: 'protos',
      },
    ],
    {
      copyUnmodified: true,
    },
  ),
];

module.exports = {
  plugins,
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
    index: ['babel-polyfill', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules,
  },
  optimization: {
    minimize: false,
  },
};
