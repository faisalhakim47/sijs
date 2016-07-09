import { Glue } from './glue'
import { Emitter } from '../observer/emitter'

export const eventBus = new Emitter()

window['_EBE'] = eventBus.emit

export function watchEvent(id: string, name: string, eventFn) {
  return eventBus.on(id + ':' + name, eventFn)
}

export function unwatchEvent(id: string, name: string, eventFn) {
  return eventBus.off(id + ':' + name, eventFn)
}

export class EventGlue extends Glue {
  static context: any = null
  constructor(
    private id: string,
    private name: string,
    private eventFn: () => void
  ) {
    super()
  }
  install() {
    watchEvent(this.id, this.name, this.eventFn)
  }
  destroy() {
    unwatchEvent(this.id, this.name, this.eventFn)
  }
}
