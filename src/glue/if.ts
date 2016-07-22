import { Glue, getEl, removeElRef, addEvents, installElem, destroyElem } from './glue'
import { Elem } from '../compiler/elem'
import { ObsObject } from '../observer/observable-object'

export class IfGlue extends Glue {
  helperEl: HTMLElement
  activeElem: Elem
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
      installElem(e, (template) => {
        this.helperEl.insertAdjacentHTML('afterend', template)
      })
      addEvents(e.events)
      this.activeElem = e
    } else if (!cond && this.isExist()) {      
      destroyElem(this.activeElem, () => {
        this.helperEl.parentElement.removeChild(
          this.helperEl.nextElementSibling
        )
      })
      this.activeElem = null
    }
  }

  isExist() {
    return this.helperEl.nextElementSibling.id === this.id
  }
}
