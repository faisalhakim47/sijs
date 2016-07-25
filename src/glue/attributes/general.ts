import { Glue, getEl, removeElRef } from '../index'
import { listenDeps } from '../../observer/dependent'
import { isObserved, listenObs, parseObsValue } from '../../observer/observable'

export class AttrGlue extends Glue {
  constructor(
    id: string,
    private attrName: string,
    private attrValue
  ) {
    super()
    this.id = id
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
    if (isObserved(this.attrValue)) {
      this.listeners.push(listenObs(this.attrValue, () => this.attrSetter()))
    } else {
      this.listeners.push(listenDeps(() => this.attrSetter()))
    }
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
    } else {
      console.warn(
        'Glue InputText #', this.id, 'has not installed yet.', this
      )
    }
  }

  attrSetter() {
    this.el.setAttribute(this.attrName, parseObsValue(this.attrValue))
  }
}
