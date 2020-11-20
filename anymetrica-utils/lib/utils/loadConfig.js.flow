/* @flow */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const { isNil, isString } = require('./types');
const { error } = require('./logger');
const { last } = require('./lists');
const { keys } = require('./dataStructures');

export type ConfigType = Object;

/**
 * Load config from file and set environment accordingly.
 *
 * @param configPath {string} - config file path (default: './config.yaml')
 * @param encoding {string} - encoding (default: 'utf-8')
 * @param force
 * @return {Object}
 */
const loadConfig = (
  configPath: string = './config.yaml',
  encoding: string = 'utf8',
): ConfigType => {
  const isYaml = configPath.match(/\.ya?ml$/i);
  const isJson = configPath.match(/\.json/i);
  const p = path.resolve(configPath);
  if (!fs.existsSync(p)) {
    throw new Error(`Config file not found: "${p}"`);
  }
  let config: ConfigType = {};
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

  keys(config).forEach((k: string) => {
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
  configObj: Object,
  {
    overwriteNotEmpty,
    overwriteAll,
  }: {
    overwriteNotEmpty: boolean,
    overwriteAll: boolean
  } = {
    overwriteNotEmpty: false,
    overwriteAll: false,
  },
): Object => {
  const result = {};
  keys(configObj).forEach((k: string) => {
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
  configPath: string = './config.yaml',
  encoding: string = 'utf8',
): string => {
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
