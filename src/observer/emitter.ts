export interface IUnwatcher {
  unwatch: () => void
}

export class Emitter {
  // watchers: Map<string, Set<(...data) => void>> = new Map()
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

  // on(name: string, watcher: (...data) => void): IUnwatcher {
  //   if (!this.watchers.has(name)) {
  //     this.watchers.set(name, new Set())
  //   }
  //   const watchers = this.watchers.get(name)
  //   watchers.add(watcher)
  //   return {
  //     unwatch() {
  //       watchers.delete(watcher)
  //     }
  //   }
  // }

  // off(name: string, watcher: (...data) => void): void {
  //   const watchers = this.watchers.get(name)
  //   if (!watchers) return
  //   watchers.delete(watcher)
  // }

  // emit(name: string, ...data) {
  //   const watchers = this.watchers.get(name)
  //   if (!watchers) return
  //   watchers.forEach((watcher) => {
  //     watcher(...data)
  //   })
  // }
}
