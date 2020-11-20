/* @flow */
import { defaults, error, info } from 'anymetrica-utils';
import { getGrpcConf, getWebServiceConf } from './configurator';
import { getGrpcServer } from './grpcServer';
import { bootstrapDb } from './bootstrapDb';
import { RPC_HANDLERS } from './rpc/handlers';
import { getProxy } from './grpcProxy';

/**
 * .env Config
 */

Error.stackTraceLimit = 64;
export const onError = (e) => {
  process.stderr.write(`Failed with error: ${e} ${e.stack ? e.stack : ''}\n`);
  process.exit(1);
};
process.on('uncaughtException', onError);
process.on('unhandledRejection', onError);

/**
 * Starts proxy server
 */
const mainProxy = async () => getProxy(defaults(getGrpcConf(), getWebServiceConf()));

/**
 * Starts server
 */
const mainServer = async () => new Promise(async (resolve) => {
  const server = getGrpcServer(
    getGrpcConf(),
    RPC_HANDLERS,
  );
  await bootstrapDb();
  server.listen();
  resolve(server);
});

if ([...(process.argv)].slice(2).indexOf('--server') !== -1) {
  info('Registry starting in server mode...');
  mainServer().then(() => info('Server started')).catch(onError);
} else if ([...(process.argv)].slice(2).indexOf('--proxy') !== -1) {
  info('Registry starting in proxy mode...');
  mainProxy().then(() => info('Proxy started')).catch(onError);
} else {
  error('Please, define --proxy or --server mode  flag to run');
  process.exit(1);
}

// module.exports = { server: mainServer, proxy: mainProxy, ...constants };
