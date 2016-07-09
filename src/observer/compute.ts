import { dependsOn } from './dependency'
import { Observable, ObsGetter } from './observable'
import { ObsArray } from './observable-array'

export function compute(deps: (ObsGetter | ObsArray)[], computeFn) {
  const obs = new Observable()
  dependsOn(deps, (...datas) => {
    obs.set(null, computeFn(...datas))
  })
  return obs
}
