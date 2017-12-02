import { Route } from './Route.js'
import { RootRoute, rootRoute } from './RootRoute.js'
import { RouterLink } from './RouterLink.js'
import { RouterView } from './RouterView.js'

export class Router {
  static back() {

  }

  /**
   * @param {Route|string} route 
   * @param {string[]} params 
   */
  static push(route, params) {
    if (typeof route === 'string') route = RootRoute.findRoute(route)
    rootRoute.setActiveRoute(route, params)
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
