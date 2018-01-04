import { html, LitTag } from '../../core/expression/littag.js'
import { Subject, Pipe } from '../../tools/subject.js'

interface PopState {
  path: string
}

const popStateChange$ = new Subject<PopState>({
  path: location.pathname
})

window.addEventListener('popstate', () => {
  popStateChange$.emit({ path: location.pathname })
})

function pushState(popState: PopState) {
  popStateChange$.emit(popState)
  history.pushState({}, '', popState.path)
}

const popState$ = popStateChange$
  .map(({ path }) => path)
  .distinct()
  .map((path) => {
    return {
      pathParts: createPathParts(path)
    }
  })

// popState$.subscribe(a => console.log(a))

export interface Route {
  path: string
  component: (...params: string[]) => LitTag
}

export function Router(_routes: Route[]) {
  const routes = _routes.map((_route) => {
    return {
      path: _route.path,
      component: _route.component,
      pathParts: createPathParts(_route.path),
    }
  })
  return popState$.map((popState) => {
    const length = routes.length
    for (let index = 0; index < length; index++) {
      const route = routes[index]
      const params = matchPathParts(popState.pathParts, route.pathParts)
      if (params) {
        return route.component(...params)
      }
    }
    return html`<p>Not Found.</p>`
  })
}

export type RouterLinkView = (href: string, handler: Function, isActive: boolean) => LitTag

export function RouterLink(
  path: string,
  view: RouterLinkView | string
) {
  if (typeof view === 'string') {
    view = defaultRouterLinkView(view)
  }
  const pathParts = createPathParts(path)
  return popState$.map((popState) => {
    const isActive = !!matchPathParts(pathParts, popState.pathParts)
    return (view as RouterLinkView)(path, (event) => {
      event.preventDefault()
      pushState({ path })
    }, isActive)
  })
}

function createPathParts(path: string) {
  return path.split('/').filter((pathPart) => pathPart)
}

function matchPathParts(pathParts1: string[], pathParts2: string[]) {
  const params: string[] = []
  const length = pathParts1.length
  let match = length === pathParts2.length
  for (let index = 0; index < length; index++) {
    if (match === false) break
    const statePathPart = pathParts1[index]
    const routePathPart = pathParts2[index]
    if (statePathPart === '*') params.push(routePathPart)
    else if (statePathPart !== routePathPart) match = false
  }
  if (match) return params
  else return null
}

function defaultRouterLinkView(text: string): RouterLinkView {
  return (href: string, handler: Function, isActive: boolean) =>
    html`<a class=${isActive ? 'active' : ''} href=${href} onclick=${handler}>${text}</a>`
}
