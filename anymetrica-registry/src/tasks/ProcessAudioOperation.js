/* @flow */
import { error } from 'anymetrica-utils';
import { ConvertAudioTask } from './ConvertAudioTask';
import { VadTask } from './VadTask';
import type { RequestPayloadType } from '../types';

export const ProcessAudioOperation = async (
  entity: RequestPayloadType,
): Promise<RequestPayloadType> => {
  try {
    const convertedFile = await ConvertAudioTask(entity, {});
    await VadTask(convertedFile, {});
    return entity;
  } catch (e) {
    error('Failed to process audio', e);
    throw e;
  }
};
