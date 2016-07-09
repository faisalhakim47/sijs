import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class ClassGlue extends Glue {
  constructor(
    private id: string,
    private className: string,
    private cond: ObsGetter
  ) {
    super()
  }

  install() {
    this.el = getEl(this.id)
    this.cond.watch(this.classNameWatcher)
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.cond.unwatch(this.classNameWatcher)
      this.el = null
      removeElRef(this.id)
    } else {
      // Warn
    }
  }

    classNameWatcher(val) {
    const isContain = this.el.classList.contains(this.className)
    if (val && !isContain) {
      this.el.classList.add(this.className)
    } else if (!val && isContain) {
      this.el.classList.remove(this.className)
    }
  }
}
