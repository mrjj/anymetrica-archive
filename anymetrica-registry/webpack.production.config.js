const path = require('path');
const config = require('./webpack.base');

config.target = 'node';
config.mode = 'production';
config.devtool = 'source-map';
config.optimization.minimize = true;
config.output = {
  path: path.resolve(__dirname, 'lib'),
  filename: 'index.js',
};

module.exports = config;
