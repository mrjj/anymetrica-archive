/* @flow */
import { forceArray, includes, info, nowObj, pick, promiseMap } from 'anymetrica-utils';
import {
  ADMINISTRATING,
  CAN_WRITE,
  ContentType,
  CREATED,
  EntityType,
  OTP,
  UsernamePassword,
} from 'anymetrica-api/dist/enums';
import intersection from 'lodash.intersection';
import { pgClientQueryAsync } from '../db';
import { BUCKET_AUDIO_RAW, TARGET_VAR, USER_PASSWORD_TTL_SECONDS } from '../constants';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';
import { makeKvStr, makeObject } from '../utils/cypherUtils';
import { enforceSingleEntity, getAgentsForCredentialId, getEntities } from '../dbAccessors';
import { encryptPrivate } from '../utils/encryption';
import { loadBlobs, offloadBlobs } from '../blobStore';
import { newEntity } from '../utils/entity';
import { authorizedCall, revokeCredentialIfExpired } from '../authorization';
import { ProcessAudioOperation } from '../tasks/ProcessAudioOperation';


/**
 * Merge handler
 *
 * @param request {RequestPayloadType}
 * @param params {RequestParamsType}
 * @return {Promise<Array<any>>}
 * @constructor
 */
export const MergeHandler: ProcessRequestFnType = authorizedCall(
  CAN_WRITE,
  async (request: RequestPayloadType) => {
    const { types, credential } = request.request;
    const resultIds = await promiseMap(
      forceArray(request.entities),
      async (entity) => {
        // Offload blobs
        let obj: Object = await offloadBlobs(entity, BUCKET_AUDIO_RAW);
        const now = nowObj();
        // Don't look for empty entities
        const serverSideEntity = obj.id
          ? enforceSingleEntity(await getEntities([obj], types))
          : null;

        /**
         * Process credential
         */
        if (intersection([UsernamePassword], types).length) {
          obj = {
            is_not_set: false,
            ...(pick(obj, ['username', 'namespace', 'password', 'is_revoked'])),
            ...(
              (includes(types, UsernamePassword) && obj.password)
                ? { password: await encryptPrivate(obj.password) }
                : {}
            ),
            expires_ts_seconds: (now.seconds + USER_PASSWORD_TTL_SECONDS),
            expires_ts_nanos: now.nanos,
          };
        }
        obj = {
          ...obj,
          is_deleted: false,
          updated_ts_seconds: now.seconds,
          updated_ts_nanos: now.nanos,
          ...(serverSideEntity ? { id: serverSideEntity.id } : newEntity()),
        };
        if (serverSideEntity) {
          // UPDATE existing entity based on `id` property
          await pgClientQueryAsync(`
            MATCH ${makeObject(types[0], { id: serverSideEntity.id }, TARGET_VAR)} 
            SET ${makeKvStr(obj)};
          `);
        } else {
          // CREATE new entity and its ownership relations for agent who used RPC call credential
          const credentialId = credential ? credential.id : null;
          if (credentialId) {
            const agents = await getAgentsForCredentialId(credentialId);
            // Create wide access relations from Human/Device/Program to created entity
            // in order to manage it further as owner.
            await pgClientQueryAsync(
              [
                ...(agents.map(
                  ({ id }, idx) => `MATCH ${makeObject(null, { id }, `a${idx}`)}`,
                )),
                `CREATE ${makeObject(types[0], obj, TARGET_VAR)}`,
                ...(agents.map(
                  (_, idx) => [CREATED, ADMINISTRATING].map(
                    relationType => `MERGE (a${idx})-[:${relationType}]->(${TARGET_VAR})`,
                  ).join('\n'),
                )),
              ].join('\n'),
            );
          }
        }
        return obj.id;
      },
    );
    // Re-fetch updated entity
    const resultEntities = await getEntities(resultIds, types);
    if (resultEntities.length !== 1) {
      info(`Merge operation results count: ${resultEntities.length} is not equal request entities/ids count: ${request.entities.length}`);
    }
    if (request.request.credential.metadata.type === OTP) {
      await revokeCredentialIfExpired(request.request.credential.id);
    }

    if (includes(request.request.types, EntityType.File)) {
      await promiseMap(resultEntities, async (resultEntity) => {
        if (resultEntity.content_type === ContentType.audio) {
          await ProcessAudioOperation(resultEntity);
        }
      });
    }
    return promiseMap(resultEntities, async entity => loadBlobs(entity, true));
  },
);
