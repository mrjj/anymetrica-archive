/* @flow */
import { nowObj, pick } from 'anymetrica-utils';
import { HEARTBEAT_SERVER_MESSAGE } from '../constants';

/**
 * Heartbeat handler
 *
 * @param request
 * @return {Promise<Object>}
 * @constructor
 */
export const HeartbeatHandler = async (request) => {
  const now = nowObj();
  return {
    ...(pick(request, ['request_id', 'client_ts_seconds', 'client_ts_nanos'])),
    server_ts_seconds: now.seconds,
    server_ts_nanos: now.nanos,
    server_message: HEARTBEAT_SERVER_MESSAGE,
  };
};
