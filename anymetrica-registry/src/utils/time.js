/* @flow */
import { MS_IN_SECOND, NANOS_IN_SECOND } from '../constants';

export const getNowSeconds = (): number => Math.floor((new Date()).getTime() / 1000);

/**
 * .proto TimeStamp/Duration Object to milliseconds
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
export const obj2ms = ({ seconds, nanos }) =>
  (parseInt(seconds, 10) * 1000)
  + Math.floor(parseInt(nanos, 10) / (1000 * 1000));

/**
 * .proto TimeStamp/Duration Object to seconds float
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
export const obj2seconds = ({ seconds, nanos }) =>
  parseInt(seconds, 10)
  + (parseInt(nanos, 10) / (1000 * 1000 * 1000));

/**
 * Milliseconds to .proto object
 * @param ms - number
 * @return {{seconds: number, nanos: number}}
 */
export const ms2obj = (ms) => {
  const secondsFloat = parseFloat(ms || 0, 10) / MS_IN_SECOND;
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
export const seconds2obj = (seconds) => {
  const secondsFloat = parseFloat(seconds || 0, 10);
  const secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND),
  };
};
