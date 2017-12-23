import { ContentUpdater } from '../../core/updater/content.js'
import { Directive } from '../../core/expression/directive.js'
import { LitTag } from '../../core/expression/littag.js'
import { html } from '../../html.js'
import { equalArray } from '../../tools/array.js'

type RouteState = {
  router: Router,
  route: Route,
  updater: ContentUpdater,
}

type RouterState = {
  mode: 'history' | 'hash',
  remainPathParts: string[],
  routes: RouteState[],
}

let current: RouterState = {
  mode: null,
  remainPathParts: createPathParts(location.pathname),
  routes: [],
}

function createPathParts(path: string) {
  return path.split('/').filter((pathPart) => pathPart)
}

function matchRoute(route: Route, pathParts: string[]) {
  const length = route.pathParts.length
  const params: string[] = []
  let isFound = true

  isFound = route.exact
    ? pathParts.length === length
    : isFound

  if (!isFound) return null

  for (let index = 0; index < length; index++) {
    const pathPart = route.pathParts[index]
    const pathValue = pathParts[index]
    if (pathPart === '*' && pathValue) {
      params.push(pathValue)
      continue
    }
    if (pathPart !== pathValue) {
      return null
    }
  }

  return params
}

function findMatchRoute(routes: Route[], pathParts: string[]) {
  const length = routes.length
  for (let index = 0; index < length; index++) {
    const route = routes[index]
    const length = route.pathParts.length
    const params = matchRoute(route, pathParts)
    if (params) return {
      route,
      params,
      remainPathParts: pathParts.slice(length),
    }
  }
}

function pushState(path: string) {
  const next: RouterState = {
    mode: current.mode,
    remainPathParts: createPathParts(path),
    routes: [],
  }
  const length = current.routes.length
  for (let index = 0; index < length; index++) {
    const routeState = current.routes[index]
    const oldParams = routeState.route.params
    const newParams = matchRoute(routeState.route, next.remainPathParts)
    if (newParams && equalArray(oldParams, newParams)) {
      next.remainPathParts = next.remainPathParts
        .slice(routeState.route.pathParts.length)
      next.routes.push(routeState)
    } else {
      routeState.route.params = newParams
      current = next
      routeState.router.update(routeState.updater)
      break
    }
  }
  return Promise.resolve()
}

export class Router extends Directive {
  static push(path: string) {
    pushState(path).then(() => {
      history.pushState({}, path, path)
    })
  }

  static link(
    path: string,
    view: (href: string, handler: Function, isActive: boolean) => LitTag
  ) {
    return new RouterLink(path, view)
  }

  constructor(
    private routes: Route[]
  ) { super() }

  findMatch(updater: ContentUpdater) {
    const match = findMatchRoute(
      this.routes,
      current.remainPathParts,
    )

    match.route.params = match.params
    current.remainPathParts = match.remainPathParts
    current.routes.push({
      route: match.route,
      router: this,
      updater: updater,
    })

    const params: string[] = current.routes
      .reduce((params, { route }) => {
        return params.concat(route.params)
      }, [])

    return { match, params }
  }

  init(updater: ContentUpdater) {
    const { match, params } = this.findMatch(updater)
    updater.init([
      match.route.Component(...params)
    ])
  }

  update(updater: ContentUpdater) {
    const { match, params } = this.findMatch(updater)
    updater.update([
      match.route.Component(...params)
    ])
  }
}

export class Route {
  exact: boolean = false
  pathParts: string[] = createPathParts(this.path)
  params: string[] = []

  constructor(
    private path: string,
    public Component: (...args) => LitTag,
    { exact = false } = {}
  ) {
    this.exact = exact
  }
}

export class RouterLink extends Directive {
  static defaultView(text: string) {
    return (href: string, handler: Function, isActive: boolean) =>
      html`<a class=${isActive ? 'active' : ''} href=${href} onclick=${handler}>${text}</a>`
  }

  constructor(
    private path: string,
    private view: (href: string, handler: Function, isActive: boolean) => LitTag
  ) {
    super()
    this.view = typeof view !== 'function'
      ? RouterLink.defaultView(view)
      : view
  }

  update(updater: ContentUpdater) {
    if (this.path !== updater.value) {
      const href = this.path
      const isActive = false
      const handler = (event) => {
        event.preventDefault()
        Router.push(this.path)
      }
      this.view(href, handler, isActive)
        .mount(updater.previousNode.nextSibling)
    }
    return this.path
  }
}

window.addEventListener('popstate', () => pushState(location.pathname))
