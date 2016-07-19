import { IComponentClass } from './component'
import { TChild, Elem, h } from './elem'
import { IAllAttribute } from './interfaces'
import { GlobalEvent } from '../instance/global-event'
import { RouterViewGlue } from '../glue/routerview'

const paramRx = new RegExp('/:(.*)/', 'g')

export interface IRoute {
  path: string
  component: IComponentClass | RouterView
  params: string[]
  rx: RegExp
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

  routes: IRoute[] = []
  parentPath: string = null
  parentRouter: RouterView = null
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
      const { component, path } = route

      let params = path.match(paramRxG)
      if (params === null) {
        params = []
      }
      params = params.map((param) => param.slice(1))
      params.shift()

      const endWildcardRx = /\/\*$/
      let rx: RegExp
      if (path.match(endWildcardRx)) {
        rx = new RegExp(
          '^' + path.replace(endWildcardRx, '')
            .replace(paramRxG, '/(.*)/')
        )
      } else {
        rx = new RegExp(
          '^' + path.replace(paramRxG, '/(.*)/')
        )
      }

      this.routes[name] = { path, name, component, params, rx }
    })
  }

  Elem(): Elem {
    const helperElem = h('script')

    // find the route on specified path
    for (let i = 0, l = this.routes.length; i < l; i++) {
      const route = this.routes[i]
      const matches = RouterView.PATH.match(route.rx)
      if (matches) {
        // set this router as parent to child under it render
        this.parentPath = RouterView.PATH
        RouterView.PATH = RouterView.PATH.replace(route.rx, '')
        this.parentRouter = RouterView.ROUTER
        RouterView.ROUTER = this

        // update the state
        matches.shift()
        const state = this.generateState(
          RouterView.PATH, matches, route
        )



        // generate the route component
        const Component = route.component
        if (Component instanceof RouterView) {
          var e = Component.Elem()
          helperElem.routers.push(Component)
        } else {
          var e = new Component().create()
        }

        // retrieve child routes
        this.childRoutes.push(...e.routers)

        // add the route component to helperElem
        helperElem.template += e.template
        helperElem.glues.push(...e.glues)
        helperElem.events.push(...e.events)
        helperElem.routers.push(this)

        // set back to its parent router
        RouterView.PATH = this.parentPath
        this.parentPath = null
        RouterView.ROUTER = this.parentRouter
        this.parentRouter = null

        // cut the function when it done
        return helperElem
      }
    }

    // route not found ...
    helperElem.template = h('script').template.replace('>', ` ${helperElem.id}>`)
    return helperElem
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
