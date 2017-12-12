import { LitTag } from './core/littag.js'
import { Component } from './core/updater/content/component.js'
import { Directive } from './core/updater/content/directive.js'

export type DynamicPart = string | Component | Directive | Function

export function html(staticParts: TemplateStringsArray, ...dynamicParts: DynamicPart[]) {
  return new LitTag(staticParts, dynamicParts)
}
