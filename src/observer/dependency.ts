import { ObsObject } from './observable-object'
import { ObsArray } from './observable-array'

export type TObs = ObsObject | ObsArray

export function subscribeTo(dep: (TObs[] | TObs), fn) {
  let deps: TObs[]

  // Syntatic sugar
  if (Array.isArray(dep)) {
    deps = dep
  } else {
    deps = [dep]
  }

  // Emit function
  const Emit = () => {
    fn(...deps.map(dep => dep.val()))
  }

  Emit()

  const watchers = []
  deps.forEach((dep) => {
    watchers.push(dep.watch(Emit))
  })

  return {
    unwatch() {
      watchers.forEach((watcher) => watcher.unwatch())
    }
  }
}
