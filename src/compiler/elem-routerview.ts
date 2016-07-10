import { IComponentClass } from './component'
import { IElem, createElem } from './elem'
import { RouterViewGlue } from '../glue/routerview'
import { Router } from '../router/router'

const paramRx = new RegExp('/:(.*)/', 'g')

export class RouterView {
  routes: {}

  contructor(obj) {
    Object.keys(obj).forEach((key) => {
      this.routes[key] = obj[key]
    })
  }

  init(): IElem {
    const helperElem = createElem('script', null)
    const e = this.Elem()
    e.glues.unshift(
      new RouterViewGlue(helperElem.id, this, e.glues)
    )
    return e
  }

  Elem(): IElem {
    const Component: IComponentClass = this.routes[Router.currentRouteName]
    if (Component) {
      return (new Component()).create()
    } else {
      return createElem('script', { dummy: true })
    }
  }
}
