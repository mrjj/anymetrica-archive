/* eslint-disable */
/* @flow */
import React from 'react';
import { isEmpty, ms2obj, MS_IN_SECOND, obj2ms, obj2seconds } from 'anymetrica-utils';
import { EntityType } from 'anymetrica-api/dist/enums';
import { Button, Icon, Slider } from 'antd';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import MiniMap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import WaveSurfer from 'wavesurfer.js';
import { registryClient } from '../client';
// import REGIONS from './seg-raw.json'


export const MINIMAP_HEIGHT_PX = 32;
export const TIMELINE_HEIGHT_PX = 64;
export const MIN_ZOOM_LVL = 1;
export const DEFAULT_ZOOM = MIN_ZOOM_LVL;
export const MAX_ZOOM_LVL = 256;
export const ZOOM_DEBOUNCE_MS = 1024;
export const SKIP_STEP_MS = 200;

export type PropsType = {
  isActive: boolean,
  record: Object,
  activateHandler?: ?(e)=>void,
  style?: ?Object,
};


const getSliderParams = (zoom, onChange, onAfterChange) => {
  const zoomValue = Math.floor(Math.log2(zoom));
  const slider = {
    included: false,
    style: {
      // height: height + miniMapHeight,
      height: '70%',
      marginLeft: '2em',
      marginRight: '.5em',
      marginTop: '1em',
      marginBottom: 0,
      userSelect: 'none'
    },
    marks: {},
    step: 1,
    dots: false,
    min: Math.floor(Math.log2(MIN_ZOOM_LVL)),
    max: Math.floor(Math.log2(MAX_ZOOM_LVL)),
    value: zoomValue,
    onChange: (v) => onChange(Math.pow(2, parseInt(v, 10))),
    onAfterChange: (v) => onAfterChange(Math.pow(2, parseInt(v, 10))),
    tipFormatter: (value) => `x${Math.pow(2, value)}`,
  };
  for (let i = slider.min; i <= slider.max; i += 1) {
    const val = Math.pow(2, i);
    const isEdgeLabel = [slider.min, slider.max].indexOf(i) !== -1;
    const isCurrentLabel = i === zoomValue;
    if (isEdgeLabel || isCurrentLabel || (i % 2 === 0)) {
      slider.marks[i] = {
        label: `x ${val}`,
        style: {
          fontSize: (isEdgeLabel || isCurrentLabel) ? '.75em' : '.3em',
          color: isCurrentLabel ? '#2196F3' : '#616161'
        }
      };
    }
  }
  return slider;
};


const BASIC_WAVESURFER_CONFIG = {
  zoomDebounce: ZOOM_DEBOUNCE_MS,
  container: null,
  waveColor: '#eb9775',
  height: 64,
  hideScrollbar: false,
  progressColor: '#EC622B',
  cursorWidth: 2,
  barWidth: 1,
  barGap: 1,
  cursorColor: '#9E9E9E',
  removeMediaElementOnDestroy: true,
  autoCenter: true,
  partialRender: true,
  fillParent: true,
  scrollParent: false,
  plugins: []
};

