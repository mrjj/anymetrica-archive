/* @flow */
import shelljs from 'shelljs';
import { ContentType, EntityType, OUTPUT } from 'anymetrica-api/dist/enums';
import {
  AUDIO_CONVERT_MEDIA_TYPE,
  BUCKET_AUDIO_TRANSCODED,
  SOURCE_VAR,
  TARGET_VAR,
} from '../constants';
import { loadBlobs, offloadBlobs } from '../blobStore';
import { makeObject } from '../utils/cypherUtils';
import { pgClientQueryAsync } from '../db';
import { _getEntitiesFromRequest } from '../dbAccessors';
import { newEntity } from '../utils/entity';

const { defaults, error, info } = require('anymetrica-utils');
const path = require('path');
const fs = require('fs');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const execa = require('execa');

const DEFAULT_PARAMETERS = {
  rate: 16000,
  channels: 1,
  // filters: 'loudnorm=I=-23:LRA=7:tp=-2',
  // measured:
  //  'measured_I=-30:measured_LRA=1.1:measured_tp=-11:measured_thresh=-40.21:offset=-0.47',
  // metadataFormat: 'json',
  media_type: AUDIO_CONVERT_MEDIA_TYPE,
};

export const ConvertAudioTask = async (rawAudioFileEntity: Object, parameters: Object) => {
  const {
    rate,
    channels,
    filters,
    // measured,
    media_type,
  } = defaults(parameters, DEFAULT_PARAMETERS);

  const { name, content, media_start_ts, media_end_ts, id } = await loadBlobs(rawAudioFileEntity);
  const sourceDir = path.resolve('./data/input');
  const targetDir = path.resolve('./data/converted');
  // shelljs.rm('-rf', sourceDir);
  shelljs.mkdir('-p', sourceDir);
  // shelljs.rm('-rf', targetDir);
  shelljs.mkdir('-p', targetDir);

  const sourcePath = `${sourceDir}/${name}`;
  fs.writeFileSync(sourcePath, content);
  const targetPath = path.join(
    targetDir,
    [...(name.split('.').slice(0, -1)), media_type].join('.'),
  );
  const convertCmd = `${ffmpegInstaller.path} -i ${sourcePath} ${filters ? `-af ${filters}` : ''} -vn -ac ${channels} -ar ${rate} -y ${targetPath}`;
  info(`Converting audio file ${sourcePath} -> ${targetPath} using following command:\n  $ ${convertCmd}`);
  try {
    await execa.shell(convertCmd);
    const convertedAb = fs.readFileSync(targetPath);
    const convertedObj = makeObject(
      EntityType.File,
      await offloadBlobs({
        ...(newEntity()),
        name: path.basename(targetPath),
        content: convertedAb,
        content_type: ContentType.audio,
        size_bytes: convertedAb.byteLength,
        media_type: AUDIO_CONVERT_MEDIA_TYPE,
        media_start_ts,
        media_end_ts,
      }, BUCKET_AUDIO_TRANSCODED),
      TARGET_VAR,
    );
    // shelljs.rm('-rf', sourcePath);
    // shelljs.rm('-rf', targetPath);
    return _getEntitiesFromRequest(await pgClientQueryAsync(`
      MATCH ${makeObject(EntityType.File, { id }, SOURCE_VAR)}
      CREATE ${convertedObj}
      MERGE (${SOURCE_VAR})-[:${OUTPUT}]->(${TARGET_VAR})
      RETURN ${TARGET_VAR};`), TARGET_VAR)[0];
  } catch (e) {
    error('FFMPEG Conversion error:', e);
    throw e;
  }
};
