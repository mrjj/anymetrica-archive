/* @flow */
import { message } from 'antd';
import BackBone from 'backbone';
import { SessionToken } from 'anymetrica-api/dist/enums';
import { registryClient } from './client';

/**
 * Is any kind of Browser local storage available
 *
 * @param type
 * @returns {boolean}
 */
export const isStorageAvailable = (type) => {
  let storage;
  try {
    // eslint-disable-next-line no-undef
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof window.DOMException && (// everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) && (
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
};

/**
 * Get browser local storage
 *
 * @param preferSessionStorage
 * @param enableFallback
 * @returns {Storage}
 */
export const getStorage = (preferSessionStorage = false, enableFallback = true) => {
  if (preferSessionStorage) {
    if (isStorageAvailable('sessionStorage')) {
      return window.sessionStorage;
    }
    // eslint-disable-next-line no-console
    console.warn('No sessionStorage available, trying to use localStorage instead');
    if (enableFallback && isStorageAvailable('localStorage')) {
      return window.localStorage;
    }
  }
  if (isStorageAvailable('localStorage')) {
    return window.localStorage;
  }
  // eslint-disable-next-line no-console
  console.warn('No localStorage available, trying to use sessionStorage instead');
  if (enableFallback && isStorageAvailable('sessionStorage')) {
    return window.sessionStorage;
  }

  throw new Error('No localStorage or sessionStorage are available or fall-backs are not allowed');
};

export const STORAGE = getStorage();

export const getStored = () => ({
  session_token: STORAGE.getItem('session_token') || STORAGE.getItem('token'),
  token: STORAGE.getItem('token') || STORAGE.getItem('session_token'),
  username: STORAGE.getItem('username'),
  namespace: STORAGE.getItem('namespace'),
});

/**
 * Browser-level storage
 */
type UserCtxType = { username?: ?string, password?: ?string, namespace?: ?string, token?: ?string };
export const signIn = async (params: UserCtxType): Promise<UserCtxType> => {
  const { username, password, namespace } = params;

  const discoverResult = await registryClient.Discover({
    request: {
      credential: {
        username_password: {
          password,
          username,
          // TODO: Enable namespaces
          // namespace,
        },
      },
    },
    types: [SessionToken],
  });

  if (discoverResult.error) {
    message.error(discoverResult.error.details);
    return { ...params };
  }
  const discoverIds = (discoverResult.entities || []).map(({ id }) => id);
  const credentialEntities = await registryClient.GetSessionTokens({
    ids: discoverIds,
    request: {
      credential: {
        username_password: {
          password,
          username,
          // TODO: Enable namespaces
          namespace,
        },
      },
    },
  });
  if (credentialEntities.entities.length > 0) {
    const currentCredential = credentialEntities.entities[0];
    STORAGE.setItem('username', username);
    STORAGE.setItem('namespace', namespace || currentCredential.namespace || '');
    STORAGE.setItem('token', currentCredential.session_token || currentCredential.token);
    STORAGE.setItem('session_token', currentCredential.session_token || currentCredential.token);
    BackBone.history.navigate('/home/dashboard', { trigger: true });
  } else {
    throw new Error('No session ID was returned!');
  }
  return null;
};

export const resetStorage = () => {
  STORAGE.removeItem('username');
  STORAGE.removeItem('namespace');
  STORAGE.removeItem('password');
  STORAGE.removeItem('token'); // deprecated
  STORAGE.removeItem('session_token');
};
