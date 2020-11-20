#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ProtobufJS = require('protobufjs');
const stringify = require('json-stable-stringify');

/**
 * CONSTANTS
 */
const DEFAULT_FLOW_HEADER = `/* @flow */`;

/**
 * Script start dir
 */
const CWD = process.cwd();

/**
 * ProtobufJs Parse options
 * @type {{keepCase: ?boolean, alternateCommentMode: ?boolean}}
 */
const PROTOBUFJS_PARSE_OPTIONS = {
  keepCase: true,
  alternateCommentMode: true
};

/**
 * UTILS
 */
/**
 * Sort as numbers
 * @param a
 * @param b
 * @returns {number}
 */
const sortNumbers = (a, b) => {
  if (parseInt(a, 10) < parseInt(b, 10)) {
    return -1;
  }
  if (parseInt(a, 10) > parseInt(b, 10)) {
    return 1;
  }
  return 0;
};
const wrapComment = (comment, padding = 0) => (`/**\n${comment.split('\n')
  .map(str => ` * ${str}\n`)
  .join('')} */`).split('\n').map(str => `${' '.repeat(padding)}${str}`).join('\n');

/**
 * Make template context
 *
 * @param n {Object} - protocol buffer reflection node
 * @param enums {Object} - enums dict
 *
 * @returns {Object} - enums dict
 */
const visitProto = (n, enums = {}) => {
  const nodeType = n.constructor.name;
  if (!n.nested) {} else {
    Object.keys(n.nested).forEach(k => {
      return visitProto(n.nested[k], enums);
    });
  }
  if (nodeType === 'Enum') {
    enums[n.fullName] = ({
      name: n.name,
      fullName: n.fullName,
      ...(n.comment === null ? {} : { comment: n.comment }),
      filename: n.filename,
      values: Object.keys(n.valuesById || {}).sort(sortNumbers).map(
        (number) => {
          const value = n.valuesById[number];
          const valueComment = n.comments[value];
          let comment = null;
          if (n.comments) {
            comment = typeof valueComment === 'string' ? valueComment : valueComment;
          }
          return ({
            value,
            number: parseInt(number, 10),
            ...(comment === null ? {} : { comment }),
            ...(parseInt(number, 10) === 0 ? { default: true } : {}),
          });
        }
      )
    });
  }
  return enums;
};

const makeEnumsDictShortJson = (enums) => {
  const enumsDictShort = {};
  Object.keys(enums).sort().forEach((k) => {
    enumsDictShort[enums[k].name] = enums[k];
  });
  return stringify(enumsDictShort, { space: '  ' });
};

const makeEnumsDictFullJson = (enums) => stringify(enums, { space: '  ' });


const makeEnumsArr = (enums) => Object.keys(enums).sort().map(k => enums[k]);
const makeEnumsArrJson = (enums) => stringify(makeEnumsArr(enums), { space: '  ' });

// JS
const makeJsConstants = (enumsDict, header) => {
  const enums = makeEnumsArr(enumsDict);
  return `${header ? `${header}\n` : ''}${wrapComment(`@fileOverview Enums constants`)}

${enums.map(({ name, comment, values, fullName }) => `
${wrapComment(`@section ${name}\n${fullName}${comment ? `\n\n${comment}` : ''}`)}

${values.map(({ value, comment }) => `${
    wrapComment(`@const ${value}${comment ? `\n\n${comment}` : ''}`)
    }
const ${value} = '${value}';
`).join('\n')}

${wrapComment(`@const ${name}${comment ? `\n\n${comment}` : ''}`)}
const ${name} = {
${values.map(({ value, comment }) => `${comment ? `${wrapComment(comment, 2)}\n` : ''}  [${value}]: ${value},`)
    .join('\n')}
};

${wrapComment(`@const ${name}Arr - values array`)}
const ${name}Arr = [
${values.map(({ value }) => `  ${value},`).join('\n')}
];

${wrapComment(`@const ${name}ValueNumbers values order`)}
const ${name}ValueNumbers = {
${values.map(({ value, number, comment }) => `${comment ? `${wrapComment(comment, 2)}\n` : ''}  ${value}: ${number},`)
    .join('\n')}
};

`).join('')}

module.exports = {
${(() => enums.map(
    ({ name, values }) => ([
      '',
      `  // ${name}`,
      `  ${name},`,
      `  ${name}Arr,`,
      `  ${name}ValueNumbers,`,
      '',
      ...(values.map(({ value }) => `  ${value},`))
    ].join('\n'))
  ).join('\n'))()}
};
`;
};

// ES6 JS
const makeEs6JsConstants = (enumsDict, header) => {
  const enums = makeEnumsArr(enumsDict);
  return `${header ? `${header}\n` : ''}${wrapComment(`@fileOverview Enums constants`)}

