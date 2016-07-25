import { Glue, getEl, removeElRef } from '../index'
import { listenDeps } from '../../observer/dependent'
import { isObserved, parseObsValue, listenObs } from '../../observer/observable'

export class StyleGlue extends Glue {
  constructor(
    id: string,
    private name: string,
    private value
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
    if (isObserved(this.value)) {
      this.listeners.push(listenObs(this.value, () => this.styleListener()))
    } else {
      this.listeners.push(listenDeps(() => this.styleListener()))
    }
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

  styleListener() {
    this.el.style[this.name] = parseObsValue(this.value)
  }
}
