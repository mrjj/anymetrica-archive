#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ProtobufJS = require('protobufjs');
const stringify = require('json-stable-stringify');
const Handlebars = require('handlebars');
const set = require('lodash.set');

/**
 * Script start dir
 */
const CWD = process.cwd();

/**
 * Constants
 */
const SECTIONS_ORDER = ['services', 'messages', 'enums', 'namespaces'];
const DEFAULT_TEMPLATE_PATH = path.join(__dirname, '../templates/protodoc.template.md');
const DEFAULT_SCALARS_JSON_PATH = path.join(__dirname, '../templates/scalars.json');
const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const DEFAULT_LICENSE = 'UNLICENSED';

/**
 * ProtobufJs Parse options
 * @type {{keepCase: ?boolean, alternateCommentMode: ?boolean}}
 */
const PARSE_OPTIONS = {
  keepCase: true,
  alternateCommentMode: true
};

/**
 * Load template
 */
const templatePath = [
  DEFAULT_TEMPLATE_PATH,
  ...(
    process.argv.slice(2)
      .filter(p => p.startsWith('--template'))
      .map(pathParam => (pathParam + '=').split('=')[1])
  )
].slice(-1)[0];

if (!fs.existsSync(templatePath)) {
  process.stderr.write(`${templatePath} do not exists\nExiting with exit code 1`);
  process.exit(1);
}
if (!fs.statSync(templatePath).isFile()) {
  process.stderr.write(`${templatePath} is not a file\nExiting with exit code 1`);
  process.exit(1);
}

const scalarsPath = [
  DEFAULT_SCALARS_JSON_PATH,
  ...(
    process.argv.slice(2)
      .filter(p => p.startsWith('--scalars'))
      .map(pathParam => (pathParam + '=').split('=')[1])
  )
].slice(-1)[0];


if (!fs.existsSync(scalarsPath)) {
  process.stderr.write(`Scalars metadata path do not exists: ${SCALARS_JSON_PATH}\nExiting with exit code 1\n`);
  process.exit(1);
}
if (!fs.statSync(scalarsPath).isFile()) {
  process.stderr.write(`${templatePath} is not a file\nExiting with exit code 1`);
  process.exit(1);
}

const getCompareObjects = (field) => (a, b) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};

const sortNumbers = (a, b) => {
  if (parseInt(a, 10) < parseInt(b, 10)) {
    return -1;
  }
  if (parseInt(a, 10) > parseInt(b, 10)) {
    return 1;
  }
  return 0;
};

/**
 *
 * @param n
 * @returns {{
 *  filename: string,
 *  name: string,
 *  options: ?Object,
 *  fullName: ?string,
 *  comment: ?string
 * }}
 */
const getCommonFields = n => {
  const result = {
    name: n.name,
    fullName: n.fullName || n.name,
    options: n.options,
    filename: n.filename,
    comment: (typeof n.comment === 'string') ? n.comment.replace(/\n/g, '<br>') : n.comment,
  };
  if (n.options) {
    result.options = Object.keys(n.options).sort().map(name => ({ name, value: n.options[name] }));
  }
  return result;
};

/**
 * Process things common for all ProtoBuf nodes
 * @param n
 * @param attrName
 * @param ctx
 * @param processSpecificFn
 * @returns {*}
 */
const processCommon = (n, attrName, ctx, processSpecificFn) => {
  const obj = getCommonFields(n);
  if (typeof processSpecificFn === 'function') {
    Object.assign(obj, processSpecificFn(n, ctx));
  }
  ctx[attrName] = ctx[attrName] || [];
  ctx[attrName].push(obj);

  const namespaceFullName = n.fullName.split('.').slice(0, -1).join('.');
  ctx.namespaces = ctx.namespaces || [];
  ctx.namespacesDict = ctx.namespacesDict || {};

  if (typeof ctx.namespacesDict[namespaceFullName] === 'undefined') {
    const ns = { fullName: namespaceFullName };
    ctx.namespacesDict[namespaceFullName] = ns;
    ctx.namespaces.push(ns);
  }
  ctx.namespacesDict[namespaceFullName][attrName] = ctx.namespacesDict[namespaceFullName][attrName] || [];
  ctx.namespacesDict[namespaceFullName][attrName].push(obj);
  obj.namespace = namespaceFullName;

  return ctx;
};

// noinspection JSUnusedGlobalSymbols
/**
 * ProtoBuf type processors
 */
