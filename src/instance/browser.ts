import { status } from './status'
import { Component } from '../compiler/component'
import { RouterView } from '../compiler/routerview'
import { CompilerState } from '../compiler/index'
import { installState, addEvents } from '../glue/index'

export function Bootstrap(Component: Component) {
  if (status.browser) {
    RouterView.PATH = window.location.pathname + window.location.search

    // generate template and glues
    const template = Component.generate()

    // execute all beforeInstall components function
    if ((<any>Component).beforeInstall) (<any>Component).beforeInstall()

    // install state
    const STATE = CompilerState.takeState()

    installState(STATE, (template) => {
      if (!status.prerender) document.write(template)
    })

    // execute all afterInstall components function
    if ((<any>Component).afterInstall) (<any>Component).afterInstall()

    // ensure prerender false
    status.prerender = false

    console.log(Component, STATE)
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
