import { Glue, getEl, removeElRef } from './glue'
import { watchEvent } from './event'
import { RouterView } from '../compiler/routerview'
import { GlobalEvent } from '../instance/global-event'
import { ObsObject } from '../observer/observable-object'

export class LinkGlue extends Glue {
  constructor(
    id: string,
    private path: string
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
      watchEvent(this.id, 'onclick', (e) => {
        e.preventDefault()
        RouterView.PATH = this.path
        window.history.pushState({}, null, this.path)
        GlobalEvent.emit('route:change', this.path)
      })
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
}
