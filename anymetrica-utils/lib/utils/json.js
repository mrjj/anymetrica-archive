'use strict';

/* @flow */
var JsonStringifySafe = require('json-stringify-safe');
var ParseJson = require('parse-json');

module.exports = {
  toJSON: JsonStringifySafe,
  fromJSON: ParseJson
};