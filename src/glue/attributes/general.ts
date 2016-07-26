import { Glue, getEl, removeElRef } from '../index'
import { listenObs } from '../../observer/dependent'

export class AttrGlue extends Glue {
  constructor(
    id: string,
    private attrName: string,
    private attrValue: Function
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
    this.listeners.push(listenObs(this.attrValue, () => this.attrSetter()))
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
    this.el.setAttribute(this.attrName, this.attrValue())
  }
}
