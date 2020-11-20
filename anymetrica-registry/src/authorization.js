/* @flow */
import grpc from 'grpc';
import difference from 'lodash.difference';
import intersection from 'lodash.intersection';
import type { TEntityType } from 'anymetrica-api/dist/enums';
import {
  EntityTypeArr,
  OTP,
  RelationType,
  RelationTypeArr,
  TOTP,
  UsernamePassword,
} from 'anymetrica-api/dist/enums';
import { aucs, forceArray, isEmpty, nowObj, omit, pick } from 'anymetrica-utils';
import type { CheckPermissionsFnType } from './types';
import {
  CREDENTIAL_ENCRYPTION,
  DEFAULT_GRAPH_TRAVERSE_DEPTH,
  INVALID_CREDENTIAL_ERROR_MSG,
  MAX_GRAPH_TRAVERSE_DEPTH,
  MIN_GRAPH_TRAVERSE_DEPTH,
  NEED_CREDENTIAL_PRIVATE_PATH_ERROR_MSG,
  SOURCE_VAR,
  TARGET_VAR,
  WIDE_PERMISSIVE_RELATIONS,
} from './constants';
import { formatIds, makeObject } from './utils/cypherUtils';
import { pgClientQueryAsync } from './db';
import { GrpcError } from './error';
import { makeHash, parseHashStr } from './utils/encryption';
import { getNowSeconds } from './utils/time';
import { enforceSingleEntity } from './dbAccessors';

/**
 * Check permissions
 * @param ids {?Array<string>}
 * @param credentialId {string}
 * @param relation_types
 * @param traverse_depth
 * @param types
 * @return {Promise<Array<string>>}
 */
const checkPermissionsForCredential = async (
  ids: ?Array<string>,
  credentialId: string,
  relation_types: Array<RelationType>,
  traverse_depth: number,
  types: Array<TEntityType>,
): Promise<Array<string>> => {
  const targetIds = aucs(ids);
  const targetLabelsStr = `[${aucs(relation_types).map(rt => `'${rt.toLowerCase()}'`).join(',')}]`;
  const sourceObj = makeObject(null, { id: credentialId }, SOURCE_VAR);

  const q = `
  MATCH p = allshortestpaths( ${sourceObj}-[*..${traverse_depth}]->(${TARGET_VAR}) ) 
  WHERE 
      elabels(p, ${targetLabelsStr}) = TRUE
      ${isEmpty(targetIds) ? '' : `AND ${TARGET_VAR}.id IN ${formatIds(targetIds)}`} 
    AND 
      (${TARGET_VAR}.is_deleted = FALSE OR ${TARGET_VAR}.is_deleted IS NULL) 
    AND
      (${SOURCE_VAR}.is_revoked = FALSE OR ${SOURCE_VAR}.is_revoked IS NULL)
    AND 
      (${SOURCE_VAR}.is_not_set = FALSE OR ${SOURCE_VAR}.is_not_set IS NULL)
    AND 
      (${SOURCE_VAR}.is_deleted = FALSE OR ${SOURCE_VAR}.is_deleted IS NULL)
    ${(isEmpty(types)
    ? ''
    : `AND label(${TARGET_VAR}) IN [${aucs(types).map(t => `'${t}'`).join(', ')}]`)}
    RETURN 
      ${TARGET_VAR}.id AS id;`;
  const checkRes = await pgClientQueryAsync(q);
  const allowedIds = aucs([...(forceArray(ids)), ...(checkRes.rows.map(({ id }) => id))]);
  const restrictedIds = difference(targetIds, allowedIds);
  if (restrictedIds.length > 0) {
    throw new GrpcError(`Access is restricted for: ${formatIds(restrictedIds)} and granted for: ${formatIds(allowedIds)}, target IDs were: ${formatIds(targetIds)}`, grpc.status.UNAUTHENTICATED);
  }
  return allowedIds;
};

/**
 * Revoke credential
 * @param id
 * @returns {Promise<void>}
 */
export const revokeCredentialIfExpired = async (id) => {
  // When result is guaranteed, revoke one-shot OTP code if one is used
  // TODO(post.ilya@gmail.com): Make transactional
  // TODO(post.ilya@gmail.com) Add OTPT support
  const revocationNow = nowObj();
  await pgClientQueryAsync(`
    MATCH ${makeObject(null, { id }, TARGET_VAR)}
    WHERE (
      ( 
        label(${TARGET_VAR}) = '${OTP}' 
      ) OR ( 
        ${TARGET_VAR}.expires_ts_seconds < ${getNowSeconds()} 
      )
    ) AND ( 
      ${TARGET_VAR}.is_revoked <> TRUE
    )
    SET
      ${TARGET_VAR}.is_revoked = TRUE,
      ${TARGET_VAR}.updated_ts_seconds = ${revocationNow.seconds},
      ${TARGET_VAR}.updated_ts_nanos = ${revocationNow.nanos};`);
};

/**
 * @function authorizedCall {CheckPermissionsFnType} - Permission check
 * @param auth_relation_types
 * @param fn
 * @returns {function(RequestPayloadType, RequestParamsType)}
 */
