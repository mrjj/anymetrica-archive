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

export const getWebServiceConf = () => ({
  PORT: config.PORT,
  HOST: config.HOST,
  CERT: config.CERT,
  KEY: config.KEY,
  CA: config.CA,
  DEBUG: config.DEBUG,
  AUTO_START: config.AUTO_START,
});
