/* @flow */

import { aucs, each, error, forceArray, isEmpty, isObject, omit, pick } from 'anymetrica-utils';
import { OTP, OWNS, SessionToken, TOTP, UsernamePassword } from 'anymetrica-api/dist/enums';
import { pgClientQueryAsync } from './db';
import {
  AGENT_LIKE_ENTITIES,
  DEFAULT_GRAPH_TRAVERSE_DEPTH,
  MAX_GRAPH_TRAVERSE_DEPTH,
  PATH_VAR,
  TARGET_VAR,
} from './constants';

import type { GrpcRequestPayloadType, ResponsePayloadType } from './types';
import { formatIds, makeObject } from './utils/cypherUtils';

/**
 * Convert Cypther request result to entities
 * @param requestResult
 * @param v
 * @returns {Array<GrpcRequestPayloadType>}
 * @private
 */
export const _getEntitiesFromRequest = (
  requestResult: { rows: Array<Object> },
  v: string = TARGET_VAR,
): Array<ResponsePayloadType> => requestResult.rows.map(
  (entity) => {
    const props = (entity[v].props);
    const type = entity[v].label;
    const result = { ...props, metadata: { ...(props.metadata || {}), type } };
    return type === UsernamePassword ? omit(result, ['password']) : result;
  },
);

/**
 * Get single Entity or `null` and warn if there are more.
 * @param existingEntities {?Array<GrpcRequestPayloadType>}
 * @returns {?GrpcRequestPayloadType}
 */
export const enforceSingleEntity = (existingEntities: Array<Object>) => {
  if (existingEntities.length > 1) {
    error(`More that one ${existingEntities.length} entity found to be updated`);
  }
  if (existingEntities.length === 0) {
    return null;
  }
  const existingEntity = existingEntities[0];
  if (existingEntity.is_revoked) {
    error(`Trying to get revoked Credential(ID=${existingEntity.id})`);
  }
  return existingEntity;
};

/**
 * Get existing entities by Id or Credential `public`
 * following `type` constraint field and force defined type.
 *
 * @param entitiesOrId {Array<string | GrpcRequestPayloadType>}
 * @param types {Array<EntityType>} - type filter
 * @returns {Promise<Array<GrpcRequestPayloadType>>}
 */
export const getEntities = async (
  entitiesOrId: Array<string | GrpcRequestPayloadType>,
  types: Array<string>,
): Promise<Array<GrpcRequestPayloadType>> => {
  if (isEmpty(entitiesOrId)) {
    return [];
  }
  const ids = [];
  const conditions = [];
  each(
    forceArray(entitiesOrId),
    (entityOrId: string | GrpcRequestPayloadType) => {
      if (isEmpty(entityOrId)) {
        return;
      }
      const id = (typeof entityOrId === 'string') ? entityOrId : entityOrId.id;
      if (id) {
        ids.push(id);
      } else {
        forceArray(types).forEach((type) => {
          if (!type) {
            return;
          }
          // TODO: Add by-field filters
          let conditionObj = {};
          if (isObject(entityOrId) && (type === UsernamePassword)) {
            conditionObj = pick(entityOrId, ['username', 'namespace']);
            if (!conditionObj.username) {
              throw new Error('Field "username" not found');
            }
          } else if (isObject(entityOrId) && (type === TOTP)) {
            conditionObj = pick(entityOrId, ['totp']);
            if (!conditionObj.totp) {
              throw new Error('Field "totp" not found');
            }
          } else if (isObject(entityOrId) && (type === OTP)) {
            conditionObj = pick(entityOrId, ['otp']);
            if (!conditionObj.otp) {
              throw new Error('Field "otp" not found');
            }
          } else if (isObject(entityOrId) && (type === SessionToken)) {
            conditionObj = pick(entityOrId, ['session_token']);
            if (!conditionObj.session_token) {
              throw new Error('Field "session_token" not found');
            }
          }
          if (!isEmpty(conditionObj)) {
            conditions.push(
              aucs(Object.keys({ type, ...conditionObj })).map(
                k => (conditionObj[k] ? `${TARGET_VAR}.${k} = '${conditionObj[k]}'` : null),
              ).join(' AND '),
            );
          }
        });
      }
    },
  );
  /**
   * Build MATCH request
   */
  if (!isEmpty(ids)) {
    conditions.push(`${TARGET_VAR}.id in ${formatIds(aucs(ids))}`);
  }
  return _getEntitiesFromRequest(
    await pgClientQueryAsync(`
      MATCH ${makeObject(null, {}, TARGET_VAR)}
      WHERE 
        ( ${TARGET_VAR}.is_deleted <> TRUE )
        ${isEmpty(conditions) ? '' : `AND ${conditions.map(c => `( ${c} )`).join(' OR ')} `}
      RETURN 
        ${TARGET_VAR} AS ${TARGET_VAR},
        ${TARGET_VAR}.metadata.updated_ts_seconds as updated_ts_seconds, 
        ${TARGET_VAR}.metadata.updated_ts_nanos as updated_ts_nanos
      ORDER BY 
        updated_ts_seconds, updated_ts_nanos 
        DESC;`),
    TARGET_VAR,
  );
};

/**
 * Get agents related to credential
 * @param id
 * @param traverse_depth
 * @returns {Promise<Array<GrpcRequestPayloadType>>}
 */
export const getAgentsForCredentialId = async (
  id: string,
  traverse_depth: number = DEFAULT_GRAPH_TRAVERSE_DEPTH,
): Promise<ResponsePayloadType> => {
  const agentObject = makeObject(null, { is_deleted: false }, TARGET_VAR);
  const credentialObj = makeObject(null, { id });
  // TODO Move filtration to query
  const td = Math.min(traverse_depth || DEFAULT_GRAPH_TRAVERSE_DEPTH, MAX_GRAPH_TRAVERSE_DEPTH);
  const q = `
    MATCH 
      ${PATH_VAR} = allshortestpaths( ${credentialObj}<-[:${OWNS} *..${td}]-${agentObject} )
    WHERE 
      label(${TARGET_VAR}) IN ${formatIds(AGENT_LIKE_ENTITIES)}      
    RETURN 
      ${TARGET_VAR} AS ${TARGET_VAR},
      ${TARGET_VAR}.metadata.updated_ts_seconds as updated_ts_seconds, 
      ${TARGET_VAR}.metadata.updated_ts_nanos as updated_ts_nanos
    ORDER BY 
      updated_ts_seconds, updated_ts_nanos
    DESC;`;
  return _getEntitiesFromRequest(await pgClientQueryAsync(q), TARGET_VAR);
};
