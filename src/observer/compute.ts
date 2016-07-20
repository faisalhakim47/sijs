import { TObs, subscribeTo } from './dependency'
import { Observable, ObsObject } from './observable'
import { ObsArray } from './observable-array'

export function compute(deps: (TObs[] | TObs), computeFn) {
  const obs = new Observable()

  subscribeTo(deps, (...datas) => {
    const res = computeFn(...datas)
    console.log('res', res)
    obs.set(null, res)
  })

  return obs.get()
}

const o = new Observable()

const a = compute([o.get()], (o) => {
  return o + 2
})

a.watch((val) => console.log('c', a.raw()))

o.set(null, 1)
o.set(null, 2)
o.set(null, 3)
o.set(null, 4)
o.set(null, 5)
