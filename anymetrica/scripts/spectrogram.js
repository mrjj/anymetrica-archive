/* @flow */
const path = require('path');
const get = require('lodash.get');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const execa = require('execa');
const { mkdirpSync, promiseMap } = require('anymetrica-utils/dist/anymetrica-utils');
const { rmrf } = require('anymetrica-utils/lib/utils/fs');
// const { mkdirpSync } = require('anymetrica-utils');
// const { MODELS_PATH } = require('../anymetrica-sosalka/src/constants');
// const { loadModel, doVad } = require('./ffmpeg-vad-streaming');

const onError = (e) => {
  console.error(e);
  process.exit(1);
};
process.on('uncaughtException', onError);
process.on('unhandledRejection', onError);

const IMAGE_RESOLUTIONS = [
  // { pixelsInSecond: 16, verticalResolutionPx: 64, name: 'small' },
  { pixelsInSecond: 128, verticalResolutionPx: 512, name: 'medium' },
  // { pixelsInSecond: 256, verticalResolutionPx: 512, name: 'large' },
];
const SILENCE_LEVELS = [
  { durationSec: 0.5, thresholdDb: -20, name: 'small-noisy' },
  { durationSec: 0.5, thresholdDb: -40, name: 'small-deep' },
  { durationSec: 1, thresholdDb: -20, name: 'medium-noisy' },
  { durationSec: 1, thresholdDb: -40, name: 'medium-deep' },
  { durationSec: 3, thresholdDb: -20, name: 'large-noisy' },
  { durationSec: 3, thresholdDb: -40, name: 'large-deep' },
];
const MAX_PICTURE_WIDTH = 1024 * 4;


