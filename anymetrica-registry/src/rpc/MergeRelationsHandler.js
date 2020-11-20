/* @flow */
import sortBy from 'lodash.sortby';
import { compact, promiseMap } from 'anymetrica-utils';
import { makeObject } from '../utils/cypherUtils';
import { SOURCE_VAR, TARGET_VAR } from '../constants';
import { pgClientQueryAsync } from '../db';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';
import { enforceSingleEntity } from '../dbAccessors';

/**
 * MergeRelations handler
 *
 * @param request {RequestPayloadType}
 * @return {Promise<Object>}
 */
export const MergeRelationsHandler: ProcessRequestFnType = async (request: RequestPayloadType) => {
  const relations = request.relations || [];
  const entities = {};
  const resultRelations = promiseMap(relations, async ({ from_id, relation_types, to_id }) => {
    const fromObj = makeObject(null, { is_deleted: false, id: from_id }, SOURCE_VAR);
    const toObj = makeObject(null, { is_deleted: false, id: to_id }, TARGET_VAR);
    const res = enforceSingleEntity((await pgClientQueryAsync(`
      MATCH ${fromObj} MATCH ${toObj}
      ${
      relation_types.map(
        relation_type => `MERGE (${SOURCE_VAR})-[:${relation_type}]->(${TARGET_VAR})`,
      ).join('\n')
      }
      RETURN ${SOURCE_VAR}, ${TARGET_VAR}`)).rows);
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
  });

  return {
    entities: sortBy(compact(Object.values(entities)), ({ id }) => id),
    relations: sortBy(
      compact(resultRelations),
      ({ from_id, relation_types, to_id }) => `${from_id} ${to_id} ${relation_types.sort()
        .join(' ')}`,
    ),
  };
};
