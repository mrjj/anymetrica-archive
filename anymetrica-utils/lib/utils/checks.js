'use strict';

/* @flow */
var _require = require('./types'),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isString = _require.isString,
    isNil = _require.isNil;

var isEmpty = function isEmpty(item /*: any*/) /*: boolean*/ {
  if (isNil(item)) {
    return true;
  }
  if (isArray(item) || isString(item)) {
    return item.length === 0;
  }
  if (isObject(item)) {
    return Object.keys(item).length === 0;
  }
  return !!item;
};

module.exports = { isEmpty: isEmpty };