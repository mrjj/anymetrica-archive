#!/usr/bin/env node
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const ProtobufJS = require('protobufjs');
const stringify = require('json-stable-stringify');

const wrapComment = (comment, padding = 0) => (`/**\n${comment.split('\n')
  .map(str => ` * ${str}\n`)
  .join('')} */`).split('\n').map(str => `${' '.repeat(padding)}${str}`).join('\n');

/**
 * Script start dir
 */
const CWD = process.cwd();

const makeTypesProto = (typesDict) => {
  return `syntax = "proto3";
${wrapComment(`@file protos/anymetrica/entity.proto
@package anymetrica.entity
@fileOverview @description This autogenerated package defines Entity types - core of Anymetrica resource model`)}

package anymetrica.entity;
option java_package = "com.anymetrica.entity";

${wrapComment('@enum EntityType\n\nEntity type names')}
enum EntityType {
${typesDict.entitiesArr.map(({ name, number }) => `  ${name} = ${number};`).join('\n')}
}

${wrapComment('@enum EntityTypePlural\n\nEntity plural type names')}
enum EntityTypePlural {
${typesDict.entitiesArr
    .filter(({ plural }) => !!plural)
    .map(({ plural, number }) => `  ${plural} = ${number};`)
    .join('\n')}
}
`;
};

const makeTypesJson = (typesDict) => {
  return stringify(typesDict, { space: '  ' });
};

const makeTypesFlow = (typesDict) => {
  return `/* @flow */\n${wrapComment(`@fileOverview RPC Entity types`)}

${wrapComment('@section TYPES')}

${wrapComment(`@type TEntityType\n\nEntity type names`)}
export type TEntityType = ${typesDict.entitiesArr.map(({ name }) => `'${name}'`).join(' | ')};

${wrapComment(`@type TEntityTypePlural\n\nEntity plural type names`)}
export type TEntityTypePlural = ${typesDict.entitiesArr
    .filter(({ plural }) => !!plural)
    .map(({ plural }) => `'${plural}'`)
    .join(' | ')};

${wrapComment('@section CONSTANTS')}

${typesDict.entitiesArr.map(({ name }) => `
${wrapComment(`@const ${name}`)}
export const ${name}: TEntityType = '${name}';`).join('\n')}

${wrapComment(`@const ENTITY_TYPE\n\nEntity type names`)}
export const ENTITY_TYPE: { [TEntityType]: TEntityType } = {
${typesDict.entitiesArr.map(({ name }) => `  ${name}: ${name}`).join(',\n')},
};

${typesDict.entitiesArr
    .filter(({ plural }) => !!plural)
    .map(({ plural }) => `
${wrapComment(`@const ${plural}`)}
export const ${plural}: TEntityTypePlural = '${plural}';`).join('\n')}

${wrapComment(`@const ENTITY_TYPE_PLURAL\n\nEntity plural type names`)}
export const ENTITY_TYPE_PLURAL: { [TEntityTypePlural]: TEntityTypePlural } = {
${typesDict.entitiesArr
    .filter(({ plural }) => !!plural)
    .map(({ plural }) => `  ${plural}: ${plural}`)
    .join(',\n')},
};

${wrapComment(`@const ENTITY_TYPE_TO_PLURAL\n\nEntity names to plural`)}
export const ENTITY_TYPE_TO_PLURAL: { [TEntityType]: TEntityTypePlural } = {
${typesDict.entitiesArr
    .filter(({ plural }) => !!plural)
    .map(({ name, plural }) => `  ${name}: ${plural}`)
    .join(',\n')},
};
`;
};

const makeTypesJs = (typesDict) => {
  return `${wrapComment(`@fileOverview RPC Entities constants`)}

${typesDict.entitiesArr.map(({ name }) => `
${wrapComment(`@const ${name}`)}
const ${name} = '${name}';`).join('\n')}

${wrapComment(`@const ENTITY_TYPE\n\nEntity type names`)}
const ENTITY_TYPE = {
${typesDict.entitiesArr.map(({ name }) => `  ${name}: ${name}`).join(',\n')},
};

${typesDict.entitiesArr
    .filter(({ plural }) => !!plural)
    .map(({ plural }) => `
${wrapComment(`@const ${plural}`)}
const ${plural} = '${plural}';`).join('\n')}

${wrapComment(`@const ENTITY_TYPE_PLURAL\n\nEntity plural type names`)}
const ENTITY_TYPE_PLURAL = {
${typesDict.entitiesArr
    .filter(({plural}) => !!plural)
    .map(({ plural }) => `  ${plural}: ${plural}`)
    .join(',\n')},
};

${wrapComment(`@const ENTITY_TYPE_TO_PLURAL\n\nEntity names to plural`)}
const ENTITY_TYPE_TO_PLURAL = {
${typesDict.entitiesArr
    .filter(({plural}) => !!plural)
    .map(({ name, plural }) => `  ${name}: ${plural}`)
    .join(',\n')},
};

module.exports = {
  ENTITY_TYPE,
  ENTITY_TYPE_PLURAL,
  ENTITY_TYPE_TO_PLURAL,

  // Entity types
${typesDict.entitiesArr.map(({ name }) => `  ${name},`).join('\n')}

  // Entity types plural
${typesDict.entitiesArr
    .filter(({plural}) => !!plural)
    .map(({ plural }) => `  ${plural},`)
    .join('\n')}
};
`;
};

