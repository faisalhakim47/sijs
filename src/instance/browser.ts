import is from './status'
import { IElem } from '../compiler/elem'
import { IComponentClass } from '../compiler/component'
import { installGlues } from '../glue/glue'

export function Bootsrap(selector: string, Comp: IComponentClass) {
  const el: HTMLElement = <HTMLElement>document.querySelector(selector)
  const { template, glues } = (new Comp()).create()
  if (!is.prerender) el.outerHTML = template
  installGlues(glues)
  is.prerender = false
}
