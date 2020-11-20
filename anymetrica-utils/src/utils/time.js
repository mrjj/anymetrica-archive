/* @flow */
const moment = require('moment');

const MS_IN_SECOND = 1000;
const NANOS_IN_MS = 1000 * 1000;
const NANOS_IN_SECOND = 1000 * 1000 * 1000;

export type GoogleWktTsType = { seconds: ?number | string, nanos: ?number | string }
export type DateScalarType = ?string | number | null;
/**
 * Get timestamp object compatible with:
 * https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/timestamp.proto#L101
 *
 * @return {{seconds: number, nanos: number}}
 *
 * @example
 *
 * nowObj()
 * // => { seconds: 12345678, nanos: 999,999,999 }
 */
const nowObj = () => {
  const ms = (new Date()).getTime();
  const seconds = Math.floor(ms / MS_IN_SECOND);
  const nanos = (ms % MS_IN_SECOND) * NANOS_IN_MS;
  return {
    seconds,
    nanos,
  };
};

const nowMs = () => (new Date()).getTime();
const nowSec = () => nowMs() / 1000;
const nowISO = () => (new Date()).toISOString();
const nowHuman = () => (new Date()).toISOString().replace('T', ' ').split('.')[0];


/**
 * .proto TimeStamp/Duration Object to milliseconds
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
const obj2ms = ({ seconds, nanos }: GoogleWktTsType): number =>
  (parseInt(seconds, 10) * MS_IN_SECOND)
  + Math.floor(parseInt(nanos, 10) / NANOS_IN_MS);

/**
 * .proto TimeStamp/Duration Object to seconds float
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
const obj2seconds = ({ seconds, nanos }: GoogleWktTsType): number =>
  parseInt(seconds, 10) + (parseInt(nanos, 10) / NANOS_IN_SECOND);

/**
 * Milliseconds to .proto object
 * @param ms - number
 * @return {{seconds: number, nanos: number}}
 */
const ms2obj = (ms: DateScalarType): GoogleWktTsType => {
  const secondsFloat = parseFloat(ms || 0) / MS_IN_SECOND;
  const secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND),
  };
};

/**
 * Seconds to .proto object
 * @param seconds - number
 * @return {{seconds: number, nanos: number}}
 */
const seconds2obj = (seconds: DateScalarType): GoogleWktTsType => {
  const secondsFloat = parseFloat(seconds || 0);
  const secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND),
  };
};

/**
 * seconds to moment.js
 * @param seconds
 * @return {never|moment.Moment}
 */
const seconds2moment = (seconds: DateScalarType) => moment(parseFloat(seconds) * MS_IN_SECOND);

/**
 * ms to moment.js
 * @param ms
 * @return {never|moment.Moment}
 */
const ms2moment = (ms: DateScalarType) => moment(parseInt(ms || 0, 10));

module.exports = {
  now: nowHuman,
  nowHuman,
  nowISO,
  nowMs,
  nowSec,
  nowObj,
  obj2seconds,
  obj2ms,
  seconds2obj,
  ms2obj,
  seconds2moment,
  ms2moment,
  MS_IN_SECOND,
  NANOS_IN_MS,
  NANOS_IN_SECOND,
};
