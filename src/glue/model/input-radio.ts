import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsGetter } from '../../observer/observable'

export class InputRadioGlue extends Glue {
  el: HTMLInputElement
  radioName: string
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
    this.radioName = this.model.path + this.model.val()
    this.el.name = this.radioName
    watchEvent(this.id, 'click', this.toModel)
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.model.unwatch(this.toView)
      unwatchEvent(this.id, 'click', this.toModel)
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue InputRadio #', this.id, 'has not installed yet.', this
      )
    }
  }

  toView(val) {
    if (this.value === val) {
      this.el.click()
    }
  }

  toModel() {
    this.model.set(this.el.value)
  }
}
