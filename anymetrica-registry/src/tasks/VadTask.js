/* @flow */
import VAD from 'node-vad';

import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import { defaults, error, info, promiseMap } from 'anymetrica-utils';
import {
  EntityType,
  OUTPUT,
  VAD_EVENT_NOISE,
  VAD_EVENT_SILENCE,
  VAD_EVENT_UNSPECIFIED,
  VAD_EVENT_VOICE,
} from 'anymetrica-api/dist/enums';
import { loadBlobs } from '../blobStore';
import { SOURCE_VAR, TARGET_VAR, VAD_DEFAULT_PARAMS } from '../constants';
import { ms2obj, obj2ms, obj2seconds } from '../utils/time';
import { makeObject } from '../utils/cypherUtils';
import { newEntity } from '../utils/entity';
import { pgClientQueryAsync } from '../db';
import { _getEntitiesFromRequest } from '../dbAccessors';
import type { WktTsType } from '../types';

const ffmpeg = require('fluent-ffmpeg');

const DEFAULT_SAMPLES_PER_SECOND = 50;
const GLUE_EVENTS_SHORTER_THAN_MS = 1000;
const BLOAT_EVENTS_MS = 500;

const mapping = {
  [VAD.Event.ERROR]: VAD_EVENT_UNSPECIFIED,
  [VAD.Event.SILENCE]: VAD_EVENT_SILENCE,
  [VAD.Event.VOICE]: VAD_EVENT_VOICE,
  [VAD.Event.NOISE]: VAD_EVENT_NOISE,
};

const fileToVadEvents = async (
  filePath: string,
  vadMode = VAD.Mode.VERY_AGGRESSIVE,
  bufferSize: number,
  samplingRate: number = 16000,
): Promise<Array<string>> => new Promise(
  (resolve, reject) => {
    const vadNormal = new VAD(vadMode);
    const stream = fs.createReadStream(filePath, { highWaterMark: bufferSize });
    const promises = [];
    stream.on('error', reject);
    stream.on('data', (chunk) => {
      promises.push(vadNormal.processAudio(chunk, samplingRate));
    });
    stream.on('end', () => {
      Promise.all(promises).then(
        res => resolve(res.map(eventType => mapping[eventType])),
      ).catch(reject);
    });
  },
);


export type VadEventType = {
  start_ts: WktTsType,
  end_ts: WktTsType,
  event_type: string,
  detection_confidence: number,
}
const nodeVad = async (
  filePath,
  media_start_ts,
  media_end_ts,
  samplesPerSecond = DEFAULT_SAMPLES_PER_SECOND,
  samplingRate = 16000,
  bits = 16,
): Promise<Array<VadEventType>> => {
  // NORMAL = 0
  // LOW_BITRATE = 1
  // AGGRESSIVE = 2
  // VERY_AGGRESSIVE = 3
  const numSize = Math.floor(bits / 8);
  const bufferSize = Math.floor((samplingRate * numSize) / samplesPerSecond);
  const resultAggressive = await fileToVadEvents(
    filePath,
    VAD.Mode.AGGRESSIVE,
    bufferSize,
    samplingRate,
  );
  /**
   * FIXME: Deprecated
   * FIXME: Will be replaced by containerized processing script
   */
  const events: Array<VadEventType> = [];
  const startTimeMs = obj2ms(media_start_ts);
  const endTimeMs = obj2ms(media_end_ts);
  const mediaDurationMs = endTimeMs - startTimeMs;
  const vadTickDurationMs = mediaDurationMs / resultAggressive.length;
  let lastEvent = null;
  resultAggressive.forEach((event_type, tickIdx) => {
    const end_ts = ms2obj(startTimeMs + ((tickIdx + 1) * vadTickDurationMs));
    if (lastEvent) {
      lastEvent.end_ts = ms2obj(startTimeMs + (tickIdx * vadTickDurationMs));
    }
    if ((!lastEvent) || (lastEvent.event_type !== event_type)) {
      const start_ts = ms2obj(startTimeMs + (tickIdx * vadTickDurationMs));
      lastEvent = {
        event_type,
        // detection_confidence: (event_type === resultNormal[tickIdx]) ? 1.0 : 0.5,
        detection_confidence: 1.0,
        start_ts,
        end_ts,
      };
      events.push(lastEvent);
    } else if (tickIdx < (resultAggressive.length - 1)) {
      lastEvent.end_ts = end_ts;
    } else {
      // Align tail with file end
      lastEvent.end_ts = media_end_ts;
    }
  });
  const gluedEvents = [];
  let pullStartTs = null;
  events.forEach((event, idx) => {
    if (event.event_type === VAD_EVENT_VOICE) {
      const prevEvent = gluedEvents[gluedEvents.length - 1];
      if (gluedEvents.length === 0) {
        gluedEvents.push(event);
      } else {
        if (pullStartTs) {
          event.start_ts = pullStartTs;
          pullStartTs = null;
        }
        const durationMs = obj2ms(event.end_ts) - obj2ms(event.start_ts);
        const diffWithPrev = obj2ms(event.start_ts) - obj2ms(prevEvent.end_ts);
        const diffWithNext = (idx < (events.length - 1))
          ? (obj2ms(events[idx + 1].start_ts) - obj2ms(prevEvent.end_ts))
          : null;
        if (durationMs < GLUE_EVENTS_SHORTER_THAN_MS) {
          if ((diffWithNext !== null) && (diffWithNext < diffWithPrev)) {
            // Change next event in queue
            pullStartTs = event.start_ts;
          } else {
            prevEvent.end_ts = event.end_ts;
          }
        } else {
          event.start_ts = ms2obj(
            obj2ms(event.start_ts) - Math.min(diffWithPrev, BLOAT_EVENTS_MS),
          );
          if (idx < (events.length - 1)) {
            event.end_ts = ms2obj(
              obj2ms(event.end_ts) + Math.min(diffWithNext || 0, BLOAT_EVENTS_MS),
            );
          }
          gluedEvents.push(event);
        }
      }
    }
  });
  // return events;
  return gluedEvents;
};

