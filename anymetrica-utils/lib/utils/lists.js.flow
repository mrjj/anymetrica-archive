/* @flow */
const compact = require('lodash.compact');
const uniq = require('lodash.uniq');
const { isArray, isNil } = require('./types');


/**
 * Convert object to single element array, null, undefined and other
 * false-casting els to the empty array and leave arrays intact.
 *
 * @param val {any} - any value
 * @returns {any}
 */
const forceArray = (val: any): Array<any> => {
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
const any = (arr: Array<any>) => forceArray(arr).reduce((a, o) => a || o, false);

/**
 * All values is true
 * @param arr
 * @return {boolean}
 */
const all = (arr: Array<any>) => forceArray(arr).reduce((a, o) => a && o, false);

/**
 * forceArray->Unique->Compact->Sort (AUCS) casting to array form
 * @return {*}
 * @param arr
 */
const aucs = (arr: Array<any>): Array<any> => uniq(compact(forceArray(arr))).sort();

/**
 * First element
 *
 * @param item
 * @return {null}
 */
const first = (item: Array<any>): any => {
  const arr = forceArray(item);
  return (arr.length > 0) ? arr[0] : null;
};

/**
 * Last element
 *
 * @param item
 * @return {null}
 */
const last = (item: Array<any>): any => {
  const arr = forceArray(item);
  const l = arr.length;
  return (l > 0) ? arr[l - 1] : null;
};


module.exports = {
  all,
  any,
  aucs,
  first,
  forceArray,
  last,
};
