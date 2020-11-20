/* @flow */
import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { ContentType, EntityType, OUTPUT } from 'anymetrica-api/dist/enums';
import { makeObject } from '../utils/cypherUtils';
import { loadBlobs, offloadBlobs } from '../blobStore';
import { BUCKET_AUDIO_SPECTROGRAMS, SOURCE_VAR, TARGET_VAR } from '../constants';
import { pgClientQueryAsync } from '../db';
import { obj2ms } from '../utils/time';
import { _getEntitiesFromRequest } from '../dbAccessors';
import { newEntity } from '../utils/entity';
import type { RequestPayloadType } from '../types';

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { error, info, defaults } = require('anymetrica-utils');
const { AUDIO_CHARTS_MEDIA_TYPE } = require('../constants');

// Show @ffmpeg-installer ffmpeg path to fluent-ffmpeg
const FFMPEG_PATH = ffmpegInstaller.path;
process.env.FFMPEG_PATH = FFMPEG_PATH;

const DEFAULT_PARAMS = {
  pixelsInSecond: 128,
  verticalResolutionPx: 128,
  legend: false,
  scale: 'log',
  mode: 'combined',
  color: 'channel',
  maxPictureWidthPx: 1024 * 4,
  maxPictureHeightPx: 256,
  durationMs: 60 * 1000,
  win_func: 'hann',
  mediaType: AUDIO_CHARTS_MEDIA_TYPE,
  bucket: BUCKET_AUDIO_SPECTROGRAMS,
};

/**
 * Make images spectrogram
 * @param sourceFileEntity
 * @param params
 * @returns {Promise<void>}
 */
export const SpectrogramTask = async (
  sourceFileEntity: RequestPayloadType,
  params: Object,
): Promise<Array<RequestPayloadType>> => {
  const p = defaults(params, DEFAULT_PARAMS);
  const {
    verticalResolutionPx,
    pixelsInSecond,
    maxPictureWidthPx,
    maxPictureHeightPx,
    mode,
    legend,
    scale,
    color,
    mediaType,
    win_func,
    bucket,
  } = p;
  const { media_start_ts, media_end_ts, id, name, content } = await loadBlobs(sourceFileEntity);
  const inputDir = path.resolve('./data/input');
  const outputDir = path.resolve('./data/output');
  shelljs.rm('-rf', inputDir);
  shelljs.mkdir('-p', inputDir);
  shelljs.rm('-rf', outputDir);
  shelljs.mkdir('-p', outputDir);
  const inputPath = path.join(inputDir, name);
  fs.writeFileSync(inputPath, content);
  const outputPath = path.join(outputDir, `${name}.spectrogram.${mediaType}`);

  const durationMs = obj2ms(media_end_ts) - obj2ms(media_start_ts);
  const w = Math.min(Math.floor((durationMs / 1000.0) * pixelsInSecond), maxPictureWidthPx);
  const h = Math.min(maxPictureHeightPx, verticalResolutionPx);
  const s = `${w}x${h}`;

  info(`making spectrogram: ${inputPath} -> ${outputPath} size: ${s}`);
  /**
   * Generate Pic
   */
  await (new Promise(
    resolve => ffmpeg(inputPath).complexFilter([
      {
        filter: 'showspectrumpic',
        options: {
          s,
          legend: legend ? 1 : 0,
          mode,
          scale,
          color,
          win_func,
        },
      },
    ])
      .on('error', error)
      .on('end', resolve)
      .save(outputPath),
  ));
  const ab = fs.readFileSync(outputPath);
  const obj = makeObject(
    EntityType.File,
    await offloadBlobs({
      ...(newEntity()),
      metadata: { label: 'spectrogram' },
      name: path.basename(outputPath),
      content_type: ContentType.image,
      media_type: AUDIO_CHARTS_MEDIA_TYPE,
      size_bytes: ab.byteLength,
      content: ab,
      media_width_px: w,
      media_height_px: h,
      media_start_ts,
      media_end_ts,
    }, bucket),
    TARGET_VAR,
  );
  shelljs.rm('-rf', inputPath);
  shelljs.rm('-rf', outputPath);
  return _getEntitiesFromRequest(await pgClientQueryAsync(`
    MATCH ${makeObject(EntityType.File, { id }, SOURCE_VAR)}
    CREATE ${obj}
    MERGE (${SOURCE_VAR})-[:${OUTPUT}]->(${TARGET_VAR})
    RETURN ${TARGET_VAR};`), TARGET_VAR)[0];
};
