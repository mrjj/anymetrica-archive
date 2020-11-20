/* @flow */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { forceArray } = require('./lists');

/**
 * Recursively remove directory like `rm -rf`
 * Taken from: https://stackoverflow.com/a/32197381
 * @param dirPath {string} - path to remove
 */
const rmrf = (dirPath: string) => {
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
const mkdirpAsync = async (dir: string, recreate: boolean = false) => {
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
const mkdirpSync = (dir: string, recreate: boolean = false) => {
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
const getCommonPathsRoot = (pathsOrPath: string | Array<string>): string => {
  const paths: Array<string> = forceArray(pathsOrPath).map(p => path.resolve(p));
  return paths.reduce(
    (shortestFound: string, p: string): string => (
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
const walkSync = (baseDir: string, subdirs: string = ''): Array<string> => {
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
