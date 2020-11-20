/* @flow */
import ag from 'agensgraph';
import { error, info } from 'anymetrica-utils';
import { DEFAULT_CYPHER_DEBUG } from './constants';
import { getAgensConf } from './configurator';

const CYPHER_DEBUG = !!(process.env.CYPHER_DEBUG) || DEFAULT_CYPHER_DEBUG;

/**
 *
 * @param q
 * @param options
 * @return {Promise<any>}
 */
let globalCypherQueryCounter = 1;
const conf = getAgensConf();
export const pool = new ag.Pool(conf);

export const pgClientQueryAsync = async (
  q: string,
  options: Array<any> = [],
): Promise<{ rows: Array<Object>, rowCount: number }> => {
  globalCypherQueryCounter += 1;
  const queryNumLocal = globalCypherQueryCounter + 1;
  if (CYPHER_DEBUG) {
    info(`[CYPHER:${queryNumLocal}] ${q.replace(/ *\n */g, ' ')}`);
  }
  return new Promise(async (resolve, reject) => {
    const client = await pool.connect();
    const q1 = `CREATE GRAPH IF NOT EXISTS ${conf.graphName}; SET graph_path = ${conf.graphName} ;`;
    client.query(q1, [], (e1) => {
      if (e1) {
        error(`[CYPHER:${queryNumLocal}] ERROR: ${q1}`, e1);
        client.release();
        reject(e1);
        return;
      }
      client.query(q, options, (e, res) => {
        if (e) {
          error(`[CYPHER:${queryNumLocal}] ERROR: ${e.error}`, e);
          client.release();
          reject(e);
          return;
        }
        client.release();
        resolve(res);
      });
    });
  });
};
