/* @flow */
const { isArray, isObject, isString, isNil } = require('./types');

const isEmpty = (item: any): boolean => {
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

module.exports = { isEmpty };
