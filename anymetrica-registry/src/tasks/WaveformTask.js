/* @flow */
import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { EntityType, OUTPUT } from 'anymetrica-api/dist/enums';
import { makeObject } from '../utils/cypherUtils';
import { loadBlobs, offloadBlobs } from '../blobStore';
import { BUCKET_AUDIO_WAVEFORMS, SOURCE_VAR, TARGET_VAR } from '../constants';
import { pgClientQueryAsync } from '../db';
import { _getEntitiesFromRequest } from '../dbAccessors';
import { newEntity } from '../utils/entity';
import type { RequestPayloadType } from '../types';
// const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { error, info, defaults } = require('anymetrica-utils');

// Show @ffmpeg-installer ffmpeg path to fluent-ffmpeg
const FFMPEG_PATH = ffmpegInstaller.path;
process.env.FFMPEG_PATH = FFMPEG_PATH;

const DEFAULT_PARAMS = {
  bucket: BUCKET_AUDIO_WAVEFORMS,
  bits: 8,
  split_channels: false,
  zoom: 256, // Zoom level (samples per pixel), cli program default: 256.
  output_type: 'json', // `dat` is second option
};

/**
 * Make images waveform
 * @param sourceFileEntity
 * @param params
 * @returns {Promise<void>}
 */
export const WaveformTask = async (sourceFileEntity: RequestPayloadType, params: Object) => {
  const p = defaults(params, DEFAULT_PARAMS);
  const {
    bucket,
    output_type,
    bits,
    split_channels,
    samples_per_pixel,
  } = p;
  const { id, name, content } = await loadBlobs(sourceFileEntity);
  const inputDir = path.resolve('./data/input');
  const outputDir = path.resolve('./data/output');
  shelljs.rm('-rf', inputDir);
  shelljs.mkdir('-p', inputDir);
  shelljs.rm('-rf', outputDir);
  shelljs.mkdir('-p', outputDir);

  const inputPath = path.join(inputDir, name);
  fs.writeFileSync(inputPath, content);
  const outputPath = path.join(outputDir, `${name}.${output_type}`);

  const cmd = [
    'docker',
    'run',
    '--rm',
    `--volume=${inputDir}/:${inputDir}/`,
    `--volume=${outputDir}/:${outputDir}/`,
    'infra.pbc.technology/anymetrica/waveform',
    split_channels ? '--split-channels' : '',
    `--zoom ${samples_per_pixel}`,
    `-b ${bits}`,
    `-i ${inputPath}`,
    `-o ${outputPath}`,
  ].join(' ');
  info(`Making waveform: ${inputPath} -> ${outputPath}\nCommand: "${cmd}"`);
  const { stderr } = shelljs.exec(cmd);
  if (stderr) {
    error(stderr);
  }

  const waveformData = JSON.parse(fs.readFileSync(outputPath).toString());

  const dataArray = bits === 8 ? Int8Array.from(waveformData.data) : Int16Array.from(waveformData);

  /**
   * Generate Waveform file
   */
  const obj = makeObject(
    EntityType.Waveform,
    await offloadBlobs({
      ...(newEntity()),
      metadata: { label: 'waveform' },
      ...waveformData,
      data: Buffer.from(dataArray),
    }, bucket),
    TARGET_VAR,
  );
  shelljs.rm('-rf', inputPath);
  shelljs.rm('-rf', outputPath);
  return _getEntitiesFromRequest(await pgClientQueryAsync(`
    MATCH ${makeObject(EntityType.Waveform, { id }, SOURCE_VAR)}
    CREATE ${obj}
    MERGE (${SOURCE_VAR})-[:${OUTPUT}]->(${TARGET_VAR})
    RETURN ${TARGET_VAR};`), TARGET_VAR)[0];
};
