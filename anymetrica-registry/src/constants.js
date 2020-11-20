/* @flow */
import {
  ADMINISTRATING,
  CAN_READ_RELATIONS,
  EntityType,
  EntityTypeArr,
  INPUT,
  OTP,
  OUTPUT,
  HAVE_PART,
  RelationTypeArr,
  SessionToken,
  UsernamePassword,
} from 'anymetrica-api/dist/enums';
import type { BlobStoreParamsType } from './types';

export const DEFAULT_CYPHER_DEBUG = true;

// /**
//  *
//  * @type {{}|Object}
//  */
// export const METADATA_FIELDS = array2dict([
//   'type',
//   'label',
//   'created_ts',
//   'updated_ts',
//   'deleted_ts',
//   'is_deleted',
// ]);

/**
 * @constant HEARTBEAT_SERVER_MESSAGE {string} - Server response heartbeat message
 * @type {string}
 */
export const HEARTBEAT_SERVER_MESSAGE = 'OK';

/**
 * @constant PROTO_LOADER_CONF {{
 *   keepCase: boolean,
 *   longs: Object,
 *   enums: Object,
 *   defaults: boolean,
 *   oneofs: boolean,
 * }} - Protocol buffers loader configuration
 */
export const PROTO_LOADER_CONF = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

/**
 * Max graph traverse depth
 * @type {number}
 */
export const MAX_GRAPH_TRAVERSE_DEPTH = 32;


/**
 * Min graph traverse depth (only edges to self)
 * @type {number}
 */
export const MIN_GRAPH_TRAVERSE_DEPTH = 0;

/**
 * Default graph traverse depth
 * @type {number}
 */
export const DEFAULT_GRAPH_TRAVERSE_DEPTH = 4;

/**
 * Possible agent entities
 * TODO Ilya: move to generic relations schema above
 */
export const AGENT_LIKE_ENTITIES = [
  EntityType.Human,
  // EntityType.Program,
  EntityType.Device,
  EntityType.Vehicle,
];

export const ALL_GRANTED = [ADMINISTRATING, HAVE_PART, OUTPUT, INPUT];
/**
 * Relations that are allowing everything
 * @type {*[]}
 */
export const WIDE_PERMISSIVE_RELATIONS = [CAN_READ_RELATIONS, ...ALL_GRANTED];

/**
 * Credential type entities
 * @type {*[]}
 */
export const CREDENTIAL_ENTITY_TYPES = [UsernamePassword, OTP, SessionToken];


/**
 * ELABELS Edge labels
 * @type {string[]}
 */
export const ELABELS = Object.values(RelationTypeArr).sort();

/**
 * VLABELS Vertex Labels
 * @type {string[]}
 */
export const VLABELS = Object.values(EntityTypeArr).sort();


/**
 * @const Error messages
 */
export const RESTRICTED_ERROR_MSG = 'Restricted';
export const INVALID_CREDENTIAL_ERROR_MSG = 'Invalid credential';
export const NEED_CREDENTIAL_PRIVATE_PATH_ERROR_MSG = 'Credential private part is required';
export const NOT_IMPLEMENTED_ERROR_MSG = 'Unimplemented permissions check';
export const SERVER_SIDE_ERROR_MSG = 'Problem with data record on server side';
export const ENTITY_TYPE_REQUIRED_MSG = 'Entity type is required';


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
 * Credentials
 * @type {number}
 */
export const SESSION_TOKEN_LENGTH_BYTES = 128;
export const OTP_TOKEN_LENGTH_BYTES = 16;
export const ADMIN_OTP_TOKEN_LIFETIME_SECONDS = SECONDS_IN_WEEK;
export const SESSION_TOKEN_TTL_SECONDS = SECONDS_IN_MONTH;
export const USER_PASSWORD_TTL_SECONDS = SECONDS_IN_MONTH;
export const USER_OTP_TOKEN_LIFETIME_SECONDS = SECONDS_IN_MONTH;
/**
 * @export constant Credential_ENCRYPTION
 */
export const CREDENTIAL_ENCRYPTION = {
  FUNCTION_NAME: 'argon2i',
  PARAMETERS: {
    t: 4, // -t
    m: 13, // -m
    p: 2, // -p
    v: 19,
  },
  SALT_SIZE_BYTES: 16, // [salt]
};


export const DEFAULT_ADMINISTRATIVE_EMAIL = 'admin@anymetrica.com';
export const DEFAULT_ADMINISTRATIVE_NAMESPACE = 'anymetrica';

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

/**
 * VAD
 * @constant VAD_AGGRESSIVENESS_LEVEL_TO_EVENT
 * @type {Object}
 */

export const VAD_DEFAULT_PARAMS = {
  aggressivenessLevels: [0, 1, 2, 3],
  frameDurationMs: 50,
  paddingDurationMs: 500,
};

export const CONFIG_DEVELOPMENT_NAME = 'config.development.json';
export const CONFIG_PRODUCTION_NAME = 'config.production.json';
