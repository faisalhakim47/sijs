export interface IUnwatcher {
  unwatch: () => void
}

export class Emitter {
  watchers = {}

  on(name: string, watcher): IUnwatcher {
    const watchers = this.watchers[name]
      ? this.watchers[name]
      : (this.watchers[name] = [])
    watcher.wi = watchers.push(watcher) - 1
    return {
      unwatch: () => this.off(name, watcher)
    }
  }

  off(name: string, watcher) {
    const watchers = this.watchers[name]
    if (!Array.isArray(watchers)) return
    if (typeof watcher.wi === 'number') {
      watchers.splice(watcher.wi, 1)
    } else {
      console.warn(watcher, 'does not contain watcher index (wi)')
    }
  }

  emit(name: string, ...data) {
    const watchers = this.watchers[name]
    if (!watchers) return
    let l = watchers.length
    while (l--) {
      watchers[l](...data)
    }
  }
}
