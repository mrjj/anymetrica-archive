#!/usr/bin/env node
const shelljs = require('shelljs');
const stringify = require('json-stable-stringify');

const PACKAGE_FILE = 'package.json';
const BRANCH = 'master';
const RELEASE_BRANCH = 'release';
const GIT_TAG_PREFIX = process.env.GIT_VERSION_TAG_PREFIX || '';
/**
 * Get git revision for git repo folder
 *
 * @return {string|null}
 */
// $FlowFixMe
const getRevision = () => {
  // w commits after target merge
  const prevVersion = JSON.parse(shelljs.exec(`git show HEAD@{1}:./${PACKAGE_FILE}`, { silent: true }) || stringify({ version: null }, { space: '  ' })).version;
  shelljs.exec(`git stash`);
  shelljs.exec(`git reset --hard`);
  shelljs.exec(`git checkout ${BRANCH}`);
  const version = JSON.parse(
    shelljs.exec(`git show HEAD@{0}:./${PACKAGE_FILE}`, { silent: true }) || stringify({ version: '0.0.1' }, { space: '  ' })).version;
  if (prevVersion !== version) {
    process.stdout.write(`${version}\n`);
    const TAG = `${GIT_TAG_PREFIX}${version}`;
    // https://bitbucket.org/site/master/issues/13867/run-pipeline-on-the-result-of-the-pull?_ga=2.197752943.1155087450.1548658915-668511601.1540942893#comment-48570303
    shelljs.exec(`rm -rf ./package-lock.json ./yarn.lock`);
    shelljs.exec(`npm install`);
    shelljs.exec(`npm run build`);
    shelljs.exec(`git add .`);
    shelljs.exec(`git commit -m "* Version bump ${version} according to ${PACKAGE_FILE}"`);
    shelljs.exec(`git push --tags origin ${BRANCH}`);
    shelljs.exec(`git checkout ${RELEASE_BRANCH}`);
    shelljs.exec(`git merge ${BRANCH} --ff -m " * Automatic release tag ${TAG}"`);
    shelljs.exec(`git tag -f ${TAG}`);
    shelljs.exec(`git push --tags origin ${RELEASE_BRANCH}`);
    shelljs.exec(`git checkout ${BRANCH}`);
  } else {
    process.stdout.write('No package version changes');
  }
  process.exit(0);
};

getRevision();
