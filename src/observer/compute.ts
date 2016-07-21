import { TObs, subscribeTo } from './dependency'
import { Observable, ObsObject } from './observable'
import { ObsArray } from './observable-array'

export function compute(deps: (TObs[] | TObs), computeFn) {
  const obs = new Observable()

  subscribeTo(deps, (...datas) => {
    obs.set(null, computeFn(...datas))
  })

  return obs.get()
}
