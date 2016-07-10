import { IComponentClass } from '../compiler/component'
import { Router } from '../compiler/router'
// import { readFileSync } from 'fs'

export function Generate(path: string, RouterInstance: Router, linkToApp: string) {
  let { template } = RouterInstance.generateElem(path)
  template = `
    <script>(function() {
      window._prerender = true;
      window._E = function _E() {};
    })()</script>
  ` + template + `
    <script src="${linkToApp}"></script>
  `
  return template
}
