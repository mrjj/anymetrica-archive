/* @flow */

import { isEmpty, nowObj } from 'anymetrica-utils';
import { CAN_WRITE } from 'anymetrica-api/dist/enums';
import { formatIds, makeObject } from '../utils/cypherUtils';
import { pgClientQueryAsync } from '../db';
import { authorizedCall } from '../authorization';
import { TARGET_VAR } from '../constants';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';

/**
 * Delete handler
 *
 * @return {Promise<*>}
 * @constructor
 * @param request {Request}
 * @param params
 */
export const DeleteHandler: ProcessRequestFnType = authorizedCall(CAN_WRITE, async (
  request: RequestPayloadType,
) => {
  const { ids } = request;
  const type = request.request.types[0];
  const { seconds, nanos } = nowObj();
  if (isEmpty(ids) && (!type)) {
    throw new Error('Please, specify entity type or ids to delete');
  }

  const objStr = makeObject(type || null, {}, TARGET_VAR);
  const idsCondition = isEmpty(ids) ? '' : `WHERE ${TARGET_VAR}.id IN ${formatIds(ids)}`;
  const res = await pgClientQueryAsync(`
      MATCH ${objStr} ${idsCondition}
      SET
        ${TARGET_VAR}.is_deleted = TRUE,
        ${TARGET_VAR}.deleted_ts_seconds = ${seconds},
        ${TARGET_VAR}.deleted_ts_nanos = ${nanos}
      RETURN 
        ${TARGET_VAR} ORDER BY ${TARGET_VAR}.created_ts_seconds ASC;`);
  return res.rows.map(
    (rec: { [string]: { id: string, label: string, props: Object } }) =>
      ({
        id: rec[TARGET_VAR].id,
        metadata: {
          ...rec[TARGET_VAR].props,
          type: rec[TARGET_VAR].label,
        },
      }),
  );
});
