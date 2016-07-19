import { IComponentClass } from '../compiler/component'
import { RouterView } from '../compiler/routerview'
import { GlobalEvent } from '../instance/global-event'

export function Generate(path: string, Component: IComponentClass, linkToApp: string) {
  RouterView.PATH = path
  let { template } = new Component().create()
  RouterView.PATH = null
  GlobalEvent.emit('resetIds')
  template = `
    <script>(function() {
      window._prerender = true;
    })()</script>
  ` + template + `
    <script src="${linkToApp}"></script>
  `
  return template
}
