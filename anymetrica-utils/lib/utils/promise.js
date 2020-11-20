"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */

/**
 * Chains functions returning promises
 *
 * @param functionsReturningPromise - list of functions returning promise
 * @param defaultData
 * @returns {Promise.<any>}
 */
// eslint-disable-next-line
var _chainPromises = function _chainPromises(functionsReturningPromise, defaultData) {
  return new Promise(function (resolve, reject) {
    var p = Promise.resolve(defaultData);
    functionsReturningPromise.forEach(function (func) {
      p = p.then(func, reject);
      return p;
    });
    p.then(resolve, reject);
  });
};

/**
 * Mapper + promise chain
 *
 * @example: Sleep down with increasing delays of naps
 *
 * await cpMap(
 *   [1, 2, 4, 8],
 *   (delaySec) => new Promise((resolve) => {
 *     setTimeout(resolve, delaySec * 1000);
 *   })
 * );
 *
 * console.warning('A? Chto?! Skolko vremeni?');
 *
 * Underscore/LoDash performance note:
 *
 * Underscore is used for execution performance optimisation.
 * https://jsperf.com/native-map-vs-lodash-map
 * Under the hood _ iteration tools gives 1. own properties check skip
 * But addin extra fn lookup constant delay that would be picked up
 * by V8 depending on step execution behaviour.
 * https://www.youtube.com/watch?v=cD9utLH3QOk
 *
 * @param values - array of values
 * @param fn - function returning promises
 * @returns {Promise<Array>}
 */
var promiseMap = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(values /*: Array<any>*/, fn /*: (val: any, idx?: ?number) => any*/) {
    var results;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            results = [];
            _context2.next = 3;
            return _chainPromises(values.map(function (value, idx) {
              return function (v) {
                return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                  var res;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return fn(v, idx);

                        case 2:
                          res = _context.sent;

                          results.push(res);
                          return _context.abrupt("return", res);

                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));
              }(value);
            }));

          case 3:
            return _context2.abrupt("return", results);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function promiseMap(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Wait some time (ms)
 *
 * @param timeMs
 * @return {Promise<*>}
 */
var wait /*: (timeMs: number) => Promise<void>*/ = function wait(timeMs) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, timeMs);
  });
};

// noinspection JSUnusedGlobalSymbols
module.exports = {
  promiseMap: promiseMap,
  wait: wait
};