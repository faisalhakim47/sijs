import { Glue, getEl, removeElRef } from '../glue'
import { watchEvent, unwatchEvent } from '../event'
import { ObsGetter } from '../../observer/observable'

export class SelectGlue extends Glue {
  el: HTMLSelectElement
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
    this.model.set(this.el.value)
  }

  install() {
    if (!(this.el = <HTMLSelectElement>getEl(this.id))) {
      return console.warn(
        'Select element #', this.id, 'has not inserted yet.', this
      )
    }
    this.el.value = this.model.val()
    this.watchers.push(
      this.model.watch((val) => this.toView(val)),
      watchEvent(this.id, 'onchange', () => this.toModel())
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.unwatchAll()
      this.el = null
      removeElRef(this.id)
    } else {
      console.warn(
        'Glue select #', this.id, 'has not installed yet.', this
      )
    }
  }
}
