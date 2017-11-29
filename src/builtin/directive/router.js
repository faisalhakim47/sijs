import { ContentUpdater } from '../../core/updater/content/content.js'
import { Component, renderingComponent } from '../../core/updater/content/component.js'
import { Directive } from '../../core/updater/content/directive.js'
import { LitTag } from '../../core/littag.js'
import { List } from '../../tools/list.js'
import { html } from '../../html.js'

/**
 * @param {string} path 
 */
function normalizePath(path) {
  if (path[0] !== '/') path = '/' + path
  if (path[path.length - 1] === '/') path = path.slice(0, -1)
  return path
}


/**
 * There is should be only one RootRoute
 */
export class RootRoute {
  /**
   * @param {Route} route 
   */
  constructor(route) {
    this.rootRoute = route
    this.routerViews = new List()
    this.activeRoutes = new List()
    this.routes = this.normalizeRoute(route)
  }

  /**
   * @param {Route} route 
   */
  normalizeRoute(route) {
    const routes = route.childRouter instanceof Router
      ? [
        route,
        ...route.childRouter.routes
          .map((childRoute) => {
            childRoute.parentRoute = route
            childRoute.fullPath = route.path + childRoute.path
            return normalizeRoutes(childRoute)
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
    this.routerViewList = new List()
    this.activeRoutes = new List()
    const length = this.routes.length
    for (let index = 0; index < length; index++) {
      let route = this.routes[index]
      const matches = path.match(route.regex)
      if (matches !== null) {

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

        /** @type {Route} */
        let parentRoute
        while (parentRoute = route.parentRoute) {
          const dpCount = route.dynamicPartCount
          const params = matches.splice(matches.length - dpCount, dpCount)
          c.routerViewList.set(parentRoute.Component, route)
          c.activeRoutes.set(route, params)
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
    this.setRouterPath(location.pathname)
    this.rootRoute.mount(container)
  }
}

const c = {
  /** @type {Route} */
  rootRoute: null,
  routerViewList: new List(),
  /** @type {Route[]} */
  routes: [],
  activeRoutes: new List(),
}

/**
 * @param {Route} route 
 * @param {Route} parentRoute 
 */
function normalizeRoutes(route) {
  /** @type {Route[]} */
  const routes = route.childRouter instanceof Router
    ? [
      route,
      ...route.childRouter.routes
        .map((childRoute) => {
          childRoute.parentRoute = route
          childRoute.fullPath = route.path + childRoute.path
          return normalizeRoutes(childRoute)
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

function syncBrowserLocation() {
  c.routerViewList = new List()
  c.activeRoutes = new List()
  const locationPath = normalizePath(location.pathname)
  const length = c.routes.length
  for (let index = 0; index < length; index++) {
    let route = c.routes[index]
    const matches = locationPath.match(route.regex)
    if (matches !== null) {

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

      /** @type {Route} */
      let parentRoute
      while (parentRoute = route.parentRoute) {
        const dpCount = route.dynamicPartCount
        const params = matches.splice(matches.length - dpCount, dpCount)
        c.routerViewList.set(parentRoute.Component, route)
        c.activeRoutes.set(route, params)
        route = parentRoute
      }

      break
    }
  }
}

export class Router {
  static back() {

  }

  static push(routeName, params) {

  }

  /**
   * @param {Component} component 
   */
  static view(component) {
    return new RouterView(component)
  }

  /**
   * @param {string|((handler: Function, isActive: Boolean) => LitTag)} view 
   */
  static link({ name: routeName, params }, view) {
    return new RouterLink({ routeName, params }, view)
  }

  /**
   * @param {Route[]} routes 
   */
  constructor(routes, { defaultRoute = null } = {}) {
    this.routes = routes
    /** @type {string} */
    this.defaultRoute = defaultRoute
  }
}

export class Route {
  /**
   * @param {string} path 
   * @param {string} name 
   * @param {typeof Component} Component 
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
    /** @type {Route} */
    this.route = c.routerViewList.get(renderingComponent.constructor)
    this.params = c.activeRoutes.get(this.route)
    this.component = renderingComponent
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
   */
  static defaultView(text) {
    /**
     * @param {string} href 
     * @param {Function} handler 
     * @param {Boolean} isActive 
     */
    return (href, handler, isActive) => html`<a class=${isActive ? 'active' : ''} href=${href} onclick=${handler}>${text}</a>`
  }

  /**
   * @param {(handler: Function, isActive: Boolean) => LitTag} view 
   */
  constructor({ routeName = null, params = [] } = {}, view) {
    super()
    if (typeof routeName !== 'string') throw new TypeError('routeName is not a string.')
    this.routeName = routeName
    /** @type {string[]} */
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
    /** @type {Route} */
    const route = c.routerViewList
      .find((route) => (route.name === this.routeName))
    /** @type {string[]} */
    const params = c.activeRoutes.get(route)
    this.view(() => Router.push(this.routeName, this.params))
      .mount(updater.previousNode.nextSibling)
    return value
  }
}
