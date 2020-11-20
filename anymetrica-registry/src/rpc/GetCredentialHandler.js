/* @flow */

import { OTP, RelationType, SessionToken } from 'anymetrica-api/dist/enums';
import {
  error,
  forceArray,
  includes,
  isEmpty,
  nowObj,
  omit,
  promiseMap,
  uniq,
} from 'anymetrica-utils';
import { makeKvStr, makeObject } from '../utils/cypherUtils';
import { pgClientQueryAsync } from '../db';
import {
  SESSION_TOKEN_TTL_SECONDS,
  TARGET_VAR,
  USER_OTP_TOKEN_LIFETIME_SECONDS,
} from '../constants';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';
import { authorizedCall } from '../authorization';
import { makeOTP, makeWebSessionToken } from '../utils/encryption';
import { enforceSingleEntity, getEntities } from '../dbAccessors';

/**
 * GetCredentialHandler handler
 * @param request {RequestPayloadType}
 * @param params {RequestParamsType}
 * @return {Promise<*>}
 * @constructor
 */
export const GetCredentialHandler: ProcessRequestFnType = authorizedCall(
  RelationType.CAN_READ,
  async (request: RequestPayloadType) => {
    const types = request.request.types;
    const allIds = uniq([
      ...(forceArray(request.ids)),
      ...(forceArray(request.entities).map(({ id }) => id)),
    ]).sort();
    error('allIds', allIds, request);
    if (isEmpty(allIds)) {
      error('Empty ids list in get request');
      return [];
    }
    // Can throw security-related errors
    return promiseMap(
      await getEntities(allIds, types),
      async (obj) => {
        // If credentials not set and its auto-generating token we should create and persist
        // generated code, define its TTL and.
        if (
          includes([SessionToken, OTP], obj.metadata.type)
          && obj.is_not_set
          && (!obj.is_revoked)
        ) {
          const now = nowObj();
          const objCypher = makeObject(obj.metadata.type, { id: obj.id }, TARGET_VAR);
          let autogenMixin = {};
          if (obj.metadata.type === SessionToken) {
            const session_token = await makeWebSessionToken();
            autogenMixin = {
              session_token,
              token: session_token, // `token` field is Deprecated
              expires_ts_seconds: (now.seconds + SESSION_TOKEN_TTL_SECONDS),
              expires_ts_nanos: now.nanos,
            };
          } else if (obj.metadata.type === OTP) {
            autogenMixin = {
              otp: await makeOTP(),
              expires_ts_seconds: (now.seconds + USER_OTP_TOKEN_LIFETIME_SECONDS),
              expires_ts_nanos: now.nanos,
            };
          }
          const kv = makeKvStr({
            ...autogenMixin,
            is_not_set: false,
            metadata: {
              ...(obj.metadata || {}),
              updated_ts_seconds: now.seconds,
              updated_ts_nanos: now.nanos,
            },
          });
          await pgClientQueryAsync(`MATCH ${objCypher} SET ${kv};`);
        }
        return omit(enforceSingleEntity(await getEntities([obj.id], types)));
      },
    );
  },
);
