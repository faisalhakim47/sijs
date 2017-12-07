import { Directive } from '../../core/updater/content/directive.js'
import { ContentUpdater } from '../../core/updater/content/content.js'

/** @typedef {(value) => void} Subscriber */

/**
 * @param {ValueStream} value$
 */
export function observe(value$) {
  return new Observe(value$)
}

class Observe extends Directive {
  /**
   * @param {ValueStream} value$ 
   */
  constructor(value$) {
    super()
    this.value$ = value$
  }

  /**
   * @param {ContentUpdater} updater
   */
  update(updater) {
    if (typeof updater.oldValue === 'function') {
      updater.oldValue()
    }
    const subscribtion = this.value$.subscribe((litTag) => {
      updater.update([litTag])
    })
    return subscribtion
  }
}

/**
 * @template Val
 */
export class ValueStream {
  /**
   * @param {Val} value 
   */
  constructor(value) {
    this.value = value
    /** @type {Subscriber[]} */
    this.subscribers = []
  }

  /**
   * @param {Subscriber} subscriber 
   */
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
    subscriber(this.value)
    return () => this.subscribers.splice(
      this.subscribers.indexOf(subscriber), 1
    )
  }

  /**
   * @param {Subscriber} subscriber 
   */
  map(mapper) {
    const stream = new ValueStream()
    this.subscribe((val) => {
      stream.emit(mapper(val))
    })
    return stream
  }

  /**
   * @param {Val} value 
   */
  emit(value) {
    this.value = value
    const length = this.subscribers.length
    for (let index = 0; index < length; index++)
      this.subscribers[index](value)
  }
}
