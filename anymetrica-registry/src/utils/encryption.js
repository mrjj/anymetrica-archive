/* @flow */
import crypto from 'crypto';
import phc from '@phc/format';
import shelljs from 'shelljs';

import {
  defaults,
  info,
  isArray,
  isBoolean,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isString,
  toJSON,
} from 'anymetrica-utils';
import {
  OTP_TOKEN_LENGTH_BYTES,
  BLOB_STORE_HASH_ALGORITHM,
  CREDENTIAL_ENCRYPTION, SESSION_TOKEN_LENGTH_BYTES,
} from '../constants';

/**
 * Types in MCF
 * https://passlib.readthedocs.io/en/stable/modular_crypt_format.html
 */

export type EncryptionSchemaType =
  | 'plain'
  | 'argon2d'
  | 'argon2i' // Current
  | 'argon2id' // Not mentioned in `passlib` man
  | 'sha256'
  | '5' // SHA-256
  | 'sha512'
  | '6' // SHA-512
  | 'sha1'
  | 'md5'
  | 'siphash' // Not mentioned in `passlib` man

export type EncryptionFunctionType = (
  data: number | string | Buffer,
  encryptionType: string,
  salt: string,
  params: Object,
) => Promise<string>;

/**
 * Constants
 */

/**
 * @const ARGON2_PACKAGE_MIN_SALT_LENGTH - argon2 package min salt length.
 */
export const ARGON2_PACKAGE_MIN_SALT_LENGTH = 8;

/**
 * @const SECRET_SALT {string} - default encryption salt
 */
export const SECRET_SALT = '1D3FaUlTSaLt!Pl33z';

/**
 * @const DEFAULT_HASH_ENCODING {string} - default hash encoding
 */
export const DEFAULT_HASH_ENCODING = 'base64';

/**
 * @const DEFAULT_TOKEN_LENGTH_BYTES {number} - How many bytes token should be
 */
export const DEFAULT_TOKEN_LENGTH_BYTES = 32; // 32 bytes is like UUID


/**
 * Tools
 */

/**
 * Data to string
 *
 * @param data {number|string|Buffer}
 * @return {string}
 */
export const toString = (data: number | string | Buffer): string => {
  let dataString = data;
  if (isNil(data)) {
    dataString = '';
  } else if (isString(data)) {
    dataString = data;
  } else if (Buffer.isBuffer(data)) {
    dataString = data.toString();
  } else if (isObject(data) || isArray(data)) {
    dataString = toJSON(data);
  } else if (isNumber(data) || isBoolean(data)) {
    dataString = `${data}`;
  } else {
    dataString = `${data || ''}`;
  }
  return dataString;
};

/**
 * Data to Buffer
 *
 * @param data {number|string|Buffer}
 * @return {Promise<Buffer>}
 */
export const toBuffer = async (data: number | string | Buffer): string => {
  if (Buffer.isBuffer(data)) {
    return data;
  }
  return Buffer.from(toString(data));
};

/**
 * Make slug from data
 *
 * @param s
 * @return {*}
 */
export const slugify = s => toString(s)
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/g, '');

/**
 * Make hash function
 *
 * @param encryptionType {EncryptionSchemaType}
 * @param globalParams
 * @return {function(*=, *=, *=): Promise<*>}
 */
export const makeEncryptFn: EncryptionFunctionType = (
  encryptionType: EncryptionSchemaType,
  globalParams: Object,
): EncryptionFunctionType => async (data, salt, currentParams) => new Promise(
  (resolve, reject) => {
    const dataBuffer = toBuffer(data);
    const saltBuffer = toBuffer(salt);
    let result = '';
    const p = defaults({}, currentParams, globalParams);
    const hash = crypto.createHash(encryptionType, p);
    hash.setEncoding('char2hex');
    hash.on('error', reject);
    hash.on('data', (dataChunk) => {
      result += dataChunk;
    });
    hash.on('end', () => {
      resolve(result);
    });
    saltBuffer.pipeTo(dataBuffer).pipeTo(hash);
  },
);

/**
 * Encrypt Plain Text
 *
 * @param data
 * @param salt
 * @return {Promise<string>}
 */
export const encryptPlainText: EncryptionFunctionType = async (data, salt /* , params */) => (
  toString(data) + toString(salt)
);

/**
 * Encrypt Argon2
 * @param data
 * @param salt
 * @param params
 * @return {Promise<*>}
 */
export const encryptArgon2: EncryptionFunctionType = async (data, salt, params) => {
  const { t, m, p } = defaults(
    params,
    { t: 4, m: 12, p: 2, v: 19 },
  );
  if (salt.length < ARGON2_PACKAGE_MIN_SALT_LENGTH) {
    throw new Error('argon2 package will not accept salt shorter than 8 symbols');
  }
  const command = `argon2 "${salt}" -t ${t} -m ${m} -p ${p} -l 32 -e`;
  info(`[argon2] encrypting by executing "argon2" system binary process:\n$ ${command}`);
  try {
    const encrypted = shelljs.ShellString(data)
      .exec(command)
      .replace(/[\n\t\r ]+/g, '');
    info(`[argon2] successful encryption product: ${encrypted}`);
    return encrypted.toString();
  } catch (e) {
    throw new Error('[argon2] encryption process failed with error');
  }
};

