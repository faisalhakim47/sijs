import { CompilerState } from '../compiler/index'
import { ComponentClass } from '../compiler/component'
import { RouterView } from '../compiler/routerview'
import { GlobalEvent } from '../instance/global-event'

export function Generate(path: string, Component: ComponentClass, linkToApp: string) {
  RouterView.PATH = path
  let template = new Component().generate()
  RouterView.PATH = null
  GlobalEvent.emit('reset')
  CompilerState.takeState()
  template = `
    <script>(function() {
      window._prerender = true;
    })()</script>
  ` + template + `
    <script src="${linkToApp}"></script>
  `
  return template
}
