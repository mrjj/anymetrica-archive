'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */
var execa = require('execa');

var _require = require('./logger'),
    error = _require.error,
    info = _require.info;

/**
 * Call console command
 * @param cmd {string} - shell command
 * @return {Promise<void>}
 */


var callConsole = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cmd /*: string*/) {
    var resultSkipGramms;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            info('$', cmd);
            _context.prev = 1;
            _context.next = 4;
            return execa.shell(cmd);

          case 4:
            resultSkipGramms = _context.sent;

            if (resultSkipGramms.stderr) {
              error('stderr\n' + resultSkipGramms.stderr);
            }
            if (resultSkipGramms.stdout) {
              info(resultSkipGramms.stdout);
            }
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);

            error(_context.t0);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function callConsole(_x) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = { callConsole: callConsole };