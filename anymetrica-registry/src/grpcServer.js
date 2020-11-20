/* @flow */
/**
 * @fileOverview GRPC Node.js server wrapper
 */
import path from 'path';
import { PROTO_LOADER_CONF } from './constants';

const grpc = require('grpc');
const { get, info } = require('anymetrica-utils');
const { loadSync } = require('@grpc/proto-loader');

/**
 * Return running server object
 * @param c {Object}
 * Parameters:
 * - autoStart {boolean} - start right after init
 * @param handlers
 * @param customGrpcCredentials {grpc.CallCredentials} - Google gRPC client credentials
 * @return {module:grpc.Server}
 */
export const getGrpcServer = (c, handlers, customGrpcCredentials) => {
  const serviceProtoPath = path.resolve(c.GRPC_PROTO_PATH);
  const serviceName = c.GRPC_NAME;
  const servicePkg = c.GRPC_PKG;

  const key = c.GRPC_KEY;
  // eslint-disable-next-line no-unused-vars
  const ca = c.GRPC_CA;
  const cert = c.GRPC_CERT;
  const useTls = cert && key;
  const port = c.GRPC_PORT;
  const host = c.GRPC_HOST;
  const autoStart = c.AUTO_START;

  info(`Loading service config "${servicePkg}.${serviceName}" from "${serviceProtoPath}"`);
  info(`Service ${c.GRPC_PKG}.${c.GRPC_NAME}" .proto file: "${c.GRPC_PROTO_PATH || ''}"`);
  const packageDefinition = loadSync(serviceProtoPath, PROTO_LOADER_CONF);
  const proto = get(grpc.loadPackageDefinition(packageDefinition), servicePkg);
  const server = new grpc.Server({});
  server.addService(proto[serviceName].service, handlers);
  server.host = host;
  server.port = port;
  const keyCertConfPairs = [
    {
      private_key: key,
      cert_chain: cert,
    },
  ];
  const credentialsObj = customGrpcCredentials || (useTls
    ? grpc.ServerCredentials.createSsl(cert, keyCertConfPairs, null)
    : grpc.ServerCredentials.createInsecure());
  server.bind(`${host}:${port}`, credentialsObj);

  const vanillaStartFn = server.start;

  function startFn(...args) {
    info(`Starting GRPC server: "${useTls ? 'wss' : 'ws'}://${host}:${port}"`);
    vanillaStartFn.apply(server, args);
    info(`"${serviceName}" now listening on: "${useTls ? 'wss' : 'ws'}://${host}:${port}"`);
    return server;
  }

  server.listen = startFn;
  server.start = startFn;

  if (autoStart) {
    server.start();
  }
  return server;
};
