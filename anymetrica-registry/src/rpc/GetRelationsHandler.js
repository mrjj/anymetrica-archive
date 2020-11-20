/* @flow */
import sortBy from 'lodash.sortby';
import { aucs, isEmpty, isUndefined, MS_IN_SECOND, NANOS_IN_MS } from 'anymetrica-utils';
import { formatIds, makeObject } from '../utils/cypherUtils';
import {
  DEFAULT_GRAPH_TRAVERSE_DEPTH,
  FINAL_TARGET_VAR,
  MAX_GRAPH_TRAVERSE_DEPTH,
  MIN_GRAPH_TRAVERSE_DEPTH,
  NEXT_PATH_VAR,
  NEXT_RELATION_VAR,
  PATH_VAR,
  SOURCE_VAR,
  TARGET_VAR,
  WIDE_PERMISSIVE_RELATIONS,
} from '../constants';
import { pgClientQueryAsync } from '../db';
import { authorizedCall } from '../authorization';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';

const getUpdateTime = e => Math.floor(
  parseInt(e.metadata.updated_ts_seconds, 10) * MS_IN_SECOND
  + parseInt(e.metadata.updated_ts_nanos, 10) / NANOS_IN_MS,
);

/**
 * ReadRelations handler
 *
 * @param request {RequestPayloadType}
 * @param params {RequestParamsType}
 * @return {Promise<Object>}
 */
export const GetRelationsHandler: ProcessRequestFnType = authorizedCall(
  WIDE_PERMISSIVE_RELATIONS,
  async (request: RequestPayloadType) => {
    const {
      traverse_depth: requestTraverseDepth,
      two_way_discovery,
      types,
      relation_types,
      credential,
    } = request.request;
    const traverse_depth = Math.max(
      Math.min(
        requestTraverseDepth || DEFAULT_GRAPH_TRAVERSE_DEPTH,
        MAX_GRAPH_TRAVERSE_DEPTH,
      ),
      MIN_GRAPH_TRAVERSE_DEPTH,
    );
    // User credential ID as start point if no ids are defined explicitly
    const ids = isEmpty(request.ids) ? [credential.id] : request.ids;
    const sourceObj = makeObject(null, { is_deleted: false }, SOURCE_VAR);
    const targetObj = makeObject(null, { is_deleted: false }, TARGET_VAR);
    const finalTargetObj = makeObject(request.type, { is_deleted: false }, FINAL_TARGET_VAR);
    const targetLabels = aucs(
      isEmpty(relation_types) ? WIDE_PERMISSIVE_RELATIONS : relation_types,
    ).map(rt => `'${rt.toLowerCase()}'`).join(',');

    const relationArrow = two_way_discovery ? '' : '>';
    const q = `
      MATCH ${PATH_VAR} = allshortestpaths( ${sourceObj}-[*..${traverse_depth}]-${relationArrow}${targetObj} )
      MATCH ${NEXT_PATH_VAR} = (${TARGET_VAR})-[${NEXT_RELATION_VAR}]-${relationArrow}${finalTargetObj}
      WHERE ( 
        elabels(${PATH_VAR}, [${targetLabels}]) = TRUE 
      ) AND ( 
        ${SOURCE_VAR}.id IN ${formatIds(ids)} 
      )
      ${isEmpty(types) ? '' : `AND ( label(${FINAL_TARGET_VAR}) IN ${formatIds(types)} )`}       
      RETURN 
        ${NEXT_PATH_VAR} AS ${NEXT_PATH_VAR},
        ${FINAL_TARGET_VAR}.metadata.updated_ts_seconds as updated_ts_seconds, 
        ${FINAL_TARGET_VAR}.metadata.updated_ts_nanos as updated_ts_nanos
      ORDER BY 
        updated_ts_seconds, updated_ts_nanos 
        DESC
        `;
    const res = await pgClientQueryAsync(q);

    const relations = [];
    const entities = [];
    const entityUpdateTimes = {};
    res.rows.forEach((rec) => {
      const fromVertex = rec[NEXT_PATH_VAR].vertices[0];
      const from = { ...fromVertex.props };
      const toVertex = rec[NEXT_PATH_VAR].vertices[rec[NEXT_PATH_VAR].vertices.length - 1];
      const to = { ...toVertex.props };

      if (isUndefined(entityUpdateTimes[from.id])) {
        entities.push({ ...from, metadata: { ...from.metadata, type: fromVertex.label } });
        entityUpdateTimes[from.id] = getUpdateTime(from);
      }
      if (isUndefined(entityUpdateTimes[to.id])) {
        entities.push({ ...to, metadata: { ...to.metadata, type: toVertex.label } });
        entityUpdateTimes[to.id] = getUpdateTime(to);
      }
      relations.push({
        relation_type: rec[NEXT_PATH_VAR].edges[0].label.toUpperCase(),
        from_id: from.id,
        to_id: to.id,
      });
    });
    return {
      entities: sortBy(entities, ({ id }) => entityUpdateTimes[id]),
      relations: sortBy(
        relations,
        ({ relation_type, to_id }) => `${entityUpdateTimes[to_id]} ${relation_type}`,
      ),
    };
  },
);
