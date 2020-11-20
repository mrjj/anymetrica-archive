/* @flow */
const pem = require('pem');
const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const { info, map, flatten } = require('anymetrica-utils');
const DEFAULT_CERTS_PATH = './build/certificates';

const run = async (certificatesPath = DEFAULT_CERTS_PATH) => {
  info(`Generating certificates for tests. Target folder:\n${path.resolve(certificatesPath)}`);
  shelljs.rm('-rf', certificatesPath);
  return flatten(await Promise.all(map(
    ['service', 'proxy'],
    async certTarget => {
      const dir = path.join(certificatesPath, certTarget);
      shelljs.mkdir('-p', dir);
      const {
        certificate,
        serviceKey,
        // ...resultPayload,
      } = await pem.promisified.createCertificate({
        days: 365,
        selfSigned: true,
      });
      const crtPath = path.join(dir, 'ca.crt');
      const keyPath = path.join(dir, 'ca.key');
      fs.writeFileSync(crtPath, certificate);
      fs.writeFileSync(keyPath, serviceKey);
      return [crtPath, keyPath];
    },
  )));
};

run(process.argv[2] || DEFAULT_CERTS_PATH).then(
  paths => info(`Certificates are generated:\n${paths.join('\n')}`),
);
// const { certificate, serviceKey, ...resultPayload } = await pem.promisified.createCertificate({
//   days: 1,
//   selfSigned: true,
// });
