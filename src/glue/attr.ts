import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class AttrGlue extends Glue {
  constructor(
    private id: string,
    private attrName: string,
    private attrValue: ObsGetter
  ) {
    super()
  }

  attrWatcher(val) {
    this.el.setAttribute(this.attrName, val)
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
    this.attrValue.watch(this.attrWatcher)
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.attrValue.unwatch(this.attrWatcher)
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue InputText #', this.id, 'has not installed yet.', this
      )
    }
  }
}
