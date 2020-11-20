/* @flow */

const path = require('path');
const fs = require('fs');
const { mkdirpAsync } = require('./fs');
const { callConsole } = require('./cli');
const { promiseMap } = require('./promise');

/**
 * iconv shell command
 * @constant ICONV_CMD
 */
const ICONV_CMD = 'iconv';

/**
 * Convert encoding.
 *
 * @param folderFrom {string} - path from
 * @param encodingFrom {string} - encoding from, default: "Windows-1251"
 * @param folderTo {string} - path to
 * @param encodingTo {string} - encoding to, default: "ASCII//TRANSLIT" (other option: "utf-8")
 * @return {Promise<Array<any>>}
 */
const batchFileIconv = async (
  folderFrom: string,
  folderTo: string,
  encodingFrom: string = 'Windows-1251',
  encodingTo: string = 'ASCII//TRANSLIT',
) => {
  const files = fs.readdirSync(folderFrom);
  return promiseMap(
    files,
    async (fileNameFrom) => {
      const filePathFrom = path.join(folderFrom, fileNameFrom);
      const filePathTo = path.join(folderTo, fileNameFrom);
      await mkdirpAsync(folderTo);
      await callConsole(`${ICONV_CMD} -f ${encodingFrom} -t ${encodingTo} ${filePathFrom} > ${filePathTo}`);
      return filePathTo;
    },
  );
};

// noinspection JSUnusedGlobalSymbols
module.exports = { batchFileIconv };
