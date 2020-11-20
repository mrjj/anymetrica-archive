/* eslint-disable no-undef */
/* @flow */
import React from 'react';
import { Button } from 'antd';
import { obj2seconds } from 'anymetrica-utils';
import { TimeCode } from './TimeCode';

/*
    var ctx = document.createElement('canvas').getContext('2d');
    var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
    linGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.000)');
    linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');

    var wavesurfer = WaveSurfer.create({
      // Use the id or class-name of the element you created, as a selector
      container: '#waveform',
      // The color can be either a simple CSS color or a Canvas gradient
      waveColor: linGrad,
      progressColor: 'hsla(200, 100%, 30%, 0.5)',
      cursorColor: '#fff',
      // This parameter makes the waveform look like SoundCloud's player
      barWidth: 3
    });

    wavesurfer.on('loading', function (percents) {
      document.getElementById('progress').value = percents;
    });

    wavesurfer.on('ready', function (percents) {
      document.getElementById('progress').style.display = 'none';
    });

    wavesurfer.load('/example/media/demo.wav');
 */
export class SoundPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentTime: false,
      paused: false,
    };
  }

  render() {
    const { content_type, media_type, content } = this.props;
    if (!content) {
      return (<div className="fade">No preview available</div>);
    }
    let audioEl = document.getElementById(`audio-${this.props.id}`);
    if (!audioEl) {
      // eslint-disable-next-line no-undef
      audioEl = document.createElement('audio');
      const audioBlob = new Blob(
        [Buffer.from(content.data)],
        { type: `${content_type}/${media_type}` },
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      audioEl.setAttribute('id', `audio-${this.props.id}`);
      document.body.append(audioEl);
      audioEl.setAttribute('src', audioUrl);
    }
    audioEl.addEventListener('pause', () => {
      this.setState({ playing: false, paused: true });
    });
    audioEl.addEventListener('ended', () => {
      this.setState({ playing: false, paused: false });
    });
    audioEl.addEventListener('progress', () => {
      this.setState({ currentTime: audioEl.currentTime || 0 });
    });
    audioEl.addEventListener('play', () => {
      this.setState({ playing: true, paused: false });
    });
    const { media_start_ts, media_end_ts } = this.props;
    const durationSec = obj2seconds(media_end_ts) - obj2seconds(media_start_ts);
    /* eslint-disable-next-line no-nested-ternary */
    const icon = this.state.playing ? 'setting' : (this.state.paused ? 'pause' : 'caret-right');
    return this.props.content ? (
      <div style={{
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      >
        <Button
          icon={icon}
          onClick={() => {
            if (this.state.playing) {
              audioEl.pause();
            } else {
              audioEl.play();
            }
          }}
          shape="circle"
          htmlType="button"
          style={{ marginRight: '1em' }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="fade small" style={{ marginRight: '0.25', width: '5em' }}>
              progress:
            </div>
            <TimeCode seconds={{ seconds: this.state.currentTime, nanos: 0 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="fade small" style={{ marginRight: '0.25', width: '5em' }}>
              duration:
            </div>
            <TimeCode seconds={durationSec} />
          </div>
        </div>
      </div>) : (<div>File empty</div>);
  }
}
