import { RouterView } from './routerview'
import { CompilerState } from './index'
import { Glue } from '../glue/index'
import { Observe } from '../observer/observable'

export interface ComponentClass {
  new (): Component
}

export function isComponentClass(t): t is ComponentClass {
  return t && t._isComponentClass
}

export abstract class Component {
  static _isComponentClass = true

  public _isComponent = true

  private params = {}
  private query = {}

  generate(): string {
    if (RouterView.ROUTER) {
      this.params = RouterView.ROUTER.routeState.params
      this.query = RouterView.ROUTER.routeState.query
    }

    const template = this.render.bind(Observe(this))()

    const beforeInstall = (<any>this).beforeInstall
    const afterInstall = (<any>this).afterInstall
    const beforeDestroy = (<any>this).beforeDestroy
    const afterDestroy = (<any>this).afterDestroy

    if (beforeInstall) CompilerState.hooks.beforeInstall.push(beforeInstall)
    if (afterInstall) CompilerState.hooks.beforeInstall.push(afterInstall)
    if (beforeDestroy) CompilerState.hooks.beforeInstall.push(beforeDestroy)
    if (afterDestroy) CompilerState.hooks.beforeInstall.push(afterDestroy)

    return template
  }

  abstract render(): string
}
