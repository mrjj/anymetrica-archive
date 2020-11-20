/* @flow */

import {
  ADMINISTRATING,
  CAN_READ,
  CAN_READ_RELATIONS,
  CAN_RESET,
  CAN_WRITE,
  Contact,
  CONTACT_EMAIL,
  Group,
  HAVE_MEMBER,
  HAVE_PART,
  Human,
  Location,
  Organization,
  OTP,
  OWNS,
  PostalAddress,
  SessionToken,
  UsernamePassword,
} from 'anymetrica-api/dist/enums';
import { moment, promiseMap } from 'anymetrica-utils';
import { DEFAULT_ADMINISTRATIVE_EMAIL } from './constants';
import { newEntity } from './utils/entity';
import { config, getAgensConf } from './configurator';
import { sendNoReply } from './mailer';
import { getNowSeconds } from './utils/time';
import { makeOTP } from './utils/encryption';

const { error, info } = require('anymetrica-utils');
const { RelationTypeArr, EntityTypeArr } = require('anymetrica-api/dist/enums');
const { makeObject, labelEscape } = require('./utils/cypherUtils');
const { pgClientQueryAsync } = require('./db');
const {
  ADMIN_OTP_TOKEN_LIFETIME_SECONDS,
} = require('./constants');

const conf = getAgensConf();

