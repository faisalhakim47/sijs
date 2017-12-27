import { createArray } from './array.js'
import { frameThrottle, throttle } from './throttle.js'

export type Subscriber<Val> = (value: Val) => void
export type Subscription = () => void

const EMPTY_VALUE = {} as any

export class DataStream<Val> {
  static all<Val>(data$s: DataStream<Val>[]) {
    const datas$ = new DataStream<Val[]>()
    const EMPTY_OBJECT = {} as Val
    const values: Val[] = createArray(data$s.length)
      .map(() => EMPTY_OBJECT)
    let isResolved = false
    data$s.map((data$, index) => data$.subscribe((value) => {
      values[index] = value
      if (isResolved || (isResolved = values.indexOf(EMPTY_OBJECT) === -1)) {
        datas$.emit(values)
      }
    }))
    return datas$
  }

  private subscribers: Subscriber<Val>[] = []
  private latestValue: Val = EMPTY_VALUE
  // private isDebuging = false

  // trace() {
  //   this.isDebuging = true
  //   return this
  // }

  emit(value: Val | ((value: Val) => Val)) {
    if (typeof value === 'function') {
      value = value(this.latestValue)
    }
    const length = this.subscribers.length
    // if (this.isDebuging) console.log('emit', this.latestValue)
    for (let index = 0; index < length; index++) {
      this.subscribers[index](value)
    }
    this.latestValue = value
  }

  subscribe(subscriber: Subscriber<Val>): Subscription {
    this.subscribers.push(subscriber)
    if (this.latestValue !== EMPTY_VALUE) subscriber(this.latestValue)
    // if (this.isDebuging) console.log('subscribe', this.latestValue)
    return () => this.unsubscribe(subscriber)
  }

  unsubscribe(subscriber: Subscriber<Val>) {
    this.subscribers.splice(
      this.subscribers.indexOf(subscriber), 1
    )
  }

  initValue(value: Val) {
    this.latestValue = value
    // if (this.isDebuging) console.log('init', value)
    return this
  }

  pipe(data$: DataStream<Val>) {
    return this.subscribe((value) => data$.emit(value))
  }

  map<ResVal>(mapFn: (val: Val) => ResVal) {
    return this.pipeMap<ResVal>((value, data$) => {
      data$.emit(mapFn(value))
    })
  }

  filter(filterFn: (value: Val) => boolean) {
    return this.pipeMap((value, data$) => {
      if (filterFn(value)) data$.emit(value)
    })
  }

  take(length: number) {
    return this.pipeMap((value, data$, unsubscribe) => {
      if (--length >= 0) data$.emit(value)
      else unsubscribe()
    })
  }

  skip(length: number) {
    return this.pipeMap((value, data$) => {
      if (--length < 0) data$.emit(value)
    })
  }

  first() {
    return this.take(1)
  }

  reduce<ResVal>(reduceFn: (result: ResVal, value: Val) => ResVal, seed: ResVal) {
    return this.pipeMap<ResVal>((value, data$) => {
      data$.emit(seed = reduceFn(seed, value))
    })
  }

  throttle() {
    return this.pipeMap(throttle((value, data$) => {
      data$.emit(value)
    }))
  }

  frameThrottle() {
    return this.pipeMap(frameThrottle((value, data$) => {
      data$.emit(value)
    }))
  }

  private pipeMap<ResVal = Val>(pipeFn: (value: Val, data$: DataStream<ResVal>, subscription: Subscription) => void) {
    const data$ = new DataStream<ResVal>()
    let unsubscribed = false
    let unsubscribe = () => { unsubscribed = true }
    const subscription = this.subscribe((value) => pipeFn(value, data$, unsubscribe))
    unsubscribe = () => setTimeout(() => subscription())
    if (unsubscribed) unsubscribe()
    return data$
  }
}
