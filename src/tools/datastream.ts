import { createArray } from './array.js'
import { frameThrottle, throttle } from './throttle.js'

export type Subscriber<Val> = (val: Val) => void
export type Subscription = () => void

export class DataStream<Val> {
  static all<Val>($s: DataStream<Val>[]) {
    const s$ = new DataStream<Val[]>()
    const EMPTY_OBJECT = {} as Val
    const values: Val[] = createArray($s.length)
      .map(() => EMPTY_OBJECT)
    let isResolved = false
    $s.map(($, index) => $.subscribe((val) => {
      values[index] = val
      if (isResolved || (isResolved = values.indexOf(EMPTY_OBJECT) === -1)) {
        s$.emit(values)
      }
    }))
    return s$
  }

  private subscribers: Subscriber<Val>[] = []
  private initValues: Val[]

  emit(val: Val) {
    const length = this.subscribers.length
    for (let index = 0; index < length; index++) {
      this.subscribers[0](val)
    }
    this.initValues.push(val)
  }

  subscribe(subscriber: Subscriber<Val>): Subscription {
    this.subscribers.push(subscriber)
    const length = this.initValues.length
    for (let index = 0; index < length; index++) {
      subscriber(this.initValues[index])
    }
    return () => this.unsubscribe(subscriber)
  }

  unsubscribe(subscriber: Subscriber<Val>) {
    this.subscribers.splice(
      this.subscribers.indexOf(subscriber), 1
    )
  }

  initValue(...vals: Val[]) {
    this.initValues.push(...vals)
    return this
  }

  private pipe<ResVal = Val>(pipeFn: (val: Val, $: DataStream<ResVal>, subscription: Subscription) => void) {
    const $ = new DataStream<ResVal>()
    const unsubscribe = this.subscribe((val) => pipeFn(val, $, unsubscribe))
    return $
  }

  map<ResVal>(mapFn: (val: Val) => ResVal) {
    return this.pipe<ResVal>((val, $) => {
      $.emit(mapFn(val))
    })
  }

  filter(filterFn: (val: Val) => boolean) {
    return this.pipe((val, $) => {
      if (filterFn(val)) $.emit(val)
    })
  }

  take(length: number) {
    return this.pipe((val, $, unsubscribe) => {
      if (--length >= 0) $.emit(val)
      else unsubscribe()
    })
  }

  skip(length: number) {
    return this.pipe((val, $) => {
      if (--length < 0) $.emit(val)
    })
  }

  first() {
    return this.take(1)
  }

  reduce<ResVal>(reduceFn: (res: ResVal, val: Val) => ResVal, seed: ResVal) {
    return this.pipe<ResVal>((val, $) => {
      $.emit(seed = reduceFn(seed, val))
    })
  }

  throttle() {
    return this.pipe(throttle((val, $) => {
      $.emit(val)
    }))
  }

  frameThrottle() {
    return this.pipe(frameThrottle((val, $) => {
      $.emit(val)
    }))
  }
}
