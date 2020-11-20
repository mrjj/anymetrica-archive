'use strict';

/* @flow */
var flattenDeep = require('lodash.flattendeep');
var get = require('lodash.get');
var mapArray = require('lodash.map');
var uniq = require('lodash.uniq');
var traverse = require('traverse');

var _require = require('./types'),
    isArray = _require.isArray,
    isObject = _require.isObject,
    isUndefined = _require.isUndefined,
    isNil = _require.isNil;

var _require2 = require('./lists'),
    forceArray = _require2.forceArray;
/**
 * Get object keys
 * @param item
 * @return {*}
 */


var keys = function keys(item /*: Object*/) /*: Array<any>*/ {
  return isObject(item) ? Object.keys(item) : [];
};

/**
 *
 * @param mapping
 */
var backMap = function backMap(mapping /*: Object*/) /*: Object*/ {
  var backMapping = {};
  Object.keys(mapping).forEach(function (k) {
    backMapping[mapping[k]] = k;
  });
  return backMapping;
};

/**
 * Make array hash map.
 *
 * hashMap(['a', 'b'])
 * // => { a: true, b: true }
 *
 * @param valuesArray{Array<any>}
 */
var hashMap = function hashMap(valuesArray /*: Array<any>*/) /*: { string: boolean }*/ {
  var result = {};
  if (isArray(valuesArray)) {
    valuesArray.forEach(function (item) {
      result[item] = true;
    });
  }
  return result;
};

/**
 * Make object from pairs.
 *
 * fromPairs([ ['a', 'AA'], ['b', 'BB'] })
 * // => { a: 'AA', b: 'BB' }
 *
 * @param pairsArr
 */
var fromPairs = function fromPairs(pairsArr /*: Array<any>*/) {
  var result = {};
  if (isArray(pairsArr)) {
    pairsArr.forEach(function (kv) {
      if (isArray(kv) && kv.length >= 2) {
        result[kv[0]] = result[kv[1]];
      }
    });
  }
  return result;
};

/**
 * Sum numeric properties of objects.
 *
 * @example
 * sumNumericProperties([{a: 1, z:10}, {b: 2, c:3, a:55}])
 * >>> { a: 56, z: 10, b: 2, c: 3 }
 *
 * @param records {Array<{[string]: number}>}
 * @return {Array<{[string]: number}>}
 */
var sumNumericProperties = function sumNumericProperties(records /*: any*/) /*: Object*/ {
  return forceArray(records).reduce(function (a /*: Object*/, b /*: Object*/) {
    return fromPairs(mapArray(uniq(flattenDeep([keys(a), keys(b)])), function (key) {
      return [key, get(a, key, 0) + get(b, key, 0)];
    }));
  }, {});
};

/**
 * Soft version of extend. Assigns own properties
 * only if they are undefined in the original object.
 *
 * defaults({a: 1}, {a: 2})
 * // => {a: 1}
 *
 * defaults({a: 1}, {b: 2})
 * // => {a: 1, b: 2}
 *
 * @param obj
 * @param def
 * @return {*}
 */
var defaults = function defaults(obj /*: Object*/, def /*: Object*/) /*: Object*/ {
  var o = isObject(obj) ? Object.assign({}, obj) : {};
  // eslint-disable-next-line no-underscore-dangle
  var _maybeSetProp = function _maybeSetProp(val, key) {
    if (isUndefined(o[key])) {
      o[key] = val;
    }
  };
  Object.keys(isObject(def) ? def : {}).forEach(function (k) {
    return _maybeSetProp(def[k], k);
  });
  return o;
};

/**
 * Make array hash map.
 *
 * hashMap(['a', 'b'])
 * // => { a: true, b: true }
 *
 * @param valuesArray{Array<any>}
 */
var array2dict = function array2dict(valuesArray /*: Array<any>*/) /*: Object*/ {
  var result = {};
  if (isArray(valuesArray)) {
    valuesArray.forEach(function (item) {
      result[item] = true;
    });
  }
  return result;
};

/**
 * Remove from data tree keys with null, undefined and NaN values.
 *
 * @param dataTree{Array<any>|Object<any>}
 * @return {Array<any>|Object<any>}
 */
var removeNullFields = function removeNullFields(dataTree /*: Object | Array<any>*/) {
  var dataTreeInstance = JSON.parse(JSON.stringify(dataTree));
  traverse(dataTreeInstance).forEach(function (x) {
    var that = undefined;
    if (isNil(x)) {
      // $FlowFixMe
      that.delete();
    }
  });
  return dataTreeInstance;
};

module.exports = {
  keys: keys,
  backMap: backMap,
  hashMap: hashMap,
  fromPairs: fromPairs,
  array2dict: array2dict,
  sumNumericProperties: sumNumericProperties,
  defaults: defaults,
  removeNullFields: removeNullFields
};