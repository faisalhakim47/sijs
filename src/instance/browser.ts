import { is } from './status'
import { Component } from '../compiler/component'
import { Elem } from '../compiler/elem'
import { installGlues, addEvents } from '../glue/glue'

export function Bootsrap(selector: string, Component: Component) {
  if (is.browser) {
    document.addEventListener('DOMContentLoaded', () => {
      // generate template and glues
      const { template, glues, events, readyFns } = Component.create()

      // insert template
      if (!is.prerender) {
        (<HTMLElement>document.querySelector(selector)).outerHTML = template
      }

      // install glues
      installGlues(glues)
      addEvents(events)

      // execute all ready components function
      readyFns.forEach((fn) => {
        if (fn) fn()
      })

      // ensure prerender false
      is.prerender = false
    })
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