// export const parseVadOutput = (
//   vadText: string,
//   media_start_ts: WktTsType,
//   media_end_ts: WktTsType,
// ): Array<VadEventType> => {
//   info(vadText);
//   const vadLevel = [];
//   const vadLines = vadText.split('\n')
//     .filter(l => l.match(/^[0-9] [0-9]+$/));
//
//   vadLines.forEach((line) => {
//     const [aggressiveness, values] = line.split(' ');
//     const aggrLevel = parseInt(aggressiveness, 10);
//     values.split('').forEach((v, idx) => {
//       const currentLevel = vadLevel[idx] || 0;
//       vadLevel[idx] = (v === '1')
//         ? Math.max(currentLevel, aggrLevel)
//         : currentLevel;
//     });
//   });
//   const events = [];
//   const startTimeMs = obj2ms(media_start_ts);
//   const endTimeMs = obj2ms(media_end_ts);
//   const durationMs = endTimeMs - startTimeMs;
//   const vadTickDurationMs = durationMs / vadLevel.length;
//   let lastEvent = null;
//   vadLevel.forEach((level, tickIdx) => {
//     const end_ts = ms2obj(startTimeMs + ((tickIdx + 1) * vadTickDurationMs));
//     if (lastEvent) {
//       lastEvent.end_ts = ms2obj(startTimeMs + (tickIdx * vadTickDurationMs));
//     }
//     if ((!lastEvent) || ((lastEvent.detection_confidence > 1) !== (level > 1))) {
//       const start_ts = ms2obj(startTimeMs + (tickIdx * vadTickDurationMs));
//       lastEvent = {
//         event_type: level > 0 ? VAD_EVENT_VOICE : VAD_EVENT_SILENCE,
//         detection_confidence: level,
//         start_ts,
//         end_ts,
//       };
//       events.push(lastEvent);
//     } else if (tickIdx < (vadLevel.length - 1)) {
//       lastEvent.end_ts = end_ts;
//     } else {
//       // Align tail with file end
//       lastEvent.end_ts = media_end_ts;
//     }
//   });
//   return events;
// };

/**
 * Make images spectrogram
 * @param sourceFileEntity
 * @param params
 * @returns {Promise<void>}
 */
