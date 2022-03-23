const fs = require('fs');
const path = require('path');
const { HTMLElementTagNameMap } = require('./data/html-element-tag-name-map.js');

const domjs = Object.keys(HTMLElementTagNameMap)
  .map((fnName) => {
    return `
/**
 * @param {Array<import('./element.js').Prop<TagName>|Array<import('./element.js').Prop<TagName>>>} [args]
 * @returns {${HTMLElementTagNameMap[fnName]}}
 */
export function ${fnName}(...args) {
  return createElement('${fnName}', ...args);
}
`
  })
  .join('');

fs.writeFileSync(path.join(__dirname, '../src/html-element.js'), `import { createElement } from './si.js';

${domjs}`, { encoding: 'utf-8' });
