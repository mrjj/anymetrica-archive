import { Audio, FileSystem, Permissions } from 'expo';

const { AUDIO_RECORDING } = Permissions;

/*
     Recording config: {
       android: {
         extension: string,
         outputFormat: number,
         audioEncoder: number,
         sampleRate?: number,
         numberOfChannels?: number,
         bitRate?: number,
         maxFileSize?: number,
       },
       ios: {
         extension: string,
         outputFormat?: string | number,
         audioQuality: number,
         sampleRate: number,
         numberOfChannels: number,
         bitRate: number,
         bitRateStrategy?: number,
         bitDepthHint?: number,
         linearPCMBitDepth?: number,
         linearPCMIsBigEndian?: boolean,
         linearPCMIsFloat?: boolean,
       }
     }
    */

const state = {
  durationMillis: 0,
  message: '',
  shouldCorrectPitch: true,
  isRecording: false,
  canRecord: false,
  recording: null,
};

const updateRecordingStatus = (status = {}) => {
  if (!status) {
    return;
  }
  ['durationMillis', 'isLoading', 'isRecording', 'canRecord'].forEach((k) => {
    state[k] = status[k];
  });
};

const requestMicPermission = async () => {
  try {
    const existingStatus = await Permissions.getAsync(AUDIO_RECORDING);
    if (existingStatus.status === 'granted') {
      return true;
    }
    const newStatus = await Permissions.askAsync(AUDIO_RECORDING);
    // {status, /* expires, permissions */} =
    if (newStatus.status === 'granted') {
      return true;
    }
    this.setState({ message: `Permissions request failed with status: "${newStatus.status}"` });
    return false;
  } catch (e) {
    this.setState({ message: `requestMicPermission() ERROR: ${e.toString()}` });
    return false;
  }
};

const startRecord = async () => {
  try {
    // this.setState({recordButtonLocked: true})
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    if (!(await requestMicPermission())) {
      // this.setState({
      //   message: `Failed to get permissions: ${this.state.message}`,
      //   recordButtonLocked: false,
      // })
      return;
    }
    if (state.isRecording) {
      state.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    this.recording = new Audio.Recording();

    console.log('recording');
    // this.recording.setOnRecordingStatusUpdate(() => {})
    this.recording.setOnRecordingStatusUpdate(updateRecordingStatus);
    await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

    // this.setState({message: `Prepares and starting...`})
    console.log('starting');
    // const status = await this.recording.getStatusAsync();
    // if (!status.canRecord) {
    //   this.setState({message: `Cant record, having status: ${JSON.stringify(status)}`})
    // }
    updateRecordingStatus(await this.recording.startAsync());
    console.log('started');
    if (!startStatus.isRecording) {
      this.setState({
        message: `Cant record, having status: ${JSON.stringify(startStatus)}`,
        state: 'zero',
      });
    }
    this.setState({
      state: 'recording',
      recordButtonLocked: false,
    });
  } catch (e) {
    this.setState({
      state: 'zero',
      message: `start() ERROR: ${e.toString()}`,
      recordButtonLocked: false,
    });
  }
};

const endRecord = async (cb) => {
  this.setState({ message: 'Finishing record...', recordButtonLocked: true });
  try {
    await this.recording.stopAndUnloadAsync();
    // const info = await FileSystem.getInfoAsync(this.recording.getURI())

    // const info = await FileSystem.getInfoAsync(this.recording.getURI())

    const { sound, status } = await this.recording.createNewLoadedSound({
      isLooping: true,
      downloadFirst: true,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
    });
    if (cb) {
      cb(sound);
    }
    return sound;
  } catch (e) {
    console.error({
      state: 'recording',
      message: `save() ERROR: ${e.toString()}`,
      recordButtonLocked: false,
    });
    return null;
  }
};

let r = null;

export const GetRecorder = (callbacks) => {
  if (r === null) {
    r = {
      onRecorded: () => null,
      startRecord,
      endRecord,
      ...(callbacks || {}),
    };
  }
  return r;
};
export default GetRecorder;
