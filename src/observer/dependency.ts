import { ObsGetter } from './observable'
import { ObsArray } from './observable-array'

export function dependsOn(deps: (ObsGetter | ObsArray)[], fn) {
  const Emit = () => {
    fn(...deps.map(dep => dep.val()))
  }

  Emit()

  deps.forEach((dep) => {
    dep.watch(Emit)
  })

  return () => {
    deps.forEach((dep) => {
      dep.unwatch(Emit)
    })
  }
}
