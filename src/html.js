import { LitTag } from './core/littag.js'

/**
 * @param {TemplateStringsArray} staticParts 
 * @param {any[]} dynamicParts
 */
export function html(staticParts, ...dynamicParts) {
  return new LitTag(staticParts, dynamicParts)
}
