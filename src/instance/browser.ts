import { is } from './status'
import { Component } from '../compiler/component'
import { RouterView } from '../compiler/routerview'
import { Elem } from '../compiler/elem'
import { installGlues, addEvents } from '../glue/glue'

export function Bootstrap(Component: Component) {
  if (is.browser) {
    RouterView.PATH = window.location.pathname + window.location.search

    // generate template and glues
    const { template, glues, events, afterInstallFns } = Component.create()

    // insert template
    if (!is.prerender) {
      document.write(template)
    }

    // install glues
    installGlues(glues)
    addEvents(events)

    // execute all ready components function
    if ((<any>Component).afterInstall) (<any>Component).afterInstall()
    afterInstallFns.forEach((fn) => fn())

    // ensure prerender false
    is.prerender = false
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
