/**
 * @fileoverview: GRPC Client file auto-generated by gen-web-client.ks
 */

/**
 * Generated code
 */

const GRPCClient = (options) => {
  if (typeof window === 'undefined') {
      window = {
        WebSocket: undefined, 
        location : { port: 80, hostname: 'localhost', host: 'localhost:80', protocol: 'http:' }
      };
  }
  const { wsSchema, urlPath, host, port, webSocketClass } = {
    urlPath: '/grpc-ws',
    port: window.location.port,
    host: window.location.hostname,
    wsSchema: window.location.protocol === 'https:' ? 'wss:' : 'ws:',
    webSocketClass: window.WebSocket,
    ...(options || {}),
  };
  return {
    RegistryService: {
      Heartbeat: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'Heartbeat',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetMetadata: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetMetadata',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      Delete: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'Delete',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      Discover: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'Discover',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeRelations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeRelations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      RemoveRelations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'RemoveRelations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      ReplaceRelations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'ReplaceRelations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      TransferOwnership: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'TransferOwnership',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeOTPs: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeOTPs',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetOTPs: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetOTPs',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeTOTPs: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeTOTPs',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetTOTPs: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetTOTPs',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeSessionTokens: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeSessionTokens',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetSessionTokens: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetSessionTokens',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeUsernamePasswords: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeUsernamePasswords',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetUsernamePasswords: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetUsernamePasswords',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeOrganizations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeOrganizations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetOrganizations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetOrganizations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeHumans: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeHumans',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetHumans: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetHumans',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeDevices: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeDevices',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetDevices: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetDevices',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeVehicles: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeVehicles',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetVehicles: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetVehicles',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeContacts: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeContacts',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetContacts: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetContacts',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeGroups: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeGroups',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetGroups: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetGroups',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeLocations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeLocations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetLocations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetLocations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergePostalAddresses: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergePostalAddresses',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetPostalAddresses: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetPostalAddresses',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeFiles: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeFiles',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetFiles: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetFiles',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeWaveforms: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeWaveforms',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetWaveforms: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetWaveforms',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeVadResults: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeVadResults',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetVadResults: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetVadResults',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      MergeOperations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'MergeOperations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      GetOperations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'GetOperations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      CancelOperations: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'CancelOperations',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
      RequestDemo: (payload, metadata) => new Promise((resolve, reject) => {
        const ws = new webSocketClass(`${wsSchema}//${host}${port ? `:${port}` : ''}${urlPath}`);
        ws.onopen = () => ws.send(JSON.stringify({
          service: 'RegistryService',
          method: 'RequestDemo',
          payload,
          metadata,
        }));
        ws.onmessage = evt => resolve(JSON.parse(evt.data));
        ws.onerror = reject;
      }),
    },
  };
};


if (typeof exports === 'object') {
  module.exports = GRPCClient;
} else {
  window.GRPCClient = GRPCClient;
}