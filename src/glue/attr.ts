import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class AttrGlue extends Glue {
  constructor(
    id: string,
    private attrName: string,
    private attrValue: ObsGetter
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
    this.watchers.push(
      this.attrValue.watch((val) => this.attrSetter(val))
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue InputText #', this.id, 'has not installed yet.', this
      )
    }
  }

  attrSetter(val) {
    this.el.setAttribute(this.attrName, val)
  }
}
