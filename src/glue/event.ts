import { Glue } from './glue'
import { is } from '../instance/status'
import { IUnwatcher, Emitter } from '../observer/emitter'

export const eventBus = new Emitter()

if (is.browser) {
  window['_E'] = (code: string) => {
    eventBus.emit(code)
  }
  console.log('create _E', window['_E'])
}

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
