import { status } from './status'
import { ComponentClass } from '../compiler/component'
import { RouterView } from '../compiler/routerview'
import { CompilerState, render } from '../compiler/index'
import { installState, addEvents } from '../glue/index'

export function Bootstrap(Component: ComponentClass) {
  if (status.browser) {
    RouterView.PATH = window.location.pathname + window.location.search

    // generate template and glues
    const template = render(Component)

    // execute all beforeInstall components function
    if ((<any>Component).beforeInstall) (<any>Component).beforeInstall()

    // install state
    const STATE = CompilerState.takeState()

    installState(STATE, () => {
      if (!status.prerender) document.write(template)
    })

    // execute ready components function
    if ((<any>Component).ready) (<any>Component).ready()

    // ensure prerender false
    status.prerender = false

    console.log(STATE)
  } else {
    console.error('Cannot Bootsrap(), this is not browser.')
  }
}
