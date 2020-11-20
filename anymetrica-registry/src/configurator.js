/* @flow */
/**
 * @fileOverview This small modules mapping config variables having same names as env
 * to the module-specific config naming
 */
import path from 'path';
import { info, loadConfig, setEnv } from 'anymetrica-utils';
import { CONFIG_DEVELOPMENT_NAME, CONFIG_PRODUCTION_NAME } from './constants';

process.stdout.write(`Env: ${process.env.NODE_ENV || ''}\n`);
export const SERVER_CONFIG_PATH = (process.env.NODE_ENV === 'production')
  ? path.resolve(CONFIG_PRODUCTION_NAME)
  : path.resolve(CONFIG_DEVELOPMENT_NAME);

info('Loading server config using following path:', SERVER_CONFIG_PATH);

export const config = loadConfig(SERVER_CONFIG_PATH);
// Load conf to env
setEnv(config, { overwriteNotEmpty: false, overwriteAll: false });

export const getAgensConf = () => ({
  user: config.AGENS_USER,
  max: config.AGENS_MAX,
  // idleTimeoutMillis: config.AGENS_IDLE_TIMEOUT_MILLIS,
  // connectionTimeoutMillis: config.AGENS_CONNECTION_TIMEOUT_MILLIS,
  password: config.AGENS_PASSWORD,
  database: config.AGENS_DATABASE,
  host: config.AGENS_HOST,
  port: config.AGENS_PORT,
  graphName: config.AGENS_GRAPH_NAME,
});

export const getGrpcConf = () => ({
  GRPC_PKG: config.GRPC_PKG,
  GRPC_NAME: config.GRPC_NAME,
  GRPC_PROTO_PATH: config.GRPC_PROTO_PATH,
  GRPC_KEY: config.GRPC_KEY,
  GRPC_CERT: config.GRPC_CERT,
  GRPC_CA: config.GRPC_CA,
  GRPC_PORT: config.GRPC_PORT,
  GRPC_HOST: config.GRPC_HOST,
  URL_PATH: config.URL_PATH,
  GRPC_USE_TLS: false,
});

export const getWebServiceConf = () => ({
  PORT: config.PORT,
  HOST: config.HOST,
  CERT: config.CERT,
  KEY: config.KEY,
  CA: config.CA,
  DEBUG: config.DEBUG,
  AUTO_START: config.AUTO_START,
});
