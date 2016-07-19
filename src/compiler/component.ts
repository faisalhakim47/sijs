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
  static awaitState: PromiseLike<any>[] = []
  protected rawState = {}
  public _isComponent = true
  public state: Observable
  public params = {}
  public query = {}

  constructor(
    private attrs?,
    private children?: any[]
  ) {
    this.state = new Observable(this, 'rawState')
  }

  create(): Elem {
    this.params = RouterView.ROUTER.state.params
    this.query = RouterView.ROUTER.state.query
    const e = this.render()
    if (this.created) this.created()
    return e
  }

  abstract render(): Elem
}

export interface Component {
  created?: () => void
  ready?: () => void
}
