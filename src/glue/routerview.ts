import { Glue, getEl, removeElRef, installGlues, destroyGlues } from './glue'
import { RouterView } from '../compiler/routerview'
import { GlobalEvent } from '../instance/global-event'

export class RouterViewGlue extends Glue {
  constructor(
    private id: string,
    private rv: RouterView,
    private activeGlues: Glue[]
  ) {
    super()
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
    this.watchers.push(
      GlobalEvent.on('route:change', () => this.routeWatcher())
    )
  }

  destroy() {
    this.unwatchAll()
    this.el = null
    removeElRef(this.id)
  }

  routeWatcher() {
    const e = this.rv.Elem()
    if (this.el.nextElementSibling.hasAttribute(this.id)) {
      destroyGlues(this.activeGlues)
      this.el.parentElement.removeChild(this.el.nextElementSibling)
    }
    this.el.insertAdjacentHTML(
      'afterend', e.template.replace('>', ` ${this.id}>`)
    )
    installGlues(e.glues)
    this.activeGlues = e.glues
  }
}

const instances = {}
