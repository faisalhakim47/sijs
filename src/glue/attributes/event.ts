import { Glue } from '../index'
import { GlobalEvent } from '../../instance/global-event'
import { status } from '../../instance/status'
import { IListener, Emitter } from '../../observer/emitter'

export function listenToEvent(id: string, name: string, eventFn) {
  return GlobalEvent.on(id + ':' + name, eventFn)
}

export function unlistEvent(id: string, name: string, eventFn) {
  return GlobalEvent.off(id + ':' + name, eventFn)
}

export class EventGlue extends Glue {
  static context: any = null

  constructor(
    id: string,
    private name: string,
    private eventFn: () => void
  ) {
    super()
    this.id = id
  }

  install() {
    listenToEvent(this.id, this.name, this.eventFn)
  }

  destroy() {
    unlistEvent(this.id, this.name, this.eventFn)
  }
}
