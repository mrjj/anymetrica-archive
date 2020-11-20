/* @flow */
import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { ContentType, EntityType, OUTPUT } from 'anymetrica-api/dist/enums';
import { makeObject } from '../utils/cypherUtils';
import { loadBlobs, offloadBlobs } from '../blobStore';
import { BUCKET_AUDIO_WAVEFORMS, SOURCE_VAR, TARGET_VAR } from '../constants';
import { pgClientQueryAsync } from '../db';
import { obj2ms } from '../utils/time';
import { _getEntitiesFromRequest } from '../dbAccessors';
import { newEntity } from '../utils/entity';

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { error, info, defaults } = require('anymetrica-utils');
const { AUDIO_CHARTS_MEDIA_TYPE } = require('../constants');

// Show @ffmpeg-installer ffmpeg path to fluent-ffmpeg
const FFMPEG_PATH = ffmpegInstaller.path;
process.env.FFMPEG_PATH = FFMPEG_PATH;

const DEFAULT_PARAMS = {
  pixelsInSecond: 128,
  verticalResolutionPx: 256,
  scale: 'log',
  maxPictureWidthPx: 1024 * 4,
  maxPictureHeightPx: 256,
  durationMs: 60 * 1000,
  mediaType: AUDIO_CHARTS_MEDIA_TYPE,
  bucket: BUCKET_AUDIO_WAVEFORMS,
  compand: false,
};

/**
 * Make images waveform
 * @param sourceFileEntity
 * @param params
 * @returns {Promise<void>}
 */
export const WaveformFfmpegTask = async (sourceFileEntity, params) => {
  const p = defaults(params, DEFAULT_PARAMS);
  const {
    verticalResolutionPx,
    pixelsInSecond,
    maxPictureWidthPx,
    maxPictureHeightPx,
    scale,
    compand,
    bucket,
    mediaType,
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
  const outputPath = path.join(outputDir, `${name}.waveform.${mediaType}`);


  const durationMs = obj2ms(media_end_ts) - obj2ms(media_start_ts);
  const w = Math.min(Math.floor((durationMs / 1000.0) * pixelsInSecond), maxPictureWidthPx);
  const h = Math.min(maxPictureHeightPx, verticalResolutionPx);
  const s = `${w}x${h}`;

  info(`making waveform: ${inputPath} -> ${outputPath} size: ${s}`);
  /**
   * Generate Pic
   */
  await (new Promise(
    resolve => ffmpeg(inputPath).complexFilter([
      {
        filter: `${compand ? 'compand,' : ''}showwavespic`,
        options: {
          s,
          scale,
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
      metadata: { label: 'waveform' },
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
