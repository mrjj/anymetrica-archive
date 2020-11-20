/* @flow */
import { compact, promiseMap, sortBy } from 'anymetrica-utils';
import { formatIds, makeObject } from '../utils/cypherUtils';
import { SOURCE_VAR, TARGET_VAR } from '../constants';
import { pgClientQueryAsync } from '../db';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';

/**
 * RemoveRelations handler
 *
 * @param request {RequestPayloadType}
 * @return {Promise<Object>}
 */
export const RemoveRelationsHandler: ProcessRequestFnType = async (request: RequestPayloadType) => {
  const relations = request.relations || [];
  const entities = {};
  const resultRelations = await promiseMap(
    relations,
    async ({ from_id, relation_types, to_id }) => {
      const fromObj = makeObject(null, { is_deleted: false, id: from_id }, SOURCE_VAR);
      const toObj = makeObject(null, { is_deleted: false, id: to_id }, TARGET_VAR);
      const res = (await pgClientQueryAsync(`
      MATCH ${fromObj} MATCH ${toObj} MATCH (${SOURCE_VAR})-[r]->(${TARGET_VAR})
      ${relation_types.length ? `WHERE label(r) IN ${formatIds(relation_types)}` : ''}
      DELETE r
      RETURN ${SOURCE_VAR}, ${TARGET_VAR}`)).rows[0];
      if (!entities[res[SOURCE_VAR].id]) {
        entities[res[SOURCE_VAR].id] = res[SOURCE_VAR];
      }
      if (!entities[res[TARGET_VAR].id]) {
        entities[res[TARGET_VAR].id] = res[TARGET_VAR];
      }
      return {
        from: res[SOURCE_VAR],
        from_id: res[SOURCE_VAR].id,
        relation_types,
        to: res[TARGET_VAR],
        to_id: res[TARGET_VAR].id,
      };
    },
  );

  return {
    entities: sortBy(compact(Object.values(entities)), ({ id }) => id),
    relations: sortBy(
      compact(resultRelations),
      ({ from_id, relation_types, to_id }) => `${from_id} ${to_id} ${relation_types.sort()
        .join(' ')}`,
    ),
  };
};
