import { IComponentClass } from './component'
import { IElem, createElem } from './elem'
import { RouterViewGlue } from '../glue/routerview'
import { Router } from '../router/router'

const paramRx = new RegExp('/:(.*)/', 'g')

export interface IRouteView {
  name: string
  Component: IComponentClass
}

export class RouterView {
  routes: IRouteView[] = []

  register({ name }) {
    return (constructor: IComponentClass) => {
      this.routes.push({ name, Component: constructor })
    }
  }

  Elem(): IElem {
    const rvGlue = new RouterViewGlue('', this)
    const helperE = createElem('script', null)
    for (let i = 0, l = this.routes.length; i < l; i++) {
      const route = this.routes[i]
      if (route.name === Router.currentRouteName) {
        const e = (new route.Component()).create()
        helperE.template += e.template
        helperE.glues.push(...e.glues)
        break
      }
    }
    rvGlue.id = helperE.id
    helperE.glues.unshift(rvGlue)
    return helperE
  }
}
