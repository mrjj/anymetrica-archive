/* @flow */
/**
 * Default GRPC host
 * @type {string}
 */
export const DEFAULT_GRPC_HOST = 'localhost';

/**
 * Default GRPC port
 * @type {number}
 */
export const DEFAULT_GRPC_PORT = 9093;

/**
 * Default GRPC protocol
 * @constant DEFAULT_GRPC_PROTOCOL {http|https}
 */
export const DEFAULT_GRPC_PROTOCOL = 'http';

/**
 * Default GRPC proxy port
 * @constant DEFAULT_GRPC_PROXY_PORT
 */
export const DEFAULT_GRPC_PROXY_PORT = 9094;

/**
 * Default GRPC proxy protocol
 * @const DEFAULT_GRPC_PROXY_PROTOCOL {http|https}
 */
export const DEFAULT_GRPC_PROXY_PROTOCOL = 'http';

/**
 *
 * @type {number}
 */
export const USER_SESSION_TOKEN_LIFETIME_SECONDS = 24 * 60 * 60;

/**
 *
 * @type {number}
 */
export const OTPT_TOKEN_LIFETIME_SECONDS = 24 * 60 * 60;

/**
 * @const USER_LOGIN_PASSWORD_LIFETIME_SECONDS
 * @type {number}
 */
export const USER_LOGIN_PASSWORD_LIFETIME_SECONDS = 365 * 24 * 60 * 60;

export const CREDENTIAL_TYPE = {
  CREDENTIAL_UNSPECIFIED: 'CREDENTIAL_UNSPECIFIED',
  CREDENTIAL_OTP: 'CREDENTIAL_OTP',
  CREDENTIAL_TOTP: 'CREDENTIAL_TOTP', // Currently not supported
  CREDENTIAL_SESSION_TOKEN: 'CREDENTIAL_SESSION_TOKEN',
  CREDENTIAL_USERNAME_PASSWORD: 'CREDENTIAL_USERNAME_PASSWORD',
};

/**
 * Labels for credential types
 */
export const CREDENTIAL_TYPE_VERBOSE = {
  CREDENTIAL_UNSPECIFIED: 'Unknown type',
  CREDENTIAL_OTP: 'OTP Credentials',
  CREDENTIAL_TOTP: 'TOTP Credentials',
  CREDENTIAL_SESSION_TOKEN: 'Session token',
  CREDENTIAL_USERNAME_PASSWORD: 'Username/Password',
};


/**
 * @const ACCESS_LEVEL - Access levels enum
 */
export const ACCESS_LEVEL = {
  RESTRICTED: 'RESTRICTED',
  CAN_READ_RELATIONS: 'CAN_READ_RELATIONS',
  CAN_WRITE_RELATIONS: 'CAN_WRITE_RELATIONS',
  CAN_READ: 'CAN_READ',
  CAN_WRITE: 'CAN_WRITE',
  CAN_RESET: 'CAN_RESET',
};

export const QR_CODE_MAX_SIZE = 512;

export const BITS_IN_BYTE = 8;
export const AUDIO_BYTES_PER_SECOND = 16000;
export const AUDIO_BITS_PER_SECOND = AUDIO_BYTES_PER_SECOND * BITS_IN_BYTE; // 128000

export const BYTES_IN_KILOBYTE = 1024;
export const BYTES_IN_MEGABYTE = 1024 * BYTES_IN_KILOBYTE;
export const AUDIO_FILE_MAX_SIZE_BYTES = 4 * BYTES_IN_MEGABYTE;
export const BYTES_ON_WIRE_MAX = AUDIO_FILE_MAX_SIZE_BYTES / 8;

export const AUDIO_CHARTS_ENCODING = 'base64';

export const AUDIO_SAMPLES = [
  { uri: `${process.env.PUBLIC_URL}/audio/test_sample_01_13.ogg`, duration: '01:13' },
  { uri: `${process.env.PUBLIC_URL}/audio/test_sample_21_45.ogg`, duration: '21:45' },
  { uri: `${process.env.PUBLIC_URL}/audio/test_sample_03_51.ogg`, duration: '03:51' },
  { uri: `${process.env.PUBLIC_URL}/audio/test_sample_00_30.ogg`, duration: '00:30' },
  { uri: `${process.env.PUBLIC_URL}/audio/test_sample_02_46.ogg`, duration: '02:46' },
  { uri: `${process.env.PUBLIC_URL}/audio/test_sample_05_09.ogg`, duration: '05:09' },
];

export const SENTRY_CONFIG = { dsn: 'https://12661b2cfa3c41e49d11c4368b8970c7@sentry.io/1421651' };
export const REQUEST_DEMO_ENABLED = false;

export const PROJECT_NAME = 'Anymetrica';
export const PROJECT_DESCRIPTION = 'Reliable solution to assess employee compliance with sales procedures';
