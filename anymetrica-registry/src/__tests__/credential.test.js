/* eslint-disable no-undef */
import { uniq } from 'anymetrica-utils';
import { RelationType } from 'anymetrica-api/dist/enums';
import { dropDb, getClient, TEST_TIMEOUT_MS, TESTS_SUITE_TIMEOUT_MS } from './testsUtils';
import { promiseClientCall } from '../clientCall';
import { TARGET_VAR } from '../constants';
import { bootstrapDb } from '../bootstrapDb';
import { pgClientQueryAsync } from '../db';
import { makeObject } from '../utils/cypherUtils';

describe('RegistryService.GetCredentials', () => {
  test('Setup default creds', async (done) => {
    await dropDb();
    const publicCode = await bootstrapDb();
    const client = getClient();
    const credentialInviteOTP = {
      password: publicCode,
    };
    const rels = await promiseClientCall(client, 'Discover', { credential: credentialInviteOTP });
    expect(rels.entities.length).toEqual(2);
    expect(rels.relations.length).toEqual(4);
    const loginPasswordIds = uniq(rels.relations
      .filter(({ relation_type }) => (relation_type === RelationType.CAN_WRITE))
      .map(({ to_id }) => to_id)); // Log pass

    expect(loginPasswordIds.length).toEqual(1);
    const logPassRecords = (await promiseClientCall(client, 'GetCredentials', {
      ids: loginPasswordIds,
      credential: credentialInviteOTP,
    })).entities;

    expect(logPassRecords.length).toEqual(1);

    const lp = logPassRecords[0];
    expect(lp.id).toEqual(loginPasswordIds[0]);
    expect(lp.credential_type).toEqual(CREDENTIAL_TYPE.CREDENTIAL_USERNAME_PASSWORD);
    const PASS = 'PA$$_W0Rd';
    const credentialLogPass = {
      credential_type: lp.credential_type,
      domain: lp.domain,
      public: lp.public,
      private: PASS,
    };
    /**
     * Update password
     */
    await promiseClientCall(client, 'MergeCredentials', {
      entities: [{ ...credentialLogPass, metadata: lp.metadata }],
      credential: credentialInviteOTP,
    });

    const logPassRel = (await promiseClientCall(client, 'Discover', {
      ids: loginPasswordIds,
      credential: credentialLogPass,
    }));
    const sessionIds = uniq(logPassRel.relations
      .filter(({ relation_type, to_id, from_id }) => (
        (relation_type === RelationType.CAN_READ) && (to_id !== from_id)
      ))
      .map(({ to_id }) => to_id));
    expect(sessionIds.length).toEqual(1);
    const sessionObjects = (await promiseClientCall(client, 'GetCredentials', {
      ids: sessionIds,
      credential: credentialLogPass,
    })).entities;

    expect(sessionObjects.length).toEqual(1);
    const session = sessionObjects[0];
    expect(session).toBeTruthy();
    expect(session.credential_type).toBe(CREDENTIAL_TYPE.CREDENTIAL_SESSION_TOKEN);
    expect(session.public).toBeTruthy();
    expect(session.is_not_set).toBeFalsy();
    // Check password encryption is fine
    const sessionRelationsAutoIds = (await promiseClientCall(client, 'Discover', {
      credential: session,
    }));
    const sessionRelations = (await promiseClientCall(client, 'Discover', {
      ids: sessionIds,
      credential: session,
    }));
    expect(sessionRelations).toEqual(sessionRelationsAutoIds);
    const sessionId = session.id;
    expect(
      sessionRelations.entities.map(({ metadata }) => metadata),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'Credential', id: session.id }),
        expect.objectContaining({ type: 'Human' }),
      ]),
    );
    expect(sessionRelations.relations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        from_id: sessionId,
        relation_type: 'CAN_READ_RELATIONS',
        to_id: sessionId,
      }),
      expect.objectContaining({ from_id: sessionId, relation_type: 'CAN_RESET', to_id: sessionId }),
      expect.objectContaining({ from_id: sessionId, relation_type: 'CAN_READ' }),
      expect.objectContaining({ from_id: sessionId, relation_type: 'CAN_READ_RELATIONS' }),
      expect.objectContaining({ from_id: sessionId, relation_type: 'CAN_WRITE' }),
      expect.objectContaining({ from_id: sessionId, relation_type: 'CAN_WRITE_RELATIONS' }),

    ]));

    const logPassCredDb = await pgClientQueryAsync(
      `MATCH ${makeObject(
        EntityType.Credential,
        {
          public: credentialLogPass.public,
          domain: credentialLogPass.domain,
          credential_type: credentialLogPass.credential_type,
        },
        TARGET_VAR,
      )} RETURN ${TARGET_VAR};`,
    );
    expect(logPassCredDb.rows[0][TARGET_VAR].props.private).toEqual(
      expect.stringMatching(new RegExp([
        '^',
        'argon2i',
        'v=19',
        'm=4096,t=4,p=2',
        '[a-zA-Z0-9+$/]{163}$',
      ].join('\\$'))),
    );
    done();
  }, TEST_TIMEOUT_MS);
}, TESTS_SUITE_TIMEOUT_MS);
