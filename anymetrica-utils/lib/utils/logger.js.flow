/* @flow */
/**
 * @fileOverview Logging utils
 */

const { forceArray } = require('./lists');
const { defaults } = require('./dataStructures');
const { isArray, isError, isObject, isString } = require('./types');
const { toJSON } = require('./json');

/**
 * @type LogFnType
 */
export type LogFnType = (...args: Array<any>) => any;

/**
 * @type LoggerType
 */
export type LoggerType = {
  debug: LogFnType,
  info: LogFnType,
  warn: LogFnType,
  warning: LogFnType,
  error: LogFnType,
};

/**
 * @type LoggerOptionsType
 */
export type LoggerOptionsType = { dst: string, infoWrite: (any) => any, errWrite: (any) => any };

/**
 * @type GetLoggerFnType
 */
export type GetLoggerFnType = (options: LoggerOptionsType) => LoggerType;

const IS_NODE = !!process.env.NODE_ENV;

/**
 * Get stream writer
 * @param stream
 * @return {function(*): *}
 */
const getWriter = stream => s => stream.write(Buffer.from(`${s}\n`), 'utf8');

/* eslint-disable no-console */
const DEFAULT_INFO_FN = (IS_NODE && process.stdout) ? getWriter(process.stdout) : console.info;
const DEFAULT_ERROR_FN = (IS_NODE && process.stderr) ? getWriter(process.stderr) : console.error;
/* eslint-enable no-console */

const format = (...args) => forceArray(args).map(
  // eslint-disable-next-line no-nested-ternary
  (messagePart) => {
    if (isString(messagePart)) {
      return messagePart;
    }
    if (isError(messagePart)) {
      return `${messagePart.message} ${messagePart.stack}}`.replace(/^/gm, '  ');
    }
    if (isArray(messagePart) || isObject(messagePart)) {
      return toJSON(messagePart);
    }
    return `${messagePart}`;
  },
).join(' ');

/**
 * Write info message
 *
 * @param outputFn
 * @param args {Array<any>}
 * @return {void}
 */
const _info = (outputFn, ...args) => {
  const fn = (outputFn || DEFAULT_ERROR_FN);
  const s = format(...args);
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
const _error = (outputFn, ...args) => {
  const fn = (outputFn || DEFAULT_ERROR_FN);
  const s = format(...args);
  fn(s);
  return s;
};

/**
 * Logger
 * @param options
 * @return {{warn: warn, debug: debug, warning: warning, error: _error, info: _info}}
 */
const getLogger: GetLoggerFnType = (options) => {
  let o = defaults(
    options,
    {
      dst: null,
      infoWrite: DEFAULT_INFO_FN,
      errWrite: DEFAULT_ERROR_FN,
    },
  );
  if (o.dst && IS_NODE) {
    /* eslint-disable global-require */
    const fs = require('fs');
    const path = require('path');
    const { mkdirpSync } = require('./fs');
    mkdirpSync(path.dirname(path.resolve(o.dst)));
    const streamWrite = getWriter(fs.createWriteStream(path.resolve(o.dst), { flags: 'a' }));
    o = defaults({
      infoWrite: streamWrite,
      errWrite: streamWrite,
    });
    /* eslint-enable global-require */
  }
  return {
    debug: (...args) => _info(o.infoWrite, 'DEBUG:', ...args),
    info: (...args) => _info(o.infoWrite, 'INFO:', ...args),
    warn: (...args) => _error(o.errWrite, 'WARN:', ...args),
    warning: (...args) => _error(o.errWrite, 'WARN:', ...args),
    error: (...args) => _error(o.errWrite, 'ERROR:', ...args),
  };
};

/**
 * Simple info function
 * @param args
 */
const info: LogFnType = (...args) => _info(DEFAULT_INFO_FN, ...args);


/**
 * Simple error function
 * @param args
 */
const error: LogFnType = (...args) => _error(DEFAULT_ERROR_FN, ...args);

module.exports = {
  info,
  error,
  getLogger,
  get: getLogger,
};
