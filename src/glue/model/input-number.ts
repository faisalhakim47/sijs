import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsGetter } from '../../observer/observable'

export class InputNumberGlue extends Glue {
  el: HTMLInputElement
  constructor(
    private id: string,
    private model: ObsGetter
  ) {
    super()
  }

  toView(val) {
    this.el.value = val
  }

  toModel() {
    this.model.set(parseFloat(this.el.value))
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
    this.model.watch(this.toView)
    watchEvent(this.id, 'oninput', this.toModel)
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.model.unwatch(this.toView)
      unwatchEvent(this.id, 'oninput', this.toModel)
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue InputNumber #', this.id, 'has not installed yet.', this
      )
    }
  }
}