/**
 * ProtobufJs Parse options
 * @type {{keepCase: ?boolean, alternateCommentMode: ?boolean}}
 */
const PARSE_OPTIONS = {
  keepCase: true,
  alternateCommentMode: true
};


const makeHash = (v, foundHashesArr) => {
  const hash = crypto.createHash('SHA1');
  hash.update(v);
  let hh = 1;
  const d = hash.digest();
  for (let i = 0; i < d.length; i += 1) {
    hh = Math.floor(d[i] / 8) + 1;
    if (foundHashesArr.indexOf(hh) === -1) {
      break;
    }
  }
  return hh;
};


/**
 * Make template context
 *
 * @param n {Object} - protocol buffer reflection node
 * @param entities {Object} - context
 *
 * @returns {Object} - context
 */
const visitProto = (n, entities = {
  entities: {},
  plural: {},
}) => {
  const names = {};
  const output = {};
  for (let k in n) {
    names[k] = null;
  }
  Object.keys(n).forEach(k => {
    names[k] = true;
    if (k
      && (k[0] !== '_')
      && (['nested', 'deferred', 'resolved', 'parent'].indexOf(k) === -1)
      && (n[k] !== null)) {
      output[k] = n[k];
    }
  });
  names[n.constructor.name] = n.constructor.name;
  const nodeType = n.constructor.name;
  if (!n.nested) {} else {
    Object.keys(n.nested).forEach(k => {
      return visitProto(n.nested[k], entities);
    });
  }
  const haveMeta = (n.fieldsArray || [])
    .map(({ type }) => type)
    .indexOf('anymetrica.metadata.Metadata') !== -1;
  if (nodeType === 'Type') {
    if (haveMeta) {
      entities.entities[n.name] = makeHash(n.name, Object.values(entities.entities));
    }
    const typef = (n.fieldsArray || []).filter(({ name }) => name === 'entities');
    if (typef.length) {
      entities.plural[typef[0].type.split('.').slice(-1)[0]] = n.name;
    }
  }
  return entities;
};


const makeEntitiesList = async (inputProtoPath, outputPath) => {
  if (fs.existsSync(outputPath)) {fs.unlinkSync(outputPath);}
  if (!fs.existsSync(path.dirname(outputPath))) {path.dirname(outputPath);}
  const Root = new ProtobufJS.Root(PARSE_OPTIONS);
  await Root.load(inputProtoPath, PARSE_OPTIONS);
  const types = visitProto(Root);
  types.entitiesArr = [
    { name: 'EntityUnknown', number: 0, plural: 'EntitiesUnknown' },
    ...(Object.keys(types.entities)
      .sort()
      .map(k => ({ name: k, number: types.entities[k], plural: types.plural[k] })))
  ];
  fs.writeFileSync(`${outputPath}.proto`, makeTypesProto(types));
  fs.writeFileSync(`${outputPath}.json`, makeTypesJson(types));
  fs.writeFileSync(`${outputPath}.js.flow`, makeTypesFlow(types));
  fs.writeFileSync(`${outputPath}.js`, makeTypesJs(types));
};


/**
 * Take paths from command line
 */
const argv = process.argv.slice(2);

if (argv.length < 2) {
  process.stdout.write('Please define output path, example:\n$ entity.js ./input_schema.proto ./output_schema\n');
  process.exit(1);
}
const pathsProtoInput = argv[0];
const pathsOutput = argv[1];

/**
 * Main
 */
process.stdout.write(`Making Entities list:\nRoot folder: ${CWD}\n\nInput:\n${pathsProtoInput}\n\nOutput:\n${pathsOutput}\n`);

makeEntitiesList(
  pathsProtoInput,
  pathsOutput,
)
  .then(() => {
    process.stdout.write('Done\nExiting with exit code 0\n');
    process.exit();
  })
  .catch(e => {
    process.stderr.write(`Error: ${e.message}\n${e.stack}\nExiting with exit code 1`);
    process.exit(1);
  });
