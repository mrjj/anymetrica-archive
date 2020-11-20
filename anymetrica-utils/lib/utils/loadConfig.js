'use strict';

/* @flow */
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

var _require = require('./types'),
    isNil = _require.isNil,
    isString = _require.isString;

var _require2 = require('./logger'),
    error = _require2.error;

var _require3 = require('./lists'),
    last = _require3.last;

var _require4 = require('./dataStructures'),
    keys = _require4.keys;

/**
 * Load config from file and set environment accordingly.
 *
 * @param configPath {string} - config file path (default: './config.yaml')
 * @param encoding {string} - encoding (default: 'utf-8')
 * @param force
 * @return {Object}
 */
/*:: export type ConfigType = Object;*/
var loadConfig = function loadConfig() /*: ConfigType*/ {
  var configPath /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './config.yaml';
  var encoding /*: string*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

  var isYaml = configPath.match(/\.ya?ml$/i);
  var isJson = configPath.match(/\.json/i);
  var p = path.resolve(configPath);
  if (!fs.existsSync(p)) {
    throw new Error('Config file not found: "' + p + '"');
  }
  var config /*: ConfigType*/ = {};
  var result = {};
  if (isJson) {
    var configTxt = fs.readFileSync(p).toString();
    config = JSON.parse(configTxt);
  } else if (isYaml) {
    config = yaml.safeLoad(fs.readFileSync(p, encoding));
  } else {
    error(['Config file "' + p + '" have unknown file extension: ' + last(p.split('.')) + '\n', 'Only .json, .yaml amd .yml are supported, ignoring.\n'].join(''));
  }

  if (isNil(config)) {
    error('Config file "' + p + '" is empty, ignoring.\n');
    config = {};
  }
  if (Array.isArray(config)) {
    error('Config file "' + p + '" contains array of data (should be object), ignoring.\n');
    config = {};
  }

  keys(config).forEach(function (k /*: string*/) {
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
var setEnv = function setEnv(configObj /*: Object*/) /*: Object*/ {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    overwriteNotEmpty: false,
    overwriteAll: false
  },
      overwriteNotEmpty = _ref.overwriteNotEmpty,
      overwriteAll = _ref.overwriteAll;

  var result = {};
  keys(configObj).forEach(function (k /*: string*/) {
    if (overwriteAll) {
      process.env[k] = result[k] || '';
      result[k] = configObj[k];
    } else if (overwriteNotEmpty || !process.env[k]) {
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
var makeEnvStr = function makeEnvStr() /*: string*/ {
  var configPath /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './config.yaml';
  var encoding /*: string*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

  var config = loadConfig(configPath, encoding);
  return keys(config).sort().map(function (k) {
    var key = k.replace('=', '\\=');
    var val = config[k];
    return key + '=' + (isString(val) ? '\'' + val + ';' : val) + '\n';
  }).join('');
};

module.exports = {
  loadConfig: loadConfig,
  setEnv: setEnv,
  makeEnvStr: makeEnvStr
};