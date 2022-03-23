const fs = require('fs');
const path = require('path');

const { htmlData } = require('./data/vscode-web-custom-data.js');

const textValueSets = htmlData.valueSets
  .map((valueSet) => {
    const values = "'" + valueSet.values.map((value) => value.name).join("'|'") + "'";
    return `/** @typedef {${values}} AttrValueSet${capitalize(valueSet.name)} */`;
  })
  .join('\n') + '\n/** @typedef {string} AttrValueSetV */\n';

const GlobalAttr = `

/**
 * @typedef {Object} GlobalAttr
${htmlData.globalAttributes.map((attr) => {
  const type = typeof attr?.valueSet === 'string' ? `AttrValueSet${capitalize(attr.valueSet)}` : 'string';
  return ` * @property {${type}} ${attr.name} [${attr.description?.value}]`;
}).join('\n')}
 */
`;

const Attrs = htmlData.tags
  .map((tag) => {
    const properties = tag.attributes?.map((attr) => {
      const type = typeof attr?.valueSet === 'string' ? `AttrValueSet${capitalize(attr.valueSet)}` : 'string';
      return ` * @property {${type}} [${attr.name}] ${attr.description?.value}`;
    }).join('\n');
    return `

/**
 * @typedef {GlobalAttr} ${capitalize(tag.name)}Attr
${properties}
 */`;
  })
  .join('\n');

const HtmlElemetAttrMap = `

/**
 * @typedef {Object} AttrTagNameMap
${htmlData.tags.map((tag) => {
  return ` * @property {${capitalize(tag.name)}Attr} ${tag.name}`;
}).join('\n')}
 */

`;

/**
 * @param {string} text
 */
function capitalize(text) {
  return text ? text.slice(0, 1).toUpperCase() + text.slice(1) : '';
}

const text = ['// @ts-check\n\n', textValueSets, GlobalAttr, Attrs, HtmlElemetAttrMap].join('');

fs.writeFileSync(path.join(__dirname, '../src/html-element-attribute.js'), text, { encoding: 'utf-8' });
