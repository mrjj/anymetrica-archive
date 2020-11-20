/* @flow */
/**
 * Convert text to snake case
 *
 * _.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * _.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * _.snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 *
 * @param str
 * @return {*}
 */
const snakeCase = (str: string): string => (
  str.replace(/_\w/g, m => m[1].toLowerCase())
);

/**
 * Character to hex
 * @param chars
 * @return {string}
 */
const char2hex = (chars: string): string => {
  const l = chars.length;
  let result = '';
  // Performance note:
  // https://www.freecodecamp.org/forum/t/which-is-more-efficient-str-some-string-or-array-push-join/5802/4
  for (let i = 0; i < l; i += 1) {
    result += chars[i].charCodeAt(0).toString(16).toUpperCase();
  }
  return result;
};

/* eslint-disable no-control-regex */
/**
 * From https://github.com/bitnine-oss/agensgraph-nodejs/blob/master/lib/agens.js#L65
 */
const sqlLiteralEscape = (s: ?string) => (s || '')
  .replace(/\\/g, '\\\\')
  .replace(/"/g, '\\"')
  .replace(/\0/g, '\\0')
  .replace(/\t/g, '\\t')
  .replace(/\n/g, '\\n')
  .replace(/\r/g, '\\r')
  .replace(/[\x00-\x0F]/g, ch => `\\x0${char2hex(ch)}`)
  .replace(/[\x10-\x1F\x7F-\x9F]/g, ch => `\\x${char2hex(ch)}`);

module.exports = {
  char2hex,
  sqlLiteralEscape,
  snakeCase,
};
