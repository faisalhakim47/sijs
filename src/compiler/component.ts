import { RouterView } from './routerview'
import { CompilerState } from './index'
import { genId } from './uid'
import { Glue } from '../glue/index'
import { Observable } from '../observer/observable'

export interface ComponentClass {
  new (): Component
}

export function isComponentClass(t): t is ComponentClass {
  return t && t._isComponentClass
}

const rxAttrId = /^<\w* *id="(\w*)"/

export abstract class Component {
  static _isComponentClass = true
  static ACTIVE_COMPONENT = null

  public _isComponent = true

  protected id: string
  protected el: Element
  protected params = {}

  private $this = Observable(this)

  $compile(): string {
    // Hooks
    if ((<any>this).beforeCompile) (<any>this).beforeCompile()

    if (RouterView.ROUTER) {
      this.params = RouterView.ROUTER.routeState.params
    }

    if (!(<any>this).render) console.error('You must implement render Fn')

    const ParentComponent = Component.ACTIVE_COMPONENT
    Component.ACTIVE_COMPONENT = this.$this

    let template: string = (<any>this).render.bind(this.$this)()

    const match = template.match(rxAttrId)
    if (match) {
      this.id = template.match(rxAttrId)[1]
    } else {
      this.id = genId()
      template = template.replace('>',  ` id="${this.id}">`)
    }

    Component.ACTIVE_COMPONENT = ParentComponent

    CompilerState.components.push(this)

    return template
  }

  $install() {
    this.el = document.getElementById(this.id)
  }

  $destroy() {
    this.el = null
  }

  abstract render(): string
}
