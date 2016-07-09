import { GlobalEvent } from '../instance/global-event'
import is from '../instance/status'

export interface IRoute {
  name: string
  path: string
  params: string[]
  rx: RegExp
}

const paramRx = new RegExp('/(:.*)/', 'g')

export class Router {
  static path
  static currentRouteName: string
  static currentParams
  static currentQuery
  static routes: IRoute[] = []
  static map(routes) {
    Object.keys(routes).forEach((path: string) => {
      const { name: string } = routes[path]
      const params = path.match(paramRx)
        .map((param) => param.slice(1))
      params.shift()
      this.routes.push({
        path,
        name,
        params,
        rx: new RegExp(path.replace(paramRx, '/(.*)/'))
      })
    })
  }
  static generateRoute(path: string) {
    for (let i = this.routes.length; i--;) {
      const route = this.routes[i]
      if (route.rx.test(path)) {
        this.currentRouteName = route.name
        let paramsArr = path.match(route.rx)
        let paramsObj = null
        if (route.params) {
          paramsObj = {}
          route.params.forEach((name, i) => {
            paramsObj[name] = paramsArr[i]
          })
          this.currentParams = paramsObj
        } else {
          this.currentParams = paramsArr
        }
        i = 0
      }
    }
    GlobalEvent.emit('route:change', this) // Global Event
  }
}
