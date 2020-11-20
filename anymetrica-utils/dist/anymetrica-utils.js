(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AnymetricaUtils"] = factory();
	else
		root["AnymetricaUtils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*       */

/**
 * Check if item os null or undefined or NaN
 * @param item
 * @return {boolean}
 */
const isNil = (item     ) => (item == null);

/**
 * @fileOverview Type checking
 */

/**
 * Check if item is Array.
 *
 * @param item
 * @return {boolean}
 */
const isArray = (item     ) => (
  item && (Array.isArray(item) || Object.prototype.toString.call(item) === '[object Array]')
);

/**
 * Check if item Error or Error-like.
 *
 * @param item
 * @return {boolean}
 */
const isError = (item     ) => (
  ((item instanceof Error) || (item && item.stack && item.message))
);

/**
 * Check if item is Object
 * @param item
 * @return {boolean}
 */
const isObject = (item     ) => {
  const type = typeof item;
  return item != null && (type === 'object' || type === 'function');
};

/**
 * Check if item is string.
 *
 * @param item
 * @return {boolean}
 */
const isString = (item     ) => (typeof item === 'string');

/**
 * Check if item is function.
 * @param item
 * @return {boolean}
 */
const isFunction = (item     ) => (typeof item === 'function');

/**
 * Check if item is number.
 * @param item
 * @return {boolean}
 */
const isNumber = (item     ) => (typeof item === 'number');

/**
 * Check if item is number.
 * @param item
 * @return {boolean}
 */
const isBoolean = (item     ) => (typeof item === 'boolean');

/**
 * Check if item is undefined.
 * @param item
 * @return {boolean}
 */
const isUndefined = (item     ) => (typeof item === 'undefined');

module.exports = {
  isArray,
  isBoolean,
  isError,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isString,
  isUndefined,
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const compact = __webpack_require__(11);
const uniq = __webpack_require__(4);
const { isArray, isNil } = __webpack_require__(1);


/**
 * Convert object to single element array, null, undefined and other
 * false-casting els to the empty array and leave arrays intact.
 *
 * @param val {any} - any value
 * @returns {any}
 */
const forceArray = (val     )             => {
  if (isNil(val)) {
    return [];
  }
  return isArray(val) ? val : [val];
};

/**
 * Any of values is true
 * @param arr
 * @return {boolean}
 */
const any = (arr            ) => forceArray(arr).reduce((a, o) => a || o, false);

/**
 * All values is true
 * @param arr
 * @return {boolean}
 */
const all = (arr            ) => forceArray(arr).reduce((a, o) => a && o, false);

/**
 * forceArray->Unique->Compact->Sort (AUCS) casting to array form
 * @return {*}
 * @param arr
 */
const aucs = (arr            )             => uniq(compact(forceArray(arr))).sort();

/**
 * First element
 *
 * @param item
 * @return {null}
 */
const first = (item            )      => {
  const arr = forceArray(item);
  return (arr.length > 0) ? arr[0] : null;
};

/**
 * Last element
 *
 * @param item
 * @return {null}
 */
const last = (item            )      => {
  const arr = forceArray(item);
  const l = arr.length;
  return (l > 0) ? arr[l - 1] : null;
};


module.exports = {
  all,
  any,
  aucs,
  first,
  forceArray,
  last,
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const flattenDeep = __webpack_require__(8);
const get = __webpack_require__(9);
const mapArray = __webpack_require__(10);
const uniq = __webpack_require__(4);
const traverse = __webpack_require__(25);
const { isArray, isObject, isUndefined, isNil } = __webpack_require__(1);
const { forceArray } = __webpack_require__(2);
/**
 * Get object keys
 * @param item
 * @return {*}
 */
const keys = (item        )             => (isObject(item) ? Object.keys(item) : []);

/**
 *
 * @param mapping
 */
const backMap = (mapping        )         => {
  const backMapping = {};
  Object.keys(mapping).forEach((k) => {
    backMapping[mapping[k]] = k;
  });
  return backMapping;
};

/**
 * Make array hash map.
 *
 * hashMap(['a', 'b'])
 * // => { a: true, b: true }
 *
 * @param valuesArray{Array<any>}
 */
const hashMap = (valuesArray            )                      => {
  const result = {};
  if (isArray(valuesArray)) {
    valuesArray.forEach((item) => {
      result[item] = true;
    });
  }
  return result;
};

/**
 * Make object from pairs.
 *
 * fromPairs([ ['a', 'AA'], ['b', 'BB'] })
 * // => { a: 'AA', b: 'BB' }
 *
 * @param pairsArr
 */
const fromPairs = (pairsArr            ) => {
  const result = {};
  if (isArray(pairsArr)) {
    pairsArr.forEach((kv) => {
      if (isArray(kv) && kv.length >= 2) {
        result[kv[0]] = result[kv[1]];
      }
    });
  }
  return result;
};

/**
 * Sum numeric properties of objects.
 *
 * @example
 * sumNumericProperties([{a: 1, z:10}, {b: 2, c:3, a:55}])
 * >>> { a: 56, z: 10, b: 2, c: 3 }
 *
 * @param records {Array<{[string]: number}>}
 * @return {Array<{[string]: number}>}
 */
const sumNumericProperties = (records     )         => forceArray(records).reduce(
  (a        , b        ) => fromPairs(mapArray(
    uniq(flattenDeep([keys(a), keys(b)])),
    key => ([
      key,
      get(a, key, 0) + get(b, key, 0),
    ]),
  )),
  {},
);

/**
 * Soft version of extend. Assigns own properties
 * only if they are undefined in the original object.
 *
 * defaults({a: 1}, {a: 2})
 * // => {a: 1}
 *
 * defaults({a: 1}, {b: 2})
 * // => {a: 1, b: 2}
 *
 * @param obj
 * @param def
 * @return {*}
 */
const defaults = (obj        , def        )         => {
  const o = isObject(obj) ? Object.assign({}, obj) : {};
  // eslint-disable-next-line no-underscore-dangle
  const _maybeSetProp = (val, key) => {
    if (isUndefined(o[key])) {
      o[key] = val;
    }
  };
  Object.keys(isObject(def) ? def : {}).forEach(k => _maybeSetProp(def[k], k));
  return o;
};

/**
 * Make array hash map.
 *
 * hashMap(['a', 'b'])
 * // => { a: true, b: true }
 *
 * @param valuesArray{Array<any>}
 */
const array2dict = (valuesArray            )         => {
  const result = {};
  if (isArray(valuesArray)) {
    valuesArray.forEach((item) => {
      result[item] = true;
    });
  }
  return result;
};


/**
 * Remove from data tree keys with null, undefined and NaN values.
 *
 * @param dataTree{Array<any>|Object<any>}
 * @return {Array<any>|Object<any>}
 */
const removeNullFields = (dataTree                     ) => {
  const dataTreeInstance = JSON.parse(JSON.stringify(dataTree));
  traverse(dataTreeInstance).forEach(
    (x) => {
      const that = this;
      if (isNil(x)) {
        // $FlowFixMe
        that.delete();
      }
    },
  );
  return dataTreeInstance;
};


module.exports = {
  keys,
  backMap,
  hashMap,
  fromPairs,
  array2dict,
  sumNumericProperties,
  defaults,
  removeNullFields,
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash.uniq");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const { isArray, isObject, isString, isNil } = __webpack_require__(1);

const isEmpty = (item     )          => {
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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("lodash.foreach");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("lodash.flattendeep");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("lodash.get");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("lodash.map");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("lodash.compact");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const JsonStringifySafe = __webpack_require__(28);
const ParseJson = __webpack_require__(29);

module.exports = {
  toJSON: JsonStringifySafe,
  fromJSON: ParseJson,
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, process) {/*       */
/**
 * @fileOverview Logging utils
 */

const { forceArray } = __webpack_require__(2);
const { defaults } = __webpack_require__(3);
const { isArray, isError, isObject, isString } = __webpack_require__(1);
const { toJSON } = __webpack_require__(12);

/**
 * @type LogFnType
 */
                                                     

/**
 * @type LoggerType
 */
                          
                   
                  
                  
                     
                   
  

/**
 * @type LoggerOptionsType
 */
                                                                                                 

/**
 * @type GetLoggerFnType
 */
                                                                         

const IS_NODE = !!"production";

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
const getLogger                  = (options) => {
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
    const fs = __webpack_require__(0);
    const path = __webpack_require__(0);
    const { mkdirpSync } = __webpack_require__(37);
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
const info            = (...args) => _info(DEFAULT_INFO_FN, ...args);


/**
 * Simple error function
 * @param args
 */
const error            = (...args) => _error(DEFAULT_ERROR_FN, ...args);

module.exports = {
  info,
  error,
  getLogger,
  get: getLogger,
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15).Buffer, __webpack_require__(6)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(34)
var ieee754 = __webpack_require__(35)
var isArray = __webpack_require__(36)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(33)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*       */

/**
 * Chains functions returning promises
 *
 * @param functionsReturningPromise - list of functions returning promise
 * @param defaultData
 * @returns {Promise.<any>}
 */
// eslint-disable-next-line
const _chainPromises = (
  functionsReturningPromise,
  defaultData,
) => new Promise((resolve, reject) => {
  let p = Promise.resolve(defaultData);
  functionsReturningPromise.forEach((func) => {
    p = p.then(func, reject);
    return p;
  });
  p.then(resolve, reject);
});

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
const promiseMap = async (values            , fn                                  ) => {
  const results = [];
  await _chainPromises(
    values.map(
      (value, idx) => (v => async () => {
        const res = await fn(v, idx);
        results.push(res);
        return res;
      })(value),
    ),
  );
  return results;
};

/**
 * Wait some time (ms)
 *
 * @param timeMs
 * @return {Promise<*>}
 */
const wait                                    = timeMs =>
  new Promise(resolve => setTimeout(resolve, timeMs));

// noinspection JSUnusedGlobalSymbols
module.exports = {
  promiseMap,
  wait,
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash.clonedeep");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash.includes");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("lodash.omit");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("lodash.pick");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
module.exports = __webpack_require__(24);


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable global-require */

/**
 * @fileOverview Main common entry point
 */
module.exports = {
  ...(__webpack_require__(5)),
  ...(__webpack_require__(3)),
  ...(__webpack_require__(26)),
  ...(__webpack_require__(27)),
  ...(__webpack_require__(12)),
  ...(__webpack_require__(30)),
  ...(__webpack_require__(31)),
  ...(__webpack_require__(2)),
  ...(__webpack_require__(32)),
  ...(__webpack_require__(14)),
  ...(__webpack_require__(39)),
  ...(__webpack_require__(16)),
  ...(__webpack_require__(40)),
  ...(__webpack_require__(41)),
  ...(__webpack_require__(1)),
  ...(__webpack_require__(42)),
  ...(__webpack_require__(44)),

  // Third parties

  // lodash
  clone: __webpack_require__(46),
  cloneDeep: __webpack_require__(18),
  compact: __webpack_require__(11),
  contains: __webpack_require__(19),
  defaults: __webpack_require__(47),
  difference: __webpack_require__(48),
  each: __webpack_require__(7),
  flatten: __webpack_require__(49),
  flattenDeep: __webpack_require__(8),
  forEach: __webpack_require__(7),
  fromPairs: __webpack_require__(50),
  get: __webpack_require__(9),
  includes: __webpack_require__(19),
  intersection: __webpack_require__(51),
  map: __webpack_require__(10),
  omit: __webpack_require__(20),
  omitBy: __webpack_require__(20),
  pick: __webpack_require__(21),
  pickBy: __webpack_require__(21),
  set: __webpack_require__(52),
  slice: __webpack_require__(53),
  sortBy: __webpack_require__(54),
  union: __webpack_require__(55),
  uniq: __webpack_require__(4),
  unique: __webpack_require__(4),

  // moment
  moment: __webpack_require__(17),

  // js-yaml
  yaml: __webpack_require__(13),
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("traverse");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*       */

const fs = __webpack_require__(0);
const path = __webpack_require__(0);

/**
 * Get git revision for git repo folder
 * @param projectDir {string}
 * @return {string|null}
 */

// $FlowFixMe
const getRevision = (projectDir) => {
  const gitDir = path.join(path.resolve(projectDir || '.'), '.git');
  const headFile = path.join(gitDir, 'HEAD');
  if (fs.existsSync(headFile)) {
    const rev = fs.readFileSync(headFile).toString().split('\n')[0];
    if (rev && (rev.indexOf(':') === -1)) {
      return rev;
    }
    const revFile = path.join(gitDir, rev.substring(5));
    if (fs.existsSync(revFile)) {
      return fs.readFileSync(revFile).toString() || null;
    }
  }
  return null;
};

module.exports = {
  getRevision,
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const { isEmpty } = __webpack_require__(5);

const toposort = (
  tasksToSort            ,
  cachedTasksMap        ,
  getUpstream                  = task => task.input(),
) => {
  const lookupById = cachedTasksMap || {};
  tasksToSort.forEach((t     ) => {
    lookupById[t.id] = t;
  });
  const topologicalSortHelper = (task, visited, temp, tts            , result) => {
    temp[task.id] = true;
    getUpstream(task).forEach((upstreamId) => {
      if (temp[upstreamId] === true) {
        throw new Error('The graph is not a DAG');
      }
      if (visited[upstreamId] !== true) {
        topologicalSortHelper(lookupById[upstreamId], visited, temp, tts, result);
      }
    });
    temp[task.id] = false;
    visited[task.id] = true;
    task.topoOrder = result.length;
    result.push(task);
  };
  const totalResult = [];
  const visited = [];
  const temp = [];
  tasksToSort.forEach((task) => {
    if (!visited[task.id] && !temp[task.id]) {
      topologicalSortHelper(task, visited, temp, tasksToSort, totalResult);
    }
  });
  return totalResult;
};
                                                              

/**
 * Input:
 *
 * @example:
 * result = {
 *   titles: ['a', 'b', ...],
 *   rowKeys: ['a', 'b', ...],
 *   dataArray: resultArray: [1,2,....,4,5,....],
 * }
 *
 * @param matrixData
 * @return {{nodes: *, links: Array, nodesDict}}
 */
const matrixToGraph = (matrixData             ) => {
  const links = [];
  const { rows, titles } = matrixData;
  const nodesDict = {};
  if (isEmpty(titles)) {
    return {
      nodes: [],
      links,
      nodesDict,
    };
  }
  const nodes         
               
                  
                 
     = matrixData.titles.map(
    (agentName        , i        ) => {
      const id = i + 1;
      nodesDict[agentName] = id;
      return {
        id,
        agent: agentName,
        value: 1,
      };
    },
  );
  rows.forEach(
    (row, rowIdx) => {
      const agentAName = titles[rowIdx];
      row.elements.forEach(
        (col, colIdx) => {
          if (rowIdx < colIdx) {
            const weight = parseFloat(col) || 0.0;
            const agentBName = titles[colIdx];
            links.push({
              source: nodesDict[agentAName],
              target: nodesDict[agentBName],
              weight,
            });
          }
        },
      );
    },
  );
  return {
    nodes,
    links,
    nodesDict,
  };
};
// var fillMissingTasksPositions = function (tasks, processedTasksDict, minTimeMs, maxTimeMs) {
//   // Defining position for tasks without time
//   var rMaxTimelessTasksChain = 0;
//   return tasks.map(function (task) {
//     if (task.start === 'number' && typeof task.end === 'number') {
//       return task;
//     }
//     if (task.status === TASK_STATUS_PENDING || task.status === TASK_STATUS_UNKNOWN
//      || task.status === TASK_STATUS_COMPLETELY_UNKNOWN) {
//       task.start = undefined;
//       task.end = undefined;
//     }
//     var rTimeMin = task.end;
//     if (!rTimeMin) {
//       var drillRight = function (t, level) {
//         level = level || 1;
//         rMaxTimelessTasksChain = Math.max(level, rMaxTimelessTasksChain);
//         t.requiredFor.forEach(function (neighbourId) {
//           if (processedTasksDict[neighbourId].start) {
//             if (rTimeMin) {
//               rTimeMin = Math.min(rTimeMin, processedTasksDict[neighbourId].start);
//             } else {
//               rTimeMin = processedTasksDict[neighbourId].start;
//             }
//           }
//         });
//         if (!rTimeMin || !t.start) {
//           t.requiredFor.forEach(function (requirementId) {
//             drillRight(processedTasksDict[requirementId], level + 1);
//           });
//         }
//       };
//       drillRight(task);
//     }
//
//     var lTimeMin = task.start;
//     var lTimeMax = task.start;
//     var lMaxTimelessTasksChain = 0;
//     var lMinTimelessTasksChain = 0;
//
//     if (!lTimeMin) {
//       var drillLeft = function (t, level) {
//         level = level || 1;
//         lMaxTimelessTasksChain = Math.max(level, lMaxTimelessTasksChain);
//         t.dependencies.forEach(function (neighbourId) {
//           if (processedTasksDict[neighbourId].end) {
//             if (lTimeMin) {
//               lTimeMin = Math.max(lTimeMin || minTimeMs, processedTasksDict[neighbourId].end);
//             } else {
//               lMinTimelessTasksChain = Math.max(level, lMinTimelessTasksChain);
//               lTimeMin = processedTasksDict[neighbourId].end;
//             }
//             if (lTimeMax) {
//               lTimeMax = Math.min(lTimeMax || maxTimeMs, processedTasksDict[neighbourId].end);
//             } else {
//               lTimeMax = processedTasksDict[neighbourId].end;
//             }
//           }
//         });
//         if (!lTimeMin || !t.end) {
//           t.dependencies.forEach(function (requirementId) {
//             drillLeft(processedTasksDict[requirementId], level + 1);
//           });
//         }
//       };
//       drillLeft(task);
//     }
//     rTimeMin = rTimeMin || maxTimeMs;
//     lTimeMin = lTimeMin || minTimeMs;
//     lTimeMax = lTimeMax || maxTimeMs;
//     if (!task.end) {
//       task.end = rTimeMin;
//     }
//     if (!task.start) {
//       task.start = rTimeMin - Math.min(
//         (rTimeMin - lTimeMin) / (lMinTimelessTasksChain || 1),
//         (rTimeMin - lTimeMax) / (lMaxTimelessTasksChain || 1),
//       );
//     }
//
//     if (task.end - task.start < TASK_MIN_DURATION_MS) {
//       task.end = TASK_MIN_DURATION_MS + task.start;
//     }
//     if (task.end - task.start > TASK_MAX_AUTO_DURATION_MS) {
//       task.start = task.start - TASK_MAX_AUTO_DURATION_MS;
//     }
//     task.duration = task.end - task.start;
//     return task;
//   }).reverse();
// };
//
// var findCriticalPaths = function (tasks, tasksDict, headTaskClass) {
//
//   var lengths = {};
//   var stack = tasks.slice(0, tasks.length).reverse();
//   tasks.forEach(function (task) {
//     lengths[task.id] = 0;
//   });
//
//   var headToId = {};
//   var headToCriticalDependencyChains = {};
//   var idToHead = {};
//
//
//   while (stack.length > 0) {
//     var task = stack.pop();
//     if (task.class === headTaskClass) {
//       idToHead[task.id] = {};
//       idToHead[task.id][task.id] = true;
//       headToId[task.id] = {};
//       headToId[task.id][task.id] = true;
//       headToCriticalDependencyChains[task.id] = {};
//     }
//     task.dependencies.forEach(function (depId) {
//       Object.keys(idToHead[task.id] || {}).forEach(function (headId) {
//         headToId[headId][depId] = true;
//         idToHead[depId] = idToHead[depId] || {};
//         idToHead[depId][headId] = true;
//         if (lengths[depId] <= lengths[task.id] + tasksDict[depId].duration
//         || TASK_MIN_DURATION_MS) {
//           lengths[depId] = lengths[task.id] + tasksDict[depId].duration || TASK_MIN_DURATION_MS;
//           headToCriticalDependencyChains[headId][depId] = task.id;
//         }
//       });
//     });
//   }
//
//   var earliestByHead = {};
//   Object.keys(headToId).forEach(function (headId) {
//     earliestByHead[headId] = Object.keys(headToId[headId]).map(function (taskId) {
//       return [lengths[taskId], taskId];
//     }).sort(function (a, b) {
//       return a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0;
//     }).map(function (pair) {
//       return pair[1];
//     });
//   });
//
//
//   var makePath = function (currentId, headId, path) {
//     path = path || [];
//     path.push(currentId);
//     if (headToCriticalDependencyChains[headId][currentId] !== undefined) {
//       makePath(headToCriticalDependencyChains[headId][currentId], headId, path);
//     }
//     return path;
//   };
//
//   return Object.keys(earliestByHead).map(function (startTask) {
//     return makePath(earliestByHead[startTask][0], startTask);
//   });
// };
//
// var paramsToString = function (paramsDict) {
//   return Object.keys(paramsDict || {}).sort().map(function (paramKey) {
//     return [paramKey, paramsDict[paramKey]].join(':');
//   }).join(' ');
// };
//
// var groupTasksByIntervals = function (dependencies) {
//   var intervalTree = new IntervalTree();
//   var noTimeIntervals = [];
//   dependencies.forEach(function (dep) {
//     if (!(dep.start && dep.end)) {
//       noTimeIntervals.push(dep);
//     } else {
//       var node = intervalTree.add([dep.start, dep.end]);
//       node.task = dep;
//     }
//   });
//   var intervals = noTimeIntervals ? [noTimeIntervals] : [];
//   if (intervalTree.root) {
//     var traverse = function (node, intervals, currentInterval) {
//       intervals = intervals || [];
//
//       if (currentInterval === undefined) {
//         currentInterval = [];
//         intervals.push(currentInterval);
//       }
//
//       if (node.interval) {
//         currentInterval.push(node.task);
//       }
//       if (node.left) {
//         if (node.left.interval[1] < node.interval[0]) {
//           traverse(node.left, intervals);
//         } else {
//           traverse(node.left, intervals, currentInterval);
//         }
//       }
//       if (node.right) {
//         if (node.right.interval[0] > node.interval[1]) {
//           traverse(node.right, intervals);
//         } else {
//           traverse(node.right, intervals, currentInterval);
//         }
//       }
//       return intervals;
//     };
//     intervals = traverse(intervalTree.root, intervals);
//   }
//   return intervals;
// };
//
// var makeConglomerate = function (tasks, tasksDict) {
//   if (!tasks) {
//     return;
//   }
//   var conglomerateId = 'conglomerate_' + tasks[0].id + '_' + tasks[0].class;
//   var conglomerate = {
//     id: conglomerateId,
//     isConglomerate: true,
//     name: conglomerateId,
//     class: tasks[0].class,
//     size: tasks.length,
//     tasks: tasks,
//     status: tasks.reduce(function (a, b) {
//       return TASK_STATUS_LEVELS[a.status] > TASK_STATUS_LEVELS[b.status] ? a.status : b.status;
//     }),
//     parametersList: {},
//     requiredFor: [],
//     dependencies: [],
//   };
//
//   tasksDict[conglomerateId] = conglomerate;
//   tasks.forEach(function (task) {
//     tasksDict[task.id].inConglomerate = true;
//   });
//
//   [
//     ['dependencies', 'requiredFor'],
//     ['requiredFor', 'dependencies'],
//   ].forEach(function (depAttrs) {
//     var depAttr = depAttrs[0];
//     var depAttrOpposite = depAttrs[1];
//
//     tasks.forEach(function (task) {
//       task[depAttr].forEach(function (depTaskId) {
//         tasksDict[depTaskId][depAttrOpposite] =
//          tasksDict[depTaskId][depAttrOpposite].filter(function (dependencyId) {
//           return dependencyId !== task.id;
//         });
//         tasksDict[depTaskId][depAttrOpposite].push(conglomerateId);
//         tasksDict[depTaskId][depAttrOpposite] =
//          makeUnique(tasksDict[depTaskId][depAttrOpposite]);
//       });
//       conglomerate[depAttr] = conglomerate[depAttr].concat(task[depAttr]);
//       task[depAttr] = [];
//     });
//
//     conglomerate[depAttr] = makeUnique(conglomerate[depAttr]).filter(function (depId) {
//       return depId !== conglomerateId;
//     });
//     conglomerate[depAttrOpposite] = makeUnique(conglomerate[depAttrOpposite])
//       .filter(function (depId) {
//         return depId !== conglomerateId;
//       });
//
//     conglomerate.start = tasks.map(function (task) {
//       return task.start;
//     }).reduce(function (a, b) {
//       if (a !== undefined && b !== undefined) {
//         return Math.min(a, b);
//       }
//
//     });
//     conglomerate.end = tasks.map(function (task) {
//       return task.end;
//     }).reduce(function (a, b) {
//       if (a !== undefined && b !== undefined) {
//         return Math.max(a, b);
//       }
//     });
//     conglomerate.duration = conglomerate.end - conglomerate.start;
//   });
//   return conglomerate;
// };
//
// var combineTasks = function (tasks, tasksDict) {
//   var conglomerates = [];
//   tasks.forEach(function (task) {
//     [
//       'dependencies',
//       'requiredFor',
//     ].forEach(function (depAttr) {
//       if (task.inConglomerate !== true) {
//
//         var dependenciesByClass = {};
//         task[depAttr].forEach(function (depId) {
//           var depTask = tasksDict[depId];
//           dependenciesByClass[depTask.class] = dependenciesByClass[depTask.class] || [];
//           dependenciesByClass[depTask.class].push(depTask);
//         });
//
//         Object.keys(dependenciesByClass).forEach(function (depClass) {
//           groupTasksByIntervals(dependenciesByClass[depClass]).forEach(
//             function (tasksInInterval) {
//               var filteredTasksInInterval = tasksInInterval.filter(function (intervalTask) {
//                 return intervalTask.inConglomerate !== true;
//               });
//               if (filteredTasksInInterval.length > CONGLOMERATE_TASKS_COUNT_THRESHOLD) {
//                 conglomerates.push(makeConglomerate(filteredTasksInInterval, tasksDict));
//               }
//             },
//           );
//         });
//       }
//     });
//   });
//   return tasks.filter(function (task) {
//     return task.inConglomerate !== true;
//   }).concat(conglomerates);
// };
//
//
// /**
//  * Input:
//  *
//  * @example:
//  * result = {
//  *   titles: ['a', 'b', ...],
//  *   rowKeys: ['a', 'b', ...],
//  *   dataArray: resultArray: [1,2,....,4,5,....],
//  * }
//  *
//  * @param matrixData
//  * @return {{nodes: *, links: Array, nodesDict}}
//  */
// const matrixToGraph = (matrixData) => {
//   console.log(matrixData);
//   const links = [];
//   const { rows, titles } = matrixData;
//
//   const nodesDict = {};
//   if (isEmpty(titles)) {
//     return {
//       nodes: [],
//       links,
//       nodesDict,
//     };
//   }
//   const nodes = titles.map((agentName, i) => {
//     const id = i + 1;
//     nodesDict[agentName] = id;
//     return {
//       id,
//       agent: agentName,
//       value: 1,
//     };
//   });
//
//   rows.forEach(
//     (row, rowIdx) => {
//       const agentAName = titles[rowIdx];
//       row.elements.forEach(
//         (col, colIdx) => {
//           if (rowIdx < colIdx) {
//             const weight = parseFloat(col) || 0.0;
//             const agentBName = titles[colIdx];
//             links.push({
//               source: nodesDict[agentAName],
//               target: nodesDict[agentBName],
//               weight: weight,
//             });
//           }
//         },
//       );
//     },
//   );
//   return {
//     nodes,
//     links,
//     nodesDict,
//   };
// };

module.exports = {
  toposort,
  matrixToGraph,
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("json-stringify-safe");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("parse-json");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/*       */

/**
 * Formats a number.
 *
 * http://snipplr.com/view/5945/javascript-numberformat--ported-from-php/
 */
const humanizeNumber = (
  number        ,
  decimals        ,
  decPoint         ,
  thousandsSep         ,
) => {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://crestidg.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // *     example 1: number_format(1234.5678, 2, '.', '');
  // *     returns 1: 1234.57
  let n      = number;
  // eslint-disable-next-line no-restricted-globals
  const c = isNaN(decimals) ? 2 : Math.abs(decimals);
  const d = decPoint === undefined ? ',' : decPoint;
  const t = (thousandsSep === undefined) ? '.' : thousandsSep;
  const s = n < 0 ? '-' : '';
  const i         = `${parseInt((n = Math.abs((+n) || 0).toFixed(c)), 10)}`;
  const j = (i.length > 3) ? i.length % 3 : 0;
  return [
    s,
    j ? (`${`${i || ''}`.substr(0, j)}${t || ''}`) : '',
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t || ''}`),
    c ? (parseInt(d, 10) + Math.abs(parseInt(n, 10) - parseInt(i, 10)).toFixed(c).slice(2)) : '',
  ].join('');
};

/**
 * Formats a byte size.
 *
 * http://snipplr.com/view/5949/format-humanize-file-byte-size-presentation-in-javascript/
 */
const humanizeSize = (inputSize        ) => {
  let size = inputSize;
  if (size >= 1073741824) {
    size = `${humanizeNumber(size / 1073741824, 2, '.', '')} GiB`;
  } else if (size >= 1048576) {
    size = `${humanizeNumber(size / 1048576, 2, '.', '')} MiB`;
  } else if (size >= 1024) {
    size = `${humanizeNumber(size / 1024, 0)} KiB`;
  } else {
    size = `${humanizeNumber(size, 0)} bytes`;
  }
  return size;
};

/**
 * Humanize percents.
 *
 * @param percent
 * @return {string}
 */
const humanizePercents = (percent        ) =>
  `${percent.toFixed(2).padStart(6)}%`;

module.exports = {
  humanizeNumber,
  humanizePercents,
  humanizeSize,
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/* eslint-disable */

const createDate = function (y, m, d, h, M, s, ms) {
  /**
   * Function is taken from Vis.js:
   * https://github.com/almende/vis
   *
   * A dynamic, browser-based visualization library.
   *
   * * The MIT License
   *   http://opensource.org/licenses/MIT
   */
  y = y || 1;
  m = m || 0;
  d = d || 1;
  h = h || 4;
  M = M || 0;
  s = s || 0;
  ms = ms || 0;
  const date = new Date(Date.UTC(y, m, d, h, M, s, ms));
  if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
    date.setFullYear(y);
  }
  return date;
};

const alignTimerange = function (startMs, endMs) {
  let startDate = new Date(startMs);
  let endDate = new Date(endMs);
  startDate = createDate(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  // Add one day to the tail, overlapping possible leap second and then resetting
  // time to the start of the day
  endDate = new Date(
    createDate(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
    ).getTime() + MS_IN_DAY + MS_IN_SECOND * 2,
  );
  endDate.setMinutes(0, 0, 0);
  return {
    startDate,
    endDate,
  };
};
const MS_IN_DAY = 24 * 60 * 60 * 1000;

module.exports = {
  createDate,
  alignTimerange,
  MS_IN_DAY,
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/*       */
const fs = __webpack_require__(0);
const path = __webpack_require__(0);
const yaml = __webpack_require__(13);

const { isNil, isString } = __webpack_require__(1);
const { error } = __webpack_require__(14);
const { last } = __webpack_require__(2);
const { keys } = __webpack_require__(3);

                                

/**
 * Load config from file and set environment accordingly.
 *
 * @param configPath {string} - config file path (default: './config.yaml')
 * @param encoding {string} - encoding (default: 'utf-8')
 * @param force
 * @return {Object}
 */
const loadConfig = (
  configPath         = './config.yaml',
  encoding         = 'utf8',
)             => {
  const isYaml = configPath.match(/\.ya?ml$/i);
  const isJson = configPath.match(/\.json/i);
  const p = path.resolve(configPath);
  if (!fs.existsSync(p)) {
    throw new Error(`Config file not found: "${p}"`);
  }
  let config             = {};
  const result = {};
  if (isJson) {
    const configTxt = fs.readFileSync(p).toString();
    config = JSON.parse(configTxt);
  } else if (isYaml) {
    config = yaml.safeLoad(fs.readFileSync(p, encoding));
  } else {
    error([
      `Config file "${p}" have unknown file extension: ${last(p.split('.'))}\n`,
      'Only .json, .yaml amd .yml are supported, ignoring.\n',
    ].join(''));
  }

  if (isNil(config)) {
    error(`Config file "${p}" is empty, ignoring.\n`);
    config = {};
  }
  if (Array.isArray(config)) {
    error(`Config file "${p}" contains array of data (should be object), ignoring.\n`);
    config = {};
  }

  keys(config).forEach((k        ) => {
    if (!isNil(config[k])) {
      result[k] = process.env[k] || config[k] || null;
    }
  });
  return result;
};

/**
 * Set environment variables from config
 *
 * @param configObj
 * @param overwriteNotEmpty - overwriteNotEmpty overwrite even if value is set.
 * @param overwriteAll - overwrite all. Overriding `overwriteNotEmpty` option.
 *
 * @return {Object} - resulting actual env values related to config fields.
 */
const setEnv = (
  configObj        ,
  {
    overwriteNotEmpty,
    overwriteAll,
  }   
                               
                         
    = {
    overwriteNotEmpty: false,
    overwriteAll: false,
  },
)         => {
  const result = {};
  keys(configObj).forEach((k        ) => {
    if (overwriteAll) {
      process.env[k] = result[k] || '';
      result[k] = configObj[k];
    } else if (overwriteNotEmpty || (!process.env[k])) {
      process.env[k] = result[k] || '';
      result[k] = configObj[k];
    } else {
      result[k] = process.env[k] || null;
    }
  });
  return result;
};


/**
 * Convert config file to .env file format and returns string.
 *
 * @param configPath {string} - config file path (default: './config.yaml')
 * @param encoding {string} - encoding (default: 'utf-8')
 * @return {string}
 */
const makeEnvStr = (
  configPath         = './config.yaml',
  encoding         = 'utf8',
)         => {
  const config = loadConfig(configPath, encoding);
  return keys(config)
    .sort()
    .map((k) => {
      const key = k.replace('=', '\\=');
      const val = config[k];
      return `${key}=${isString(val) ? `'${val};` : val}\n`;
    }).join('');
};

module.exports = {
  loadConfig,
  setEnv,
  makeEnvStr,
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("base64-js");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("ieee754");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/*       */

const fs = __webpack_require__(0);
const path = __webpack_require__(0);
const mkdirp = __webpack_require__(38);
const { forceArray } = __webpack_require__(2);

/**
 * Recursively remove directory like `rm -rf`
 * Taken from: https://stackoverflow.com/a/32197381
 * @param dirPath {string} - path to remove
 */
const rmrf = (dirPath        ) => {
  if (fs.existsSync(dirPath)) {
    if (fs.statSync(dirPath).isDirectory()) {
      fs.readdirSync(dirPath).forEach((file) => {
        const curPath = `${dirPath}/${file}`;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          rmrf(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(dirPath);
    } else {
      fs.unlinkSync(dirPath);
    }
  }
};
const mkdirpAsync = async (dir        , recreate          = false) => {
  if (!dir) {
    return null;
  }
  if (recreate && fs.existsSync(dir)) {
    rmrf(dir);
  }
  return new Promise((resolve, reject) => {
    mkdirp(dir, (err, res) => { if (err) { reject(err); } else { resolve(res); } });
  });
};
const mkdirpSync = (dir        , recreate          = false) => {
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
const getCommonPathsRoot = (pathsOrPath                        )         => {
  const paths                = forceArray(pathsOrPath).map(p => path.resolve(p));
  return paths.reduce(
    (shortestFound        , p        )         => (
      p.startsWith(shortestFound)
        ? shortestFound
        : p
          .split(path.sep)
          .filter((c, cIdx) => c === shortestFound[cIdx])
          .join(path.sep)
    ),
    paths[0],
  );
};

/**
 * Gets all files paths.
 * Taken from: https://gist.github.com/kethinov/6658166#gistcomment-2774154
 * @param baseDir
 * @param subdirs
 * @return {Array}
 */
const walkSync = (baseDir        , subdirs         = '')                => {
  if ((!subdirs) && (!fs.existsSync(baseDir))) {
    // Nothing to catch here
    return [];
  }
  const files = [];
  try {
    const newFiles = fs.readdirSync(path.join(baseDir, subdirs));
    // eslint-disable-next-line no-restricted-syntax
    for (const file of newFiles) {
      const dirOrFile = [subdirs, file].filter(x => !!x).join(path.sep);
      const p = path.join(baseDir, dirOrFile);
      if (fs.existsSync(p)) {
        if (fs.statSync(p).isDirectory()) {
          walkSync(baseDir, dirOrFile).forEach(f => files.push(f));
        } else if (fs.statSync(p).isFile()) {
          files.push(dirOrFile);
        }
      }
    }
  } catch (e) {
    process.stderr.write(`${e.toString()}\n`);
  }
  return files;
};

module.exports = {
  rmrf,
  mkdirpSync,
  mkdirpAsync,
  getCommonPathsRoot,
  walkSync,
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

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


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const moment = __webpack_require__(17);

const MS_IN_SECOND = 1000;
const NANOS_IN_MS = 1000 * 1000;
const NANOS_IN_SECOND = 1000 * 1000 * 1000;

                                                                                    
                                                     
/**
 * Get timestamp object compatible with:
 * https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/timestamp.proto#L101
 *
 * @return {{seconds: number, nanos: number}}
 *
 * @example
 *
 * nowObj()
 * // => { seconds: 12345678, nanos: 999,999,999 }
 */
const nowObj = () => {
  const ms = (new Date()).getTime();
  const seconds = Math.floor(ms / MS_IN_SECOND);
  const nanos = (ms % MS_IN_SECOND) * NANOS_IN_MS;
  return {
    seconds,
    nanos,
  };
};

const nowMs = () => (new Date()).getTime();
const nowSec = () => nowMs() / 1000;
const nowISO = () => (new Date()).toISOString();
const nowHuman = () => (new Date()).toISOString().replace('T', ' ').split('.')[0];


/**
 * .proto TimeStamp/Duration Object to milliseconds
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
const obj2ms = ({ seconds, nanos }                 )         =>
  (parseInt(seconds, 10) * MS_IN_SECOND)
  + Math.floor(parseInt(nanos, 10) / NANOS_IN_MS);

/**
 * .proto TimeStamp/Duration Object to seconds float
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
const obj2seconds = ({ seconds, nanos }                 )         =>
  parseInt(seconds, 10) + (parseInt(nanos, 10) / NANOS_IN_SECOND);

/**
 * Milliseconds to .proto object
 * @param ms - number
 * @return {{seconds: number, nanos: number}}
 */
const ms2obj = (ms                )                  => {
  const secondsFloat = parseFloat(ms || 0) / MS_IN_SECOND;
  const secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND),
  };
};

/**
 * Seconds to .proto object
 * @param seconds - number
 * @return {{seconds: number, nanos: number}}
 */
const seconds2obj = (seconds                )                  => {
  const secondsFloat = parseFloat(seconds || 0);
  const secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND),
  };
};

/**
 * seconds to moment.js
 * @param seconds
 * @return {never|moment.Moment}
 */
const seconds2moment = (seconds                ) => moment(parseFloat(seconds) * MS_IN_SECOND);

/**
 * ms to moment.js
 * @param ms
 * @return {never|moment.Moment}
 */
const ms2moment = (ms                ) => moment(parseInt(ms || 0, 10));

module.exports = {
  now: nowHuman,
  nowHuman,
  nowISO,
  nowMs,
  nowSec,
  nowObj,
  obj2seconds,
  obj2ms,
  seconds2obj,
  ms2obj,
  seconds2moment,
  ms2moment,
  MS_IN_SECOND,
  NANOS_IN_MS,
  NANOS_IN_SECOND,
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/*       */
/**
 * Convert text to snake case
 *
 * _.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * _.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * _.snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 *
 * @param str
 * @return {*}
 */
const snakeCase = (str        )         => (
  str.replace(/_\w/g, m => m[1].toLowerCase())
);

/**
 * Character to hex
 * @param chars
 * @return {string}
 */
const char2hex = (chars        )         => {
  const l = chars.length;
  let result = '';
  // Performance note:
  // https://www.freecodecamp.org/forum/t/which-is-more-efficient-str-some-string-or-array-push-join/5802/4
  for (let i = 0; i < l; i += 1) {
    result += chars[i].charCodeAt(0).toString(16).toUpperCase();
  }
  return result;
};

/* eslint-disable no-control-regex */
/**
 * From https://github.com/bitnine-oss/agensgraph-nodejs/blob/master/lib/agens.js#L65
 */
const sqlLiteralEscape = (s         ) => (s || '')
  .replace(/\\/g, '\\\\')
  .replace(/"/g, '\\"')
  .replace(/\0/g, '\\0')
  .replace(/\t/g, '\\t')
  .replace(/\n/g, '\\n')
  .replace(/\r/g, '\\r')
  .replace(/[\x00-\x0F]/g, ch => `\\x0${char2hex(ch)}`)
  .replace(/[\x10-\x1F\x7F-\x9F]/g, ch => `\\x${char2hex(ch)}`);

module.exports = {
  char2hex,
  sqlLiteralEscape,
  snakeCase,
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/*       */
const request = __webpack_require__(43);

/**
 * @const DEFAULT_OPTIONS
 */
const DEFAULT_OPTIONS = {
  method: 'HEAD',
  followAllRedirects: true,
  followOriginalHttpMethod: true,
};

/**
 * Inspired by https://github.com/evanlucas/remote-file-size/blob/master/index.js
 * @param options
 */
const uriFileSize                                     = options => new Promise(
  (resolve, reject) => request(
    { ...DEFAULT_OPTIONS, ...options },
    (err, res) => {
      const code = res.statusCode;
      const contentLengthBytes = res.headers['content-length'];
      if (err) {
        reject(err);
      } else if (code >= 400) {
        reject(new Error(`Received invalid status code: ${code}`));
      } else if (!contentLengthBytes) {
        reject(new Error('Unable to determine file size'));
      } else if (contentLengthBytes !== +contentLengthBytes) {
        reject(new Error('Invalid Content-Length received'));
      } else {
        resolve(contentLengthBytes);
      }
    },
  ),
);

module.exports = {
  DEFAULT_OPTIONS,
  uriFileSize,
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*       */
const cloneDeep = __webpack_require__(18);
const forEach = __webpack_require__(7);
const range = __webpack_require__(45);

const { isArray, isFunction, isObject, isString } = __webpack_require__(1);
const { isEmpty } = __webpack_require__(5);
const { keys } = __webpack_require__(3);
const { promiseMap } = __webpack_require__(16);

                           
                
            
                               
        

                                
                
            
                               
                 

/**
 * Apply given function to all data tree (list/dict or JSON) nodes.
 *
 * @param dataTree - data tree (list/dict or JSON)
 * @param pre {VisitFnType} - function returning new node value
 * @param post {VisitFnType} - function returning new node value
 * @returns {any} - new data tree matching input type
 */
const visitorSync = (
  dataTree     ,
  pre               = x => cloneDeep(x),
  post               = x => x,
)      => {
  if (!(isFunction(post) || isFunction(post))) {
    return cloneDeep(dataTree);
  }
  const visit = (node     , parent)      => {
    if ((!isEmpty(node)) && (isArray(node) || isObject(node))) {
      const l = node.length;
      const target = Array.isArray(node) ? Array(l) : {};
      const ks = Array.isArray(node) ? range(l) : Object.keys(node).sort();
      forEach(ks, async (k     ) => {
        target[k] = post(visit(pre(node[k], k, node), node), k, node);
      });
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
const visitorAsync = async (
  dataTree     ,
  pre                    = async x => cloneDeep(x),
  post                    = async x => x,
)               => {
  if (!(isFunction(post) || isFunction(post))) {
    return cloneDeep(dataTree);
  }
  const visit = async (node     , parent)               => {
    if ((!isEmpty(node)) && (isArray(node) || isObject(node))) {
      const l = node.length;
      const target = isArray(node) ? Array(l) : {};
      const ks = Array.isArray(node) ? range(l) : Object.keys(node).sort();
      await promiseMap(ks, async (k     ) => {
        target[k] = await post(await visit(await pre(node[k], k, node), node), k, node);
      });
      return target;
    }
    return post(pre(node, null, parent), null, parent);
  };
  return post(await visit(await pre(dataTree, null, null), null), null);
};

/**
 * Preview JSON doing truncate of too long strings
 *
 * @param dataTree {*}
 * @param maxLength {number}
 * @returns {*}
 */
const previewJSON = (dataTree     , maxLength         = 255)      => visitorSync(
  dataTree,
  undefined,
  (dataNode) => {
    const isBigObj = isObject(dataNode) && keys(dataNode).length > maxLength;
    const isBigStr = isString(dataNode) && dataNode.length > maxLength;
    const isBigArrayBuffer = Buffer.isBuffer(dataNode);
    if (isBigArrayBuffer) {
      return `<TRUNCATED><Buffer(${dataNode.byteLength})>`;
    }
    if (isBigObj) {
      return `<TRUNCATED><object(${Object.keys(dataNode).length})>`;
    }
    if (isBigStr) {
      const tag = `<TRUNCATED><String(${dataNode.length})>`;
      const len = Math.max(maxLength - tag.length, 0);
      return `${dataNode.slice(0, len)}${tag}`;
    }
    return dataNode;
  },
);

module.exports = {
  previewJSON,
  visitor: visitorSync,
  visitorAsync,
  visitorSync,
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15).Buffer))

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("lodash.range");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("lodash.clone");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("lodash.defaults");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("lodash.difference");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("lodash.flatten");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("lodash.frompairs");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("lodash.intersection");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("lodash.set");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("lodash.slice");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("lodash.sortby");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("lodash.union");

/***/ })
/******/ ]);
});
//# sourceMappingURL=anymetrica-utils.js.map