import { h, Elem } from './elem'
import { Glue } from '../glue/glue'
import { Observable } from '../observer/observable'
import { RouterView } from './routerview'

export interface IComponentClass {
  new (attrs?, children?): Component
}

export function isComponentClass(t): t is IComponentClass {
  return t && t._isComponentClass
}

export abstract class Component {
  static _isComponentClass = true
  protected rawState = {}
  public _isComponent = true
  private params = {}
  private query = {}
  private state = new Observable(this, 'rawState')

  constructor(
    private attrs?,
    private children?: any[]
  ) { }

  create(): Elem {
    if (RouterView.ROUTER) {
      this.params = RouterView.ROUTER.state.params
      this.query = RouterView.ROUTER.state.query
    }

    const e = this.render(this.state, h)

    return e
  }

  abstract render(state: Observable, h): Elem
}
