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

export function installGlues(glues: Glue[]) {
  glues.forEach((glue) => glue.install())
}

export function destroyGlues(glues: Glue[]) {
  glues.forEach((glue) => glue.destroy())
}

let activeEvents = {}
let isInstalled = false
export function installEvents(events: string[]) {
  if (!isInstalled) return
  events.forEach((eventName) => {
    activeEvents[eventName] = true
  })
  Object.keys(activeEvents).forEach((eventName) => {
    activeEvents[eventName] = (e) => {
      const target = e.target
      if (target instanceof HTMLElement) {
        GlobalEvent.emit(target.id + ':' + eventName, e)
      }
    }
    window.addEventListener(eventName.slice(2), activeEvents[eventName])
  })
  isInstalled = true
}

export function removeCurrentEvents() {
  Object.keys(activeEvents).forEach((eventName) => {
    window.removeEventListener(eventName.slice(2), activeEvents[eventName])
  })
  activeEvents = {}
  isInstalled = false
}
