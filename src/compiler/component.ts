import { createElem, IElem } from './elem'
import { Glue } from '../glue/glue'
import { eventBus } from '../glue/event'
import { Observable } from '../observer/observable'
import { Router } from './router'

export interface IComponentClass {
  new (attrs?, children?, params?): Component
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
    private children?
  ) {
    this.state = new Observable(this, 'rawState')
  }

  create(): IElem {
    this.params = Router.currentParams
    this.query = Router.currentQuery
    const e = this.render(createElem, this.state)
    if (this.created) this.created()
    return e
  }

  abstract render(
    e: (tag, attrs, ...children) => IElem,
    state: Observable
  ): IElem
}

export interface Component {
  created?: () => void
  ready?: () => void
}
