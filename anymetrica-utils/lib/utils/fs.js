'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var _require = require('./lists'),
    forceArray = _require.forceArray;

/**
 * Recursively remove directory like `rm -rf`
 * Taken from: https://stackoverflow.com/a/32197381
 * @param dirPath {string} - path to remove
 */


var rmrf = function rmrf(dirPath /*: string*/) {
  if (fs.existsSync(dirPath)) {
    if (fs.statSync(dirPath).isDirectory()) {
      fs.readdirSync(dirPath).forEach(function (file) {
        var curPath = dirPath + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          rmrf(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(dirPath);
    } else {
      fs.unlinkSync(dirPath);
    }
  }
};
var mkdirpAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dir /*: string*/) {
    var recreate /*: boolean*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (dir) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', null);

          case 2:
            if (recreate && fs.existsSync(dir)) {
              rmrf(dir);
            }
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              mkdirp(dir, function (err, res) {
                if (err) {
                  reject(err);
                } else {
                  resolve(res);
                }
              });
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function mkdirpAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();
var mkdirpSync = function mkdirpSync(dir /*: string*/) {
  var recreate /*: boolean*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!dir) {
    return null;
  }
  if (recreate && fs.existsSync(dir)) {
    rmrf(dir);
  }
  return mkdirp.sync(dir);
};

/**
 * > getCommonPathsRoot(['d/aaaa', 'd/zzz/z', 'd'])  # will produce 'd'
 * @return {*}
 * @param pathsOrPath
 */
var getCommonPathsRoot = function getCommonPathsRoot(pathsOrPath /*: string | Array<string>*/) /*: string*/ {
  var paths /*: Array<string>*/ = forceArray(pathsOrPath).map(function (p) {
    return path.resolve(p);
  });
  return paths.reduce(function (shortestFound /*: string*/, p /*: string*/) /*: string*/ {
    return p.startsWith(shortestFound) ? shortestFound : p.split(path.sep).filter(function (c, cIdx) {
      return c === shortestFound[cIdx];
    }).join(path.sep);
  }, paths[0]);
};

/**
 * Gets all files paths.
 * Taken from: https://gist.github.com/kethinov/6658166#gistcomment-2774154
 * @param baseDir
 * @param subdirs
 * @return {Array}
 */
var walkSync = function walkSync(baseDir /*: string*/) /*: Array<string>*/ {
  var subdirs /*: string*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!subdirs && !fs.existsSync(baseDir)) {
    // Nothing to catch here
    return [];
  }
  var files = [];
  try {
    var newFiles = fs.readdirSync(path.join(baseDir, subdirs));
    // eslint-disable-next-line no-restricted-syntax
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = newFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var file = _step.value;

        var dirOrFile = [subdirs, file].filter(function (x) {
          return !!x;
        }).join(path.sep);
        var p = path.join(baseDir, dirOrFile);
        if (fs.existsSync(p)) {
          if (fs.statSync(p).isDirectory()) {
            walkSync(baseDir, dirOrFile).forEach(function (f) {
              return files.push(f);
            });
          } else if (fs.statSync(p).isFile()) {
            files.push(dirOrFile);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } catch (e) {
    process.stderr.write(e.toString() + '\n');
  }
  return files;
};

module.exports = {
  rmrf: rmrf,
  mkdirpSync: mkdirpSync,
  mkdirpAsync: mkdirpAsync,
  getCommonPathsRoot: getCommonPathsRoot,
  walkSync: walkSync
};