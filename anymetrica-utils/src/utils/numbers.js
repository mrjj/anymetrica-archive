/* flow */

/**
 * @fileOverview numeric utils
 */

/**
 * Force value to be between
 * @param a - lower
 * @param x - value
 * @param b - upper
 * @return {number}
 */
const between = (a, x, b) => Math.min(Math.max(x, a || (-Infinity)), b || Infinity);

/**
 * Range
 * Taken from: https://github.com/micro-js/range/blob/master/lib/index.js
 */
const range = (begin, end, step) => {
  let i;
  // eslint-disable-next-line no-undef
  if (arguments.length === 1) {
    end = begin;
    begin = 0;
  }
  // eslint-disable-next-line no-undef
  if (arguments.length < 3) {
    step = 1;
  }
  const result = [];
  if (step > 0) {
    for (i = begin; i < end; i += step) {
      result.push(i);
    }
  } else {
    // eslint-disable-next-line for-direction
    for (i = begin; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};

module.exports = {
  between,
  range,
};
