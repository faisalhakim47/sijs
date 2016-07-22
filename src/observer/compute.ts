import { TObs, subscribeTo } from './dependency'
import { Observable } from './observable'
import { ObsArray } from './observable-array'
import { ObsObject } from './observable-object'

export function compute(deps: (TObs[] | TObs), computeFn: Function) {
  const obs = new Observable()

  subscribeTo(deps, (...datas) => {
    obs.set(null, computeFn(...datas))
  })

  return obs.get()
}

export function run(runFn: Function, deps: (TObs[] | TObs)) {
  return compute(deps, runFn)
}

export const apply = run //alias
