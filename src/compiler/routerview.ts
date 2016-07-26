import { IAllAttribute } from './attributes'
import { CompilerStateConstructor, getChildState } from './index'
import { ComponentClass } from './component'
import { genId } from './uid'
import { GlobalEvent } from '../instance/global-event'
import { Glue } from '../glue/index'
import { RouterViewGlue } from '../glue/routerview'

const paramRx = new RegExp('/:(.*)/', 'g')

export interface IRoute {
  path: string
  component: ComponentClass | RouterView
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

  private routes: IRoute[] = []
  private defaultRoute: IRoute = null

  public id: string = null
  public currentState: CompilerStateConstructor
  public childRoutes: RouterView[] = []
  public routeState: IRouterState = {
    path: '',
    route: null,
    params: {},
    query: ''
  }

  constructor(routes: IRoute[]) {
    const paramRx = /\/(:.*)\//
    const paramRxG = new RegExp(paramRx.source, 'g')

    // map routes from user, e.g. regex, params
    this.routes = routes.map((route) => {
      let { component, path, defaults } = route
      let isWildcard = false

      if (path.substr(-1) === '*') {
        path = path.slice(0, -1)
        isWildcard = true
      }
      if (path.slice(0, 1) !== '/') {
        path = '/' + path
      }
      if (path.length !== 1 && path.substr(-1) === '/') {
        path = path.slice(0, -1)
      }
      if (path.length === 0) {
        path = '/'
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

      return defaults
        ? (this.defaultRoute = { path, component, params, rx })
        : { path, component, params, rx }
    })
  }

  generate(): string {
    const id = this.id = genId()
    let helperTemplate: string = `<script id="${id}" routerview></script>`

    let { route, matches } = this.findTheRoute()

    if (route) {
      // set this router as parent to child under its render
      const parentPath = RouterView.PATH
      const parentRouter = RouterView.ROUTER
      const isRootRouter = !RouterView.ROUTER
      RouterView.PATH = RouterView.PATH.replace(route.rx, '')
      RouterView.ROUTER = this

      // update the state
      this.routeState = this.generateState(
        RouterView.PATH, matches, route
      )

      helperTemplate += this.generateTemplate(route.component)

      // add root router to glue
      if (isRootRouter) {
        this.currentState.glues.unshift(
          new RouterViewGlue(id, this)
        )
      }

      // set back to its parent router
      RouterView.PATH = parentPath
      RouterView.ROUTER = parentRouter

      return helperTemplate
    } else {
      // route not found ...
      return `${helperTemplate}<script ${id}></script>`
    }
  }

  findTheRoute() {
    let route: IRoute = null
    let matches: string[] = []
    for (let i = 0, l = this.routes.length; i < l; i++) {
      route = this.routes[i]

      console.log('Route', route.path, route.rx, RouterView.PATH)

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

  generateTemplate(Component: ComponentClass | RouterView) {

    let template: string
    this.currentState = getChildState(() => {
      if (Component instanceof RouterView) {
        template = Component.generate()
      } else {
        template = new Component().$compile()
      }
    })

    return template
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

    matches.forEach((value) => {
      route.params.forEach((name) => {
        state.params[name] = value
      })
    })

    state.route = route
    state.path = path
    state.query = path.split('?')[1]

    return state
  }
}