${enums.map(({ name, comment, values, fullName }) => `
${wrapComment(`@section ${name}\n${fullName}${comment ? `\n\n${comment}` : ''}`)}

${values.map(({ value, comment }) => `${
    wrapComment(`@const ${value} {{T${name}}}${comment ? `\n\n${comment}` : ''}`)
    }
export const ${value}: T${name} = '${value}';
`).join('\n')}

${wrapComment(`@const ${name} {{ [T${name}]: T${name} }}${comment ? `\n\n${comment}` : ''}`)}
export const ${name}: { [T${name}]: T${name} } = {
${values.map(({ value, comment }) => `${comment ? `${wrapComment(comment, 2)}\n` : ''}  [${value}]: ${value},`)
    .join('\n')}
};

${wrapComment(`@const ${name}Arr {{Array<T${name}>}} - values array`)}
export const ${name}Arr: Array<T${name}> = [
${values.map(({ value }) => `  ${value},`).join('\n')}
];

${wrapComment(`@const ${name}ValueNumbers {{ [T${name}] : number }} - values order`)}
export const ${name}ValueNumbers: { [T${name}] : number } = {
${values.map(({ value, number, comment }) => `${comment ? `${wrapComment(comment, 2)}\n` : ''}  ${value}: ${number},`)
    .join('\n')}
};
`).join('')}
`;
};

// FLOW
const makeFlow = (enumsDict, header) => {
  const enums = makeEnumsArr(enumsDict);
  return `${header ? `${header}\n` : ''}${wrapComment('@fileOverview Enums flow types')}

${wrapComment('@section TYPES')}

${enums.map(
    ({ name, fullName, comment, values }) => `${
      wrapComment(`@type T${name}\n${fullName}${comment ? `\n\n${comment}` : ''}`)
      }\nexport type T${name} = ${
      values.map(({ value }) => `'${value}'`).join(' | ')
      };\n`
  ).join('\n')}

${makeEs6JsConstants(enumsDict, wrapComment('@section CONSTANTS'))}
`;
};

const makeEnumsNsJson = (enums) => {
  const enumsNs = {};
  Object.keys(enums).map((k) => {
    const e = enums[k];
    const pathParts = e.fullName.split('.').filter(seg => !!seg);
    let pointer = enumsNs;
    pathParts.slice(0, -1).forEach((part) => {
      if (!pointer[part]) {
        pointer[part] = {};
      }
      pointer = pointer[part];
    });
    pointer[pathParts.slice(-1)[0]] = e;
  });
  return stringify(enumsNs, { space: '  ' });
};

const json2js = (json, header = null, titleComment = null) => {
  const jsonStr = (typeof json === 'string') ? json : stringify(json, { space: '  ' });
  const jsListDict = jsonStr
    .replace(/'/g, `\\'`)
    .replace(/"/g, '\'')
    .replace(/'([^']+)':/g, '$1:')
    .replace(/\\"/g, '"');
  return `${header ? `${header}\n` : ''}${titleComment ? `${wrapComment(titleComment)}\n` : ''}\nmodule.exports = ${jsListDict};\n`;
};

const makeEnumsNsJs = (enumsArr, header) => json2js(
  makeEnumsNsJson(enumsArr),
  header,
  '@fileOverview Enums namespace tree'
);

const makeEnumsFiles = async (inputProtoPath, outputPrefix) => {
  if (!fs.existsSync(path.dirname(outputPrefix))) {fs.mkdirSync(outputPrefix);}
  const Root = new ProtobufJS.Root(PROTOBUFJS_PARSE_OPTIONS);
  await Root.load(inputProtoPath, PROTOBUFJS_PARSE_OPTIONS);
  const enums = visitProto(Root);

  fs.writeFileSync(`${outputPrefix}.json`, makeEnumsDictShortJson(enums));
  fs.writeFileSync(`${outputPrefix}_full.json`, makeEnumsDictFullJson(enums));
  fs.writeFileSync(`${outputPrefix}_array.json`, makeEnumsArrJson(enums));
  fs.writeFileSync(`${outputPrefix}_ns.json`, makeEnumsNsJson(enums));
  fs.writeFileSync(`${outputPrefix}_ns.js`, makeEnumsNsJs(enums));
  fs.writeFileSync(`${outputPrefix}.js.flow`, makeFlow(enums, DEFAULT_FLOW_HEADER));
  fs.writeFileSync(`${outputPrefix}.js`, makeJsConstants(enums));
};


/**
 * Take paths from command line
 */
const argv = process.argv.slice(2);

if (argv.length < 2) {
  process.stdout.write('Please define output path, example:\n$ enums.js ./input_schema.proto ./output_schema\n');
  process.exit(1);
}
const pathsProtoInput = argv[0];
const pathsOutput = argv[1];

/**
 * Main
 */
process.stdout.write(`Making Enums:\nRoot folder: ${CWD}\n\nInput:\n${pathsProtoInput}\n\nOutput:\n${pathsOutput}\n`);

makeEnumsFiles(
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
