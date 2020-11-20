import { nowObj } from 'anymetrica-utils';
import { promiseClientCall } from '../clientCall';
import { getClient, TEST_TIMEOUT_MS, TESTS_SUITE_TIMEOUT_MS } from './testsUtils';

describe('RegistryService.Heartbeat', () => {
  test('Check heartbeat', async (done) => {
    const client = getClient();
    const requestObj = { request_id: 137, client_ts: nowObj() };
    const response = await promiseClientCall(client, 'Heartbeat', requestObj);
    expect(response).toMatchObject({
      request_id: `${requestObj.request_id}`,
      client_ts: {
        seconds: `${requestObj.client_ts.seconds}`,
        nanos: requestObj.client_ts.nanos,
      },
      server_message: 'OK',
    });
    expect(response.server_ts.seconds).toBeTruthy();
    expect(
      (parseInt(response.server_ts.seconds, 10) * 1000)
      + (parseInt(response.server_ts.nanos, 10) / (1000 * 1000)),
    ).toBeGreaterThan(
      (requestObj.client_ts.seconds * 1000)
      + (requestObj.client_ts.nanos / (1000 * 1000)),
    );
    done();
  }, TEST_TIMEOUT_MS);
}, TESTS_SUITE_TIMEOUT_MS);
