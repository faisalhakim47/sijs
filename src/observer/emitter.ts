export interface IWatcher {
  (...data): void
  wi?: number
}

export class Emitter {
  watchers: any = {}

  on(name: string, watcher: IWatcher) {
    const watchers = this.watchers[name]
      ? this.watchers[name]
      : (this.watchers[name] = [])
    watcher.wi = watchers.push(watcher) - 1
  }

  off(name: string, watcher: IWatcher) {
    if (!watcher) {
      console.trace(name, watcher)
    }
    const watchers: IWatcher[] = this.watchers[name]
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
