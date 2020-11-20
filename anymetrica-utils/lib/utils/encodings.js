'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */

var path = require('path');
var fs = require('fs');

var _require = require('./fs'),
    mkdirpAsync = _require.mkdirpAsync;

var _require2 = require('./cli'),
    callConsole = _require2.callConsole;

var _require3 = require('./promise'),
    promiseMap = _require3.promiseMap;

/**
 * iconv shell command
 * @constant ICONV_CMD
 */


var ICONV_CMD = 'iconv';

/**
 * Convert encoding.
 *
 * @param folderFrom {string} - path from
 * @param encodingFrom {string} - encoding from, default: "Windows-1251"
 * @param folderTo {string} - path to
 * @param encodingTo {string} - encoding to, default: "ASCII//TRANSLIT" (other option: "utf-8")
 * @return {Promise<Array<any>>}
 */
var batchFileIconv = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(folderFrom /*: string*/, folderTo /*: string*/) {
    var encodingFrom /*: string*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Windows-1251';
    var encodingTo /*: string*/ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ASCII//TRANSLIT';
    var files;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            files = fs.readdirSync(folderFrom);
            return _context2.abrupt('return', promiseMap(files, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileNameFrom) {
                var filePathFrom, filePathTo;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        filePathFrom = path.join(folderFrom, fileNameFrom);
                        filePathTo = path.join(folderTo, fileNameFrom);
                        _context.next = 4;
                        return mkdirpAsync(folderTo);

                      case 4:
                        _context.next = 6;
                        return callConsole(ICONV_CMD + ' -f ' + encodingFrom + ' -t ' + encodingTo + ' ' + filePathFrom + ' > ' + filePathTo);

                      case 6:
                        return _context.abrupt('return', filePathTo);

                      case 7:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function batchFileIconv(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// noinspection JSUnusedGlobalSymbols
module.exports = { batchFileIconv: batchFileIconv };