import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsObject } from '../../observer/observable'

export class InputRadioGlue extends Glue {
  el: HTMLInputElement
  radioName: string
  value: string
  constructor(
    id: string,
    private model: ObsObject
  ) {
    super()
    this.id = id
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
    this.radioName = this.model.path + this.model.val()
    this.el.name = this.radioName
    this.watchers.push(
      this.model.watch((val) => this.toView(val)),
      watchEvent(this.id, 'onclick', () => this.toModel())
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
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
