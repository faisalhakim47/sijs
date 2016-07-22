import { Elem } from '../compiler/elem'
import { IUnwatcher } from '../observer/emitter'
import { GlobalEvent } from '../instance/global-event'

export abstract class Glue {
  id: string
  el: HTMLElement
  isInstalled: boolean = false
  watchers: IUnwatcher[] = []
  teardown() {
    this.watchers.forEach(
      (watcher) => watcher.unwatch()
    )
    this.watchers = []
    this.el = null
    removeElRef(this.id)
    this.isInstalled = false
  }
  abstract install(): void
  abstract destroy(): void
}

const elReference = {}

export function getEl(id: string): HTMLElement {
  if (!elReference[id]) {
    elReference[id] = {
      refCount: 1,
      el: document.getElementById(id)
    }
  } else {
    elReference[id].refCount++
  }
  return elReference[id].el
}

export function removeElRef(id: string): void {
  const ref = elReference[id]
  if (ref) {
    ref.refCount--
    if (ref.refCount === 0) {
      elReference[id] = null
    }
  } else {
    console.warn('#', id, 'have not been referenced yet.')
  }
}

export function installElem(e: Elem, installDOM: (template: string) => void) {
  e.hooks.beforeInstall.forEach((fn) => fn())
  e.hooks.beforeInstall = []

  installDOM(e.template)
  e.template = ''

  e.glues.forEach((glue) => glue.install())
  addEvents(e.events)

  e.hooks.afterInstall.forEach((fn) => fn())
  e.hooks.afterInstall = []
}

export function destroyElem(e: Elem, removeDOM: Function) {
  e.hooks.beforeDestroy.forEach((fn) => fn())
  e.hooks.beforeDestroy = []

  removeDOM()

  e.glues.forEach((glue) => glue.destroy())
  e.glues = []

  e.hooks.afterDestroy.forEach((fn) => fn())
  e.hooks.afterDestroy = []
}

let activeEvents = {}
export function addEvents(events: string[]) {
  events.forEach((eventName) => {
    if (!(activeEvents[eventName] instanceof Function)) {
      activeEvents[eventName] = true
    }
  })
  Object.keys(activeEvents).forEach((eventName) => {
    if (activeEvents[eventName] instanceof Function) {
      return
    }
    activeEvents[eventName] = (e) => {
      const target = e.target
      if (target.id) {
        GlobalEvent.emit(target.id + ':' + eventName, e)
      }
    }
    window.addEventListener(eventName.slice(2), activeEvents[eventName])
  })
}

export function removeCurrentEvents() {
  Object.keys(activeEvents).forEach((eventName) => {
    window.removeEventListener(eventName.slice(2), activeEvents[eventName])
  })
  activeEvents = {}
}
