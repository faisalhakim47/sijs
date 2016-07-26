import { Glue, getEl, removeElRef } from './index'
import { listenObs } from '../observer/dependent'

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
    this.listeners.push(listenObs(this.value, () => this.bindSetter()))
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
    const val = this.value()
    if (this.el.innerText == val) return
    this.el.innerText = val
  }
}