export const VadTask = async (sourceFileEntity: Object, params: Object) => {
  const p = defaults(params, VAD_DEFAULT_PARAMS);

  const { media_start_ts, media_end_ts, id, name, content } = await loadBlobs(sourceFileEntity);
  const sourceDir = path.resolve('./data/input');
  const targetDir = path.resolve('./data/output');

  // shelljs.rm('-rf', sourceDir);
  shelljs.mkdir('-p', sourceDir);
  // shelljs.rm('-rf', targetDir);
  shelljs.mkdir('-p', targetDir);

  const sourcePath = path.join(sourceDir, name);
  fs.writeFileSync(sourcePath, content);

  const events = await nodeVad(sourcePath, media_start_ts, media_end_ts, 5);

  const mediaStartTimeSeconds = obj2seconds(media_start_ts);
  const sDir = path.resolve(`./data/sequences/${Math.floor(mediaStartTimeSeconds)}`);
  await promiseMap(events, async (e) => {
    const startOffsetSec = obj2seconds(e.start_ts) - mediaStartTimeSeconds;
    shelljs.mkdir('-p', sDir);
    const durationSec = obj2seconds(e.end_ts) - obj2seconds(e.start_ts);
    await (new Promise((resolve, reject) => {
      ffmpeg(sourcePath)
        .seekInput(startOffsetSec)
        .duration(durationSec)
        .on('error', reject)
        .on('end', resolve)
        .save(path.join(sDir, `${`${obj2ms(e.start_ts)}`}-${`${obj2ms(e.end_ts)}`}.wav`));
    }));
  });

  const PYTORCH_VERSION = '1.0.0';
  const PYTORCH_MODE = 'cpu';
  const MODE = 'export';
  const DOCKER_IMAGE = `infra.pbc.technology/anymetrica/sv:${PYTORCH_MODE}-${PYTORCH_VERSION}`;
  const cmd = [
    'docker run',
    '--rm',
    `--volume=${targetDir}:/output/`,
    `--volume=${sDir}:/audio/`,
    '--volume=/Users/ilyakutukov/projects/anymetrica/olap/sv/model/:/model/',
    `--volume=/Users/ilyakutukov/projects/anymetrica/olap/sv/config/${PYTORCH_MODE}-${MODE}/:/opt/app-root/src/config/`,
    `-i ${DOCKER_IMAGE}`,
    'python3',
    './embeddings.py',
    '--audio-path /audio/',
    '--output-path /output/embeddings.npz',
    '--checkpoint /model/final_epoch_512_batch_id_141.model',
    '--no-cuda',
    '--embedding-size 256',
    '--mode dev',
  ].join(' ');
  info(`Running docker command:\n${cmd}`);
  const { stdout, stderr } = shelljs.exec(cmd);
  info(stdout);
  if (stderr) {
    error(stderr);
  }
  const cosDer = fs.readFileSync(path.join(targetDir, 'cos_der.tsv'))
    .toString()
    .split('\n')
    .filter(x => !!x)
    .map((row) => {
      const [startTsMs, endTsMs, derValue] = row.split('\t');
      return {
        start_ts: ms2obj(parseInt(startTsMs, 10)),
        end_ts: ms2obj(parseInt(endTsMs, 10)),
        detection_confidence: parseFloat(derValue),
        event_type: VAD_EVENT_VOICE,
      };
    });

  const vadObj = makeObject(
    EntityType.VadResult,
    {
      ...(newEntity()),
      frame_duration: ms2obj(p.frameDurationMs),
      padding_duration: ms2obj(p.paddingDurationMs),
      events,
      start_ts: media_start_ts,
      end_ts: media_end_ts,
    },
    TARGET_VAR,
  );
  const vadEntities = _getEntitiesFromRequest(await pgClientQueryAsync(`
    MATCH ${makeObject(EntityType.File, { id }, SOURCE_VAR)}
    CREATE ${vadObj}
    MERGE (${SOURCE_VAR})-[:${OUTPUT}]->(${TARGET_VAR})
    RETURN ${TARGET_VAR};`), TARGET_VAR);

  const cosDerObj = makeObject(
    EntityType.VadResult,
    {
      ...(newEntity()),
      frame_duration: ms2obj(p.frameDurationMs),
      padding_duration: ms2obj(p.paddingDurationMs),
      events: cosDer,
      start_ts: media_start_ts,
      end_ts: media_end_ts,
    },
    TARGET_VAR,
  );
  const cosDerEntities = _getEntitiesFromRequest(await pgClientQueryAsync(`
    MATCH ${makeObject(EntityType.File, { id }, SOURCE_VAR)}
    CREATE ${cosDerObj}
    MERGE (${SOURCE_VAR})-[:${OUTPUT}]->(${TARGET_VAR})
    RETURN ${TARGET_VAR};`), TARGET_VAR);

  // shelljs.rm('-rf', sourcePath);
  // shelljs.rm('-rf', targetDir);
  return [
    ...vadEntities,
    ...cosDerEntities,
  ];
};
