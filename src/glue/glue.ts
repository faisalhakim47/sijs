export abstract class Glue {
  el: HTMLElement
  isInstalled: boolean = false
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
  return elReference[id]
}

export function removeElRef(id: string): void {
  const ref = elReference[id]
  if (ref) {
    ref.refCount--
    if (ref.refCount === 0) {
      elReference[id] = null
    }
  } else {
    console.warn('removeRef error:', id)
  }
}

export function installGlues(glues: Glue[]) {
  glues.forEach((glue) => glue.install())
}

export function destroyGlues(glues: Glue[]) {
  glues.forEach((glue) => glue.destroy())
}
