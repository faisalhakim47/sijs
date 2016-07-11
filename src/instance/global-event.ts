import { is } from './status'
import { Emitter } from '../observer/emitter'
import { resetObsId } from '../observer/observable'
import { resetElemId } from '../compiler/uid'

export const GlobalEvent = new Emitter()

if (is.browser) {
  const addEvent = (name, eventFn) => {
    window.addEventListener(name, eventFn)
  }
  addEvent('popstate', (e) => {
    GlobalEvent.emit('browser:popstate', e)
  })
  addEvent('online', (e) => {
    GlobalEvent.emit('browser:online', e)
  })
  addEvent('offline', (e) => {
    GlobalEvent.emit('browser:offline', e)
  })
}

GlobalEvent.on('resetIds', () => {
  resetObsId()
  resetElemId()
})
