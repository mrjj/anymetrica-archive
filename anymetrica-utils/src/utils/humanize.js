/* @flow */

/**
 * Formats a number.
 *
 * http://snipplr.com/view/5945/javascript-numberformat--ported-from-php/
 */
const humanizeNumber = (
  number: number,
  decimals: number,
  decPoint: ?string,
  thousandsSep: ?string,
) => {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://crestidg.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // *     example 1: number_format(1234.5678, 2, '.', '');
  // *     returns 1: 1234.57
  let n: any = number;
  // eslint-disable-next-line no-restricted-globals
  const c = isNaN(decimals) ? 2 : Math.abs(decimals);
  const d = decPoint === undefined ? ',' : decPoint;
  const t = (thousandsSep === undefined) ? '.' : thousandsSep;
  const s = n < 0 ? '-' : '';
  const i: string = `${parseInt((n = Math.abs((+n) || 0).toFixed(c)), 10)}`;
  const j = (i.length > 3) ? i.length % 3 : 0;
  return [
    s,
    j ? (`${`${i || ''}`.substr(0, j)}${t || ''}`) : '',
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t || ''}`),
    c ? (parseInt(d, 10) + Math.abs(parseInt(n, 10) - parseInt(i, 10)).toFixed(c).slice(2)) : '',
  ].join('');
};

/**
 * Formats a byte size.
 *
 * http://snipplr.com/view/5949/format-humanize-file-byte-size-presentation-in-javascript/
 */
const humanizeSize = (inputSize: number) => {
  let size = inputSize;
  if (size >= 1073741824) {
    size = `${humanizeNumber(size / 1073741824, 2, '.', '')} GiB`;
  } else if (size >= 1048576) {
    size = `${humanizeNumber(size / 1048576, 2, '.', '')} MiB`;
  } else if (size >= 1024) {
    size = `${humanizeNumber(size / 1024, 0)} KiB`;
  } else {
    size = `${humanizeNumber(size, 0)} bytes`;
  }
  return size;
};

/**
 * Humanize percents.
 *
 * @param percent
 * @return {string}
 */
const humanizePercents = (percent: number) =>
  `${percent.toFixed(2).padStart(6)}%`;

module.exports = {
  humanizeNumber,
  humanizePercents,
  humanizeSize,
};
