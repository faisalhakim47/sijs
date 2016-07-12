import { Router } from './router'
import { IComponentClass } from '../compiler/component'

export function Generate(path: string, RouterInstance: Router, linkToApp: string) {
  let { template } = RouterInstance.generateElem(path)
  template = `
    <script>(function() {
      window._prerender = true;
    })()</script>
  ` + template + `
    <script src="${linkToApp}"></script>
  `
  return template
}
