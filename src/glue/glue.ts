import { IUnwatcher } from '../observer/emitter'

export abstract class Glue {
  el: HTMLElement
  isInstalled: boolean = false
  watchers: IUnwatcher[] = []
  unwatchAll() {
    this.watchers.forEach(
      (watcher) => watcher.unwatch()
    )
    this.watchers = []
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
