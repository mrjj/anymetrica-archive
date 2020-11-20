/* @flow */
/**
 * @constant HEARTBEAT_SERVER_MESSAGE {string} - Server response heartbeat message
 * @type {string}
 */
export const HEARTBEAT_SERVER_MESSAGE = 'OK';

export const DAYS_IN_YEAR = 365;
export const DAYS_IN_MONTH = 31;
export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
export const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
export const SECONDS_IN_WEEK = 7 * SECONDS_IN_DAY;
export const SECONDS_IN_YEAR = DAYS_IN_YEAR * SECONDS_IN_DAY;
export const SECONDS_IN_MONTH = DAYS_IN_MONTH * SECONDS_IN_DAY;

export const MS_IN_SECOND = 1000;
export const NANOS_IN_SECOND = 1000 * 1000 * 1000;
export const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;
export const MS_IN_HOUR = SECONDS_IN_HOUR * MS_IN_SECOND;
export const MS_IN_DAY = SECONDS_IN_DAY * MS_IN_SECOND;
export const MS_IN_WEEK = SECONDS_IN_WEEK * MS_IN_SECOND;
export const MS_IN_MONTH = DAYS_IN_MONTH * SECONDS_IN_DAY * MS_IN_SECOND;

export const RELATION_VAR = 'rel';
export const NEXT_RELATION_VAR = 'rel_next';
export const SOURCE_VAR = 'source';
export const TARGET_VAR = 'target';
export const OTHER_TARGET_VAR = 'otherTarget';
export const FINAL_TARGET_VAR = 'finalTarget';
export const PATH_VAR = 'p';
export const NEXT_PATH_VAR = 'p_next';

/**
 * Blob store bucket types
 */
export const BLOB_STORE_HASH_ALGORITHM = 'sha512';
export const BUCKET_AUDIO_RAW = 'audio-raw';
export const BUCKET_AUDIO_TRANSCODED = 'audio-transcoded';
export const BUCKET_AUDIO_SPECTROGRAMS = 'audio-spectrograms';
export const BUCKET_AUDIO_WAVEFORMS = 'audio-waveforms';
export const BUCKET_VIDEO_FROM_DEVICES = 'video-from-devices';
export const BUCKET_ML_MODELS = 'ml-models';

/**
 * Blob store params
 */
export const DEFAULT_BLOB_STORE_PARAMS: BlobStoreParamsType = {
  bucketName: BUCKET_AUDIO_RAW,
  hashAlgorithm: BLOB_STORE_HASH_ALGORITHM,
};

export const AUDIO_CONVERT_MEDIA_TYPE = 'wav';

export const AUDIO_CHARTS_MEDIA_TYPE = 'png';

export const RE_BLOB_ADDRESS = '^\\[\\[([^/]+)/(.+)]]$';

export const CONFIG_DEVELOPMENT_NAME = 'config.development.json';
export const CONFIG_PRODUCTION_NAME = 'config.production.json';
