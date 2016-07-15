import { Router } from './router'
import { is } from './status'
import { Elem } from '../compiler/elem'
import { installGlues, installEvents } from '../glue/glue'

export function Bootsrap(selector: string, RouterInstance: Router) {
  if (is.browser) {
    document.addEventListener('DOMContentLoaded', () => {
      const el: HTMLElement = <HTMLElement>document.querySelector(selector)
      const { template, glues, events } = RouterInstance.generateElem(window.location.pathname)
      if (!is.prerender) el.outerHTML = template
      installGlues(glues)
      installEvents(events)
      is.prerender = false
      // console.log(template, glues, events)
    })
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
