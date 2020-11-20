const VAD = require('node-vad');
const fs = require('fs');


// /* Normal mode */
// VAD_MODE_NORMAL = 0,
// /* Optimised for low bitrate */
// VAD_MODE_LOW_BITRATE = 1,
// /* Aggressive mode */
// VAD_MODE_AGGRESSIVE = 2,
// /* very aggressive mode */
// VAD_MODE_VERY_AGGRESSIVE = 3
// const stream = fs.createReadStream('/Users/ilyakutukov/projects/anymetrica-scope/public/audio/test_sample_03_51.wav');
const vad = new VAD(VAD.Mode.NORMAL);

const F = 16000;
const SAMPLES_PER_SEC = 10;
const timeMultiplier = (1000 / F) / (2 * 1000);
const highWaterMark = Math.floor((F * 2) / SAMPLES_PER_SEC);
const stream = fs.createReadStream('/Users/ilyakutukov/projects/anymetrica-scope/public/audio/test_sample_01_13.wav', { highWaterMark });
let idx = 0;
let time = 0;
let bytesCount = 0;
stream.on('data', (chunk) => {
  // const chunkLength = 60 / timeMultiplier;
  vad.processAudio(chunk, F).then(
    (res) => {
      bytesCount += chunk.byteLength;
      time = bytesCount * timeMultiplier;
      const min = Math.floor((time) / 60);
      const sec = Math.floor((time) % 60);
      const ms = Math.floor((time * 1000) % 1000);
      const t = `${min.toString().padStart(2, '0')}:${sec.toString()
        .padStart(2, '0')}.${ms.toString().padStart(4, '0')}`;
      switch (res) {
        case VAD.Event.ERROR:
          console.log(t, idx, 'ERROR');
          break;
        case VAD.Event.NOISE:
          console.log(t, idx, 'NOISE');
          break;
        case VAD.Event.SILENCE:
          console.log(t, idx, 'SILENCE');
          break;
        case VAD.Event.VOICE:
          console.log(t, idx, 'VOICE');
          break;
        default:
          break;
      }
      idx += 1;
    },
  ).catch(console.error);
});

