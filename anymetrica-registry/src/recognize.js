/* eslint-disable */

const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const { info, error } = require('anymetrica-utils');
const { rmrf } = require('anymetrica-utils/lib/utils/fs');

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  path.join(__dirname, '../data/PBC-ML-test-32a767844bcc.json'));
const speech = require('@google-cloud/speech');

/*
FLAC	Free Lossless Audio Codec	Yes	16-bit or 24-bit required for streams
LINEAR16	Linear PCM	Yes
MULAW	μ-law	No
AMR	Adaptive Multi-Rate Narrowband	No	Sample rate must be 8000 Hz
AMR_WB	Adaptive Multi-Rate Wideband	No	Sample rate must be 16000 Hz
OGG_OPUS	Opus encoded audio frames in an Ogg container	No
      Sample rate must be one of 8000 Hz, 12000 Hz, 16000 Hz, 24000 Hz, or 48000 Hz
SPEEX_WITH_HEADER_BYTE	Speex wideband	No	Sample rate must be 16000 Hz
*/

/**
 * Get pre-initialized Google Maps API client
 * @returns {*}
 */
const asyncRecognizeGCSWords = async (
  filePath,
  // encoding = 'OGG_OPUS'
  encoding = 'LINEAR16',
  sampleRateHertz = 44100,
  // sampleRateHertz = 16000,  // 48000 // 24000
  languageCode = 'en-US',
  channels = 1,
  sync = true,
) => {
  /**
   * Convert input to .ogg
   */
  const EXT = '.wav';
  const outputFp = `${filePath.split('.').slice(0, -1).join('.')}${EXT}`;
  info(`Converting input to ${encoding} sample rate (hz): ${sampleRateHertz} channels: ${channels} language: ${languageCode}\n  ${filePath}  ->  ${outputFp}`);
  process.stdout.write(`target: ${outputFp}\n`);
  rmrf(outputFp);
  // pcm_s16le
  await (new Promise(
    resolve => ffmpeg(filePath)
      .setStartTime(0)
      .duration(30)
      .withAudioCodec('pcm_s16le')  // WAV 16
      .withAudioChannels(channels)
      .audioFrequency(sampleRateHertz)
      .toFormat(EXT.substring(1))
      .on('error', error)
      .on('end', resolve)
      .save(outputFp),
  ));
// await (new Promise(
//     resolve => ffmpeg(filePath)
//       .setStartTime(0)
//       .duration(10)
//       .withAudioChannels(channels)
//       .audioFrequency(sampleRateHertz)
//       .toFormat(EXT.substring(1))
//       .on('error', error)
//       .on('end', resolve)
//       .save(outputFp),
//   ));

  const client = new speech.SpeechClient();
  const now = (new Date()).getTime();

  const request = {
    audio: {
      content: fs.readFileSync(outputFp).toString('base64'),
    },
    config: {
      encoding,
      sampleRateHertz,
      languageCode,
      enableWordTimeOffsets: true,
      enableAutomaticPunctuation: true,
      //  enableSeparateRecognitionPerChannel: true
    },
  };

  let response;
  let operation;
  if (sync) {
    // Sync call
    info('Waiting for sync response from speech service');
    response = await client.recognize(request);
  } else {
    // Batch call
    info('Scheduling to Google Speech');
    operation = await client.longRunningRecognize(request);
    fs.writeFileSync(`./data/gspeech_${now}.json`, JSON.stringify(operation, null, 2));

    info('Scheduled, waiting for speech response');
    response = await operation[0].promise();
  }
  fs.writeFileSync(`./data/gspeech_${now}_result.json`, JSON.stringify(response, null, 2));


  response[0].results.forEach((result) => {
    info(`Transcription: ${result.alternatives[0].transcript}`);
    result.alternatives[0].words.forEach((wordInfo) => {
      // NOTE: If you have a time offset exceeding 2^32 seconds, use the
      // wordInfo.{x}Time.seconds.high to calculate seconds.
      const startSecs = `${`${wordInfo.startTime.seconds}` + '.'}${wordInfo.startTime.nanos / 100000000}`;
      const endSecs = `${`${wordInfo.endTime.seconds}`
      + '.'}${
      wordInfo.endTime.nanos / 100000000}`;
      info(`Word: ${wordInfo.word}`);
      info(`\t ${startSecs} secs - ${endSecs} secs`);
    });
  });
};
module.exports = asyncRecognizeGCSWords;
asyncRecognizeGCSWords(process.argv.slice(2)[0]).then(info).catch(error);
