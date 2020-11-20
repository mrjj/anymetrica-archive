/* @flow */

const mongodb = require('mongodb');
import { info, isString, visitorAsync } from 'anymetrica-utils';

import { makeBlobHash } from './utils/encryption';
import { config } from './configurator';
import type { RequestPayloadType } from './types';
import { RE_BLOB_ADDRESS } from './constants';


/**
 * Constants
 * @type {string}
 */

const credsStr = (config.BLOBSTORE_MONGO_USERNAME && config.BLOBSTORE_MONGO_PASSWORD)
  ? `${config.BLOBSTORE_MONGO_USERNAME}:${config.BLOBSTORE_MONGO_PASSWORD}@`
  : '';
const client = new mongodb.MongoClient(
  `mongodb://${credsStr}${config.BLOBSTORE_MONGO_HOST}:${config.BLOBSTORE_MONGO_PORT}`,
);

/**
 * Blob address tools
 */

/**
 * Returns blob address string like:
 * @example:
 *  "[[myBucket/$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0]]"
 *
 * @param bucket {string}
 * @param key {string}
 * @returns {string} - address string
 */
export const makeBlobAddress = (bucket: string, key: string) => {
  if (!key) {
    throw new Error('key is required');
  }
  if (!bucket) {
    throw new Error('bucket is required');
  }
  return `[[${bucket}/${(key || '').trim()}]]`;
};


/**
 * Check if string is blob address
 *
 * @param maybeBlobAddrString {any}
 * @returns {boolean}
 */
export const isBlobAddress = (maybeBlobAddrString: string) => (
  isString(maybeBlobAddrString) && maybeBlobAddrString.match(new RegExp(RE_BLOB_ADDRESS))
);

/**
 * Return parsed blob address
 *
 * @param blobAddressString {string}
 * @returns {?{key: string, bucket: string}}
 */
export const parseBlobAddress = (blobAddressString: string): Object => {
  if (!isString(blobAddressString)) {
    return null;
  }
  const parsed = (new RegExp(RE_BLOB_ADDRESS)).exec(blobAddressString.trim() || '');
  if (!parsed) {
    return null;
  }
  const [address, bucket, key] = Array.from(parsed);
  return {
    address,
    bucket,
    key,
  };
};

/**
 * Put file to blob store
 * @param bucketName
 * @param bufferOrStream {ArrayBuffer}
 * @param filename
 * @returns {Promise<string>} - returns blob address string
 */
export const putFile = async (
  bucketName: string,
  bufferOrStream: Buffer | ReadableStream,
  filename?: ?string,
) => new Promise(
  (resolve, reject) => client.connect(
    async (connectionError) => {
      if (connectionError) {
        reject(connectionError);
      }
      const db = client.db(config.BLOBSTORE_MONGO_DBNAME);
      const bucket = new mongodb.GridFSBucket(db, { chunkSizeBytes: 1024, bucketName });
      const blobHash = makeBlobHash(bufferOrStream);
      const keyName = filename || makeBlobHash(bufferOrStream);

      const sizeStr = Buffer.isBuffer(bufferOrStream) ? ` size ${bufferOrStream.byteLength} (bytes)` : null;

      const resourceDescriptionMsg = `blob with hash ${blobHash}${sizeStr || ''}`;
      const targetDescriptionMsg = `bucket "${bucketName}" and key "${keyName}"`;
      info(`Saving ${resourceDescriptionMsg} to ${targetDescriptionMsg}...`);

      const us = bucket.openUploadStream(blobHash)
        .on('error', reject)
        // Any echoing routines are expecting ArrayBuffer in response too
        .on('finish', () => {
          const blobAddress = makeBlobAddress(bucketName, blobHash);
          info(`Successfully saved ${resourceDescriptionMsg} to ${targetDescriptionMsg}, blob address: ${blobAddress}`);
          resolve(blobAddress);
        });
      if (Buffer.isBuffer(bufferOrStream)) {
        us.write(bufferOrStream);
        us.end();
      } else {
        bufferOrStream.pipe(us);
      }
    },
  ),
);

/**
 * Get file from blob store
 * // TODO(Ilya): Add stream output support
 * @param bucketName {string} - bucket name
 * @param keyName m{string}
 * @returns {Promise<ArrayBuffer>}
 */
export const getFile = async (bucketName: string, keyName: string) => new Promise(
  (resolve, reject) => client.connect(
    (e) => {
      if (e) {
        reject(e);
      } else {
        info(`Fetching blob ${bucketName}/${keyName}`);
        const db = client.db(config.BLOBSTORE_MONGO_DBNAME);
        const bucket = new mongodb.GridFSBucket(db, {
          chunkSizeBytes: 1024,
          bucketName,
        });

        const downloadStream = bucket.openDownloadStreamByName(keyName);
        downloadStream.on('error', reject);

        const resultBuffers = [];
        let fetchedSize = 0;
        downloadStream.on('data', (data) => {
          fetchedSize += (data.length || 0);
          resultBuffers.push(data);
        });

        downloadStream.on('end', () => {
          const resultBuffer = Buffer.concat(resultBuffers);
          info(`Blob ${bucketName}/${keyName} (${fetchedSize} bytes) is fetched from blob store`);
          resolve(resultBuffer);
        });
      }
    },
  ),
);

/**
 * Save data tree blobs to store
 * @param entity {RequestPayloadType} - RPC request payload
 * @param bucketName
 * @returns {*}
 */
export const offloadBlobs = async (
  entity: RequestPayloadType,
  bucketName: string,
): Promise<RequestPayloadType> => visitorAsync(
  entity,
  async (mayBeBlob) => {
    if (Buffer.isBuffer(mayBeBlob)) {
      return putFile(bucketName, mayBeBlob, null);
    }
    return mayBeBlob;
  },
);

/**
 * Save data tree blobs to store
 * @param entity {RequestPayloadType} - RPC request payload
 * @param useBase64
 * @returns {*}
 */
export const loadBlobs = async (
  entity: RequestPayloadType,
  useBase64: boolean = false,
): Promise<Object> => visitorAsync(
  entity,
  undefined,
  async (mayBeBlob) => {
    if (isBlobAddress(mayBeBlob)) {
      const blobAddr = parseBlobAddress(mayBeBlob);
      const f = (await getFile(blobAddr.bucket, blobAddr.key));
      return useBase64 ? f.toString('base64') : f;
    }
    return Promise.resolve(mayBeBlob);
  },
);
