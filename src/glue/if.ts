import { Glue, getEl, removeElRef, addEvents, installGlues, destroyGlues } from './glue'
import { Elem } from '../compiler/elem'
import { ObsObject } from '../observer/observable'

export class IfGlue extends Glue {
  helperEl: HTMLElement
  activeGlues: Glue[]
  constructor(
    id: string,
    private cond: ObsObject | boolean,
    private elem: () => Elem
  ) {
    super()
    this.id = id
  }

  install() {
    const cond = this.cond
    this.helperEl = document.getElementById('if' + this.id)
    if (cond instanceof ObsObject) {
      this.watchers.push(
        cond.watch((val) => this.ifWatcher(val))
      )
    }
    this.isInstalled = true
  }

  destroy() {
    if (!this.isInstalled) return
    const cond = this.cond
    if (cond instanceof ObsObject) {
      this.teardown()
    }
    this.helperEl = null
  }

  ifWatcher(cond) {
    if (cond && !this.isExist()) {
      const e = this.elem()
      this.helperEl.insertAdjacentHTML('afterend', e.template)
      installGlues(e.glues)
      addEvents(e.events)
      e.afterInstallFns.forEach((fn) => fn())
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
