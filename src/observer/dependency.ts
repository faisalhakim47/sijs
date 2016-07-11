import { ObsGetter } from './observable'
import { ObsArray } from './observable-array'

export function dependsOn(deps: (ObsGetter | ObsArray)[], fn) {
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
      watchers.forEach(watcher => watcher.unwatch())
    }
  }
}
