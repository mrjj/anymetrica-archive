# {{title}}

{{#if subTitle}}{{{subTitle}}}{{/if}}

<a name="top"></a>

{{#if buildInfo}}
## Build info

<a name="package-info"></a>

|          |          |
| -------- | -------- |
{{#each buildInfo}}
| __{{{key}}}__ | {{{value}}} |
{{/each}}

{{/if}}

<code><pre>
{{{filesTree}}}</pre></code>

## Table of Contents

{{#if fileSections}}
{{#each fileSections}}
- [__{{{file}}}__](#{{file}}) <a name="index-{{file}}"></a>
  {{#each sections}}
  {{#if content}}
  - [{{{sectionName}}}](#{{file}}-{{{sectionName}}})
    {{#each content}}
    - [_{{{fullName}}}_](#{{{fullName}}})
    {{/each}}
  {{/if}}
  {{/each}}
{{/each}}
- [__Scalar Value Types__](#scalar-value-types)

{{#each fileSections}}
## {{{file}}}

<a name="{{file}}"></a>

{{#each sections}}
{{#if content}}
### {{{sectionName}}}

<a name="{{file}}-{{{sectionName}}}"></a>

{{#each content}}
#### {{../containerType}} [{{{fullName}}}](#{{{fullName}}})

<a name="{{{fullName}}}"></a>

{{#if filename}} ↑ [{{filename}}](#index-{{{filename}}}){{/if}}

{{#if comment}}
{{{comment}}}

{{/if}}  
{{#if namespaces}}
##### Namespaces

{{#each namespaces}}
- [{{{fullName}}}](#{{{fullName}}})

  {{#if options}}  
  ###### Namespace Options
  
  | Name | Value |
  | ---- | ----- |
  {{#each options}}
  | {{{name}}} | {{{value}}} |
  {{/each}}
  
  {{/if}}

{{/each}}

{{/if}}
{{#if options}}  
##### Options

| Name | Value |
| ---- | ----- |
{{#each options}}
| {{{name}}} | {{{value}}} |
{{/each}}

{{/if}}
{{#if methods}}  
##### Methods
  
| type | name | request type | response type | options | comment |
| ---- | ---- | ------------ | ------------- | ------- | ------- |
{{#each methods}}
| {{#if type}}{{{type}}} {{/if}} | [{{{name}}}](#{{{fullName}}}) | [{{{requestType}}}](#{{{requestType}}}){{#if requestStream}} stream{{/if}} | [{{{responseType}}}](#{{{responseType}}}){{#if responseStream}} stream{{/if}} | {{#each options}}`{{{name}}}: {{{value}}}`{{/each}} | {{{comment}}} <a name="{{{fullName}}}"></a> |
{{/each}}

{{/if}}
{{#if fields}}  
##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
{{#each fields}}
| {{#if required}}required {{/if}}{{#if required}}optional {{/if}}{{#if repeated}}repeated {{/if}}{{#if map}}map<[{{{keyType}}}](#{{{keyType}}}), {{/if}}[{{{type}}}](#{{{type}}}){{#if map}}>{{/if}} {{#if binary}}[binary] {{/if}}| [{{{name}}}](#{{{fullName}}}.{{{name}}}) | {{{number}}} | {{#each options}}`{{{name}}}: {{{value}}}`{{/each}} | {{{comment}}} <a name="{{{fullName}}}"></a> |
{{/each}}

{{/if}}
{{#if oneofs}}  
###### oneof `{{{name}}}`

<a name="{{{fullName}}}.{{{name}}}"></a>

{{#each oneofs}}

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
{{#each fields}}
| {{#if required}}required {{/if}}{{#if required}}optional {{/if}}{{#if repeated}}repeated {{/if}}{{#if map}}map<[{{{keyType}}}](#{{{keyType}}}), {{/if}}[{{{type}}}](#{{{type}}}){{#if map}}>{{/if}} {{#if binary}}[binary] {{/if}}| [{{{name}}}](#{{{fullName}}}.{{{name}}}) | {{{number}}} | {{#each options}}`{{{name}}}: {{{value}}}`{{/each}} | {{{comment}}} <a name="{{{fullName}}}"></a> |
{{/each}}

{{/each}}
{{/if}}
{{#if values}}
##### Values

| value | num | comment |
| ----- | --- | ------- |
{{#each values}}
| {{{value}}} | {{{number}}} | {{#if default}}[default]{{/if}} {{{comment}}} |
{{/each}}

{{/if}}
{{#if extensions}}
#### File-level Extensions

<a name="{{{fullName}}}-extensions"></a>

| extension | type | base | num | comment | default |
| --------- | ---- | ---- | --- | ------- | ------- |

{{#each extensions}}
| {{{name}}} | [{{{type}}}](#{{{type}}}) | [{{{containingType}}}](#{{{containingType}}}) | {{{number}}} | {{{comment}}} | {{{default}}} |
{{/each}}

{{/if}}
{{/each}}
{{/if}}
{{/each}}
{{/each}}
{{/if}}
## [Scalar Value Types](#scalar-value-types)

[proto3 scalars Google Documentation](https://developers.google.com/protocol-buffers/docs/proto3#scalar)

<a name="scalar-value-types"></a>

| __.proto__ {{#each scalarsTableHeader}} | __{{{title}}}__ {{/each}} | Comment |
| --- {{#each scalarsTableHeader}} | --- {{/each}} | --- |
{{#each scalarsTableBody}} 
| __[{{{proto}}}](#{{{proto}}})__ {{#each row}} | `{{{cell}}}` {{/each}} | {{{comment}}} <a name="{{{proto}}}"></a> |
{{/each}}

