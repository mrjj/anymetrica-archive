/* @flow */

const fs = require('fs');
const path = require('path');

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
