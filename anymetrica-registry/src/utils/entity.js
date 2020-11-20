/* @flow */
import uuidv4 from 'uuid/v4';
import { forceArray, isArray, isEmpty, isNil, isObject, nowObj, set } from 'anymetrica-utils';
import type {
  EntityMetadataType,
  GrpcEntityType,
  GrpcRequestPayloadType,
  GrpcResponsePayloadType,
  ProcessingEntityType,
  RequestPayloadType,
  ResponsePayloadType,
} from '../types';

/**
 * Get metadata for new object.
 *
 * @return {{
 *   label: ?string,
 *   created_ts_seconds: number,
 *   created_ts_nanos: number,
 *   updated_ts_seconds: number,
 *   updated_ts_nanos: number,
 *   id: string,
 *   is_deleted: boolean
 * }}
 */
export const newEntity = (): EntityMetadataType => {
  const { seconds, nanos } = nowObj();
  const id = uuidv4();
  return {
    id,
    is_deleted: false,
    metadata: {
      label: null,
      type: null,
      created_ts_seconds: seconds,
      created_ts_nanos: nanos,
      updated_ts_seconds: seconds,
      updated_ts_nanos: nanos,
      deleted_ts_seconds: null,
      deleted_ts_nanos: null,
    },
  };
};

/**
 * From protocol buffers format.
 *
 * @param input
 */
export const fromProto = (input: GrpcRequestPayloadType): RequestPayloadType => {
  if (Buffer.isBuffer(input)) {
    return input;
  }
  if (isArray(input)) {
    return input.map(fromProto);
  }
  if (isObject(input)) {
    const output = {};
    Object.keys(input).forEach((k) => {
      const v = input[k];
      if (isArray(v)) {
        output[k] = fromProto(v);
      } else if (isObject(v)) {
        if (v.seconds) {
          output[`${k}_seconds`] = parseInt(v.seconds, 10) || 0;
          output[`${k}_nanos`] = v.nanos ? parseInt(v.nanos, 10) : (output[`${k}_nanos`] || 0);
        } else if (v.nanos) {
          output[`${k}_nanos`] = parseInt(v.nanos, 10) || 0;
          output[`${k}_seconds`] = v.seconds ? parseInt(v.seconds, 10) : (output[`${k}_seconds`] || 0);
        }
        output[k] = fromProto(v);
      } else if (!isNil(v)) {
        output[k] = v;
      }
    });
    return output;
  }
  return input;
};

/**
 * Single entity to proto.
 *
 * @param input
 * @return {GrpcEntityType}
 */
export const entityToProto = (input: ProcessingEntityType): GrpcEntityType => {
  const output = {};
  Object.keys(input).forEach((k) => {
    const tsK = k.replace(/_(seconds|nanos)$/ig, '');
    const tsSubK = k.replace(new RegExp(`^${tsK}_`), '');
    const targetObj = output;
    if (Buffer.isBuffer(input[k])) {
      targetObj[k] = input[k];
    } else if (Array.isArray(input[k])) {
      targetObj[k] = input[k].map(entityToProto);
    } else if (k !== tsK) {
      targetObj[tsK] = targetObj[tsK] || {
        nanos: 0,
        seconds: 0,
      };
      set(targetObj, [tsK, tsSubK], input[k]);
    } else {
      targetObj[k] = isObject(input[k]) ? entityToProto(input[k]) : input[k];
    }
  });
  return output;
};

/**
 * Convert internal representation to gRPC response.
 *
 * @return {GrpcResponsePayloadType}
 * @param input
 */
export const toProto = (input: Array<ResponsePayloadType> | Object): GrpcResponsePayloadType => {
  if (isArray(input)) {
    const entities = forceArray(input).map(entityToProto);
    return {
      entities: isEmpty(entities) ? null : entities,
    };
  }
  return entityToProto(input);
};
