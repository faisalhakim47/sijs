import { Glue, getEl, removeElRef, installGlues, destroyGlues } from './glue'
import { IElem } from '../compiler/elem'
import { ObsGetter } from '../observer/observable'

export class IfGlue extends Glue {
  helperEl: HTMLElement
  activeGlues: Glue[]
  constructor(
    id: string,
    private cond: ObsGetter | boolean,
    private elem: () => IElem
  ) {
    super()
    this.id = id
  }

  install() {
    const cond = this.cond
    this.helperEl = document.getElementById('if' + this.id)
    if (cond instanceof ObsGetter) {
      this.watchers.push(
        cond.watch((val) => this.ifWatcher(val))
      )
    }
    this.isInstalled = true
  }

  destroy() {
    if (!this.isInstalled) return
    const cond = this.cond
    if (cond instanceof ObsGetter) {
      this.teardown()
    }
    this.helperEl = null
  }

  ifWatcher(cond) {
    if (cond && !this.isExist()) {
      const e = this.elem()
      this.helperEl.insertAdjacentHTML('afterend', e.template)
      installGlues(e.glues)
      this.activeGlues = e.glues
    } else if (!cond && this.isExist()) {
      this.helperEl.parentElement.removeChild(
        this.helperEl.nextElementSibling
      )
      destroyGlues(this.activeGlues)
      this.activeGlues = []
    }
  }

  isExist() {
    return this.helperEl.nextElementSibling.id === this.id
  }
}
