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
    this.watchers.push(
      this.value.watch(this.bindSetter)
    )
    window['test'] = this.value
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.unwatchAll()
      this.el = null
      removeElRef(this.id)
    } else {
      // Warn
    }
  }

  bindSetter = (val) => {
    if (this.el.innerText == val) return
    this.el.innerText = val
  }
}