const createPowerAccount = async (email) => {
  const name = email;

  // const checkEmailObj = makeObject('Credential', { public: name }, 'x');
  const checkEmailObj = makeObject('Contact', {
    data: email,
    contact_type: CONTACT_EMAIL,
    is_deleted: false,
  }, 'x');
  const adminQ = `MATCH ${checkEmailObj} RETURN x ORDER BY x.created_ts_seconds ASC;`;
  const adminCredsExists = (await pgClientQueryAsync(adminQ)).rowCount > 0;
  if (adminCredsExists) {
    info(`[BOOTSTRAP] Power user with "${email}" already exists. No invite sent.`);
    return null;
  }
  error(`[BOOTSTRAP] Admin user with username "${name}" and "${email}" not found, making invite`);

  const publicInviteCode = await makeOTP();
  const now = getNowSeconds();

  await pgClientQueryAsync(`          
  CREATE ${[
    makeObject(Human, {
      ...(newEntity()),
      title: '',
      full_name: name,
      first_name: name,
      for_testing: false,
    }, 'human', true),

    makeObject(Group, {
      ...(newEntity()),
      name: `${name} personal`,
      is_deleted: false,
    }, 'g', true),

    makeObject(Location, {
      ...(newEntity()),
      geo_point_coordinates: {
        latitude: 55.751424,
        longitude: 37.618877,
      },
      geo_circle_radius_meters: 32.0,
      is_deleted: false,
    }, 'location', true),

    makeObject(PostalAddress, {
      ...(newEntity()),
      zip: '125167',
      is_deleted: false,
    }, 'address', true),

    makeObject(Organization, {
      ...(newEntity()),
      name: config.ADMINISTRATIVE_ORGANISATION_NAME,
      domain: config.ADMINISTRATIVE_ORGANISATION_DOMAIN,
    }, 'organization', true),

    makeObject(Contact, {
      ...(newEntity()),
      contact_type: CONTACT_EMAIL,
      data: email,
      is_deleted: false,
      do_not_call: false,
    }, 'email', true),

    makeObject(OTP, {
      ...(newEntity()),
      // Melt-in OTP
      otp: publicInviteCode,
      is_not_set: false,
      is_revoked: false,
      is_deleted: false,
      expires_ts_seconds: now + ADMIN_OTP_TOKEN_LIFETIME_SECONDS,
      expires_ts_nanos: 0,
    }, 'code', true),

    makeObject(UsernamePassword, {
      ...(newEntity()),
      username: null, // Not name, admin free to choose
      namespace: config.ADMINISTRATIVE_ORGANISATION_DOMAIN,
      password: null,
      is_not_set: true,
      is_revoked: false,
      is_deleted: false,
    }, 'logpass', true),

    makeObject(SessionToken, {
      ...(newEntity()),
      session_token: null,
      is_not_set: true,
      is_revoked: false,
      is_deleted: false,
      expires_ts_seconds: null,
      expires_ts_nanos: 0,
    }, 'session', true),
    // Invitation code have self-access and discovery
    `(code)-[:${CAN_READ}]->(code)`,
    `(code)-[:${CAN_READ_RELATIONS}]->(code)`,
    // Invitation code allowing to read and set password directly
    `(code)-[:${CAN_READ}]->(logpass)`,
    `(code)-[:${CAN_WRITE}]->(logpass)`,

    // Login and password are allowing self re-definition and introspection
    `(logpass)-[:${CAN_READ}]->(logpass)`,
    `(logpass)-[:${CAN_READ_RELATIONS}]->(logpass)`,
    `(logpass)-[:${CAN_WRITE}]->(logpass)`,
    `(logpass)-[:${CAN_RESET}]->(logpass)`,
    // logpass can access session
    `(logpass)-[:${CAN_RESET}]->(session)`,
    `(logpass)-[:${CAN_READ}]->(session)`,

    // Human can read and reset login and password
    // but write own password value directly or break human-pass consistency is possible
    // only using logpass credentials
    // Session giving full access to human as entry point
    `(session)-[:${CAN_RESET}]->(session)`,
    `(session)-[:${CAN_READ}]->(session)`,
    // Session giving full access to human as entry point
    `(session)-[:${ADMINISTRATING}]->(human)`,

    // Human is entry point to business logic, all credential relations are finished
    // now defining how human relates with things inside in clean zone

    // Human can see and reset own login and password
    `(human)-[:${OWNS}]->(logpass)`,
    `(human)-[:${CAN_RESET}]->(logpass)`,
    `(human)-[:${CAN_READ}]->(logpass)`,
    `(human)-[:${CAN_READ_RELATIONS}]->(logpass)`,
    // Human Can see own invitation code
    `(human)-[:${OWNS}]->(code)`,
    `(human)-[:${CAN_READ}]->(code)`,
    // Human can reset session
    `(human)-[:${OWNS}]->(session)`,
    `(human)-[:${CAN_RESET}]->(session)`,
    `(human)-[:${CAN_READ}]->(session)`,
    // Human in main administrator
    `(human)-[:${ADMINISTRATING}]->(organization)`,
    // Admin is self-managing email
    `(human)-[:${OWNS}]->(email)`,
    `(human)-[:${ADMINISTRATING}]->(email)`,
    // Group and location
    `(human)-[:${OWNS}]->(g)`,
    `(human)-[:${ADMINISTRATING}]->(g)`,

    // Own administrator group have administrator as member
    `(g)-[:${HAVE_MEMBER}]->(human)`,
    // Group have location and address parts
    `(g)-[:${HAVE_PART}]->(location)`,
    `(g)-[:${HAVE_PART}]->(address)`,

    // Admin is owner of administrative organisation
    `(organization)-[:${HAVE_MEMBER}]->(human)`,
    `(organization)-[:${CAN_READ}]->(human)`,
    `(organization)-[:${CAN_READ_RELATIONS}]->(human)`,

  ].join(',\n  ')} RETURN code.public`);

  const uri = `${config.EDGE_SCHEMA}://${config.EDGE_FQDN}${config.PUBLIC_SIGN_UP_URI_PATH_PART}${publicInviteCode}`;
  const m = Math.floor(ADMIN_OTP_TOKEN_LIFETIME_SECONDS / 60) % 60;
  const h = Math.floor(ADMIN_OTP_TOKEN_LIFETIME_SECONDS / (60 * 60)) % 24;
  const d = Math.floor(ADMIN_OTP_TOKEN_LIFETIME_SECONDS / (24 * 60 * 60));
  sendNoReply({
    to: email,
    html: [
      `<p>Administrative account of ${config.EDGE_FQDN} have been reset.</p>`,
      `<p>New administrative accounts including email this letter is targeted: ${email}</p>`,
      `<p>This is invitation URI that allows to define your new system credentials: ${uri}</p>`,
      `<p>URI will expire in ${moment().add(ADMIN_OTP_TOKEN_LIFETIME_SECONDS, 'seconds').format('YYYY-MM-DD HH:MM')}. (${d} days ${h} hours ${m} minutes from the moment this letter have been sent).</p>`,
    ].join('\n'),
  });

  info(`New power user invite code:\n================ CUT ===============\n${email}\n${publicInviteCode}\n${uri}\n=============== /CUT ===============\n`);
  return publicInviteCode;
};

export const bootstrapDb = async () => {
  const queries = [
    `CREATE GRAPH IF NOT EXISTS ${conf.graphName}`,
    `SET graph_path = ${conf.graphName}`,
    ...(EntityTypeArr.map(vlabel => `CREATE VLABEL IF NOT EXISTS ${labelEscape(vlabel)}`)),
    ...(RelationTypeArr.map(elabel => `CREATE ELABEL IF NOT EXISTS ${elabel}`)),
    `CREATE OR REPLACE FUNCTION elabels(graphpath, jsonb) RETURNS bool AS $$
    DECLARE 
      e edge; 
      res jsonb; 
    BEGIN
      res = (SELECT '[]'::jsonb);
      IF $1 IS NULL THEN 
        RETURN res;
      END IF; 
      FOREACH e IN ARRAY edges($1) LOOP 
        res = res || type(e); 
      END LOOP;
      
      RETURN $2 @> res;
    END; 
    $$ LANGUAGE plpgsql; 
    `,
  ]
    .map(q => `${q}; `).join('\n');

  await pgClientQueryAsync(queries);

  await promiseMap(
    (config.ADMINISTRATIVE_EMAILS || DEFAULT_ADMINISTRATIVE_EMAIL).split(' '),
    createPowerAccount,
  );
};
