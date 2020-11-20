// @flow
import {
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
  RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
  RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
  RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
} from 'expo/src/av/Audio/Recording';

export const SAMPLE_RATE = 44100;
export const BIT_RATE = 128000;
export const NUMBER_OF_CHANNELS = 2;
export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: SAMPLE_RATE,
    numberOfChannels: NUMBER_OF_CHANNELS,
    bitRate: BIT_RATE,
  },
  ios: {
    extension: '.caf',
    audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: SAMPLE_RATE,
    numberOfChannels: NUMBER_OF_CHANNELS,
    bitRate: NUMBER_OF_CHANNELS,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export const RECORDING_OPTIONS_PRESET_LOW_QUALITY: RecordingOptions = {
  android: {
    extension: '.3gp',
    outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP,
    audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
    sampleRate: SAMPLE_RATE,
    numberOfChannels: NUMBER_OF_CHANNELS,
    bitRate: NUMBER_OF_CHANNELS,
  },
  ios: {
    extension: '.caf',
    audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
    sampleRate: SAMPLE_RATE,
    numberOfChannels: NUMBER_OF_CHANNELS,
    bitRate: NUMBER_OF_CHANNELS,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
