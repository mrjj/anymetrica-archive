/* @flow */
import { CAN_RESET } from 'anymetrica-api/dist/enums';
import { authorizedCall } from '../authorization';
// import type { RequestPayloadType } from '../types';

/**
 * Reset handler (Supposed for triggering credentials
 * TODO(Ilya) Make real logic instead of mock
 *
 * @param request {RequestPayloadType}
 * @return {Promise<Object>}
 */
export const ResetHandler = authorizedCall(
  CAN_RESET,
  async (/* request: RequestPayloadType, */) => {
    throw new Error('ResetHandler is not implemented');
  },
);
