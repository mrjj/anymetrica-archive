/* @flow */
const { error } = require('anymetrica-utils');
/**
 * Promisify gRPC client call
 * @param client
 * @param methodName
 * @param args
 * @return {Promise<*>}
 */
export const promiseClientCall = (
  client,
  methodName,
  args,
) => new Promise((resolve, reject) => {
  if (!client[methodName]) {
    throw new Error(
      `method "${methodName || ''}" not found. Possible methods: ${
        Object.keys(client).map(k => `"${k}"`).join(', ')}`,
    );
  }
  client[methodName](args, (e, res) => {
    if (e) {
      error('gRPC call error', e);
      reject(e);
    } else { resolve(res); }
  });
});
