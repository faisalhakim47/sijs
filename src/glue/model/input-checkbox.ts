import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsGetter } from '../../observer/observable'

export class InputCheckboxGlue extends Glue {
  el: HTMLInputElement
  value: string
  constructor(
    id: string,
    private model: ObsGetter
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
