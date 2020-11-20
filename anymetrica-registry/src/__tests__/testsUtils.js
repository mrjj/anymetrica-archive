/* eslint-disable no-unused-vars */
/* @flow */
import grpc from 'grpc';
import fs from 'fs';
import path from 'path';
import execa from 'execa';
import { error, info, isFunction, loadConfig, wait } from 'anymetrica-utils';
import { loadSync } from '@grpc/proto-loader';
import { CONFIG_DEVELOPMENT_NAME, PROTO_LOADER_CONF } from '../constants';
import { pgClientQueryAsync } from '../db';

const shelljs = require('shelljs');

let serverShell;
let proxyShell;
const LOCK_FILE = './.test-server-lock.pid';

const TEST_SERVER_STDOUT_LOG = './logs/test-server.stdout.log';
const TEST_SERVER_STDERR_LOG = './logs/test-server.stderr.log';
const TEST_PROXY_STDOUT_LOG = './logs/test-proxy.stdout.log';
const TEST_PROXY_STDERR_LOG = './logs/test-proxy.stderr.log';

export const BOOTSTRAP_TIMEOUT_MS = 8 * 1000;
export const TEARDOWN_TIMEOUT_MS = 8 * 1000;

export const TEST_TIMEOUT_MS = 16 * 1000;
export const TESTS_SUITE_TIMEOUT_MS = 128 * 1000;
export const SERVER_BOOT_WAIT_TIME_MS = 4 * 1000;

/**
 * Apply service configuration
 */

const PROTO_PATH = path.join(__dirname, '..', '..', 'node_modules', 'anymetrica-api/protos/anymetrica/registry.proto');
const config = loadConfig(path.join(__dirname, '..', '..', CONFIG_DEVELOPMENT_NAME));
info(`Test client .proto path: ${PROTO_PATH}`);
const packageDefinition = loadSync(PROTO_PATH, PROTO_LOADER_CONF);
const serviceDefinition = grpc.loadPackageDefinition(packageDefinition).anymetrica.registry;

export const bootstrap = async (done) => {
  shelljs.mkdir('-p', './logs/');
  if (fs.existsSync(LOCK_FILE)) {
    info(`Found existing test server lock file ${LOCK_FILE}`);
    fs.appendFileSync(LOCK_FILE, `${process.pid}\n`);
  } else {
    info(`Creating test server lock file ${LOCK_FILE}`);
    fs.writeFileSync(LOCK_FILE, `${process.pid}\n`);
    if (!serverShell) {
      serverShell = execa('npm', [
        'run',
        'start:server',
      ], { localDir: path.join(__dirname, '..', '..'), shell: true })
        .then((result) => {
          info('server suspended', JSON.stringify(result));
          serverShell = null;
        })
        .catch((e) => {
          error('server process runner failed with Error:', e);
          serverShell = null;
          throw e;
        });
    }
    if (!proxyShell) {
      proxyShell = execa('npm', [
        'run',
        'start:proxy',
      ], { localDir: path.join(__dirname, '..', '..'), shell: true })
        .then((result) => {
          info('proxy suspended', JSON.stringify(result));
          proxyShell = null;
        })
        .catch((e) => {
          error('proxy process runner failed with Error:', e);
          proxyShell = null;
          throw e;
        });
    }
    await wait(SERVER_BOOT_WAIT_TIME_MS);
  }
  if (isFunction(done)) {
    done();
  }
  return Promise.resolve(null);
};

/**
 * Tear down
 *
 * @return {Promise<any>}
 */
export const teardown = async (done) => {
  if (serverShell && serverShell.pid) {
    info(`Killing existing server process ${serverShell.pid}`);
    shelljs.exec(`kill ${serverShell.pid}`);
    shelljs.exec(`wait ${serverShell.pid}`);
    serverShell = null;
  }
  if (proxyShell && proxyShell.pid) {
    info(`Killing existing proxy process ${proxyShell.pid}`);
    shelljs.exec(`kill ${proxyShell.pid}`);
    shelljs.exec(`wait ${proxyShell.pid}`);
    proxyShell = null;
  }
  if (fs.existsSync(LOCK_FILE)) {
    info(`Removing test server/proxy lock file ${LOCK_FILE}`);
    shelljs.rm('-rf', LOCK_FILE);
  } else {
    info(`No lock files found intact ${LOCK_FILE}`);
  }
  if (isFunction(done)) {
    done();
  }
  return Promise.resolve(null);
};

export const getClient = () => {
  const clientConnStr = `${config.GRPC_HOST || '0.0.0.0'}:${config.GRPC_PORT || 10001}`;
  info(`Creating gRpc client using endpoint: "${clientConnStr}" ...`);
  return new serviceDefinition.RegistryService(
    clientConnStr,
    grpc.credentials.createInsecure(),
  );
};

export const dropDb = async () => pgClientQueryAsync('MATCH (n) DETACH DELETE n;');

export const HUMAN1 = {
  first_name: 'Jack',
  last_name: 'Doe',
};
export const HUMAN2 = {
  first_name: 'Jill',
  last_name: 'Dull',
};
