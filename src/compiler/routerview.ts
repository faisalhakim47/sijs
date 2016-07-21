import { IComponentClass } from './component'
import { TChild, Elem, h } from './elem'
import { IAllAttribute } from './interfaces'
import { GlobalEvent } from '../instance/global-event'
import { Glue } from '../glue/glue'
import { RouterViewGlue } from '../glue/routerview'

const paramRx = new RegExp('/:(.*)/', 'g')

export interface IRoute {
  path: string
  component: IComponentClass | RouterView
  defaults?: boolean
  params?: string[]
  rx?: RegExp
}

export interface IRouterState {
  path: string
  route: IRoute
  params: { [name: string]: string }
  query: string
}

export class RouterView {
  static PATH: string = null
  static ROUTER: RouterView = null

  id: string = null
  glues: Glue[] = []
  routes: IRoute[] = []
  defaultRoute: IRoute = null
  childRoutes: RouterView[] = []
  state: IRouterState = {
    path: '',
    route: null,
    params: {},
    query: ''
  }

  constructor(routes: IRoute[]) {
    const paramRx = /\/(:.*)\//
    const paramRxG = new RegExp(paramRx.source, 'g')

    // map routes from user, e.g. regex, params
    routes.forEach((route) => {
      let { component, path, defaults } = route
      let isWildcard = false

      if (path.substr(-1) === '*') {
        path = path.slice(0, -1)
        isWildcard = true
      }
      if (path.slice(0, 1) !== '/') {
        path = '/' + path
      }
      if (path.substr(-1) === '/') {
        path = path.slice(0, -1)
      }

      let params = path.match(paramRxG)
      if (params === null) {
        params = []
      }
      params = params.map((param) => param.slice(1))
      params.shift()

      let rx: RegExp
      if (isWildcard) {
        rx = new RegExp(
          '^' + path.replace(paramRxG, '/(.*)/')
        )
      } else {
        rx = new RegExp(
          '^' + path.replace(paramRxG, '/(.*)/') + '$'
        )
      }

      this.routes.push(
        defaults
          ? (this.defaultRoute = { path, component, params, rx })
          : { path, component, params, rx }
      )
    })
  }

  Elem(): Elem {
    const helperElem = h('script', { routerview: true })
    this.id = helperElem.id

    let { route, matches } = this.findTheRoute()

    if (route) {
      // set this router as parent to child under it render
      const parentPath = RouterView.PATH
      const parentRouter = RouterView.ROUTER
      const isRootRouter = !!RouterView.ROUTER
      RouterView.PATH = RouterView.PATH.replace(route.rx, '')
      RouterView.ROUTER = this

      // update the state
      this.state = this.generateState(
        RouterView.PATH, matches, route
      )

      const e = this.generateElem(route.component)

      // if root Router
      if (isRootRouter) {
        e.glues.push(
          new RouterViewGlue(helperElem.id, this)
        )
      }

      // add the route component to helperElem
      helperElem.template += e.template.replace('>', ` ${helperElem.id}>`)
      helperElem.glues.push(...e.glues)
      helperElem.events.push(...e.events)
      helperElem.routers.push(this)

      // set back to its parent router
      RouterView.PATH = parentPath
      RouterView.ROUTER = parentRouter

      // cut the function when it done
      return helperElem
    }

    // route not found ...
    helperElem.template = h('script').template.replace('>', ` ${helperElem.id}>`)
    return helperElem
  }

  findTheRoute() {
    // find the route on specified path
    let route: IRoute = null
    let matches: string[] = []
    for (let i = 0, l = this.routes.length; i < l; i++) {
      route = this.routes[i]
      const matches = RouterView.PATH.match(route.rx)
      if (matches) break
      else route = null
    }

    if (!route && this.defaultRoute) {
      route = this.defaultRoute
    }

    matches.shift()
    return { route, matches }
  }

  generateElem(Component: IComponentClass | RouterView) {
    // generate the route component
    if (Component instanceof RouterView) {
      var e = Component.Elem()
    } else {
      var e = new Component().create()
    }

    // retrieve child routes
    this.childRoutes.push(...e.routers)

    // save component glues
    this.glues = []
    this.glues.push(...e.glues)

    return e
  }

  generateState(
    path: string,
    matches: string[],
    route: IRoute
  ) {
    const state: IRouterState = {
      params: {},
      route: null,
      path,
      query: '',
    }

    // update params
    matches.forEach((value) => {
      route.params.forEach((name) => {
        state.params[name] = value
      })
    })

    // and others...
    state.route = route
    state.path = path
    state.query = path.split('?')[1]

    return state
  }
}
