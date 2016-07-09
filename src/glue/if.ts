import { Glue, getEl, removeElRef, installGlues, destroyGlues } from './glue'
import { IElem } from '../compiler/elem'
import { ObsGetter } from '../observer/observable'

export class IfGlue extends Glue {
  helperEl: HTMLElement
  activeGlues: Glue[]
  constructor(
    private id: string,
    private cond: ObsGetter | boolean,
    private elem: () => IElem
  ) {
    super()
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

  install() {
    const cond = this.cond
    this.helperEl = document.getElementById('if' + this.id)
    if (cond instanceof ObsGetter) {
      cond.watch(this.ifWatcher)
    }
    this.isInstalled = true
  }

  destroy() {
    if (!this.isInstalled) return
    const cond = this.cond
    if (cond instanceof ObsGetter) {
      cond.unwatch(this.ifWatcher)
    }
    this.helperEl = null
  }
}
