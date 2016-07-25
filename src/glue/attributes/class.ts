import { listenDeps } from '../../observer/dependent'
import { isObserved, isObservable, listenObs, parseObsValue } from '../../observer/observable'
import { Glue, getEl, removeElRef } from '../index'

export class ClassGlue extends Glue {
  constructor(
    id: string,
    private className: string,
    private cond
  ) {
    super()
    this.id = id
  }

  install() {
    this.el = getEl(this.id)
    if (isObserved(this.cond)) {
      this.listeners.push(listenObs(this.cond, () => this.classNameSetter()))
    } else {
      this.listeners.push(listenDeps(() => this.classNameSetter()))
    }
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
    const cond = parseObsValue(this.cond)
    if (cond && !isContain) {
      this.el.classList.add(this.className)
    } else if (!cond && isContain) {
      this.el.classList.remove(this.className)
    }
  }
}
