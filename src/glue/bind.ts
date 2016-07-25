import { Glue, getEl, removeElRef } from './index'
import { listenDeps } from '../observer/dependent'
import { isObserved, parseObsValue, listenObs } from '../observer/observable'

export class BindGlue extends Glue {
  constructor(
    id: string,
    private value: Function
  ) {
    super()
    this.id = id
  }

  install() {
    this.el = getEl(this.id)
    if (isObserved(this.value)) {
      this.listeners.push(listenObs(this.value, () => this.bindSetter()))
    } else {
      this.listeners.push(listenDeps(() => this.bindSetter()))
    }
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
    } else {
      console.warn(
        'Glue bind #', this.id, 'has not installed yet.', this
      )
    }
  }

  bindSetter() {
    const val = parseObsValue(this.value)
    if (this.el.innerText == val) return
    this.el.innerText = val
  }
}
