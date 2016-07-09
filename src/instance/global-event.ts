import is from './status'
import { Emitter } from '../observer/emitter'
import { Router } from '../router/router'

export const GlobalEvent = new Emitter()

if (is.browser) {
  const addEvent = (name, eventFn) => {
    window.addEventListener(name, eventFn)
  }
  addEvent('popstate', (e) => {
    Router.generateRoute(window.location.pathname + window.location.search)
    GlobalEvent.emit('browser:popstate', e)
  })
  addEvent('online', (e) => {
    GlobalEvent.emit('browser:online', e)
  })
  addEvent('offline', (e) => {
    GlobalEvent.emit('browser:offline', e)
  })
}
