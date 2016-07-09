import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class StyleGlue extends Glue {
  constructor(
    private id: string,
    private name: string,
    private value: ObsGetter
  ) {
    super()
  }

  install() {
    if (!(this.el = getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not been inserted yet.', this
      )
    }
    this.value.watch(this.styleWatcher)
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.value.unwatch(this.styleWatcher)
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue style #', this.id, 'has not been installed yet.', this
      )
    }
  }

  styleWatcher(val) {
    this.el.style[this.name] = val
  }
}