export const authorizedCall: CheckPermissionsFnType = (
  auth_relation_types,
  fn,
) => async (payload, mandatoryTypes) => {
  const types = isEmpty(mandatoryTypes) ? aucs([
    ...(forceArray(payload.type)),
    ...(forceArray(payload.types)),
    ...(forceArray((payload.request || { types: [] }).types)),
  ]) : forceArray(mandatoryTypes);
  const { ids, entities, request, relation_types } = payload;

  // Check entity types
  const invalidEntityTypes = difference(types, EntityTypeArr);
  if (invalidEntityTypes.length > 0) {
    const invalidRelationTypesStr = invalidEntityTypes.map(rt => `"${rt}"`).join(', ');
    throw new GrpcError(`Invalid entity types: "${invalidRelationTypesStr}"`, grpc.status.UNAUTHENTICATED);
  }
  // Check relation types
  const sanitizedRelationTypes = aucs([
    ...WIDE_PERMISSIVE_RELATIONS,
    ...(intersection(forceArray(auth_relation_types), forceArray(relation_types))),
  ]);
  const invalidRelationTypes = difference(sanitizedRelationTypes, RelationTypeArr);
  if (invalidRelationTypes.length > 0) {
    const invalidRelationTypesStr = invalidRelationTypes.map(rt => `"${rt}"`).join(', ');
    throw new GrpcError(`Invalid relation types: "${invalidRelationTypesStr}"`, grpc.status.UNAUTHENTICATED);
  }

  /**
   * Check cred existence
   */
  if (!request.credential) {
    throw new GrpcError('No credential record provided in request', grpc.status.UNAUTHENTICATED);
  }
  const fields = pick(
    request.credential,
    [
      'otp',
      'totp',
      'session_token',
      'username',
      // 'password',
      // 'namespace',
    ],
  );
  const fieldsAreValid = fields.username || fields.session_token || fields.otp || fields.totp;

  if (!fieldsAreValid) {
    throw new GrpcError(
      `No attributes suitable for credential lookup is defined for: ${JSON.stringify(fields)}`,
      grpc.status.UNAUTHENTICATED,
    );
  }
  const credentialObj = makeObject(
    null,
    {
      ...(fields),
      is_revoked: false,
      is_deleted: false,
    },
    SOURCE_VAR,
  );
  const credentialRes = enforceSingleEntity((await pgClientQueryAsync(`
    MATCH 
      ${credentialObj}
    WHERE ( 
      ${SOURCE_VAR}.expires_ts_seconds > ${nowObj().seconds} 
    ) OR (
      ${SOURCE_VAR}.expires_ts_seconds IS NULL
    )
    RETURN
      ${SOURCE_VAR};`)).rows);
  /**
   * Check cred existence
   */
  if (!credentialRes) {
    throw new GrpcError(
      `Credential record "${JSON.stringify(omit(fields, ['password']))}" not found`,
      grpc.status.UNAUTHENTICATED,
    );
  }
  const serverCredential = credentialRes[SOURCE_VAR].props;
  const credentialType = credentialRes[SOURCE_VAR].label;
  /**
   * Check encrypted private part of credentials if its KEY-pair
   */
  if ((credentialType === OTP) && ((!request.credential.otp) || (typeof request.credential.otp !== 'string'))) {
    throw new GrpcError(NEED_CREDENTIAL_PRIVATE_PATH_ERROR_MSG, grpc.status.UNAUTHENTICATED);
  }
  if ((credentialType === TOTP) && ((!request.credential.totp) || (typeof request.credential.totp !== 'string'))) {
    throw new GrpcError(NEED_CREDENTIAL_PRIVATE_PATH_ERROR_MSG, grpc.status.UNAUTHENTICATED);
  }
  if (credentialType === UsernamePassword) {
    if ((!request.credential.password) || (typeof request.credential.password !== 'string')) {
      throw new GrpcError(NEED_CREDENTIAL_PRIVATE_PATH_ERROR_MSG, grpc.status.UNAUTHENTICATED);
    }
    const { salt } = parseHashStr(serverCredential.password);
    const requestedPrivateHashed = await makeHash(
      request.credential.password,
      salt,
      CREDENTIAL_ENCRYPTION.FUNCTION_NAME,
      CREDENTIAL_ENCRYPTION.PARAMETERS,
      true,
    );
    if (requestedPrivateHashed !== serverCredential.password) {
      throw new GrpcError(INVALID_CREDENTIAL_ERROR_MSG, grpc.status.UNAUTHENTICATED);
    }
  }
  const credential = {
    ...serverCredential,
    metadata: {
      ...(serverCredential.metadata || {}),
      type: credentialType,
    },
  };

  // Traverse depth
  const traverse_depth = Math.max(
    Math.min(
      request.traverse_depth || DEFAULT_GRAPH_TRAVERSE_DEPTH,
      MAX_GRAPH_TRAVERSE_DEPTH,
    ),
    MIN_GRAPH_TRAVERSE_DEPTH,
  );

  /**
   * Check for IDs and use credential ID if no others are defined
   */
  const allInputIds = aucs([...ids || [], ...(entities || []).map(({ id }) => id)]);
  const legitIds = isEmpty(allInputIds) ? [] : await checkPermissionsForCredential(
    allInputIds,
    serverCredential.id,
    sanitizedRelationTypes,
    traverse_depth,
    types,
  );

  /**
   * Prepare resulting request
   *
   * TODO(Ilya): Add permissions!
   */
  const sanitizedPayload = {
    ...omit(payload, ['type']), // replaced by `types`
    ids: intersection(allInputIds, legitIds),
    entities,
    request: {
      ...(request.request || {}),
      types,
      credential,
      relation_types: isEmpty(relation_types) ? auth_relation_types : forceArray(relation_types),
      traverse_depth,
    },
    // credential, // Don't keep private in memory
  };
  return fn(sanitizedPayload);
};
