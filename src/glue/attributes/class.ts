import { listenObs } from '../../observer/dependent'
import { Glue, getEl, removeElRef } from '../index'

export class ClassGlue extends Glue {
  constructor(
    id: string,
    private className: string,
    private cond: Function
  ) {
    super()
    this.id = id
  }

  install() {
    this.el = getEl(this.id)
    this.listeners.push(listenObs(this.cond, () => this.classNameSetter()))
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
    } else {
      console.warn(
        'Glue className #', this.id, 'has not installed yet.', this
      )
    }
  }

  classNameSetter() {
    const isContain = this.el.classList.contains(this.className)
    const cond = this.cond()
    if (cond && !isContain) {
      this.el.classList.add(this.className)
    } else if (!cond && isContain) {
      this.el.classList.remove(this.className)
    }
  }
}
