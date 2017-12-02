import { List } from '../../../tools/list.js'
import { Route } from './Route.js'
import { Router } from './router.js'
import { normalizePath } from './tools.js'

/** @type {RootRoute} */
export let rootRoute = null

export class RootRoute {
  /**
   * @param {string} routeName 
   */
  static findRoute(routeName) {
    const routes = rootRoute.availableRoutes
    const length = routes.length
    for (let index = 0; index < length; index++) {
      if (routes[index].name === routeName)
        return routes[index]
    }
  }

  /**
   * @param {Route} route 
   */
  constructor(route) {
    this.rootRoute = route
    /** @type {List.<new () => Component, Route>} */
    this.routerViewList = new List()
    /** @type {Route[]} */
    this.routes = []
    /** @type {Route} */
    this.route = null
    this.params = []
    this.availableRoutes = this.normalizeRoute(route)
    rootRoute = this
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
      route.regex = new RegExp('^' + regexStr + '(?:\/)?$')
    }

    return routes
  }

  /**
  * @param {string} path 
  */
  setRouterPath(path) {
    path = normalizePath(path)
    const length = this.availableRoutes.length
    for (let index = 0; index < length; index++) {
      let route = this.availableRoutes[index]
      const matches = path.match(route.regex)
      if (matches !== null) {
        this.setActiveRoute(route, matches.slice(1))
        break
      }
    }
  }

  /**
   * @param {Route} nextRoute 
   * @param {string[]} nextParams
   */
  setActiveRoute(nextRoute, nextParams) {
    const targetRoute = nextRoute
    /*
     * [GOING DOWN] check if there are default child router
     */
    /** @type {Router} */
    let childRouter
    while (childRouter = nextRoute.childRouter) {
      const length = childRouter.routes.length
      for (let index = 0; index < length; index++) {
        const childRoute = childRouter.routes[index]
        if (childRouter.defaultRoute === childRoute.name || childRoute.path === '') {
          nextRoute = childRoute
          break
        }
      }
    }

    if (nextRoute === this.route && this.params.join() === nextParams.join())
      return

    /*
     * [GOING UP] add the parent route as active route
     */
    /* Reset the route list to prevent memory leaks */
    const nextRouterViewList = new List()
    /** @type {Route[]} */
    const nextRoutes = []
    /** @type {Route} */
    let parentRoute
    while (parentRoute = nextRoute.parentRoute) {
      nextRouterViewList.set(parentRoute.Component, nextRoute)
      nextRoutes.push(nextRoute)
      nextRoute = parentRoute
    }

    let href = targetRoute.href(nextParams) || '/'
    history.pushState({}, href, href)

    const length = nextRoutes.length
    for (let index = 0; index < length; index++) {
      const nextRoute = nextRoutes[index]
      if (nextRoutes[index] !== this.routes[index]) {
        break
      }
    }

    this.route = nextRoute
    this.params = nextParams
    this.routerViewList = nextRouterViewList
    this.routes = nextRoutes
  }

  /**
   * @param {Node} container 
   */
  mount(container) {
    this.setRouterPath(location.pathname)
    this.rootRoute.mount(container)
  }
}
