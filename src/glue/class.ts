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
    this.watchers.push(
      this.cond.watch((val) => this.classNameSetter(val))
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.unwatchAll()
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue className #', this.id, 'has not installed yet.', this
      )
    }
  }

  classNameSetter(val) {
    const isContain = this.el.classList.contains(this.className)
    if (val && !isContain) {
      this.el.classList.add(this.className)
    } else if (!val && isContain) {
      this.el.classList.remove(this.className)
    }
  }
}
