/* @flow */
import { message } from 'antd';
import { promiseMap } from 'anymetrica-utils/lib/utils/promise';
import RegistryGRPCClient from 'anymetrica-api/dist/registry';
import BackBone from 'backbone';
import { ENTITY_TYPE_TO_PLURAL } from 'anymetrica-api/dist/entity';
import { getStored } from './session';

export const c = RegistryGRPCClient({ host: window.location.hostname, port: window.location.port });
const defaultOptions = { discoverFrom: false, discoverTo: true };

const wrapQuery = (fn, methodName) => async (
  params,
  options: { discoverFrom: boolean, discoverTo: boolean },
) => {
  const { discoverFrom, discoverTo } = { ...defaultOptions, ...(options || {}) };
  const { session_token } = getStored();
  const credential = {
    ...(session_token ? { session_token: { session_token } } : {}),
    ...((params.request || { request: { credential: {} } }).credential),
  };
  try {
    const result = await fn({
      ...params,
      request: { ...(params.request || {}), credential },
    });
    const e = result.error;
    if (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      message.error(`Authentication error: ${e.message || e.details}`);
      if (
        (e && parseInt(e.code, 10) === 16)
        || (e.message || e.details || '').match(/16/g)
      ) {
        if (BackBone.history.getFragment().match(/^home/ig)) {
          BackBone.history.navigate('/home/sign-out', { trigger: true });
        }
        return { error: e };
      }
    }
    result.entities = result.entities || [];
    result.relations = result.relations || [];
    // Auto-resolve
    if ((methodName === 'Discover') && (discoverFrom || discoverTo)) {
      const entitiesDict = {};
      const entitiesMetaDataDict = {};
      result.entities.forEach(
        (entity) => { entitiesMetaDataDict[entity.id] = entity; },
      );
      result.relations.forEach((rel) => {
        if (discoverFrom) { entitiesDict[rel.from_id] = entitiesMetaDataDict[rel.from_id]; }
        if (discoverTo) { entitiesDict[rel.to_id] = entitiesMetaDataDict[rel.to_id]; }
      });
      const entitiesByType = {};
      Object.values(entitiesDict).sort().forEach(({ id, metadata: { type } }) => {
        entitiesByType[type] = entitiesByType[type] || {};
        entitiesByType[type][id] = entitiesDict[id];
      });
      const entities = [];
      await promiseMap(
        Object.keys(entitiesByType).sort(),
        async (type) => {
          const getterName = `Get${ENTITY_TYPE_TO_PLURAL[type]}`;
          const ids = Object.keys(entitiesByType[type]).sort();
          (await c.RegistryService[getterName]({
            ids,
            request: { credential },
          })).entities.forEach((entity) => {
            entitiesDict[entity.id] = entity;
            entities.push(entity);
          });
        },
      );
      return {
        ...result,
        entities: entities.map(entity => entitiesDict[entity.id] || entity),
        relations: result.relations.map(r => ({
          ...r,
          from: (
            discoverFrom
              ? entitiesDict[r.from_id]
              : entitiesMetaDataDict[r.from_id]
          ) || { id: r.from_id, metadata: {} },
          to: (
            discoverTo
              ? entitiesDict[r.to_id]
              : entitiesMetaDataDict[r.to_id]
          ) || { id: r.to_id, metadata: {} },
        })),
      };
    }
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Server-side error:', e);
    if (e && (e.message || e.details || '').match(/16/g)) {
      this.props.router.navigate('/home/sign-out', { trigger: true });
    } else {
      throw e;
    }
  }
  return null;
};


Object.keys(c).forEach(sk => Object.keys(c[sk]).forEach((methodName) => {
  c[sk][methodName] = wrapQuery(c[sk][methodName], methodName.toString());
}));

export const registryClient = c.RegistryService;
