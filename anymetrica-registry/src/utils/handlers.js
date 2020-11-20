/* @flow */
import { isObject } from 'anymetrica-utils';
import type { TEntityType } from 'anymetrica-api/dist/enums';
import { EntityUnknown } from 'anymetrica-api/dist/enums';
import { fromProto, toProto } from './entity';
import type { GrpcResponsePayloadType, ProcessRequestFnType } from '../types';

/**
 * Return promised handler as callback.
 *
 * @param asyncFn
 * @return {function(*=, *): (Promise<R>|Promise<R|*>)}
 */
export const asCallbackFn = asyncFn => (call, callback) => asyncFn(call)
  .then(res => callback(null, res))
  .catch(e => callback({
    details: `${e.message}`,
    code: e.code || 2,
  }));

/**
 * Make handler - handler wrapper
 * @returns {function(*=, *): (Promise<R>|Promise<R|*>)}
 * @param handler
 * @param type
 */
export const makeHandler = (handler: ProcessRequestFnType, type: TEntityType) => asCallbackFn(
  async ({ request }): Promise<GrpcResponsePayloadType> => {
    const importedRequest = fromProto(request);
    importedRequest.request = importedRequest.request || {};
    const rq = importedRequest.request.credential;
    importedRequest.request.credential = isObject(rq) ? rq[Object.keys(rq)[0]] : null;
    const response = await handler(importedRequest, type === EntityUnknown ? null : type);
    return toProto(response || {});
  },
);
