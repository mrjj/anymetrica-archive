/* eslint-disable no-undef */
/* @flow */
import React from 'react';
import { ms2obj } from 'anymetrica-utils';
import { ContentType } from 'anymetrica-api/dist/enums';
import { Button, Card, Col, Form, Icon, Row, Select, Spin } from 'antd';
import {
  AUDIO_BITS_PER_SECOND,
  AUDIO_BYTES_PER_SECOND,
  AUDIO_FILE_MAX_SIZE_BYTES,
  AUDIO_SAMPLES,
  BYTES_ON_WIRE_MAX,
} from '../constants';
import { TimeCode } from '../components/TimeCode';
import { registryClient } from '../client';

const TIMER_UPDATE_INTERVAL_MS = 100;

// const AudioBufferSlice = async (buffer, beginMs, endMs) => new Promise((resolve, reject) => {
//   let error = null;
//
//   // eslint-disable-next-line prefer-destructuring
//   const duration = buffer.duration;
//   const channels = buffer.numberOfChannels;
//   const rate = buffer.sampleRate;
//   console.log('buffer.numberOfChannels', buffer.numberOfChannels);
//
//   // milliseconds to seconds
//   const begin = beginMs / 1000;
//   const end = endMs / 1000;
//
//   if (begin < 0) {
//     error = new RangeError('begin time must be greater than 0');
//   }
//
//   if (end > duration) {
//     error = new RangeError(`end time must be less than or equal to ${duration}`);
//   }
//
//   const startOffset = rate * begin;
//   const endOffset = rate * end;
//   const frameCount = endOffset - startOffset;
//   let newAudioBuffer;
//
//   try {
//     newAudioBuffer = audioContext.createBuffer(channels, endOffset - startOffset, rate);
//     const anotherArray = new Float32Array(frameCount);
//     const offset = 0;
//
//     for (let channel = 0; channel < channels; channel += 1) {
//       buffer.copyFromChannel(anotherArray, channel, startOffset);
//       newAudioBuffer.copyToChannel(anotherArray, channel, offset);
//     }
//   } catch (e) {
//     error = e;
//   }
//   if (error) {
//     reject(error);
//   } else {
//     resolve(newAudioBuffer);
//   }
// });

const loadUriToBlob = async (uri): Promise<AudioBuffer> => {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      const e = new Error(`HTTP error, status = ${response.status}`);
      console.error(e);
      // noinspection ExceptionCaughtLocallyJS
      throw e;
    } else {
      const blob = await response.blob();
      return {
        type: response.headers.get('content-type') || 'audio/',
        blob,
      };
    }
  } catch (e) {
    console.error(e);
    throw (e);
  }
};

/**
 * From: https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file/
 * @param abuffer
 * @param len
 * @return {Blob}
 */
// eslint-disable-next-line no-unused-vars
const bufferToWave = (abuffer, len) => {
  const numOfChan = abuffer.numberOfChannels;
  const length = len * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels = [];
  let i;
  let sample;
  let offset = 0;
  let pos = 0;

  const setUint16 = (data) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };

  const setUint32 = (data) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // write WAVE header
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit (hardcoded in this demo)

  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  // write interleaved data
  for (i = 0; i < abuffer.numberOfChannels; i += 1) {
    channels.push(abuffer.getChannelData(i));
  }

  while (pos < length) {
    for (i = 0; i < numOfChan; i += 1) { // interleave channels
      sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
      // scale to 16-bit signed int
      // eslint-disable-next-line
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      view.setInt16(pos, sample, true); // write 16-bit sample
      pos += 2;
    }
    offset += 1; // next source sample
  }

  // create Blob
  return new Blob([buffer], { type: 'audio/ogg; codecs=opus' });
};

