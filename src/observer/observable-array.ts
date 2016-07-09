import { Emitter } from './emitter'
import { Observable, Filters, ObsGetter } from './observable'
import { compute } from './compute'
import { get, set } from '../tools/object'

export class ObsArray {
  private rawItems: any[]
  private obsItems: Observable[]
  private EE: Emitter

  constructor(
    private baseData = { _dummy: [] },
    private basePath = '_dummy'
  ) {
    const rawItems = get(baseData, basePath)
    if (rawItems.undefined) {
      throw new Error('cannot create on undefined path')
    } else if (!Array.isArray(this.obsItems)) {
      throw new Error('cannot create on non-Array path')
    }
    this.rawItems = rawItems
    this.obsItems = this.rawItems.map((item, i) => {
      return new Observable(rawItems, i.toString())
    })
    this.EE = new Emitter()
  }

  length() {
    return this.obsItems.length
  }

  get(index: number) {
    return this.obsItems[index]
  }

  getAll() {
    return this.obsItems
  }

  val() { // alias
    return this.obsItems
  }

  set(index: number, value) {
    this.obsItems[index].set(null, value)
  }

  pop() {
    const val = this.rawItems.pop()
    this.obsItems.pop()
    this.EE.emit('remove', {
      index: this.obsItems.length
    })
    this.EE.emit('change')
    return val
  }

  push(val) {
    const r = this.rawItems.push(val)
    const index = this.rawItems.length - 1
    val = new Observable(this.rawItems, index.toString())
    this.obsItems.push(val)
    this.EE.emit('add', { index, val })
    this.EE.emit('change')
    return r
  }

  shift() {
    const val = this.rawItems.shift()
    this.obsItems.shift()
    this.EE.emit('remove', { index: 0 })
    this.EE.emit('change')
    return val
  }

  unshift(val) {
    const r = this.rawItems.unshift(val)
    val = new Observable(this.rawItems, '0')
    this.obsItems.unshift(val)
    this.EE.emit('add', { index: 0, val })
    this.EE.emit('change')
    return r
  }

  splice(start: number, delCount: number, ...vals) {
    const d = this.rawItems.splice(start, delCount, ...vals)
    for (let i = delCount; i--;) {
      this.EE.emit('remove', { index: start + i })
    }
    this.obsItems.splice(start, delCount, ...vals.map((val, i) => {
      const index = start + i
      val = new Observable(this.rawItems, index.toString())
      this.EE.emit('add', { index, val })
      return val
    }))
    this.EE.emit('change')
    return d
  }

  filter(
    deps: (ObsGetter | ObsArray)[],
    filterFn: (item, index: number, ...val) => boolean
  ) {
    deps.push(this)
    const obs = compute(deps, (...data) => {
      return this.obsItems.filter((item, i) => filterFn(item, i, ...data))
    })
    return obs
  }

  watch(p1: (() => any) | string, p2?: (...dat) => any) {
    if (typeof p1 === 'string') {
      this.EE.on(p1, p2)
    } else {
      this.EE.on('change', p1)
    }
  }

  unwatch(p1: (() => any) | string, p2?: (...dat) => any) {
    if (typeof p1 === 'string') {
      this.EE.off(p1, p2)
    } else {
      this.EE.off('change', p1)
    }
  }
}
