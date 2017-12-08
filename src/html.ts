import { LitTag } from './core/littag.js'

export function html(staticParts: TemplateStringsArray, ...dynamicParts: any[]) {
  return new LitTag(staticParts, dynamicParts)
}
