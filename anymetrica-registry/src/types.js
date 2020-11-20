/* @flow */

/**
 * COMMON
 */

import type {
  TDirection,
  TEntityType,
  TMoreResultsType,
  TRelationType,
} from 'anymetrica-api/dist/enums';
import type { EncryptionSchemaType } from './utils/encryption';

/**
 * Google .proto Well Known Types (WKT) TimeStamp
 * @type WktTsType {{ seconds: number, nanos: number }}
 */
export type WktTsType = { seconds: number, nanos: number };

/**
 * RAW ENTITY
 */

/**
 * @type GrpcEntityMetadataType {{
 *   id: string,
 *   is_deleted: boolean,
 *   type: EntityType,
 *   created_ts: WktTsType,
 *   updated_ts: WktTsType,
 *   deleted_ts: WktTsType
 * }} - Raw entity metadata type
 */
export type GrpcEntityMetadataType = {
  id: string,
  type: TEntityType,
  created_ts: WktTsType,
  updated_ts: WktTsType,
  deleted_ts: WktTsType
}

/**
 * @type GrpcEntityType {{ metadata: GrpcEntityMetadataType }} - Raw entity type
 */
export type GrpcEntityType = { metadata: GrpcEntityMetadataType /* Some other fields */ };

/**
 * @type EntityMetadataType {{
 *   id: string,
 *   is_deleted: boolean,
 *   created_ts_seconds: ?number,
 *   created_ts_nanos: ?number,
 *   updated_ts_seconds: ?number,
 *   updated_ts_nanos: ?number,
 *   deleted_ts_seconds: ?number,
 *   deleted_ts_nanos: ?number,
 * }} - Entity metadata type
 */
export type EntityMetadataType = {
  id: string,
  created_ts_seconds: ?number,
  created_ts_nanos: ?number,
  updated_ts_seconds: ?number,
  updated_ts_nanos: ?number,
  deleted_ts_seconds: ?number,
  deleted_ts_nanos: ?number,
}

/**
 * @type ProcessingEntityType {EntityMetadataType & {}} - Entity type
 */
export type ProcessingEntityType = EntityMetadataType & {}


/**
 * @type AccessLevelType {string} - Access level type enum
 */
export type AccessLevelType =
  'RESTRICTED'
  | 'CAN_DISCOVER'
  | 'CAN_READ'
  | 'CAN_RESET'
  | 'CAN_WRITE'
  | 'CAN_MANAGE';

/**
 * @type RelationType {{
 *   metadata: GrpcEntityMetadataType,
 *   subject_id: string,
 *   relation_type: AccessLevelType | 'OWNER',
 *   object_id: string,
 * }} - Relation type
 */
export type RelationType = {
  metadata: GrpcEntityMetadataType,
  subject_id: string,
  relation_type: RelationType,
  relation_types: RelationType,
  object_id: string,
}


/**
 * Entity type
 * @type EntityType {{
 *   id: string,
 *   metadata: EntityMetadataType,
 * }}
 */
export type EntityType = {
  id: string,
  metadata: GrpcEntityMetadataType,
}


/**
 * RAW GRPC REQ/RES Payload type
 */

type CredentialPayloadType = {
  otp: {
    otp: string
  },
  totp: {
    totp: string
  },
  session_token: {
    session_token: string
  },
  username_password: {
    username: string,
    password: string,
    namespace: string,
  },
}

/**
 * @type GrpcRequestPayloadType {{
 *   entities: Array<EntityType | RelationType | AccessRuleType>,
 *   ids: Array<string>,
 *   credential: ?Object,
 * }} - gRPC Request payload type
 */
export type GrpcRequestPayloadType = {
  request: {
    credential: ?CredentialPayloadType,
    limit: number,
    offset: number,
    traverse_depth: number,
    order: Array<{ property: string, direction: TDirection }>
  },
  ids: ?Array<string>,
  entities: ?Array<EntityType | RelationType>,
}

/**
 * @type GrpcResponsePayloadType {{
 *   entities: Array<EntityType | RelationType | AccessRuleType>,
 *   ids: Array<string>,
 *   type: EntityType,
 * }} - gRPC Response payload type
 */
export type GrpcResponsePayloadType = {
  response: {
    read_time: ?WktTsType,
    credential: ?CredentialPayloadType,
    skipped_results: ?number,
    more_results: TMoreResultsType
  },
  entities: Array<TEntityType | TRelationType>,
  ids: Array<string>,
}

/**
 * PROCESS
 */

/**
 * @type CredentialTypeType {string} - Credential record `credential_type` field
 */
export type CredentialTypeType = 'CREDENTIAL_SESSION_TOKEN' | 'CREDENTIAL_USERNAME_PASSWORD';

/**
 * @type CredentialRecordType {} - Credential record type
 */
export type CredentialRecordType = {
  id?: ?string,

  is_revoked?: boolean,
  is_not_set?: boolean,
  is_one_shot?: boolean,
  should_auto_regen?: boolean,

  public: string,
  private: ?string,
  credential_type: ?CredentialTypeType,
  metadata: { type: string },
}

/**
 * @type RequestPayloadType {{
 *   type?: ?EntityType,
 *   types?: Array<EntityType>,
 *   credentials: ?Object,
 *   ids: ?Array<string>,
 *   entities: ?(Array<EntityType | RelationType>),
 * }} - Request payload type
 */
export type RequestPayloadType = {
  request: {
    credential: CredentialRecordType,
    types: Array<TEntityType>,
  },
  // Could be placed here during internal processing
  // TODO: Get rid of this ambiguous behaviour
  credential: CredentialRecordType,
  two_way_discovery: ?boolean,
  relation_types: ?Array<string>,
  response: null,
  ids: Array<string>,
  relations: Array<RelationType>,
  entities: ?(Array<EntityType>),
  content?: ?any,
  name?: ?string,
};

/**
 * @type ResponsePayloadType {Array<EntityType | RelationType>} - Response payload type
 */
export type ResponsePayloadType = Array<EntityType | RelationType>;

/**
 * @type RequestParamsType {{ type: EntityType }} - Request params
 */
export type RequestParamsType = { type: EntityType }

/**
 * @type ProcessRequestFnType {(
 *   entities: RequestPayloadType,
 *   params: RequestParamsType,
 * ) => Promise<ResponsePayloadType>} - Process request handler
 */
export type ProcessRequestFnType = (
  payload: RequestPayloadType,
  mandatoryTypes: TEntityType | Array<TEntityType>,
) => Promise<ResponsePayloadType>;

/**
 * @type CheckPermissionsFnType {(
 *   entities: AccessRuleType,
 *   params: CheckPermissionsFnParamsType,
 * ) => Promise<?boolean>} - Check permissions handler type
 */
export type CheckPermissionsFnType = (
  auth_relation_types: ?TRelationType | Array<TRelationType>,
  fn: ProcessRequestFnType,
) => ProcessRequestFnType

export type BlobStoreParamsType = { bucketName?: string, hashAlgorithm?: EncryptionSchemaType };
