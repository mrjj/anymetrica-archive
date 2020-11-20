'use strict';

/* @flow */
var moment = require('moment');

var MS_IN_SECOND = 1000;
var NANOS_IN_MS = 1000 * 1000;
var NANOS_IN_SECOND = 1000 * 1000 * 1000;

/*:: export type GoogleWktTsType = { seconds: ?number | string, nanos: ?number | string }*/

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
/*:: export type DateScalarType = ?string | number | null;*/
var nowObj = function nowObj() {
  var ms = new Date().getTime();
  var seconds = Math.floor(ms / MS_IN_SECOND);
  var nanos = ms % MS_IN_SECOND * NANOS_IN_MS;
  return {
    seconds: seconds,
    nanos: nanos
  };
};

var nowMs = function nowMs() {
  return new Date().getTime();
};
var nowSec = function nowSec() {
  return nowMs() / 1000;
};
var nowISO = function nowISO() {
  return new Date().toISOString();
};
var nowHuman = function nowHuman() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
};

/**
 * .proto TimeStamp/Duration Object to milliseconds
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
var obj2ms = function obj2ms(_ref) /*: number*/ {
  var seconds = _ref.seconds,
      nanos = _ref.nanos;
  return parseInt(seconds, 10) * MS_IN_SECOND + Math.floor(parseInt(nanos, 10) / NANOS_IN_MS);
};

/**
 * .proto TimeStamp/Duration Object to seconds float
 * @param {{seconds: number, nanos: number}}
 * @returns {number}
 */
var obj2seconds = function obj2seconds(_ref2) /*: number*/ {
  var seconds = _ref2.seconds,
      nanos = _ref2.nanos;
  return parseInt(seconds, 10) + parseInt(nanos, 10) / NANOS_IN_SECOND;
};

/**
 * Milliseconds to .proto object
 * @param ms - number
 * @return {{seconds: number, nanos: number}}
 */
var ms2obj = function ms2obj(ms /*: DateScalarType*/) /*: GoogleWktTsType*/ {
  var secondsFloat = parseFloat(ms || 0) / MS_IN_SECOND;
  var secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND)
  };
};

/**
 * Seconds to .proto object
 * @param seconds - number
 * @return {{seconds: number, nanos: number}}
 */
var seconds2obj = function seconds2obj(seconds /*: DateScalarType*/) /*: GoogleWktTsType*/ {
  var secondsFloat = parseFloat(seconds || 0);
  var secondsInt = Math.floor(secondsFloat);
  return {
    seconds: secondsInt,
    nanos: Math.floor((secondsFloat - secondsInt) * NANOS_IN_SECOND)
  };
};

/**
 * seconds to moment.js
 * @param seconds
 * @return {never|moment.Moment}
 */
var seconds2moment = function seconds2moment(seconds /*: DateScalarType*/) {
  return moment(parseFloat(seconds) * MS_IN_SECOND);
};

/**
 * ms to moment.js
 * @param ms
 * @return {never|moment.Moment}
 */
var ms2moment = function ms2moment(ms /*: DateScalarType*/) {
  return moment(parseInt(ms || 0, 10));
};

module.exports = {
  now: nowHuman,
  nowHuman: nowHuman,
  nowISO: nowISO,
  nowMs: nowMs,
  nowSec: nowSec,
  nowObj: nowObj,
  obj2seconds: obj2seconds,
  obj2ms: obj2ms,
  seconds2obj: seconds2obj,
  ms2obj: ms2obj,
  seconds2moment: seconds2moment,
  ms2moment: ms2moment,
  MS_IN_SECOND: MS_IN_SECOND,
  NANOS_IN_MS: NANOS_IN_MS,
  NANOS_IN_SECOND: NANOS_IN_SECOND
};