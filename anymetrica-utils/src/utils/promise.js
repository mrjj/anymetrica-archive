/* @flow */

/**
 * Chains functions returning promises
 *
 * @param functionsReturningPromise - list of functions returning promise
 * @param defaultData
 * @returns {Promise.<any>}
 */
// eslint-disable-next-line
const _chainPromises = (
  functionsReturningPromise,
  defaultData,
) => new Promise((resolve, reject) => {
  let p = Promise.resolve(defaultData);
  functionsReturningPromise.forEach((func) => {
    p = p.then(func, reject);
    return p;
  });
  p.then(resolve, reject);
});

/**
 * Mapper + promise chain
 *
 * @example: Sleep down with increasing delays of naps
 *
 * await cpMap(
 *   [1, 2, 4, 8],
 *   (delaySec) => new Promise((resolve) => {
 *     setTimeout(resolve, delaySec * 1000);
 *   })
 * );
 *
 * console.warning('A? Chto?! Skolko vremeni?');
 *
 * Underscore/LoDash performance note:
 *
 * Underscore is used for execution performance optimisation.
 * https://jsperf.com/native-map-vs-lodash-map
 * Under the hood _ iteration tools gives 1. own properties check skip
 * But addin extra fn lookup constant delay that would be picked up
 * by V8 depending on step execution behaviour.
 * https://www.youtube.com/watch?v=cD9utLH3QOk
 *
 * @param values - array of values
 * @param fn - function returning promises
 * @returns {Promise<Array>}
 */
const promiseMap = async (values: Array<any>, fn: (val: any, idx?: ?number) => any) => {
  const results = [];
  await _chainPromises(
    values.map(
      (value, idx) => (v => async () => {
        const res = await fn(v, idx);
        results.push(res);
        return res;
      })(value),
    ),
  );
  return results;
};

/**
 * Wait some time (ms)
 *
 * @param timeMs
 * @return {Promise<*>}
 */
const wait: (timeMs: number) => Promise<void> = timeMs =>
  new Promise(resolve => setTimeout(resolve, timeMs));

// noinspection JSUnusedGlobalSymbols
module.exports = {
  promiseMap,
  wait,
};
