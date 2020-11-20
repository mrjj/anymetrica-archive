/* @flow */
import {
  ADMINISTRATING,
  CREATED,
  DemoRequestInfo,
  Organization,
  OWNS,
} from 'anymetrica-api/dist/enums';
import { promiseMap } from 'anymetrica-utils';
import { config } from '../configurator';
import { pgClientQueryAsync } from '../db';
import { DEFAULT_ADMINISTRATIVE_EMAIL, SOURCE_VAR, TARGET_VAR } from '../constants';
import { makeObject } from '../utils/cypherUtils';
import { getEntities } from '../dbAccessors';
import { newEntity } from '../utils/entity';
import { sendNoReply } from '../mailer';
import type { ProcessRequestFnType, RequestPayloadType } from '../types';

/**
 * Demo request header
 *
 * @param request {RequestPayloadType}
 * @return {Promise<Array<any>>}
 * @constructor
 */
export const RequestDemoHandler: ProcessRequestFnType = async (request: RequestPayloadType) => {
  const { request_info } = request;
  const obj = {
    ...(request_info || {}),
    ...(newEntity()),
  };
  const organisationObj = makeObject(
    Organization,
    {
      domain: config.ADMINISTRATIVE_ORGANISATION_DOMAIN,
    },
    SOURCE_VAR,
  );
  const demoRequestObj = makeObject(DemoRequestInfo, obj, TARGET_VAR);
  const mergeRels = [CREATED, ADMINISTRATING, OWNS].map(
    relationType => `MERGE (SOURCE_VAR)-[:${relationType}]->(${TARGET_VAR})`,
  ).join('\n');
  await getEntities(
    await pgClientQueryAsync(`
    MATCH ${organisationObj}
      CREATE ${demoRequestObj}
      ${mergeRels}
      RETURN ${TARGET_VAR}`),
  );
  await promiseMap(
    (config.ADMINISTRATIVE_EMAILS || DEFAULT_ADMINISTRATIVE_EMAIL).split(' '),
    async email => sendNoReply({
      to: email,
      subject: `New demo request from ${obj.company}<${obj.email}> (ID=${obj.id})`,
      text: [
        `New demo request from ${obj.company}<${obj.email}> have been submitted.`,
        'Additional info:',
        `Phone: ${obj.phone || 'not provided'}`,
        `Some words about customer: ${obj.whoami || 'not provided'}`,
        `ID: ${obj.id}`,
      ].join('\n'),
    }),
  );
};
