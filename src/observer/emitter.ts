export interface IUnwatcher {
  unwatch: () => void
}

export class Emitter {
  watchers: Map<string, Set<(...data) => void>> = new Map()

  on(name: string, watcher: (...data) => void): IUnwatcher {
    if (!this.watchers.has(name)) {
      this.watchers.set(name, new Set())
    }
    const watchers = this.watchers.get(name)
    watchers.add(watcher)
    return {
      unwatch() {
        watchers.delete(watcher)
      }
    }
  }

  off(name: string, watcher: (...data) => void): void {
    const watchers = this.watchers.get(name)
    if (!watchers) return
    watchers.delete(watcher)
  }

  emit(name: string, ...data) {
    const watchers = this.watchers.get(name)
    if (!watchers) return
    watchers.forEach((watcher) => {
      watcher(...data)
    })
  }
}
