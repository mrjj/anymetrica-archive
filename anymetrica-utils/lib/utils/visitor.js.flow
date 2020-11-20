/* @flow */
const cloneDeep = require('lodash.clonedeep');
const forEach = require('lodash.foreach');
const range = require('lodash.range');

const { isArray, isFunction, isObject, isString } = require('./types');
const { isEmpty } = require('./checks');
const { keys } = require('./dataStructures');
const { promiseMap } = require('./promise');

export type VisitFnType = (
  dataNode: any,
  key: ?any,
  parent: ?Array<any> | Object,
)=> any;

export type AsyncVisitFnType = (
  dataNode: any,
  key: ?any,
  parent: ?Array<any> | Object,
)=> Promise<any>;

/**
 * Apply given function to all data tree (list/dict or JSON) nodes.
 *
 * @param dataTree - data tree (list/dict or JSON)
 * @param pre {VisitFnType} - function returning new node value
 * @param post {VisitFnType} - function returning new node value
 * @returns {any} - new data tree matching input type
 */
const visitorSync = (
  dataTree: any,
  pre?: VisitFnType = x => cloneDeep(x),
  post?: VisitFnType = x => x,
): any => {
  if (!(isFunction(post) || isFunction(post))) {
    return cloneDeep(dataTree);
  }
  const visit = (node: any, parent): any => {
    if ((!isEmpty(node)) && (isArray(node) || isObject(node))) {
      const l = node.length;
      const target = Array.isArray(node) ? Array(l) : {};
      const ks = Array.isArray(node) ? range(l) : Object.keys(node).sort();
      forEach(ks, async (k: any) => {
        target[k] = post(visit(pre(node[k], k, node), node), k, node);
      });
      return target;
    }
    return post(pre(node, null, parent), null, parent);
  };
  return post(visit(pre(dataTree, null, null), null), null);
};

/**
 * Apply given function to all data tree (list/dict or JSON) nodes.
 *
 * @param dataTree - data tree (list/dict or JSON)
 * @param pre {AsyncVisitFnType} - function returning new node value
 * @param post {AsyncVisitFnType} - function returning new node value
 * @returns {any} - new data tree matching input type
 */
const visitorAsync = async (
  dataTree: any,
  pre?: AsyncVisitFnType = async x => cloneDeep(x),
  post?: AsyncVisitFnType = async x => x,
): Promise<any> => {
  if (!(isFunction(post) || isFunction(post))) {
    return cloneDeep(dataTree);
  }
  const visit = async (node: any, parent): Promise<any> => {
    if ((!isEmpty(node)) && (isArray(node) || isObject(node))) {
      const l = node.length;
      const target = isArray(node) ? Array(l) : {};
      const ks = Array.isArray(node) ? range(l) : Object.keys(node).sort();
      await promiseMap(ks, async (k: any) => {
        target[k] = await post(await visit(await pre(node[k], k, node), node), k, node);
      });
      return target;
    }
    return post(pre(node, null, parent), null, parent);
  };
  return post(await visit(await pre(dataTree, null, null), null), null);
};

/**
 * Preview JSON doing truncate of too long strings
 *
 * @param dataTree {*}
 * @param maxLength {number}
 * @returns {*}
 */
const previewJSON = (dataTree: any, maxLength: number = 255): any => visitorSync(
  dataTree,
  undefined,
  (dataNode) => {
    const isBigObj = isObject(dataNode) && keys(dataNode).length > maxLength;
    const isBigStr = isString(dataNode) && dataNode.length > maxLength;
    const isBigArrayBuffer = Buffer.isBuffer(dataNode);
    if (isBigArrayBuffer) {
      return `<TRUNCATED><Buffer(${dataNode.byteLength})>`;
    }
    if (isBigObj) {
      return `<TRUNCATED><object(${Object.keys(dataNode).length})>`;
    }
    if (isBigStr) {
      const tag = `<TRUNCATED><String(${dataNode.length})>`;
      const len = Math.max(maxLength - tag.length, 0);
      return `${dataNode.slice(0, len)}${tag}`;
    }
    return dataNode;
  },
);

module.exports = {
  previewJSON,
  visitor: visitorSync,
  visitorAsync,
  visitorSync,
};
