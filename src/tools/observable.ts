import { createArray } from './array.js'
import { throttle, frameThrottle } from './throttle.js'

const isSymbolSuppoted = 'Symbol' in window

if (!isSymbolSuppoted) window['Symbol'] = function Symbol(token) {
  return isFn(window['Symbol'])
    ? window['Symbol'][token] || ('@@' + token)
    : ('@@' + token)
}

export interface Observer<Val, ErrVal = Error> {
  next(value: Val)
  error?(errorVal: ErrVal)
  complete?()
}

export class Subscription {
  constructor(
    public unsubscribe: () => void,
    public getClosed = () => false
  ) { }
  // get closed() {
  //   return this.getClosed()
  // }
}

export class SubscriptionObserver<Val, ErrVal = Error> {
  constructor(
    public next: (value: Val) => void,
    public error: (errorValue: ErrVal) => void,
    public complete: () => void,
    public getClosed: () => boolean
  ) { }
  // get closed() {
  //   return this.getClosed()
  // }
}

export type SubscribtionFunction<Val, ErrVal = Error> =
  (observer: SubscriptionObserver<Val, ErrVal>) => ((() => void) | Subscription)

function isFn(testObject) {
  return typeof testObject === 'function'
}

function isObject(testObject) {
  return !!testObject && typeof testObject === 'object'
}

export class BaseObservable<Val, ErrVal = Error> {
  constructor(
    private subscriber: SubscribtionFunction<Val, ErrVal>
  ) { }

  subscribe(
    observer: Observer<Val, ErrVal>
  ): Subscription {
    let isSubscriptionClosed = false
    let cleanup: () => void

    function unsubscribe() {
      if (isSubscriptionClosed) return
      if (isFn(cleanup)) cleanup()
      isSubscriptionClosed = true
    }

    const subscription: Subscription = new Subscription(
      unsubscribe,
      () => isSubscriptionClosed
    )

    const subscribtionObserver = new SubscriptionObserver<Val, ErrVal>(
      (value) => {
        if (isSubscriptionClosed) return
        observer.next(value)
      },
      (errorVal) => {
        unsubscribe()
        if (isFn(observer.error)) observer.error(errorVal)
        else throw errorVal
      },
      () => {
        unsubscribe()
        if (isFn(observer.complete)) observer.complete()
      },
      () => isSubscriptionClosed
    )

    const subscriberResult = this.subscriber(subscribtionObserver)

    if (subscriberResult instanceof Subscription) {
      cleanup = () => subscriberResult.unsubscribe()
    } else {
      cleanup = subscriberResult
    }

    if (isSubscriptionClosed) {
      unsubscribe()
      if (isFn(cleanup)) cleanup()
    }

    return subscription
  }

  [Symbol.observable]() {
    return this
  }
}


export class Observable<Val, ErrVal = Error> extends BaseObservable<Val, ErrVal> {
  static of<Val, ErrVal = Error>(...items) {
    return new Observable<Val, ErrVal>((observer) => {
      const length = items.length
      for (let index = 0; index < length; index++) {
        observer.next(items[index])
      }
      return () => { }
    })
  }

  static from<Val, ErrVal = Error>(object: Observable<Val, ErrVal> | Iterable<Val>) {
    if (Array.isArray(object))
      return new Observable<Val, ErrVal>((observer) => {
        const length = object.length
        for (let index = 0; index < length; index++) {
          observer.next(object[index])
        }
        return () => { }
      })

    if (Symbol.observable in object) {
      const observable: Observable<Val, ErrVal> = object[Symbol.observable]()
      return new Observable<Val, ErrVal>((observer) =>
        observable.subscribe(observer)
      )
    }

    if (object[Symbol.iterator])
      return new Observable((observer) => {
        const iterator: Iterator<Val> = object[Symbol.iterator]()
        let current: IteratorResult<Val>
        do {
          current = iterator.next()
          observer.next(current.value)
        } while (!current.done)
        return () => { }
      })
  }

  static fromPromise<Val>(promise: Promise<Val>) {
    return new Observable((observer) => {
      let isCanceled = false
      promise.then((value) => {
        if (!isCanceled) {
          observer.next(value)
          observer.complete()
        }
      }).catch((errorValue) => {
        if (!isCanceled) observer.error(errorValue)
      })
      return () => isCanceled = true
    })
  }

  static fromEvent<K extends keyof ElementEventMap>(element: Element, eventName: K) {
    return new Observable<ElementEventMap[K]>((observer) => {
      const listener = function listener(event: ElementEventMap[K]) {
        observer.next(event)
      }
      element.addEventListener(eventName, listener)
      return () => element.removeEventListener(eventName, listener)
    })
  }

  static interval(length: number) {
    length += 1
    return new Observable<number>((observer) => {
      for (let index = 1; index < length; index++) {
        observer.next(index)
      }
      return () => { }
    })
  }

  static all<Val, ErrVal = Error>(...observables: Observable<Val, ErrVal>[]) {
    const observablesLength = observables.length
    if (observablesLength === 1) return observables[0].map((val) => [val])
    const EMPTY_VALUE: Val = ({}) as Val
    const values: Val[] = createArray(observablesLength).map(() => EMPTY_VALUE)
    const completes: boolean[] = createArray(observablesLength).map(() => false)
    return new Observable<Val[], ErrVal>((observer) => {
      const subcribtions = observables.map((observable, index) => observable.subscribe({
        next(value) {
          values[index] = value
          if (values.indexOf(EMPTY_VALUE) === -1) {
            observer.next(values)
          }
        },
        error(errorValue) {
          observer.error(errorValue)
        },
        complete() {
          completes[index] = true
          if (completes.indexOf(false) === -1) {
            observer.complete()
          }
        },
      }))
      return () => subcribtions.forEach((subcribtion) => subcribtion.unsubscribe())
    })
  }

  pipe<ResVal = Val>(pipeFn: (val: Val, observer: SubscriptionObserver<ResVal, ErrVal>) => void) {
    return new Observable<ResVal, ErrVal>((observer) => this.subscribe({
      next(value) {
        pipeFn(value, observer)
      },
      error(errorVal) {
        observer.error(errorVal)
      },
      complete() {
        observer.complete()
      },
    }))
  }

  map<ResVal>(fn: (val: Val) => ResVal) {
    return this.pipe<ResVal>(
      (val, observer) => observer.next(fn(val))
    )
  }

  reduce<ResVal>(fn: (result: ResVal, val: Val) => ResVal, seed: ResVal) {
    let result = seed
    return this.pipe<ResVal>(
      (val, observer) => observer.next(result = fn(result, val))
    )
  }

  sum() {
    return this.reduce<number>((result, value) => {
      return result + (value as any as number)
    }, 0)
  }

  filter(fn: (val: Val) => boolean) {
    return this.pipe(
      (value, observer) => {
        if (fn(value)) observer.next(value)
      }
    )
  }

  skip(length: number) {
    return this.pipe((value, observer) => {
      length--
      if (length < 0) observer.next(value)
    })
  }

  take(length: number) {
    return this.pipe((value, observer) => {
      length--
      observer.next(value)
      if (length === 0) observer.complete()
    })
  }

  first() {
    return this.take(1)
  }

  throttle(duration: number = 100) {
    return this.pipe(
      throttle((value, observer) => {
        observer.next(value)
      }, duration)
    )
  }

  frameThrottle() {
    return this.pipe(
      frameThrottle((value, observer) => {
        observer.next(value)
      })
    )
  }
}
