#!/usr/bin/env node

const VAD = require('node-vad');
const Ds = require('deepspeech');

// These constants control the beam search decoder

// Beam width used in the CTC decoder when building candidate transcriptions
const BEAM_WIDTH = 1024;

// The alpha hyperparameter of the CTC decoder. Language Model weight
const LM_ALPHA = 0.75;

// The beta hyperparameter of the CTC decoder. Word insertion bonus.
const LM_BETA = 1.85;

// These constants are tied to the shape of the graph used (changing them changes
// the geometry of the first layer), so make sure you use the same constants that
// were used during training

// Number of MFCC features to use
const N_FEATURES = 26;

// Size of the context window used for producing timesteps in the input vector
const N_CONTEXT = 9;
const totalTime = hrtimeValue => (hrtimeValue[0] + hrtimeValue[1] / 1000000000).toPrecision(4);

const loadModel = ({ modelPath, alphabetTxtPath, trie, lm }) => {
  console.error('Loading model from file %s', modelPath);
  const model_load_start = process.hrtime();
  const vadModel = new Ds.Model(modelPath, N_FEATURES, N_CONTEXT, alphabetTxtPath, BEAM_WIDTH);
  const model_load_end = process.hrtime(model_load_start);
  console.error('Loaded model in %ds.', totalTime(model_load_end));

  if (lm && trie) {
    console.error('Loading language model from files %s %s', lm, trie);
    const lm_load_start = process.hrtime();
    vadModel.enableDecoderWithLM(alphabetTxtPath, lm, trie, LM_ALPHA, LM_BETA);
    const lm_load_end = process.hrtime(lm_load_start);
    console.error('Loaded language model in %ds.', totalTime(lm_load_end));
  }
  return vadModel;
};


const doVad = (vadModel, inputStream) => new Promise((resolve, reject) => {
  const vad = new VAD(VAD.Mode.NORMAL);
  const voice = { START: true, STOP: false };
  let sctx = vadModel.setupStream(150, 16000);
  let state = voice.STOP;

  function finishStream() {
    const model_load_start2 = process.hrtime();
    console.error('Running inference.');
    console.log('Transcription: ', vadModel.finishStream(sctx));
    const model_load_end2 = process.hrtime(model_load_start2);
    console.error('Inference took %ds.', totalTime(model_load_end2));
  }

  inputStream.on('data', (chunk) => {
    vad.processAudio(chunk, 16000).then((res) => {
      if (res === VAD.Event.SILENCE) {
        if (state === voice.START) {
          state = voice.STOP;
          finishStream();
          sctx = vadModel.setupStream(150, 16000);
        }
      } else if (res === VAD.Event.VOICE) {
        state = voice.START;
        vadModel.feedAudioContent(sctx, chunk.slice(0, chunk.length / 2));
      }
    });
  });
  inputStream.on('error', reject);
  inputStream.on('close', () => {
    finishStream();
    resolve();
  });
});

module.export = { doVad, loadModel };
