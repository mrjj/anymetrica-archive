/* @flow */
const flattenDeep = require('lodash.flattendeep');
const get = require('lodash.get');
const mapArray = require('lodash.map');
const uniq = require('lodash.uniq');
const traverse = require('traverse');
const { isArray, isObject, isUndefined, isNil } = require('./types');
const { forceArray } = require('./lists');
/**
 * Get object keys
 * @param item
 * @return {*}
 */
const keys = (item: Object): Array<any> => (isObject(item) ? Object.keys(item) : []);

/**
 *
 * @param mapping
 */
const backMap = (mapping: Object): Object => {
  const backMapping = {};
  Object.keys(mapping).forEach((k) => {
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
const hashMap = (valuesArray: Array<any>): { string: boolean } => {
  const result = {};
  if (isArray(valuesArray)) {
    valuesArray.forEach((item) => {
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
const fromPairs = (pairsArr: Array<any>) => {
  const result = {};
  if (isArray(pairsArr)) {
    pairsArr.forEach((kv) => {
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
const sumNumericProperties = (records: any): Object => forceArray(records).reduce(
  (a: Object, b: Object) => fromPairs(mapArray(
    uniq(flattenDeep([keys(a), keys(b)])),
    key => ([
      key,
      get(a, key, 0) + get(b, key, 0),
    ]),
  )),
  {},
);

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
const defaults = (obj: Object, def: Object): Object => {
  const o = isObject(obj) ? Object.assign({}, obj) : {};
  // eslint-disable-next-line no-underscore-dangle
  const _maybeSetProp = (val, key) => {
    if (isUndefined(o[key])) {
      o[key] = val;
    }
  };
  Object.keys(isObject(def) ? def : {}).forEach(k => _maybeSetProp(def[k], k));
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
const array2dict = (valuesArray: Array<any>): Object => {
  const result = {};
  if (isArray(valuesArray)) {
    valuesArray.forEach((item) => {
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
const removeNullFields = (dataTree: Object | Array<any>) => {
  const dataTreeInstance = JSON.parse(JSON.stringify(dataTree));
  traverse(dataTreeInstance).forEach(
    (x) => {
      const that = this;
      if (isNil(x)) {
        // $FlowFixMe
        that.delete();
      }
    },
  );
  return dataTreeInstance;
};


module.exports = {
  keys,
  backMap,
  hashMap,
  fromPairs,
  array2dict,
  sumNumericProperties,
  defaults,
  removeNullFields,
};
