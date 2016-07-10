import { is } from './status'
import { IElem } from '../compiler/elem'
import { Router } from '../compiler/router'
import { installGlues } from '../glue/glue'

export function Bootsrap(selector: string, RouterInstance: Router) {
  if (is.browser) {
    document.addEventListener('DOMContentLoaded', () => {
      const el: HTMLElement = <HTMLElement>document.querySelector(selector)
      const { template, glues } = RouterInstance.generateElem(window.location.pathname)
      if (!is.prerender) el.outerHTML = template
      console.log(!is.prerender, template, glues)
      installGlues(glues)
      is.prerender = false
    })
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
