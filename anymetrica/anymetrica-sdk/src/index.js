/* @flow */
/**
 * Anymetrica SDK Installer build file
 */
const shell = require('shelljs');

// eslint-disable-next-line prefer-destructuring
const platform = process.platform;

const DEFAULT_ENV = {
  NODE_VERSION: '10.15.1',
  HABITUS_VERSION: '1.0.4'
};

// https://nodejs.org/api/process.html#process_process_platform
const SUPPORTED_PLATFORMS = [
  // 'aix',
  'darwin',
  // 'freebsd',
  'linux',
  // 'openbsd',
  // 'sunos',
  'win32',
];

const run = (env) => {
  shell.echo('Anymetrica SDK installer v0.10.0');

  if (SUPPORTED_PLATFORMS.indexOf(platform) === -1) {
    shell.echo(`Platform "${platform}" is not supported.`);
    shell.echo(`Possible ones are: ${SUPPORTED_PLATFORMS.map(p => `"${p}"`).join(', ')}`);
    shell.exit(1);
  }

  if ((!shell.which('node')) || (!shell.which('npm'))) {
    if (platform === 'win32') {
      shell.exec(`powershell -exec bypass -c "(New-Object Net.WebClient).Proxy.Credentials=[Net.CredentialCache]::DefaultNetworkCredentials;iwr('https://nodejs.org/dist/v${env.NODE_VERSION}/node-v${env.NODE_VERSION}-x64.msi')|iex"`);
      shell.exec(`msiexec.exe /i node-v${env.NODE_VERSION}-x64.msi /qn`);
    } else if (platform === 'darwin') {
      shell.exec(`curl -K https://nodejs.org/dist/v${env.NODE_VERSION}/node-v${env.NODE_VERSION}.pkg -o $(pwd)/node-v${env.NODE_VERSION}.pkg`);
      shell.exec(`sudo installer -store -pkg "$(pwd)/node-v${env.NODE_VERSION}.pkg"`);
    }
  }

  if (!shell.which('docker')) {
    if (platform === 'win32') {
      shell.exec('powershell scripts\\get-docker.ps1');
    } else {
      shell.exec('powershell scripts/get-docker.sh');
    }
  }

  if (!shell.which('habitus')) {
    if (platform === 'win32') {
      shell.exec(`powershell -exec bypass -c "(New-Object Net.WebClient).Proxy.Credentials=[Net.CredentialCache]::DefaultNetworkCredentials;iwr('https://github.com/cloud66-oss/habitus/releases/download/${env.HABITUS_VERSION}/habitus_windows_386.exe')|iex"`);
      shell.exec(`start ${env.HABITUS_VERSION}/habitus_windows_386.exe`);
    } else {
      shell.exec('bash ./scripts/habitus_install.sh');
    }
  }

  shell.exec('npm install yarn -g');
  shell.exec('npm install pegjs -g');
  shell.exec('npm run bootstrap');

  shell.echo('Done!');

  shell.exit(0);
};

if (require.main === module) {
  run({ ...DEFAULT_ENV, ...process.env });
}

module.exports = run;
