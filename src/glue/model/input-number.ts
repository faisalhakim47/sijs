import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsGetter } from '../../observer/observable'

export class InputNumberGlue extends Glue {
  el: HTMLInputElement
  constructor(
    id: string,
    private model: ObsGetter
  ) {
    super()
    this.id = id
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
    this.watchers.push(
      this.model.watch((val) => this.toView(val)),
      watchEvent(this.id, 'oninput', () => this.toModel())
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
    } else {
      console.warn(
        'Glue InputNumber #', this.id, 'has not installed yet.', this
      )
    }
  }
}