export class VoiceTimeline extends React.Component<PropsType> {
  static defaultProps = {
    activateHandler: null
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: DEFAULT_ZOOM,
      events: [],
      error: null,
      isLoading: true,
      isPlaying: false,
      canPlayPause: false,
    };
  }

  onKeyDown(e) {
    if (this.props.isActive) {
      if (e.keyCode === 32) {
        e.stopPropagation();
        e.preventDefault();
        this.toggle();
      } else if (e.keyCode === 37) {
        e.stopPropagation();
        e.preventDefault();
        this.wavesurfer.skipBackward(SKIP_STEP_MS / MS_IN_SECOND);
      } else if (e.keyCode === 39) {
        e.stopPropagation();
        e.preventDefault();
        this.wavesurfer.skipForward(SKIP_STEP_MS / MS_IN_SECOND);
      }
    }
  }

  componentDidMount(): void {
    Promise.all([this.loadVadEvents()])
      .then(() => {})
      .catch(e => this.setState({
        error: e.message || e.details,
        isLoading: false,
      }));
    this.currentOnKeyDownFn = (e) => this.onKeyDown(e);
    document.addEventListener('keydown', this.currentOnKeyDownFn);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.currentOnKeyDownFn);
  }

  async loadVadEvents() {
    this.state = { error: null, isLoading: true };
    if (this.props.record.id) {
      const vadResults = await registryClient.Discover({
        request: {
          types: [EntityType.VadResult],
          traverse_depth: 2,
        },
        ids: [this.props.record.id],
      });
      const events = (!isEmpty(vadResults.entities)) ? vadResults.entities[0].events : [];
      const result = {
        events,
        isLoading: false,
        waveform: null,
      };
      this.setState(result);
    } else {
      this.setState({
        error: 'Record entity do not have ID',
        isLoading: false,
        spectrogram: null,
        waveform: null,
      });
    }
    return null;
  }

  componentWillReceiveProps(nextProps: PropsType, nextContext: any): void {
    if ((!nextProps.isActive) && this.props.isActive) {
      if (this.wavesurfer && this.wavesurfer.isPlaying()) {
        this.wavesurfer.pause();
      }
    }
    return nextProps;
  }

  zoom(zoom) {
    if (this.wavesurfer) {
      if (!this.wavesurfer.params.scrollParent) {
        this.wavesurfer.toggleScroll();
      }
      if (this.wavesurfer.params.minPxPerSec !== zoom) {
        this.setState({ zoom });
        this.wavesurfer.zoom(zoom);
      }
    }
  }

  toggle(e) {
    const { canPlayPause } = this.state;
    const { activateHandler } = this.props;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (canPlayPause) {
      if (activateHandler) {
        activateHandler();
      }
      this.setState({ canPlayPause: false });
      this.wavesurfer.playPause();
    }
  }

  render() {
    const { events, error, isLoading, canPlayPause, isPlaying, zoom } = this.state;
    // noinspection JSUnusedLocalSymbols
    const { record, isActive, activateHandler, style, ...otherProps } = this.props;

    const height = Math.ceil((TIMELINE_HEIGHT_PX - 1) / 8) * 8 + 1;
    const miniMapHeight = Math.ceil(MINIMAP_HEIGHT_PX / 8) * 8;

    let contentOverlay = null;
    let content = null;
    if (isLoading) {
      content = (<div className="loading"><Icon type="loading" /></div>);
    } else if (isEmpty(events)) {
      content = (<div className="missing">No voice events data</div>);
    } else if (error) {
      content = (<div className="error">{error}</div>);
    } else {
      const regions = events.map(r => ({
        start: r.start || (obj2seconds(r.start_ts) - obj2seconds(record.media_start_ts)),
        end: r.end || (obj2seconds(e.end_ts) - obj2seconds(record.media_start_ts)),
        drag: false,
        resize: false,
        loop: false,
        ...r,
      }));
      const domId = `view-${record.id}`;
      contentOverlay = (<div
        color="#2196F3"
        id={domId}
        ref={() => {
          if (!this.wavesurfer) {
            window.setTimeout(() => {

              this.wavesurfer = WaveSurfer.create({
                ...BASIC_WAVESURFER_CONFIG,
                height,
                container: `#${domId}`,
                plugins: [
                  Regions.create({
                    regions,
                    dragSelection: false,
                    // deferInit: true,
                  }),
                  MiniMap.create({
                    waveColor: 'grey',
                    progressColor: 'black',
                    height: miniMapHeight,
                  })
                ]
              });
              const audioBlob = new Blob(
                [Buffer.from(record.content.data)],
                { type: `${record.content_type}/${record.media_type}` },
              );
              this.wavesurfer.disableDragSelection();
              this.wavesurfer.on(
                'ready',
                () => {
                  this.setState({
                    canPlayPause: true,
                    zoom: Math.ceil(this.wavesurfer.pixelRatio),
                  });
                }
              );
              this.wavesurfer.on(
                'play',
                () => {
                  this.updateInterval = window.setInterval(() => {
                    this.setState({ progress: this.wavesurfer.getCurrentTime() });
                  }, 128);
                  this.setState({
                    isPlaying: true,
                    canPlayPause: true,
                  });
                }
              );
              this.wavesurfer.on(
                'seek',
                () => {
                  if (!this.wavesurfer.isPlaying()) {
                    this.wavesurfer.play();
                  }
                }
              );
              this.wavesurfer.on(
                'pause',
                () => {
                  window.clearInterval(this.updateInterval);
                  this.setState({
                    isPlaying: false,
                    canPlayPause: true,
                  });
                }
              );
              this.wavesurfer.on(
                'finish',
                () => {
                  window.clearInterval(this.updateInterval);
                  this.setState({
                    isPlaying: false,
                    canPlayPause: true,
                  });
                }
              );
              this.wavesurfer.loadBlob(audioBlob);
              this.setState({ canPlayPause: true });
            }, 100);
          }
        }}
      />);
    }


    const icon = isPlaying ? 'pause' : 'caret-right';
    return (<div
      style={{ height: miniMapHeight + height, ...(style || {}) }}
      className={`voice-timeline-cell ${isActive ? 'active' : ''}`}
      {...otherProps}
    >
      <div className="voice-timeline-button">
        <Button
          icon={icon}
          onClick={(e) => this.toggle(e)}
          shape="circle"
          type={isActive ? 'primary' : 'default'}
          htmlType="button"
          disabled={!canPlayPause}
        />
      </div>
      <div className="voice-timeline">
        {content}
        <div id="minimap" style={{ height: MINIMAP_HEIGHT_PX }} onChange={(e) => this.zoom(e)} />
        {contentOverlay}
      </div>
      <div>
        <Slider
          vertical
          disabled={!canPlayPause}
          {...getSliderParams(zoom, newZoom => this.setState({ zoom: newZoom }), () => this.zoom(zoom))}
        />
      </div>
    </div>);
  }
}
