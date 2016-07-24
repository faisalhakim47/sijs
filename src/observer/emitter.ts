export interface IWatcher {
  unwatch: () => void
}

export class Emitter {
  watchers: {
    [name: string]: Set<Function>
  } = {}

  on(name: string, watcher: Function): IWatcher {
    const watchers = this.watchers[name]
      ? this.watchers[name]
      : (this.watchers[name] = new Set())
    watchers.add(watcher)
    return { unwatch: () => this.off(name, watcher) }
  }

  off(name: string, watcher: Function) {
    const watchers = this.watchers[name]
    if (!watchers) return
    return watchers.delete(watcher)
  }

  emit(name: string, ...data) {
    const watchers = this.watchers[name]
    if (!watchers) return
    watchers.forEach(watcher => watcher(...data))
  }
}