const NODE_TYPE_PROCESSORS = {
  Field: (n, ctx) => Object.assign(
    getCommonFields(n),
    {
      f: stringify(n),
      name: n.name,
      type: n.type,
      keyType: n.keyType,
      map: n.map,
      optional: n.optional,
      scalar: typeof ctx.scalarsDict[n.type] !== 'undefined',
      extend: n.extend,
      binary: n.binary,
      rule: n.rule,
      repeated: n.repeated,
      number: n.id,
      options: Object.keys(n.options || {})
        .sort()
        .map(name => ({ name, value: n.options[name] }))
    },
  ),
  Root: (n, ctx) => {
    if (n.files) {
      ctx.files = n.files.sort();
    }
    return ctx;
  },
  Namespace: (n, ctx) => {
    ctx.namespaces = ctx.namespaces || [];
    ctx.namespacesDict = ctx.namespacesDict || {};
    const namespace = getCommonFields(n);
    if (!ctx.namespacesDict[n.fullName]) {
      ctx.namespacesDict[n.fullName] = {};
      ctx.namespaces.push(ctx.namespacesDict[n.fullName]);
    }
    Object.keys(namespace).forEach(k => {
      ctx.namespacesDict[n.fullName][k] = namespace[k];
    });
    ctx.namespacesDict[n.fullName].name = ctx.namespacesDict[n.fullName].fullName;
    return ctx;
  },
  Type: (n, ctx) => processCommon( // Message
    n,
    'messages',
    ctx,
    (n, ctx) => ({
      oneofs: (n.oneofsArray || []).map(
        oneof => ({
          name: oneof.name,
          fields: oneof.fieldsArray.map(f => NODE_TYPE_PROCESSORS.Field(f, ctx))
        })
      ),
      fields: (n.fieldsArray || []).map(f => NODE_TYPE_PROCESSORS.Field(f, ctx))
    }),
  ),
  Service: (n, ctx) => processCommon(
    n,
    'services',
    ctx,
    (n) => {
      return ({
        methods: n.methodsArray
          .map(method => {
            const resultObj = getCommonFields(method);
            [
              'type',
              'requestType',
              'requestStream',
              'responseType',
              'responseStream'
            ].forEach(k => {
              if (method[k]) {
                resultObj[k] = method[k];
              }
            });
            return resultObj;
          })
      });
    },
  ),
  Enum: (n, ctx) => processCommon(
    n,
    'enums',
    ctx,
    (n) => ({
      reserved: n.reserved,
      values: Object.keys(n.valuesById || {}).sort(sortNumbers).map(
        (number) => {
          const value = n.valuesById[number];
          const valueComment = n.comments[value];
          let comment = null;
          if (n.comments) {
            comment = typeof valueComment === 'string' ? valueComment.replace(/\n/g, '<br>') : valueComment;
          }
          return ({
            default: (number === '0'),
            value,
            number,
            comment,
          });
        }
      ),
    })
  ),
};

/**
 * Make template context
 *
 * @param n {Object} - protocol buffer reflection node
 * @param ctx {Object} - context
 *
 * @returns {Object} - context
 */
const makeTemplateContext = (n, ctx = {}) => {
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
      ctx = makeTemplateContext(n.nested[k], ctx);
      return ctx;
    });
  }
  return NODE_TYPE_PROCESSORS[nodeType] ? NODE_TYPE_PROCESSORS[nodeType](n, ctx) : ctx;
};

/**
 * Convert paths strings to {data: {a:1, b:2}, children: {child1: {data: {c: 3}}}}
 *
 * @param paths
 * @param renderFile
 * @param joinStr
 * @returns {*}
 */
const pathsToTree = (paths, renderFile = (fileName, /* fullPath */) => fileName, joinStr = '\n') => {
  const tree = {};
  const re = new RegExp(`([^${path.sep}]+)${path.sep}`, 'g');
  paths.forEach(f => set(tree, [
    ...(f.replace(re, `$1${path.sep}children${path.sep}`)
      .split(path.sep)
      .slice(0, -2)),
    'data',
    f.split(path.sep).slice(-1)[0]
  ], true));

  const processNode = (node, ident = '', p = '') => {
    let result = [];
    if (node.data) {
      const keys = Object.keys(node.data).sort();
      result = [];
      keys.map((k, i) => {
        const branch = ((i + 1 === keys.length) && (!node.children)) ? '└' : '├-';
        const fileStr = renderFile(k, p);
        result.push(`${ident}${branch} ${fileStr}`);
      });
    }
    if (node.children) {
      const keys = Object.keys(node.children).sort();
      keys.map((k, i) => {
        result.push(`${ident}${(i + 1 === keys.length) ? '└' : '├-'} ${k}`);
        const newIdent = ident + ((i + 1 === keys.length) ? '  ' : '| ');
        result.push(processNode(node.children[k], newIdent, `${p}${k}${path.sep}`));
      });
    }
    return result.join(joinStr);
  };
  return processNode({ children: tree });
};

