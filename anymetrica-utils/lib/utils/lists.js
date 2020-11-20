'use strict';

/* @flow */
var compact = require('lodash.compact');
var uniq = require('lodash.uniq');

var _require = require('./types'),
    isArray = _require.isArray,
    isNil = _require.isNil;

/**
 * Convert object to single element array, null, undefined and other
 * false-casting els to the empty array and leave arrays intact.
 *
 * @param val {any} - any value
 * @returns {any}
 */


var forceArray = function forceArray(val /*: any*/) /*: Array<any>*/ {
  if (isNil(val)) {
    return [];
  }
  return isArray(val) ? val : [val];
};

/**
 * Any of values is true
 * @param arr
 * @return {boolean}
 */
var any = function any(arr /*: Array<any>*/) {
  return forceArray(arr).reduce(function (a, o) {
    return a || o;
  }, false);
};

/**
 * All values is true
 * @param arr
 * @return {boolean}
 */
var all = function all(arr /*: Array<any>*/) {
  return forceArray(arr).reduce(function (a, o) {
    return a && o;
  }, false);
};

/**
 * forceArray->Unique->Compact->Sort (AUCS) casting to array form
 * @return {*}
 * @param arr
 */
var aucs = function aucs(arr /*: Array<any>*/) /*: Array<any>*/ {
  return uniq(compact(forceArray(arr))).sort();
};

/**
 * First element
 *
 * @param item
 * @return {null}
 */
var first = function first(item /*: Array<any>*/) /*: any*/ {
  var arr = forceArray(item);
  return arr.length > 0 ? arr[0] : null;
};

/**
 * Last element
 *
 * @param item
 * @return {null}
 */
var last = function last(item /*: Array<any>*/) /*: any*/ {
  var arr = forceArray(item);
  var l = arr.length;
  return l > 0 ? arr[l - 1] : null;
};

module.exports = {
  all: all,
  any: any,
  aucs: aucs,
  first: first,
  forceArray: forceArray,
  last: last
};