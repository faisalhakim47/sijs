import { Glue, getEl, removeElRef } from '../index'
import { listenToEvent } from './event'
import { RouterView } from '../../compiler/routerview'
import { GlobalEvent } from '../../instance/global-event'
import { parseObsValue } from '../../observer/observable'

export class LinkGlue extends Glue {
  constructor(
    public id: string,
    private path: string
  ) {
    super()
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not inserted yet.', this
      )
    }
    this.listeners.push(
      listenToEvent(this.id, 'onclick', (e) => {
        e.preventDefault()
        RouterView.PATH = parseObsValue(this.path)
        window.history.pushState({}, null, RouterView.PATH)
        GlobalEvent.emit('route:change', RouterView.PATH)
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
