'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */
var request = require('request');

/**
 * @const DEFAULT_OPTIONS
 */
var DEFAULT_OPTIONS = {
  method: 'HEAD',
  followAllRedirects: true,
  followOriginalHttpMethod: true
};

/**
 * Inspired by https://github.com/evanlucas/remote-file-size/blob/master/index.js
 * @param options
 */
var uriFileSize /*: (options: Object)=>Promise<number>*/ = function uriFileSize(options) {
  return new Promise(function (resolve, reject) {
    return request((0, _extends3.default)({}, DEFAULT_OPTIONS, options), function (err, res) {
      var code = res.statusCode;
      var contentLengthBytes = res.headers['content-length'];
      if (err) {
        reject(err);
      } else if (code >= 400) {
        reject(new Error('Received invalid status code: ' + code));
      } else if (!contentLengthBytes) {
        reject(new Error('Unable to determine file size'));
      } else if (contentLengthBytes !== +contentLengthBytes) {
        reject(new Error('Invalid Content-Length received'));
      } else {
        resolve(contentLengthBytes);
      }
    });
  });
};

module.exports = {
  DEFAULT_OPTIONS: DEFAULT_OPTIONS,
  uriFileSize: uriFileSize
};