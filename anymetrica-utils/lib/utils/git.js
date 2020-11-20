'use strict';

/* @flow */

var fs = require('fs');
var path = require('path');

/**
 * Get git revision for git repo folder
 * @param projectDir {string}
 * @return {string|null}
 */

// $FlowFixMe
var getRevision = function getRevision(projectDir) {
  var gitDir = path.join(path.resolve(projectDir || '.'), '.git');
  var headFile = path.join(gitDir, 'HEAD');
  if (fs.existsSync(headFile)) {
    var rev = fs.readFileSync(headFile).toString().split('\n')[0];
    if (rev && rev.indexOf(':') === -1) {
      return rev;
    }
    var revFile = path.join(gitDir, rev.substring(5));
    if (fs.existsSync(revFile)) {
      return fs.readFileSync(revFile).toString() || null;
    }
  }
  return null;
};

module.exports = {
  getRevision: getRevision
};