import { createElem, IElem } from './elem'
import { Glue } from '../glue/glue'
import { Observable } from '../observer/observable'
import { Router } from '../instance/router'

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
    private children?: any[],
    private router?: Router
  ) {
    this.state = new Observable(this, 'rawState')
  }

  create(): IElem {
    this.params = this.router.currentParams
    this.query = this.router.currentQuery
    ;(<any>createElem).router = this.router
    const e = this.render(createElem, this.state)
    ;(<any>createElem).router = null
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
