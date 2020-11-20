const path = require('path');
const config = require('./webpack.base');

config.target = 'node';

config.mode = 'development';
config.devtool = 'source-map';
config.optimization.minimize = false;
config.output = {
  path: path.resolve(__dirname, 'lib'),
};

module.exports = config;
