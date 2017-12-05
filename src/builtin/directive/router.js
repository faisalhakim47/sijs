import { ContentUpdater } from '../../core/updater/content/content.js'
import { Directive } from '../../core/updater/content/directive.js'
import { LitTag } from '../../core/littag.js'
import { html } from '../../html.js'
import { equalArray } from '../../tools/array.js'

/**
 * @typedef {{
 router: Router,
 route: Route,
 updater: ContentUpdater,
}} RouteState
*/

/**
 * @typedef {{
 mode: 'history' | 'hash',
 remainPathParts: string[],
 routes: RouteState[],
}} RouterState
*/

/** @type {RouterState} */
let current = {
  mode: null,
  remainPathParts: createPathParts(location.pathname),
  routes: [],
}

/**
 * @param {string} path 
 */
function createPathParts(path) {
  return path.split('/').filter((pathPart) => pathPart)
}

/**
 * @param {Route} route 
 * @param {string[]} pathParts 
 */
function matchRoute(route, pathParts) {
  const length = route.pathParts.length
  const params = []
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

/**
 * @param {Route[]} routes 
 * @param {string[]} pathParts 
 */
function findMatchRoute(routes, pathParts) {
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

function pushState(path) {
  /** @type {RouterState} */
  const next = {
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
  /**
   * @param {string} path 
   */
  static push(path) {    
    pushState(path).then(() => {
      history.pushState({}, path, path)
    })
  }

  /**
   * @param {string} text
   * @returns {(href: string, handler: Function, isActive: Boolean) => LitTag} 
   */
  static link(path, view) {
    return new RouterLink(path, view)
  }

  /**
   * @param {Route[]} routes 
   */
  constructor(routes) {
    super()
    if (current.mode) Router.config()
    this.routes = routes
  }

  /**
   * @param {ContentUpdater} updater 
   */
  update(updater) {
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

    const allParams = current.routes
      .reduce((params, { route }) => {
        return params.concat(route.params)
      }, [])

    updater.update([
      new match.route.Component(...allParams)
    ])
  }
}

export class Route {
  /**
   * @param {string} path 
   * @param {new () => Component} Component 
   * @param {object} options 
   * @param {boolean} options.exact 
   */
  constructor(path, Component, { exact = false } = {}) {
    this.path = path
    this.pathParts = createPathParts(path)
    this.Component = Component
    /** @type {string} */
    this.params = []
    /** @type {boolean} */
    this.exact = exact
  }
}

export class RouterLink extends Directive {
  /**
   * @param {string} text
   * @returns {(href: string, handler: Function, isActive: Boolean) => LitTag} 
   */
  static defaultView(text) {
    return (href, handler, isActive) =>
      html`<a class=${isActive ? 'active' : ''} href=${href} onclick=${handler}>${text}</a>`
  }

  /**
   * @param {string} path 
   * @param {(href: string, handler: Function, isActive: Boolean) => LitTag} view 
   */
  constructor(path, view) {
    super()
    this.path = path
    this.view = typeof view !== 'function'
      ? RouterLink.defaultView(view)
      : view
  }

  /**
   * @param {ContentUpdater} updater 
   */
  update(updater) {
    if (this.path !== updater.oldValue) {
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
