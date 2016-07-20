import { Glue, getEl, removeElRef } from './glue'
import { ObsObject } from '../observer/observable'

export class StyleGlue extends Glue {
  constructor(
    id: string,
    private name: string,
    private value: ObsObject
  ) {
    super()
    this.id = id
  }

  install() {
    if (!(this.el = getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not been inserted yet.', this
      )
    }
    this.watchers.push(
      this.value.watch((val) => this.styleWatcher(val))
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
    } else {
      console.warn(
        'Glue style #', this.id, 'has not been installed yet.', this
      )
    }
  }

  styleWatcher(val) {
    this.el.style[this.name] = val
  }
}