export class SoundCapturePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputDevices: [],
      isInitializing: true,
      isRecording: false,
      audioUrl: null,
      isUploaded: false,
      isUploading: false,
      recordingStartMs: 0,
      recordingEndMs: 0,
      syncError: null,
    };
    this.bytesOnWire = 0;
    this.audioBlobs = [];
    this.mediaRecorder = null;
  }

  async componentDidMount(): void {
    this.setState({ isInitializing: true });
    let finishState = { isInitializing: false };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const devices = (await navigator.mediaDevices.enumerateDevices()) || [];
      const inputDevices = devices.filter(d => (d.kind === 'audioinput'));
      finishState = {
        ...finishState,
        inputDevices,
        activeDeviceId: (inputDevices[0] || {}).deviceId,
      };
    }
    this.setState(finishState);
  }

  async syncToServer() {
    if (this.state.isUploading) {
      return;
    }
    this.setState({ syncError: null, audioUrl: null, isUploading: true });
    let audioUrl;
    if (this.audioBlobs.length > 0) {
      const audioBlob = this.audioBlobs[0];
      const { recordingEndMs, recordingStartMs } = this.state;
      await this.sendBlobToServer(
        audioBlob,
        {
          media_start_ts: ms2obj(recordingStartMs),
          media_end_ts: ms2obj(recordingEndMs),
        },
      );
      audioUrl = URL.createObjectURL(audioBlob);
      this.audioBlobs = this.audioBlobs.slice(1);
      const nowMs = (new Date()).getTime();
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        audioUrl: audioUrl || this.state.audioUrl,
        isUploading: false,
        recordingEndMs: recordingStartMs, // User previous start ts
        recordingStartMs: nowMs,
      });
      window.setTimeout(() => {
        this.syncToServer().catch((e) => {
          console.error(e);
          this.setState({ syncError: e.message || e.details });
        });
      }, 0);
    } else {
      this.setState({
        isUploading: false,
      });
    }
  }

  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = reject;
    });
  }

  async sendBlobToServer(blob, { media_start_ts, media_end_ts }) {
    // eslint-disable-next-line no-unused-vars
    const [content_type, media_type] = (blob.type || 'audio/').toLowerCase()
      .replace(/[\n\t\r ]+/g, '')
      .replace(/;.*$/g, '')
      .split('/');
    const name = `device-record-${media_start_ts.seconds}-${media_end_ts.seconds}.${media_type}`;
    const content = await this.blobToBase64(blob);
    try {
      const { entities } = await registryClient.MergeFiles({
        entities: [
          {
            name,
            content_type: ContentType.audio,
            media_type: 'ogg',
            media_start_ts,
            media_end_ts,
            content,
            size_bytes: blob.length,
            hashes: [],
          },
        ],
      });
      return entities;
    } catch (e) {
      this.setState({ syncError: e.message || `${e.code} ${e.details}` });
      throw e;
    }
  }

  // recorder.onstop = function (e) {
  //   var audio = document.createElement('audio');
  //   audio.src = window.URL.createObjectURL(new Blob(data));
  // };
  // recorder.start();
  // recorder.start();
  // setTimeout(function () {
  //   rec.stop();
  // }, 5000);
  // }).catch(function onError(error) {
  //   console.error(error.message);
  // });
  //   const transportArray = new Float32Array(ab.length);
  //   ab.copyFromChannel(transportArray, 0, 0);
  //   const buff = Uint8Array.from(new ArrayBuffer(transportArray));
  //   const content = bufferToBase64(buff);
  //   try {
  //     const { entities } = await registryClient.MergeFiles({
  //       entities: [
  //         {
  //           name,
  //           content_type,
  //           media_type,
  //           media_start_ts,
  //           media_end_ts,
  //           content,
  //           size_bytes: ab.length,
  //           hashes: [],
  //         },
  //       ],
  //     });
  //     return entities;
  //   } catch (e) {
  //     this.setState({ syncError: e.message || `${e.code} ${e.details}` });
  //     throw e;
  //   }


  // const gainNode = audioContext.createGain();
  // gainNode.gain.value = 1;
  // source.connect(gainNode);
  // gainNode.connect(audioContext.destination);


  async stopRecording() {
    if (this.counter) {
      window.clearInterval(this.counter);
      this.counter = null;
    }
    this.setState({ isRecording: false });
  }

  async toggleRecording(): void {
    if (this.state.isRecording
    ) {
      this.mediaRecorder.stop();
    } else {
      this.audioBlobs = [];
      const handleStream = (stream) => {
        const now = (new Date()).getTime();
        this.setState({
          recordingStartMs: now,
          recordingEndMs: now,
          isUploading: false,
          isUploaded: true,
        });
        if (!this.mediaRecorder) {
          this.mediaRecorder = new MediaRecorder(stream, {
            audioBitsPerSecond: AUDIO_BITS_PER_SECOND,
            AUDIO_FILE_MAX_SIZE_BYTES,
          });
          this.mediaRecorder.addEventListener('dataavailable', (e) => {
            console.log('Got media chunk with size:', e.data.size);
            const audioBlob = new Blob([e.data], { type: 'audio/ogg;codecs=opus' });
            this.audioBlobs.push(audioBlob);
            this.syncToServer().catch((se) => {
              console.error(se);
              throw se;
            });
          });
          this.mediaRecorder.addEventListener('stop', () => this.stopRecording());
        }
        this.mediaRecorder.start((BYTES_ON_WIRE_MAX / AUDIO_BYTES_PER_SECOND) * 1000);
        this.counter = window.setInterval(() => {
          this.setState({ recordingEndMs: (new Date()).getTime() });
        }, TIMER_UPDATE_INTERVAL_MS);
      };
      navigator.mediaDevices.getUserMedia({
        audio: this.state.activeDeviceId ? { deviceId: this.state.activeDeviceId } : true,
        video: false,
      }).then(handleStream);
      this.setState({ isRecording: true });
    }
  }

  async loadSample(sampleUri) {
    console.info(`Loading audio sample resource from URI: ${sampleUri}`);
    const { blob } = await loadUriToBlob(sampleUri);
    this.blob = blob;
    if (!blob) {
      const syncError = `Sample resource not found: ${sampleUri}`;
      console.error(syncError);
      this.setState({ syncError });
      return;
    }
    const audioUrl = URL.createObjectURL(blob);
    this.setState({ audioUrl });
  }

  render() {
    const {
      isUploading,
      isUploaded,
      isRecording,
      isInitializing,
      audioUrl,
      syncError,
      activeDeviceId,
      inputDevices,
      recordingEndMs,
      recordingStartMs,
    } = this.state;
    const recDurSec = ((recordingEndMs - recordingStartMs) / 1000) || null;
    return (
      <Card title="Sound Capture test">
        <Spin spinning={isInitializing || isUploading} delay={500}>
          <Row gutter={16}>
            <Col span={8}>
              {(inputDevices.length > 0)
                ? (
                  <Select
                    label="Select recording device:"
                    disabled={isRecording || (inputDevices.length === 0)}
                    onChange={deviceNum => this.setState({ activeDeviceId: deviceNum })}
                    value={activeDeviceId}
                    defaultValue={(inputDevices[0] || {}).deviceId}
                    style={{ width: '100$' }}
                  >
                    {inputDevices.map(
                      (d, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Select.Option key={`${idx} ${d.deviceId}`} value={d.deviceId}>
                          {[idx, d.kind || '', d.label || ''].join(' ')}
                        </Select.Option>
                      ),
                    )}
                  </Select>
                ) : (
                  <span>No input devices (microphones) found or browser not supporting them!</span>
                )}
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <Button
                disabled={inputDevices.length === 0}
                onClick={() => this.toggleRecording()}
                style={{ width: '100%' }}
              >
                {isRecording ? '⬛ Stop' : '🔴 Record audio'}
              </Button>
              {recDurSec
                ? (
                  <TimeCode
                    style={{ width: '100%', display: 'inline-block' }}
                    seconds={recDurSec}
                  />
                )
                : (<div className="fade" style={{ width: '100%' }}>No record</div>)}
            </Col>
            <Col span={4}>
              {syncError ? (<span style={{ color: 'red' }}>{syncError}</span>) : null}
              {isUploading ? (
                <span>
                  <span style={{ marginRight: '1em' }}>Uploading to server</span>
                  <Icon type="loading" />
                </span>
              ) : null}
              {((!isRecording) && isUploaded) ? (
                <div>
                  <span style={{ marginRight: '1em' }}>Uploaded to server</span>
                </div>) : null}
            </Col>
            <Col span={4}>
              Last fragment playback:
              {audioUrl
                ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <audio
                    id="player"
                    controls
                    src={audioUrl}
                    style={{ width: '100%' }}
                    onLoadedMetadata={async (e) => {
                      if (this.blob) {
                        const nowMs = (new Date()).getTime();
                        const startTsMs = nowMs - (e.target.duration * 1000);
                        const endTsMs = nowMs;
                        try {
                          await this.sendBlobToServer(
                            this.blob,
                            {
                              media_start_ts: ms2obj(startTsMs),
                              media_end_ts: ms2obj(endTsMs),
                            },
                          );
                          this.setState({ isUploading: false, isUploaded: true });
                          this.blob = null;
                        } catch (audioSendError) {
                          console.error(audioSendError);
                          throw audioSendError;
                        }
                      }
                    }}
                  />
                )
                : null
              }
            </Col>
            <Col span={4}>
              {
                AUDIO_SAMPLES.map(({ uri, duration }) => (
                  <Form.Item key={uri}>
                    <Button onClick={() => this.loadSample(uri)}>
                      Load sample (
                      {duration}
                      )
                    </Button>
                  </Form.Item>
                ))
              }
            </Col>
          </Row>
        </Spin>
      </Card>
    );
  }
}

// <a href={process.env.PUBLIC_URL + '/audio/test_sample_01_13.ogg'}>Sample 1</a>
// <a href={process.env.PUBLIC_URL + '/audio/test_sample_21_45.ogg'}>Sample 2</a>
