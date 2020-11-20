'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */
var index = require('./index-web');
/**
 * @fileOverview Main Node entry point
 */
module.exports = (0, _extends3.default)({}, index, require('./utils/cli'), require('./utils/encodings'), require('./utils/fs'));