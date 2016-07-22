import { is } from './status'
import { Component } from '../compiler/component'
import { RouterView } from '../compiler/routerview'
import { Elem } from '../compiler/elem'
import { installElem, addEvents } from '../glue/glue'

export function Bootstrap(Component: Component) {
  if (is.browser) {
    RouterView.PATH = window.location.pathname + window.location.search

    // generate template and glues
    const e = Component.create()

    // execute all beforeInstall components function
    if ((<any>Component).beforeInstall) (<any>Component).beforeInstall()

    // install glues
    installElem(e, (template) => {
      if (!is.prerender) document.write(template)
    })

    // execute all afterInstall components function
    if ((<any>Component).afterInstall) (<any>Component).afterInstall()

    // ensure prerender false
    is.prerender = false

    console.log(Component, e)
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
