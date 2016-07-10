import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsGetter } from '../../observer/observable'

export class InputCheckboxGlue extends Glue {
  el: HTMLInputElement
  value: string
  constructor(
    private id: string,
    private model: ObsGetter
  ) {
    super()
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
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
        'Glue InputCheckbox #', this.id, 'has not installed yet.', this
      )
    }
  }

  toView(val) {
    if (val.indexOf(this.el.value) === -1) {
      this.el.checked = false
    } else {
      this.el.checked = true
    }
  }

  toModel() {
    this.model.set(this.el.value)
  }
}
