import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsObject } from '../../observer/observable'

export class TextGlue extends Glue {
  el: HTMLInputElement | HTMLTextAreaElement
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
        'Glue InputText #', this.id, 'has not installed yet.', this
      )
    }
  }

  toView(val) {
    if (val == this.el.value) return
    this.el.value = val
  }

  toModel() {
    if (this.model.val() == this.el.value) return
    this.model.set(this.el.value)
  }
}
