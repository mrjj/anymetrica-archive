/* @flow */
/**
 * Based in Danby proxy by `ericbets`
 */

import http from 'http';
import https from 'https';

import express from 'express';
import WebSocket from 'ws';
import grpc from 'grpc';
import { loadSync } from '@grpc/proto-loader';

import { error, get, info, previewJSON } from 'anymetrica-utils';
import { PROTO_LOADER_CONF } from './constants';

/**
 * Run Proxy
 * @param c {{
 *   HOST: string,
 *   PORT: number,
 *   AUTO_START: boolean,
 *   CERT: null,
 *   KEY: null,
 *   CA: null,
 *   AUTO_START?: ?boolean,
 *   DEBUG: ?boolean,
 *   URL_PATH: string,
 *   GRPC_HOST: string,
 *   GRPC_PORT: number,
 *   GRPC_CERT: null,
 *   GRPC_KEY: null,
 *   GRPC_CA: null,
 *   GRPC_USE_TLS: boolean
 *   GRPC_PKG: string,
 *   GRPC_NAME: string,
 *   GRPC_PROTO_PATH: string,
 * }}
 * Parameters:
 * - autoStart {boolean} - start right after init
 * @return {Promise<*|Function>}
 */
export const getProxy = async (c) => {
  const clients = {};
  const useTls = c.CERT && c.KEY;
  info(`Configuring proxy endpoint: ${useTls ? 'wss' : 'ws'}://${c.HOST}:${c.PORT}${c.URL_PATH}`);

  /**
   * GRPC
   */
  info(`Configuring GRPC Upstream: ${c.GRPC_USE_TLS || (c.GRPC_CERT && c.GRPC_KEY) ? 'wss' : 'ws'}://${c.GRPC_HOST}:${c.GRPC_PORT}`);
  info(`Service ${c.GRPC_PKG}.${c.GRPC_NAME}" .proto file: "${c.GRPC_PROTO_PATH || ''}"`);

  const packageDefinition = loadSync(c.GRPC_PROTO_PATH, PROTO_LOADER_CONF);
  const ClientConstructor = get(
    grpc.loadPackageDefinition(packageDefinition, {
      convertFieldsToCamelCase: false,
      binaryAsBase64: true,
      longsAsStrings: false,
      deprecatedArgumentOrder: false,
    }),
    c.GRPC_PKG,
  );

  clients[c.GRPC_NAME] = new ClientConstructor[c.GRPC_NAME](
    `${c.GRPC_HOST}:${c.GRPC_PORT}`,
    grpc.credentials.createInsecure(),
  );

  const app = express();

  // WARNING: req param is used is
  // noinspection JSUnusedLocalSymbols
  const websocketHandler = (ws /* req */) => {
    const debugOn = c.DEBUG === true || process.env.DEBUG;
    ws.on('message', (msg) => {
      // FIXME: Get rid of `eval` use, replace with dynamic loading
      const respond = (data) => {
        if (debugOn) {
          info(`RES: ${JSON.stringify(previewJSON(data))}`);
        }
        try {
          ws.send(JSON.stringify(data));
        } catch (e) {
          error(e);
        }
        try {
          ws.close();
        } catch (wsE) {
          error(wsE);
        }
      };

      const onError = (e) => {
        error(e);
        const str = JSON.stringify({ error: { details: e.details, code: e.code } });
        try {
          ws.send(str);
        } catch (wsE) {
          error(wsE);
        }
        try {
          ws.close();
        } catch (wsE) {
          error(wsE);
        }
      };

      const obj = JSON.parse(msg);
      if (debugOn) {
        info(`REQ: ${JSON.stringify(previewJSON(obj))}`);
      }
      const metadata = new grpc.Metadata();
      const client = clients[obj.service];
      if (client) {
        if (typeof (obj.metadata) !== 'undefined') {
          Object.keys(obj.metadata).forEach(name => metadata.set(name, obj.metadata[name]));
        }
        client[obj.method](
          obj.payload,
          metadata,
          (err, response) => { if (err) { onError(err); } else { respond(response); } },
        );
      }
    });
  };

  /**
   * Endpoint TLS conf
   * TODO(ikutukov): verify that certs are working properly
   *
   * @type {*}
   */

  let tlsServer;
  if (useTls) {
    const options = {
      cert: c.CERT,
      key: c.KEY,
      ca: c.CA,
    };
    tlsServer = https.createServer(options, app);
  }
  Object.assign(app, c);

  const server = tlsServer ? https.createServer(app) : http.createServer(app);
  const wss = new WebSocket.Server({
    path: c.URL_PATH,
    server,
  });

  wss.on('connection', websocketHandler);
  wss.on('error', (e) => {
    throw new Error(e);
  });
  if (c.AUTO_START) {
    server.listen(c.PORT);
  }
  /**
   * Start
   */
  info(`Proxy ready and listening: ${useTls ? 'wss' : 'ws'}://${c.HOST}:${c.PORT}${c.URL_PATH}`);
  return app;
};
