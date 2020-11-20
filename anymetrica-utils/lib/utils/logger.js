'use strict';

/* @flow */
/**
 * @fileOverview Logging utils
 */

var _require = require('./lists'),
    forceArray = _require.forceArray;

var _require2 = require('./dataStructures'),
    defaults = _require2.defaults;

var _require3 = require('./types'),
    isArray = _require3.isArray,
    isError = _require3.isError,
    isObject = _require3.isObject,
    isString = _require3.isString;

var _require4 = require('./json'),
    toJSON = _require4.toJSON;

/**
 * @type LogFnType
 */


/**
 * @type LoggerType
 */
/*:: export type LogFnType = (...args: Array<any>) => any;*/


/**
 * @type LoggerOptionsType
 */
/*:: export type LoggerType = {
  debug: LogFnType,
  info: LogFnType,
  warn: LogFnType,
  warning: LogFnType,
  error: LogFnType,
};*/


/**
 * @type GetLoggerFnType
 */
/*:: export type LoggerOptionsType = { dst: string, infoWrite: (any) => any, errWrite: (any) => any };*/
/*:: export type GetLoggerFnType = (options: LoggerOptionsType) => LoggerType;*/


var IS_NODE = !!process.env.NODE_ENV;

/**
 * Get stream writer
 * @param stream
 * @return {function(*): *}
 */
var getWriter = function getWriter(stream) {
  return function (s) {
    return stream.write(Buffer.from(s + '\n'), 'utf8');
  };
};

/* eslint-disable no-console */
var DEFAULT_INFO_FN = IS_NODE && process.stdout ? getWriter(process.stdout) : console.info;
var DEFAULT_ERROR_FN = IS_NODE && process.stderr ? getWriter(process.stderr) : console.error;
/* eslint-enable no-console */

var format = function format() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return forceArray(args).map(
  // eslint-disable-next-line no-nested-ternary
  function (messagePart) {
    if (isString(messagePart)) {
      return messagePart;
    }
    if (isError(messagePart)) {
      return (messagePart.message + ' ' + messagePart.stack + '}').replace(/^/gm, '  ');
    }
    if (isArray(messagePart) || isObject(messagePart)) {
      return toJSON(messagePart);
    }
    return '' + messagePart;
  }).join(' ');
};

/**
 * Write info message
 *
 * @param outputFn
 * @param args {Array<any>}
 * @return {void}
 */
var _info = function _info(outputFn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var fn = outputFn || DEFAULT_ERROR_FN;
  var s = format.apply(undefined, args);
  fn(s);
  return s;
};

/**
 * Write error message
 *
 * @param outputFn
 * @param args
 * @return {void}
 */
var _error = function _error(outputFn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  var fn = outputFn || DEFAULT_ERROR_FN;
  var s = format.apply(undefined, args);
  fn(s);
  return s;
};

/**
 * Logger
 * @param options
 * @return {{warn: warn, debug: debug, warning: warning, error: _error, info: _info}}
 */
var getLogger /*: GetLoggerFnType*/ = function getLogger(options) {
  var o = defaults(options, {
    dst: null,
    infoWrite: DEFAULT_INFO_FN,
    errWrite: DEFAULT_ERROR_FN
  });
  if (o.dst && IS_NODE) {
    /* eslint-disable global-require */
    var fs = require('fs');
    var path = require('path');

    var _require5 = require('./fs'),
        mkdirpSync = _require5.mkdirpSync;

    mkdirpSync(path.dirname(path.resolve(o.dst)));
    var streamWrite = getWriter(fs.createWriteStream(path.resolve(o.dst), { flags: 'a' }));
    o = defaults({
      infoWrite: streamWrite,
      errWrite: streamWrite
    });
    /* eslint-enable global-require */
  }
  return {
    debug: function debug() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _info.apply(undefined, [o.infoWrite, 'DEBUG:'].concat(args));
    },
    info: function info() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _info.apply(undefined, [o.infoWrite, 'INFO:'].concat(args));
    },
    warn: function warn() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _error.apply(undefined, [o.errWrite, 'WARN:'].concat(args));
    },
    warning: function warning() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _error.apply(undefined, [o.errWrite, 'WARN:'].concat(args));
    },
    error: function error() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return _error.apply(undefined, [o.errWrite, 'ERROR:'].concat(args));
    }
  };
};

/**
 * Simple info function
 * @param args
 */
var info /*: LogFnType*/ = function info() {
  for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return _info.apply(undefined, [DEFAULT_INFO_FN].concat(args));
};

/**
 * Simple error function
 * @param args
 */
var error /*: LogFnType*/ = function error() {
  for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    args[_key10] = arguments[_key10];
  }

  return _error.apply(undefined, [DEFAULT_ERROR_FN].concat(args));
};

module.exports = {
  info: info,
  error: error,
  getLogger: getLogger,
  get: getLogger
};