const run = async (sourceFilePath, targetFolderPath) => {
  const fileName = path.basename(sourceFilePath);
  const fp = path.join(
    path.resolve(targetFolderPath || path.dirname(path.resolve(sourceFilePath))),
    fileName,
  );
  console.log(mkdirpSync)
  mkdirpSync(targetFolderPath);
  process.stdout.write(`Processing: ${fp}\n`);
  const benchmarkTimeStartMs = (new Date()).getTime();
  // Duration
  const durationMs = await (new Promise((resolve, reject) => {
    ffmpeg(sourceFilePath).ffprobe(0, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(Math.floor(get(data, 'format.duration', 0) * 1000));
      }
    });
  }));

  /**
   * Convert to WAV and save to target folder
   */
  const wavFp = `${fp}.wav`;
  rmrf(wavFp);
  await (new Promise(
    resolve => ffmpeg(sourceFilePath).toFormat('wav')
      .on('error', onError).on('end', resolve).save(wavFp),
  ));
  process.stdout.write(`wav: ${wavFp}\n`);

  /**
   * MP3
   * @type {string}
   */
  const mp3Fp = `${fp}.mp3`;
  rmrf(mp3Fp);
  await (new Promise(
    resolve => ffmpeg(sourceFilePath).toFormat('mp3')
      .on('error', onError).on('end', resolve).save(mp3Fp),
  ));
  process.stdout.write(`mp3: ${mp3Fp}\n`);

  /**
   * Normalize
   */
  const wavNormFp = `${fp}.norm.wav`;
  rmrf(wavNormFp);
  await (new Promise(
    resolve => ffmpeg()
      .input(wavFp, {
        loudnorm: 'I=-23:LRA=7:tp=-2:print_format=json',
        // lowpass: 'f=2500',
        // highpass: 'f=200',
      })
      .noVideo()
      .on('error', onError).on('end', resolve).save(wavNormFp),
  ));
  process.stdout.write(`normalized wav: ${wavNormFp}\n`);

  /**
   * Mono
   */
  const wavNormMonoFp = `${fp}.norm-mono.wav`;
  rmrf(wavNormMonoFp);
  await (new Promise(
    resolve => ffmpeg(wavNormFp)
      .outputOption('-ac 1')
      .on('error', onError)
      .on('end', resolve)
      .save(wavNormMonoFp),
  ));
  process.stdout.write(`normalized mono wav: ${wavNormMonoFp}\n`);

  /**
   * VAD
   */
  await (new Promise((resolve, reject) => {
    const silenceVadFp = `${fp}.silence-vad.txt`;
    rmrf(silenceVadFp);
    //
    const genOptions = parseOptions(stdio);
    console.log(genOptions);
    //
    const outS = fs.createWriteStream(silenceVadFp);
    outS.on('done', resolve).on('error', reject);
    //
    const waveform = new WaveformGenerator(genOptions);
    waveform.generateWaveform(fs.createReadStream(wavNormFp), outS);
    process.stdout.write(`silence VAD ${silenceVadFp}\n`);
  }));

  const model = loadModel({
    modelPath: path.join(MODELS_PATH, 'deepspeech-0.4.1-models/output_graph.rounded.pbmm'),
    alphabetTxtPath: path.join(MODELS_PATH, 'deepspeech-0.4.1-models/alphabet.txt'),
  });
  await doVad(model, ffmpeg().input(wavNormFp));
  const silenceRanges = { vad: [] };
  const vadFileNameSrc = `${sourceFilePath}.norm-mono.wav.vad.txt`;
  const vadFileNameDest = path.join(targetFolderPath, `${path.basename(sourceFilePath)}.norm-mono.wav.vad.txt`);
  let vadFileName;
  if (fs.existsSync(vadFileNameSrc)) {
    vadFileName = vadFileNameSrc;
  } else if (fs.existsSync(vadFileNameDest)) {
    vadFileName = vadFileNameDest;
  }
  if (vadFileName) {
    const vad = fs.readFileSync(vadFileName, 'utf8');
    const l = vad.length;
    let prevC = null;
    console.log('vad', vad);
    console.log('MS in tick', l / durationMs, durationMs / l);
    vad.split('').forEach((c, idx) => {
      const currentTimeMs = durationMs * (idx / l);
      if (c !== prevC) {
        if (c === '1') {
          silenceRanges.vad.push({ start: currentTimeMs / 1000 });
        } else if (silenceRanges.vad.length) {
          silenceRanges.vad[silenceRanges.vad.length - 1].end = currentTimeMs / 1000;
        }
        prevC = c;
      }
      if (idx === (silenceRanges.vad.length - 1)) {
        silenceRanges.vad[silenceRanges.vad.length - 1].end = currentTimeMs / 1000;
      }
    });
    // process.stdout.write(`silence VAD ${silenceVadFp}\n`);
  }

  /**
   * Silence ranges
   */
  SILENCE_LEVELS.forEach(({ name, thresholdDb, durationSec }) => {
    silenceRanges[name] = {};
    const ffmpegProcess = execa.shellSync(`ffmpeg -i "${wavNormFp}" -af silencedetect=n=${thresholdDb}dB:d=${durationSec} -f null -`);
    ffmpegProcess.stderr.split('\n')
      .filter(s => s.match(/\[silencedetect[^\]]*]/ig))
      .forEach((s) => {
        const start = parseFloat(((/silence_start: *([^ ]+)/ig.exec(s)) || [null, null])[1]);
        if (start) {
          silenceRanges[name].push({ start });
        }
        const end = parseFloat(((/silence_end: *([^ ]+)/ig.exec(s)) || [null, null])[1]);
        if (end) {
          if (silenceRanges[name].length === 0) {
            const duration = parseFloat(((/silence_duration: *([^ ]+)/ig.exec(s)) || [null, null])[1]);
            if (duration) {
              silenceRanges[name].push({ start: end - duration, end });
            } else {
              process.stderr.write(`Invalid silence range end in ffmpeg silence detect command output: "${s}"`);
            }
          } else {
            silenceRanges[name][silenceRanges[name].length - 1].end = end;
          }
        }
      });
  });

  const silenceVadFp = `${fp}.vad.txt`;
  rmrf(silenceVadFp);
  process.stdout.write(`silence ${silenceVadFp}\n`);
  rmrf(silenceVadFp);
  /**
   * Images
   */
  await promiseMap(
    IMAGE_RESOLUTIONS,
    async ({ pixelsInSecond, verticalResolutionPx, name }) => {
      const picWidth = Math.floor(Math.min(
        (durationMs / 1000.0) * pixelsInSecond,
        MAX_PICTURE_WIDTH,
      ));
      const picSize = `${picWidth}x${verticalResolutionPx}`;
      /**
       * Spectrum Pic
       */
      const spectrumPicFp = `${fp}.spectrum-${name}.png`;
      rmrf(spectrumPicFp);
      await (new Promise(
        resolve => ffmpeg(wavNormFp)
          .complexFilter([{
            filter: 'showspectrumpic',
            options: {
              s: picSize,
              legend: 0,
              color: 'channel',
              // mode: 'separate',
            },
          }]).on('error', onError).on('end', resolve).save(spectrumPicFp),
      ));
      process.stdout.write(`spectrum ${name}: ${spectrumPicFp}\n`);

      /**
       * Waveform Pic
       */
      console.log('Waveform picSize', picSize);
      const wavePicFp = `${fp}.wave-${name}.png`;
      rmrf(wavePicFp);
      await (new Promise(
        resolve => ffmpeg(wavNormFp)
          .complexFilter([{
            filter: 'showwavespic',
            options: {
              s: picSize,
              colors: 'reg|green|blue',
            },
          }]).on('error', onError).on('end', resolve).save(wavePicFp),
      ));
      process.stdout.write(`wave ${name}: ${wavePicFp}\n`);
    },
  );
  const benchmarkTimeEndMs = (new Date()).getTime();
  process.stdout.write(`Done in ${((benchmarkTimeEndMs - benchmarkTimeStartMs) / 1000).toFixed(4)} seconds\n`);
  return Promise.resolve();
};

if (process.argv.length <= 2) {
  process.stdout.write('use:\n $ node spectrogram.js [SRC FILE PATH] [TARGET FOLDER PATH]');
  process.exit(1);
}

const [filePath, targetFolderPath] = [...process.argv.slice(2)];

run(path.resolve(filePath), path.resolve(targetFolderPath) || path.dirname(path.resolve(filePath)))
  .then(process.stdout.write('Done\n'))
  .catch(onError);
