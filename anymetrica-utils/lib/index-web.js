'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */

/**
 * @fileOverview Main common entry point
 */
module.exports = (0, _extends3.default)({}, require('./utils/checks'), require('./utils/dataStructures'), require('./utils/git'), require('./utils/graphUtils'), require('./utils/json'), require('./utils/humanize'), require('./utils/lg-utils'), require('./utils/lists'), require('./utils/loadConfig'), require('./utils/logger'), require('./utils/numbers'), require('./utils/promise'), require('./utils/time'), require('./utils/text'), require('./utils/types'), require('./utils/uriFileSize'), require('./utils/visitor'), {

  // Third parties

  // lodash
  clone: require('lodash.clone'),
  cloneDeep: require('lodash.clonedeep'),
  compact: require('lodash.compact'),
  contains: require('lodash.includes'),
  defaults: require('lodash.defaults'),
  difference: require('lodash.difference'),
  each: require('lodash.foreach'),
  flatten: require('lodash.flatten'),
  flattenDeep: require('lodash.flattendeep'),
  forEach: require('lodash.foreach'),
  fromPairs: require('lodash.frompairs'),
  get: require('lodash.get'),
  includes: require('lodash.includes'),
  intersection: require('lodash.intersection'),
  map: require('lodash.map'),
  omit: require('lodash.omit'),
  omitBy: require('lodash.omit'),
  pick: require('lodash.pick'),
  pickBy: require('lodash.pick'),
  set: require('lodash.set'),
  slice: require('lodash.slice'),
  sortBy: require('lodash.sortby'),
  union: require('lodash.union'),
  uniq: require('lodash.uniq'),
  unique: require('lodash.uniq'),

  // moment
  moment: require('moment'),

  // js-yaml
  yaml: require('js-yaml')
});