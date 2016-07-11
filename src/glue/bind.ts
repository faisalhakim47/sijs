import { Glue, getEl, removeElRef } from './glue'
import { ObsGetter } from '../observer/observable'

export class BindGlue extends Glue {
  constructor(
    id: string,
    private value: ObsGetter
  ) {
    super()
    this.id = id
  }

  install() {
    this.el = getEl(this.id)
    this.watchers.push(
      this.value.watch((val) => this.bindSetter(val))
    )
    window['test'] = this.value
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue bind #', this.id, 'has not installed yet.', this
      )
    }
  }

  bindSetter(val) {
    if (this.el.innerText == val) return
    this.el.innerText = val
  }
}
