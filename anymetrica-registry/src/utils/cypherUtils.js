/* @flow */

/**
 * @fileOverview: Cypher utils
 */
import { EntityUnknown } from 'anymetrica-api/dist/enums';
import {
  compact,
  forceArray,
  isArray,
  isBoolean,
  isEmpty,
  isNil,
  isNumber,
  isObject,
  isString,
  sqlLiteralEscape,
} from 'anymetrica-utils';
import { newEntity } from './entity';
import { TARGET_VAR } from '../constants';

/**
 * @param {!Object} obj
 * @return {!Object} metadata
 */
export const cypherProps = (obj: any): string => {
  if (isNil(obj)) {
    return '';
  }
  if (isString(obj)) {
    return `'${obj}'`; // TODO(Ilya): Make workaround for driver bug .replace(/\$/g, '\\$')
  }
  if (isArray(obj)) {
    return `[ ${obj.map(item => cypherProps(item))
      .filter(i => !isNil(i))
      .join(', ')} ]`;
  }
  if (isBoolean(obj)) {
    return obj ? 'true' : 'false';
  }
  if (isNumber(obj)) {
    return obj.toString();
  }
  if (isObject(obj)) {
    const res = [];
    Object.keys(obj)
      .map((k) => {
        const v = obj[k];
        if (!isNil(v)) {
          const newKey = `${k.match(/[^a-z0-9-_=]/i) ? `'${k}'` : k}: ${cypherProps(v)}`;
          // if (newKey === 'id') {newKey = 'uuid'}
          res.push(newKey);
        }
        return null;
      });
    return `{ ${res.join(', ')} }`;
  }
  return `${(obj: string)}`;
};

export const labelEscape = (label?: ?string): string => (label ? `"${sqlLiteralEscape(label)}"` : '');

export const formatId = id => (
  // id ? `${id}`.replace(/[^a-zA-Z0-9\-_]+/ig, '') : null
  id ? `'${id}'` : null
);
export const formatIds = (idsArr: Array<string>): string => `[${forceArray(idsArr)
  .filter(x => !!x)
  .map(x => `${formatId(x)}`)
  .join(', ')}]`;

export const makeObject = (
  type?: ?string,
  props?: ?Object,
  variable?: ?string = 'x',
  withMetadata?: ?boolean = false,
): string => {
  const metadata = withMetadata ? newEntity() : {};
  const vTypeCondition = ((type && type !== EntityUnknown) ? `:${labelEscape(type)}` : '');
  const variableCondition = variable || '';
  const cleanProps = { ...metadata, ...props };
  return `(${compact([
    `${variableCondition}${vTypeCondition}`,
    isEmpty(cleanProps) ? '' : cypherProps(cleanProps),
  ])
    .join(' ')})`;
};

export const makeRelation = (
  type?: ?string,
  props?: ?Object,
  variable?: ?string = null,
): string => {
  const vTypeCondition = ((type && type !== EntityUnknown) ? labelEscape(type) : '');
  const variableCondition = variable || '';
  return `[${compact([
    `${variableCondition}${variable ? ':' : ''}${vTypeCondition}`,
    cypherProps(props),
  ])
    .join(' ')}]`;
};

/**
 * makeKvStr({ k1: 'v1', k2: 'v2'})
 * => "k1 = v1, k2 = v2"
 *
 * @param obj
 * @returns {string}
 */
export const makeKvStr = obj => Object.keys(obj).map(
  (k) => {
    const val = isNil(obj[k]) ? 'null' : cypherProps(obj[k]);
    const key = k.replace(/[^a-z0-9\-_=]+/ig, '');
    return `${TARGET_VAR}.${key} = ${val}`;
  },
).join(',\n  ');
