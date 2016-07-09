import { IComponentClass } from '../compiler/component'
import { Router } from '../router/router'

export function Generate(path: string, Comp: IComponentClass) {
  Router.generateRoute(path)
  const { template } = (new Comp()).create()
  Router.path = '/'
  template.replace('</head>', '<script>(function () { window._prerender = true })()</script></head>')
  return template
}
