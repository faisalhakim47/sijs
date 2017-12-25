import { LitTag } from './core/expression/littag.js'
import { AsyncDynamicPart } from './constant.js'

export function html(staticParts: TemplateStringsArray, ...dynamicParts: AsyncDynamicPart[]) {
  return new LitTag(staticParts, dynamicParts)
}
