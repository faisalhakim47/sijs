import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class BindGlue extends Glue {
  constructor(
    private id: string,
    private value: ObsGetter
  ) {
    super()
  }

  bindWatcher(val) {
    this.el.innerText = val
  }

  install() {
    this.el = getEl(this.id)
    this.value.watch(this.bindWatcher)
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.value.unwatch(this.bindWatcher)
      this.el = null
      removeElRef(this.id)
    } else {
      // Warn
    }
  }
}
