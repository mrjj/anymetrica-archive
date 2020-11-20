'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */
var cloneDeep = require('lodash.clonedeep');
var forEach = require('lodash.foreach');
var range = require('lodash.range');

var _require = require('./types'),
    isArray = _require.isArray,
    isFunction = _require.isFunction,
    isObject = _require.isObject,
    isString = _require.isString;

var _require2 = require('./checks'),
    isEmpty = _require2.isEmpty;

var _require3 = require('./dataStructures'),
    keys = _require3.keys;

var _require4 = require('./promise'),
    promiseMap = _require4.promiseMap;

/*:: export type VisitFnType = (
  dataNode: any,
  key: ?any,
  parent: ?Array<any> | Object,
)=> any;*/


/**
 * Apply given function to all data tree (list/dict or JSON) nodes.
 *
 * @param dataTree - data tree (list/dict or JSON)
 * @param pre {VisitFnType} - function returning new node value
 * @param post {VisitFnType} - function returning new node value
 * @returns {any} - new data tree matching input type
 */
/*:: export type AsyncVisitFnType = (
  dataNode: any,
  key: ?any,
  parent: ?Array<any> | Object,
)=> Promise<any>;*/
var visitorSync = function visitorSync(dataTree /*: any*/) /*: any*/ {
  var pre /*:: ?: VisitFnType*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return cloneDeep(x);
  };
  var post /*:: ?: VisitFnType*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (x) {
    return x;
  };

  if (!(isFunction(post) || isFunction(post))) {
    return cloneDeep(dataTree);
  }
  var visit = function visit(node /*: any*/, parent) /*: any*/ {
    if (!isEmpty(node) && (isArray(node) || isObject(node))) {
      var l = node.length;
      var target = Array.isArray(node) ? Array(l) : {};
      var ks = Array.isArray(node) ? range(l) : Object.keys(node).sort();
      forEach(ks, function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(k /*: any*/) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  target[k] = post(visit(pre(node[k], k, node), node), k, node);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }());
      return target;
    }
    return post(pre(node, null, parent), null, parent);
  };
  return post(visit(pre(dataTree, null, null), null), null);
};

/**
 * Apply given function to all data tree (list/dict or JSON) nodes.
 *
 * @param dataTree - data tree (list/dict or JSON)
 * @param pre {AsyncVisitFnType} - function returning new node value
 * @param post {AsyncVisitFnType} - function returning new node value
 * @returns {any} - new data tree matching input type
 */
var visitorAsync = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dataTree /*: any*/) /*: Promise<any>*/ {
    var pre /*:: ?: AsyncVisitFnType*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(x) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', cloneDeep(x));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x7) {
        return _ref3.apply(this, arguments);
      };
    }();
    var post /*:: ?: AsyncVisitFnType*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(x) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', x);

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x8) {
        return _ref4.apply(this, arguments);
      };
    }();
    var visit;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (isFunction(post) || isFunction(post)) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return', cloneDeep(dataTree));

          case 2:
            visit = function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(node /*: any*/, parent) /*: Promise<any>*/ {
                var l, target, ks;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!(!isEmpty(node) && (isArray(node) || isObject(node)))) {
                          _context5.next = 7;
                          break;
                        }

                        l = node.length;
                        target = isArray(node) ? Array(l) : {};
                        ks = Array.isArray(node) ? range(l) : Object.keys(node).sort();
                        _context5.next = 6;
                        return promiseMap(ks, function () {
                          var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(k /*: any*/) {
                            return _regenerator2.default.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    _context4.t0 = post;
                                    _context4.t1 = visit;
                                    _context4.next = 4;
                                    return pre(node[k], k, node);

                                  case 4:
                                    _context4.t2 = _context4.sent;
                                    _context4.t3 = node;
                                    _context4.next = 8;
                                    return (0, _context4.t1)(_context4.t2, _context4.t3);

                                  case 8:
                                    _context4.t4 = _context4.sent;
                                    _context4.t5 = k;
                                    _context4.t6 = node;
                                    _context4.next = 13;
                                    return (0, _context4.t0)(_context4.t4, _context4.t5, _context4.t6);

                                  case 13:
                                    target[k] = _context4.sent;

                                  case 14:
                                  case 'end':
                                    return _context4.stop();
                                }
                              }
                            }, _callee4, undefined);
                          }));

                          return function (_x11) {
                            return _ref6.apply(this, arguments);
                          };
                        }());

                      case 6:
                        return _context5.abrupt('return', target);

                      case 7:
                        return _context5.abrupt('return', post(pre(node, null, parent), null, parent));

                      case 8:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function visit(_x9, _x10) {
                return _ref5.apply(this, arguments);
              };
            }();

            _context6.t0 = post;
            _context6.t1 = visit;
            _context6.next = 7;
            return pre(dataTree, null, null);

          case 7:
            _context6.t2 = _context6.sent;
            _context6.next = 10;
            return (0, _context6.t1)(_context6.t2, null);

          case 10:
            _context6.t3 = _context6.sent;
            return _context6.abrupt('return', (0, _context6.t0)(_context6.t3, null));

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function visitorAsync(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Preview JSON doing truncate of too long strings
 *
 * @param dataTree {*}
 * @param maxLength {number}
 * @returns {*}
 */
var previewJSON = function previewJSON(dataTree /*: any*/) /*: any*/ {
  var maxLength /*: number*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
  return visitorSync(dataTree, undefined, function (dataNode) {
    var isBigObj = isObject(dataNode) && keys(dataNode).length > maxLength;
    var isBigStr = isString(dataNode) && dataNode.length > maxLength;
    var isBigArrayBuffer = Buffer.isBuffer(dataNode);
    if (isBigArrayBuffer) {
      return '<TRUNCATED><Buffer(' + dataNode.byteLength + ')>';
    }
    if (isBigObj) {
      return '<TRUNCATED><object(' + Object.keys(dataNode).length + ')>';
    }
    if (isBigStr) {
      var tag = '<TRUNCATED><String(' + dataNode.length + ')>';
      var len = Math.max(maxLength - tag.length, 0);
      return '' + dataNode.slice(0, len) + tag;
    }
    return dataNode;
  });
};

module.exports = {
  previewJSON: previewJSON,
  visitor: visitorSync,
  visitorAsync: visitorAsync,
  visitorSync: visitorSync
};