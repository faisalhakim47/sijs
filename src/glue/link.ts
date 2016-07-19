import { Glue, getEl, removeElRef } from './glue'
import { watchEvent } from './event'
import { RouterView } from '../compiler/routerview'
import { GlobalEvent } from '../instance/global-event'
import { ObsGetter } from '../observer/observable'

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
      watchEvent(this.id, 'onclick', () => {
        RouterView.PATH = this.path
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
