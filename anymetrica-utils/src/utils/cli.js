/* @flow */
const execa = require('execa');
const { error, info } = require('./logger');

/**
 * Call console command
 * @param cmd {string} - shell command
 * @return {Promise<void>}
 */
const callConsole = async (cmd: string) => {
  info('$', cmd);
  try {
    const resultSkipGramms = await execa.shell(cmd);
    if (resultSkipGramms.stderr) {
      error(`stderr\n${resultSkipGramms.stderr}`);
    }
    if (resultSkipGramms.stdout) {
      info(resultSkipGramms.stdout);
    }
  } catch (e) {
    error(e);
  }
};
module.exports = { callConsole };
