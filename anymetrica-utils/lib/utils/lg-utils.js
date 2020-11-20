"use strict";

/* eslint-disable */

var createDate = function createDate(y, m, d, h, M, s, ms) {
  /**
   * Function is taken from Vis.js:
   * https://github.com/almende/vis
   *
   * A dynamic, browser-based visualization library.
   *
   * * The MIT License
   *   http://opensource.org/licenses/MIT
   */
  y = y || 1;
  m = m || 0;
  d = d || 1;
  h = h || 4;
  M = M || 0;
  s = s || 0;
  ms = ms || 0;
  var date = new Date(Date.UTC(y, m, d, h, M, s, ms));
  if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
    date.setFullYear(y);
  }
  return date;
};

var alignTimerange = function alignTimerange(startMs, endMs) {
  var startDate = new Date(startMs);
  var endDate = new Date(endMs);
  startDate = createDate(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  // Add one day to the tail, overlapping possible leap second and then resetting
  // time to the start of the day
  endDate = new Date(createDate(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() + MS_IN_DAY + MS_IN_SECOND * 2);
  endDate.setMinutes(0, 0, 0);
  return {
    startDate: startDate,
    endDate: endDate
  };
};
var MS_IN_DAY = 24 * 60 * 60 * 1000;

module.exports = {
  createDate: createDate,
  alignTimerange: alignTimerange,
  MS_IN_DAY: MS_IN_DAY
};