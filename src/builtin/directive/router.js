import { ContentUpdater } from '../../core/updater/content/content.js'
import { Component, renderingComponent } from '../../core/updater/content/component.js'
import { Directive } from '../../core/updater/content/directive.js'
import { LitTag } from '../../core/littag.js'
import { List } from '../../tools/list.js'
import { html } from '../../html.js'

/** @type {RootRoute} */
let currentRootRoute = null

/**
 * @param {string} path 
 */
function normalizePath(path) {
  if (path[0] !== '/') path = '/' + path
  if (path[path.length - 1] === '/') path = path.slice(0, -1)
  return path
}

export class RootRoute {
  /**
   * @param {Route} route 
   */
  constructor(route) {
    this.rootRoute = route
    /** @type List<new () => Component, Route> */
    this.routerViewList = new List()
    /** @type List<Route, RegExpMatchArray> */
    this.activeRoutes = new List()
    this.routes = this.normalizeRoute(route)
  }

  /**
   * @param {Route} route 
   * @returns {Route[]}
   */
  normalizeRoute(route) {
    const routes = route.childRouter instanceof Router
      ? [
        route,
        ...route.childRouter.routes
          .map((childRoute) => {
            childRoute.parentRoute = route
            childRoute.fullPath = route.path + childRoute.path
            return this.normalizeRoute(childRoute)
          })
          .reduce((result, routes) => {
            return result.concat(routes)
          }, [])
      ]
      : [route]

    const length = routes.length
    for (let index = 0; index < length; index++) {
      const route = routes[index]
      const regexStr = route.fullPath.split('/')
        .map((pathPart, index) => {
          if (pathPart === '*') {
            route.dynamicParts.push(index)
            pathPart = '([^\\/]+?)'
          }
          return pathPart
        })
        .join('\\/')
      route.regex = new RegExp(regexStr)
    }

    return routes
  }

   /**
   * @param {string} path 
   */
  setRouterPath(path) {
    path = normalizePath(path)
    /* Reset the route list to prevent memory leaks */
    this.routerViewList = new List()
    this.activeRoutes = new List()
    const length = this.routes.length
    for (let index = 0; index < length; index++) {
      let route = this.routes[index]
      const matches = path.match(route.regex)
      if (matches !== null) {
        /*
         * [GOING DOWN] check if there are default child router
         */
        /** @type {Router} */
        let childRouter
        while (childRouter = route.childRouter) {
          const length = childRouter.routes.length
          for (let index = 0; index < length; index++) {
            const childRoute = childRouter.routes[index]
            if (childRouter.defaultRoute === childRoute.name || childRoute.path === '') {
              route = childRoute
              break
            }
          }
        }
        /*
         * [GOING UP] add the parent route as active route
         */
        /** @type {Route} */
        let parentRoute
        while (parentRoute = route.parentRoute) {
          this.routerViewList.set(parentRoute.Component, route)
          this.activeRoutes.set(route, matches)
          route = parentRoute
        }
        break
      }
    }
  }

  /**
   * @param {Node} container 
   */
  mount(container) {
    currentRootRoute = this
    this.setRouterPath(location.pathname)
    this.rootRoute.mount(container)
    currentRootRoute = null
  }
}

export class Router {
  static back() {

  }

  static push(routeName, params) {

  }

  static view() {
    return new RouterView()
  }

  /**
   * @param {(href: string, handler: Function, isActive: Boolean) => LitTag} view 
   */
  static link({ name: routeName, params }, view) {
    return new RouterLink(routeName, params, view)
  }

  /**
   * @param {Route[]} routes 
   */
  constructor(routes, { defaultRoute = null } = {}) {
    this.routes = routes
    this.defaultRoute = defaultRoute
  }
}

export class Route {
  /**
   * @param {string} path 
   * @param {string} name 
   * @param {new () => Component} Component 
   * @param {Router} childRouter 
   */
  constructor(path, name, Component, childRouter) {
    this.fullPath = this.path = normalizePath(path)
    this.name = name
    this.Component = Component
    /** @type {Route} */
    this.parentRoute = null
    this.childRouter = childRouter
    this.regex = new RegExp('', '')
    /** @type {number[]} */
    this.dynamicParts = []
  }

  /**
   * @param {Node} container 
   * @param {string[]} params 
   */
  mount(container, params = []) {
    new this.Component(...params).$mount(container)
  }

  /**
   * @param {string[]} params 
   */
  visit(params) {
    this.parentRoute.Component
  }
}

export class RouterView extends Directive {
  constructor() {
    super()
    this.rootRoute = currentRootRoute
    /** @type {Route} */
    this.route = this.rootRoute.routerViewList.get(renderingComponent.constructor)
    /** @type {RegExpMatchArray} */
    this.params = this.rootRoute.activeRoutes.get(this.route)
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  update(contentUpdater) {
    contentUpdater.update([
      new this.route.Component(...this.params)
    ])
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
   * @param {string} routeName 
   * @param {string[]} params 
   * @param {(href: string, handler: Function, isActive: Boolean) => LitTag} view 
   */
  constructor(routeName, params = [], view) {
    super()
    if (typeof routeName !== 'string') throw new TypeError('routeName is not a string.')
    this.routeName = routeName
    this.params = params
    this.view = typeof view !== 'function'
      ? RouterLink.defaultView(view)
      : view
    this.component = renderingComponent
  }

  /**
   * @param {ContentUpdater} updater 
   */
  update(updater) {
    const value = this.routeName + this.params.join(';')
    if (value === updater.oldValue) return value
    this.view('', () => Router.push(this.routeName, this.params), false)
      .mount(updater.previousNode.nextSibling)
    return value
  }
}
