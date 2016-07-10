import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class BindGlue extends Glue {
  constructor(
    private id: string,
    private value: ObsGetter
  ) {
    super()
  }

  install() {
    this.el = getEl(this.id)
    this.value.watch(this.bindWatcher)
    window['test'] = this.value
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

  bindWatcher = this.toViewBind.bind(this)
  toViewBind(val) {
    this.el.innerText = val
  }
}