/**
 * Make and save documentation in markdown
 * @param inputProtoPaths
 * @param outputMdPath
 * @param templatePath
 * @param scalarsJsonPath
 * @param initCtx
 * @returns {Promise<void>}
 */
const makeDoc = async (inputProtoPaths, outputMdPath, templatePath, scalarsJsonPath, initCtx = {}) => {
  const templateStr = fs.readFileSync(templatePath).toString();
  const template = Handlebars.compile(templateStr);

  if (fs.existsSync(outputMdPath)) {fs.unlinkSync(outputMdPath);}
  const Root = new ProtobufJS.Root(PARSE_OPTIONS);
  await Root.load(inputProtoPaths, PARSE_OPTIONS);
  const scalars = JSON.parse(fs.readFileSync(scalarsJsonPath).toString());
  const scalarsDict = {};

  scalars.types.forEach((scalar) => {scalarsDict[scalar.proto] = scalar;});

  const scalarsTableHeader = scalars.headers.map(lang => (scalars.headersTitles[lang]))
    .map(title => ({ title }));
  const scalarsTableBody = scalars.types.map(type => ({
    row: scalars.headers.map(lang => ({ cell: type.languages[lang] })),
    comment: type.comment,
    proto: type.proto,
  }));

  const ctx = Object.assign({ scalarsDict, scalarsTableHeader, scalarsTableBody }, initCtx);
  const sectionsContent = makeTemplateContext(Root, ctx);


  ctx.fileSections = ctx.files.map(file => ({
    file,
    sections: SECTIONS_ORDER.map(section => ({
      sectionName: `${section[0].toUpperCase()}${section.substring(1, section.length)}`,
      containerType: section.substring(0, section.length - 1).toLowerCase(),
      content: sectionsContent[section].filter(({ filename }) => filename === file)
        .sort(getCompareObjects('fullName')),
    }))
  }));
  ctx.filesTree = pathsToTree(ctx.files, (fileName, fullPath) => `<a href="#index-${fullPath}${fileName}">${fileName}</a>`);
  const mdStr = template(ctx);
  fs.writeFileSync(outputMdPath, mdStr);
  // const htmlStr = await githubMarkdownRender(mdStr);
  // fs.writeFileSync(outputMdPath.replace(/\.md$/ig, '.html'), htmlStr);
};

/**
 * Take paths from command line
 */
const argv = process.argv.slice(2);

const pathsMdOutput = argv
  .filter(p => p.toLowerCase().endsWith('.md'))
  .map(p => path.isAbsolute(p) ? p : path.resolve(p));

const pathsProtoInput = argv
  .filter(p => p.toLowerCase().endsWith('.proto') || (!(p.startsWith('--') || p.toLowerCase()
    .endsWith('.md'))));

if (pathsProtoInput.length === 0) {
  process.stdout.write('Please define at least one proto path to process and output path, example:\n$ doc.js ./mySchema.proto ./myOtherSchema.proto ./myProto.md\n');
  process.exit(1);
}

if (pathsMdOutput.length < 1) {
  process.stdout.write('Please define output path, example:\n$ doc.js ./mySchema.proto ./myOtherSchema.proto  ./myProto.md\n');
  process.exit(1);
}

/**
 * Main
 */
process.stdout.write(`Making documentation:\nRoot folder: ${CWD}\n\nInput:\n${pathsProtoInput.join('\n')}\n\nOutput:\n${pathsMdOutput.join('\n')}\n`);
const packageInfo = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH).toString());
const license = ((packageInfo.license || '').indexOf('.') !== -1)
  ? `[License](${license})`
  : (packageInfo.license || DEFAULT_LICENSE);

makeDoc(
  pathsProtoInput,
  pathsMdOutput[0],
  templatePath,
  scalarsPath,
  {
    title: `${packageInfo.name} v${packageInfo.version.replace(/^[^0-9]+/g, '')}`,
    subTitle: `Protocol Buffers API Documentation`,
    buildInfo: [
      { key: 'Name', value: packageInfo.name },
      { key: 'Version', value: packageInfo.version },
      { key: 'Description', value: packageInfo.description },
      { key: 'License', value: license },
      {
        key: 'Repository',
        value: packageInfo.repository ? `(<a href="${packageInfo.repository.url}">${packageInfo.repository.url}</a>` : ''
      },
    ]
  }
)
  .then(() => {
    process.stdout.write('Done\nExiting with exit code 0\n');
    process.exit();
  })
  .catch(e => {
    process.stderr.write(`Error: ${e.message}\n${e.stack}\nExiting with exit code 1`);
    process.exit(1);
  });
