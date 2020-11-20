/* @flow */

/**
 * Check if item os null or undefined or NaN
 * @param item
 * @return {boolean}
 */
const isNil = (item: any) => (item == null);

/**
 * @fileOverview Type checking
 */

/**
 * Check if item is Array.
 *
 * @param item
 * @return {boolean}
 */
const isArray = (item: any) => (
  item && (Array.isArray(item) || Object.prototype.toString.call(item) === '[object Array]')
);

/**
 * Check if item Error or Error-like.
 *
 * @param item
 * @return {boolean}
 */
const isError = (item: any) => (
  ((item instanceof Error) || (item && item.stack && item.message))
);

/**
 * Check if item is Object
 * @param item
 * @return {boolean}
 */
const isObject = (item: any) => {
  const type = typeof item;
  return item != null && (type === 'object' || type === 'function');
};

/**
 * Check if item is string.
 *
 * @param item
 * @return {boolean}
 */
const isString = (item: any) => (typeof item === 'string');

/**
 * Check if item is function.
 * @param item
 * @return {boolean}
 */
const isFunction = (item: any) => (typeof item === 'function');

/**
 * Check if item is number.
 * @param item
 * @return {boolean}
 */
const isNumber = (item: any) => (typeof item === 'number');

/**
 * Check if item is number.
 * @param item
 * @return {boolean}
 */
const isBoolean = (item: any) => (typeof item === 'boolean');

/**
 * Check if item is undefined.
 * @param item
 * @return {boolean}
 */
const isUndefined = (item: any) => (typeof item === 'undefined');

module.exports = {
  isArray,
  isBoolean,
  isError,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isString,
  isUndefined,
};
