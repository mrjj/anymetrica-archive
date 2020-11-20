'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */

/**
 * Check if item os null or undefined or NaN
 * @param item
 * @return {boolean}
 */
var isNil = function isNil(item /*: any*/) {
  return item == null;
};

/**
 * @fileOverview Type checking
 */

/**
 * Check if item is Array.
 *
 * @param item
 * @return {boolean}
 */
var isArray = function isArray(item /*: any*/) {
  return item && (Array.isArray(item) || Object.prototype.toString.call(item) === '[object Array]');
};

/**
 * Check if item Error or Error-like.
 *
 * @param item
 * @return {boolean}
 */
var isError = function isError(item /*: any*/) {
  return item instanceof Error || item && item.stack && item.message;
};

/**
 * Check if item is Object
 * @param item
 * @return {boolean}
 */
var isObject = function isObject(item /*: any*/) {
  var type = typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item);
  return item != null && (type === 'object' || type === 'function');
};

/**
 * Check if item is string.
 *
 * @param item
 * @return {boolean}
 */
var isString = function isString(item /*: any*/) {
  return typeof item === 'string';
};

/**
 * Check if item is function.
 * @param item
 * @return {boolean}
 */
var isFunction = function isFunction(item /*: any*/) {
  return typeof item === 'function';
};

/**
 * Check if item is number.
 * @param item
 * @return {boolean}
 */
var isNumber = function isNumber(item /*: any*/) {
  return typeof item === 'number';
};

/**
 * Check if item is number.
 * @param item
 * @return {boolean}
 */
var isBoolean = function isBoolean(item /*: any*/) {
  return typeof item === 'boolean';
};

/**
 * Check if item is undefined.
 * @param item
 * @return {boolean}
 */
var isUndefined = function isUndefined(item /*: any*/) {
  return typeof item === 'undefined';
};

module.exports = {
  isArray: isArray,
  isBoolean: isBoolean,
  isError: isError,
  isFunction: isFunction,
  isNil: isNil,
  isNumber: isNumber,
  isObject: isObject,
  isString: isString,
  isUndefined: isUndefined
};