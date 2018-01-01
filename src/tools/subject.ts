import { frameThrottle, throttle } from './throttle.js'
import { createArray } from './array.js'

export type Subscriber<Val> = (value: Val) => void

export type Observer<Val> = (value: Val) => void

export type Subscribtion = () => void

export type Publisher<Val> = (publish: Observer<Val>) => Subscribtion

export class Pipe<Val> {
  static fromEvent<K extends keyof ElementEventMap>(element: Element, eventName: K) {
    return new Pipe<ElementEventMap[K]>((publish) => {
      element.addEventListener(eventName, publish)
      return () => element.removeEventListener(eventName, publish)
    })
  }

  static all<Val>(pipes: Pipe<Val>[]) {
    return pipes[0].combine(...pipes.slice(1))
  }

  static flatten<Val>(pipe$$: Pipe<Pipe<Val>>) {
    return new Pipe<Val>((publish) => {
      let unsubscribes = () => { }
      const unsubscribe = pipe$$.subscribe((pipe$) => {
        unsubscribes()
        unsubscribes = pipe$.subscribe(publish)
      })
      return () => {
        unsubscribe()
        unsubscribes()
      }
    })
  }

  constructor(
    private publisher: Publisher<Val>
  ) { }

  subscribe(subscriber: Observer<Val>) {
    return this.publisher(subscriber)
  }

  map<ResVal>(mapFn: (value: Val) => ResVal) {
    return new Pipe<ResVal>((publish) => this.subscribe((value) => {
      publish(mapFn(value))
    }))
  }

  reduce<ResVal>(reduceFn: (result: ResVal, value: Val) => ResVal, seed: ResVal) {
    return new Pipe<ResVal>((publish) => this.subscribe((value) => {
      publish(seed = reduceFn(seed, value))
    }))
  }

  filter(filterFn: (value: Val) => boolean) {
    return new Pipe<Val>((publish) => this.subscribe((value) => {
      if (filterFn(value)) publish(value)
    }))
  }

  throttle(duration = 100) {
    return new Pipe<Val>((publish) => {
      const throttled = throttle(publish, duration)
      return this.subscribe(throttled)
    })
  }

  frameThrottle() {
    return new Pipe<Val>((publish) => {
      const throttled = frameThrottle(publish)
      return this.subscribe(throttled)
    })
  }

  combine(..._pipes: Pipe<Val>[]) {
    const pipes = [this, ..._pipes]
    return new Pipe<Val[]>((publish) => {
      const EMPTY_VALUE = {} as any
      const values: Val[] = createArray(pipes.length).map(() => EMPTY_VALUE)
      let isResolved = false
      const unsubscribers = pipes.map((pipe$, index) => pipe$.subscribe((value) => {
        values[index] = value
        if (isResolved || (isResolved = (values.indexOf(EMPTY_VALUE) === -1))) {
          publish(values)
        }
      }))
      return () => unsubscribers.forEach(unsubscriber => unsubscriber())
    })
  }
}

window['subscriberCount'] = 0

const subCollections: Subscribtion[][] = []

export function collectSubscribtions(fn: Function) {
  const subCollection: Subscribtion[] = []
  subCollections.push(subCollection)
  fn()
  subCollections.splice(
    subCollections.indexOf(subCollection), 1
  )
  return subCollection
}

const subjects: Subject<any>[] = []

export class Subject<Val> extends Pipe<Val> {
  private subscribers: Subscriber<Val>[] = []
  private lastValue: Val

  constructor(initValue: Val) {
    super(null)
    this.lastValue = initValue
    subjects.push(this)
  }

  subscribe(subscriber: Subscriber<Val>): Subscribtion {
    const index = this.subscribers.indexOf(subscriber)
    if (index === -1) {
      this.subscribers.push(subscriber)
      subscriber(this.lastValue)
    }

    window['subscriberCount']++

    const subscribtion: Subscribtion = () => {
      const index = this.subscribers.indexOf(subscriber)
      if (index !== -1) this.subscribers.splice(index, 1)
      window['subscriberCount']--
    }

    subCollections.forEach((subCollection) => {
      subCollection.push(subscribtion)
    })

    return subscribtion
  }

  emit(value: ((value: Val) => Val) | Val) {
    if (typeof value === 'function') {
      value = value(this.lastValue)
    }
    this.subscribers.forEach((subscriber) => {
      subscriber(value as Val)
    })
    this.lastValue = value
  }
}

window['subjects'] = subjects
