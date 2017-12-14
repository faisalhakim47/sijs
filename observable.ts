if (!Symbol.observable) Symbol.observable = Symbol('@@observable')

export interface Observer<Val, ErrVal> {
  // Receives the subscription object when `subscribe` is called
  start?(subscription: Subscription)
  // Receives the next value in the sequence
  next(value: Val)
  // Receives the sequence error
  error?(errorVal: ErrVal)
  // Receives a completion notification
  complete?()
}

export class Subscription {
  constructor(
    public unsubscribe: () => void,
    public getClosed = () => false
  ) { }
  get closed() {
    return this.getClosed()
  }
}

export class SubscriptionObserver<Val, ErrVal> {
  constructor(
    // Sends the next value in the sequence
    public next: (value: Val) => void,
    // Sends the sequence error
    public error: (errorValue: ErrVal) => void,
    // Sends the completion notification
    public complete: () => void,
    // A boolean value indicating whether the subscription is closed
    public getClosed: () => boolean
  ) { }
  get closed() {
    return this.getClosed()
  }
}

export type SubscribtionFunction<Val, ErrVal> =
  (observer: SubscriptionObserver<Val, ErrVal>) => (() => void | Subscription)

function isFn(testObject) {
  return typeof testObject === 'function'
}

export class Observable<Val, ErrVal> {
  static of(...items) {
    const Obs = isFn(this) ? this : Observable
    return new Obs((observer) => {
      const length = items.length
      for (let index = 0; index < length; index++) {
        observer.next(items[index])
      }
      return () => { }
    })
  }

  static from(any) {
    if (any == undefined) throw new TypeError()
    const Obs = isFn(this) ? this : Observable
    if (Array.isArray(any)) {
      return Observable.of(...any)
    }
    return new Obs((observer) => {
      if (any instanceof Observable) {
        const subscribtion = any.subscribe(observer)
        return () => subscribtion.unsubscribe()
      }
      return () => { }
    })
  }

  constructor(
    private subscriber: SubscribtionFunction<Val, ErrVal>
  ) { }

  subscribe(
    observerOrNext: Observer<Val, ErrVal>,
    errorFn?: (errorValue: ErrVal) => void,
    completeFn?: () => void
  ): Subscription {
    let status = 2
    let cleanup = () => { }
    let observer: Observer<Val, ErrVal> = {
      next() { }
    }

    if (typeof observerOrNext === 'function') {
      observer.next = observerOrNext
      observer.error = errorFn
      observer.complete = completeFn
    } else observer = observerOrNext

    const subscribtionObserver = new SubscriptionObserver<Val, ErrVal>(
      (value) => {
        if (isFn(observer.next)) observer.next(value)
      },
      (errorVal) => {
        status = 1
        unsubscribe()
        if (isFn(observer.error)) observer.error(errorVal)
        else throw errorVal
      },
      () => {
        status = 0
        unsubscribe()
        if (isFn(observer.complete)) observer.complete()
      },
      () => {
        return status !== 2
      }
    )

    try {
      cleanup = this.subscriber(subscribtionObserver)
    } catch (error) {
      subscribtionObserver.error(error)
    }

    if (!cleanup) cleanup = () => { }
    else if (isFn(cleanup['unsubscribe'])) cleanup = cleanup['unsubscribe']

    if (status !== 2 && isFn(cleanup)) {
      unsubscribe()
    }

    function unsubscribe() {
      if (status === 2) return status = -1
      if (isFn(cleanup)) cleanup()
    }

    const subscription: Subscription = new Subscription(
      unsubscribe,
      () => status !== 2
    )

    if (isFn(observer.start)) {
      observer.start(subscription)
    }

    return subscription
  }

  [Symbol.observable]() {
    return this
  }
}
