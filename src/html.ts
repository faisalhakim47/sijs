import { LitTag } from './core/expression/littag.js'
import { DynamicPart } from './constant.js'

export function html(staticParts: TemplateStringsArray, ...dynamicParts: DynamicPart[]) {
  return new LitTag(staticParts, dynamicParts)
}
