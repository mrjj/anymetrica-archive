"use strict";

var _arguments = arguments;
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
var between = function between(a, x, b) {
  return Math.min(Math.max(x, a || -Infinity), b || Infinity);
};

/**
 * Range
 * Taken from: https://github.com/micro-js/range/blob/master/lib/index.js
 */
var range = function range(begin, end, step) {
  var i = void 0;
  // eslint-disable-next-line no-undef
  if (_arguments.length === 1) {
    end = begin;
    begin = 0;
  }
  // eslint-disable-next-line no-undef
  if (_arguments.length < 3) {
    step = 1;
  }
  var result = [];
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
  between: between,
  range: range
};