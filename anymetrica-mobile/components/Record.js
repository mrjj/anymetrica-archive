/* eslint-disable react/jsx-tag-spacing */
import React from 'react';
import { Button, WingBlank, Slider, Flex } from 'antd-mobile-rn';
import { Text, View } from 'react-native';
// Progress,
// Global ctx recording object_metadata
const PLAYBACK_PROGRESS_UPDATE_INTERVAL_MS = 512;

/**
 * result will be like "00:07:52"
 * @param durationMillis
 * @return {string}
 */

const durationMsToStr = durationMillis =>
  [
    Math.floor(durationMillis / (1000 * 60 * 60)),
    Math.floor(durationMillis / (1000 * 60)) % 60,
    Math.floor(durationMillis / 1000) % 60,
  ]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');

export default class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'zero',
      positionMillis: 0,
      durationMillis: 0,
      isPlaying: false,
      isMuted: false,
      playableDurationMillis: 0,
      volume: 0,
      playbackProgressPercents: 0,
      message: '',
      shouldCorrectPitch: true,
    };
  }

  /*
    Playback status
    export type PlaybackStatusToSet = {
      androidImplementation?: string,
      progressUpdateIntervalMillis?: number,
      positionMillis?: number,
      shouldPlay?: boolean,
      rate?: number,
      shouldCorrectPitch?: boolean,
      volume?: number,
      isMuted?: boolean,
      isLooping?: boolean,
    };
   */
  updateSoundStatus(status) {
    const { isPlaying, isMuted, positionMillis, durationMillis, playableDurationMillis, volume } = status;
    this.setState({
      positionMillis,
      durationMillis,
      isMuted,
      isPlaying,
      playableDurationMillis,
      volume,
    });
    this.setState({ message: `Playback position (ms): ${positionMillis}/${durationMillis}` });
  }

  /*

  const updateRecording = (status) => {
    if (status) {
      if (status.canRecord) {
        this.setState({
          isRecording: status.isRecording,
          recordingDuration: status.durationMillis
        })
      } else if (status.isDoneRecording) {
        console.log(this.isRecording, status.canRecord)
        this.setState({
          isRecording: false,
          recordingDuration: status.durationMillis
        })
        if (!this.state.isLoading) {
          // this.save()
          console.log(this.isRecording, status.canRecord)
        }
      }
    }
  }
 */
  async rewind(startDurationMillis = 0) {
    await this.props.sound.playFromPositionAsync(startDurationMillis);
  }

  async play(startDurationMillis = 0) {
    this.props.sound.setOnPlaybackStatusUpdate((status) => {
      this.updateSoundStatus(status);
    });
    if (this.props.sound) {
      this.props.sound.setProgressUpdateIntervalAsync(PLAYBACK_PROGRESS_UPDATE_INTERVAL_MS);
    }
    if (startDurationMillis) {
      await this.props.sound.playFromPositionAsync(startDurationMillis);
    } else {
      await this.props.sound.playAsync();
    }
    this.setState({ state: 'playing' });
  }

  async stop() {
    await this.props.sound.stopAsync();
    this.props.sound.setOnPlaybackStatusUpdate(() => {});
    this.setState({ state: 'loaded' });
  }

  async pause() {
    await this.props.sound.pauseAsync();
    this.setState({ state: 'paused' });
  }

  async resume() {
    await this.props.sound.playAsync();
    this.setState({ state: 'playing' });
  }

  render() {
    const {
      positionMillis,
      isPlaying,
      state,
      message,
      playableDurationMillis,
      // volume,
      // isMuted,
    } = this.state;

    const toggleRecord = async () => {
      if (state === 'zero') {
        await this.startRecord();
      } else if (state === 'recording') {
        await this.save();
      }
    };

    const togglePlay = async () => {
      if (state === 'playing') {
        await this.pause();
      } else if (state === 'paused') {
        await this.resume();
      } else {
        await this.play();
      }
    };
    const msgEl = message
      ? (<WingBlank style={{ marginBottom: 5 }}><Text>{message}</Text></WingBlank>)
      : null;

    if (['zero', 'recording'].indexOf(state) !== -1) {
      // Useful icons: ⬤ ⬛⬜⏺⏸⏹◉▣◉●■▪◼◾‖▶
      const recButtonTitle = (state === 'recording') ? '⏹ Recording... press me to stop.' : '⏺  Record';
      return (
        <View>
          {msgEl}
          <WingBlank style={{ marginBottom: 5 }}>
            <Button
              onClick={() => toggleRecord()}
              type="primary"
              disabled={this.state.recordButtonLocked}
              inline
            >
              {recButtonTitle}
            </Button>
          </WingBlank>
        </View>
      );
    }

    return (
      <View>
        {msgEl}
        <WingBlank style={{ marginBottom: 5 }}>
          <Flex>
            <Flex.Item>
              <Button
                size="default"
                onClick={() => togglePlay()}
                style={{ width: 38, height: 38 }}
              >
                {isPlaying ? '▶' : '⏸'}
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Text>{durationMsToStr(0)}</Text>
            </Flex.Item>
            <Flex.Item>
              <Text>{durationMsToStr(positionMillis)}</Text>
            </Flex.Item>
            <Flex.Item>
              <Text>{durationMsToStr(playableDurationMillis)}</Text>
            </Flex.Item>
          </Flex>
          <Slider
            min={0}
            inline
            max={playableDurationMillis}
            value={positionMillis}
            onAfterChange={v => this.rewind(v)} // Will update state too
          />
        </WingBlank>
      </View>
    );
  }
}