/**
 * Encrypt SipHash
 * TODO: Find good streaming library
 */
// export const encryptSipHash: EncryptionFunctionType = async (/* data, salt, params */) => {
//   throw new Error('SipHash encryption is not supported yet');
/*
const SipHash = require('highwayhash');
const key = Buffer.from(new Array(32).fill(0));
return SipHash.asBuffer(key, Buffer.isBuffer(dataBuf) ? dataBuf : Buffer.from(dataBuf));
*/
// };


/**
 * @const ENCRYPTION_FUNCTIONS {[string]: string} - Encryption functions list
 */
export const ENCRYPTION_FUNCTIONS = {
  // PLAIN TEXT
  plain: encryptPlainText,

  // SHA2-256
  5: makeEncryptFn('sha256'),
  sha256: makeEncryptFn('sha256'),

  // SHA2-512
  6: makeEncryptFn('sha512'),
  sha512: makeEncryptFn('sha512'),

  // SHA1
  sha1: makeEncryptFn('sha1'),
  sha1_crypt: makeEncryptFn('sha1'),

  // MD5
  md5: makeEncryptFn('md5'),

  // Argon2i
  argon2i: encryptArgon2,
  // ENCRYPTION_SIPHASH: encryptSipHash,
};

/*
  const phcobj = {
    id: 'argon2i',
    version: 19,
    params: {
      m: 120,
      t: 5000,
      p: 2
    },
    salt: Buffer.from('iHSDPHzUhPzK7rCcJgOFfg', 'base64'),
    hash: Buffer.from(
      'J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g',
      'base64',
    ),
  };
 */

/**
 * Make hash
 *
 * @param data - input
 * @param encryptionFunctionName
 * @param salt {?string} - current run salt part
 * @param params {Object} - params
 * @param returnMcf {boolean} return MCF hash string
 * @return {string} - encryption
 */
export const makeHash = async (
  data: number | string | Buffer,
  salt: string = '',
  encryptionFunctionName,
  params: Object,
  returnMcf?: ?boolean = true,
): Promise<string> => {
  const encryptionFunction = ENCRYPTION_FUNCTIONS[encryptionFunctionName];
  const p = isObject(params) ? params : {};
  // eslint-disable-next-line no-prototype-builtins
  if (!isFunction(encryptionFunction)) {
    throw new Error('Encryption function is not defined');
  }
  const h = await encryptionFunction(data, salt, p);
  return returnMcf ? phc.serialize({
    id: encryptionFunctionName,
    params: isNil(params) ? {} : params,
    salt: Buffer.from(salt),
    hash: Buffer.from(h),
  }) : h;
};

/**
 * Generate random token
 *
 * @param sizeInBytes {number}
 * @param encoding {string}
 * @return {Promise<string>}
 */
export const makeRandomToken = async (
  sizeInBytes?: ?number,
  encoding?: ?buffer$Encoding,
): Promise<string> => new Promise((resolve, reject) => crypto.randomBytes(
  sizeInBytes || DEFAULT_TOKEN_LENGTH_BYTES,
  (err, buf) => {
    if (err) {
      process.stderr.write(`${err.toString()}\n`);
      reject(err);
    } else {
      resolve(slugify(buf.toString(encoding || DEFAULT_HASH_ENCODING)));
    }
  },
));

/**
 * Make OTP Token
 * @returns {Promise<string>}
 */
export const makeOTP = () => makeRandomToken(OTP_TOKEN_LENGTH_BYTES, 'base64');

/**
 * Make OTP Token
 * @returns {Promise<string>}
 */
export const makeWebSessionToken = () => makeRandomToken(SESSION_TOKEN_LENGTH_BYTES, 'base64');

/**
 * Encrypt private entity type.
 *
 * @param privateData
 * @returns {Promise<string>}
 */
export const encryptPrivate = async (privateData) => {
  if (isNil(privateData)) {
    return null;
  }
  const salt = await (new Promise(
    (resolve, reject) => crypto.randomBytes(
      CREDENTIAL_ENCRYPTION.SALT_SIZE_BYTES,
      (err, buf) => (err ? reject(err) : resolve(buf)),
    ),
  ));
  const saltSlug = slugify(salt.toString('base64'));
  return makeHash(
    privateData,
    saltSlug,
    CREDENTIAL_ENCRYPTION.FUNCTION_NAME,
    CREDENTIAL_ENCRYPTION.PARAMETERS,
    true,
  );
};

/**
 * Make blob store hash (fixed hash format)
 * @param blob
 * @returns {string}
 */
export const makeBlobHash = (blob) => {
  const hash = crypto.createHash(BLOB_STORE_HASH_ALGORITHM);
  hash.update(blob);
  return hash.digest('hex');
};

export const parseHashStr = phc.deserialize;
