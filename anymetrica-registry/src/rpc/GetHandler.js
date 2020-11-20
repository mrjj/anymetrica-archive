/* @flow */

import { aucs, forceArray, includes, isEmpty, promiseMap } from 'anymetrica-utils';
import { CAN_READ } from 'anymetrica-api/dist/enums';
import { formatIds } from '../utils/cypherUtils';
import { pgClientQueryAsync } from '../db';
import { CREDENTIAL_ENTITY_TYPES, TARGET_VAR } from '../constants';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';
import { authorizedCall } from '../authorization';
import { loadBlobs } from '../blobStore';

/**
 * Get handler
 * Will not used for Crednetial
 * @param request {RequestPayloadType}
 * @param params {RequestParamsType}
 * @return {Promise<*>}
 * @constructor
 */
export const GetHandler: ProcessRequestFnType = authorizedCall(CAN_READ, async (
  request: RequestPayloadType,
) => {
  const { ids, entities, request: { types } } = request;
  const allIds = aucs([
    ...(forceArray(ids)),
    ...(forceArray((entities || []).map(({ id }) => id))),
  ]);
  const conditions = [];
  if (!isEmpty(allIds)) {
    conditions.push(`${TARGET_VAR}.id IN ${formatIds(allIds)}`);
  }
  if (!isEmpty(types)) {
    conditions.push(`label(${TARGET_VAR}) IN [${types.map(type => `'${type}'`).join(', ')}]`);
  }
  const conditionsStr = isEmpty(conditions)
    ? ''
    : `WHERE ${conditions.map(condition => `( ${condition} )`).join(' AND ')}`;

  // Can throw security-related errors
  const res = await pgClientQueryAsync(`
    MATCH (${TARGET_VAR})
    ${conditionsStr}
    RETURN 
      ${TARGET_VAR} AS ${TARGET_VAR},
      ${TARGET_VAR}.metadata.updated_ts_seconds as updated_ts_seconds, 
      ${TARGET_VAR}.metadata.updated_ts_nanos as updated_ts_nanos 
    ORDER BY 
      updated_ts_seconds, updated_ts_nanos 
      DESC;`);
  return promiseMap(
    res.rows,
    async (rec: any) => {
      const currentType = rec[TARGET_VAR].label;
      if (includes(CREDENTIAL_ENTITY_TYPES, currentType)) {
        throw new Error('"GetHandler" function should be used to retrieve "Credential" entity, use "GetCredentialHandler" function instead');
      }
      const obj = rec[TARGET_VAR].props;
      const withType = {
        ...obj,
        metadata: { ...(obj.metadata || {}), type: currentType },
      };
      return loadBlobs(withType, true);
    },
  );
});
