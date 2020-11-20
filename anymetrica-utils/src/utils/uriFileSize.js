/* @flow */
const request = require('request');

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
const uriFileSize: (options: Object)=>Promise<number> = options => new Promise(
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
