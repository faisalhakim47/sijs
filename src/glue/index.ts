import { CompilerStateConstructor } from '../compiler/index'
import { IListener } from '../observer/emitter'
import { GlobalEvent } from '../instance/global-event'

export abstract class Glue {
  id: string
  el: HTMLElement
  isInstalled: boolean = false
  listeners: IListener[] = []
  teardown() {
    this.listeners.forEach(
      (listener) => listener.unlist()
    )
    this.listeners = []
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

export function installState({ glues, events, hooks }: CompilerStateConstructor, installDOM: Function) {
  hooks.beforeInstall.forEach((fn) => fn())
  hooks.beforeInstall = []

  installDOM()

  glues.forEach((glue) => glue.install())
  addEvents(events)

  hooks.afterInstall.forEach((fn) => fn())
  hooks.afterInstall = []
}

export function destroyState({ glues, hooks }: CompilerStateConstructor, removeDOM: Function) {
  hooks.beforeDestroy.forEach((fn) => fn())
  hooks.beforeDestroy = []

  removeDOM()

  glues.forEach((glue) => glue.destroy())
  glues = []

  hooks.afterDestroy.forEach((fn) => fn())
  hooks.afterDestroy = []
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
