const WebSocket = require('ws');

const DEFAULT_CONFIG = {
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
};

const PING_INTERVAL_MS = 30000;

const wss = new WebSocket.Server(DEFAULT_CONFIG);

const noop = () => {
};

function heartbeat() {
  this.isAlive = true;
}


wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});


wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', function incoming(message) {
    process.stdout.write(`received: ${message}`);
  });
  try {
    ws.send('something');
    process.stdout.write(`sent answer`);
  } catch (e) {
    process.stderr.write(`Error during sending message: ${e.message} ${e.stack}`);
    /* handle error */
  }
});

const globalPingInterval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, PING_INTERVAL_MS);
