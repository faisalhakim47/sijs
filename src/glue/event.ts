import { Glue } from './glue'
import { GlobalEvent } from '../instance/global-event'
import { is } from '../instance/status'
import { IUnwatcher, Emitter } from '../observer/emitter'

export function watchEvent(id: string, name: string, eventFn) {
  return GlobalEvent.on(id + ':' + name, eventFn)
}

export function unwatchEvent(id: string, name: string, eventFn) {
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
    watchEvent(this.id, this.name, this.eventFn)
  }

  destroy() {
    unwatchEvent(this.id, this.name, this.eventFn)
  }
}
