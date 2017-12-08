import { Directive } from '../../core/updater/content/directive.js'
import { ContentUpdater } from '../../core/updater/content/content.js'

export type Subscriber = (value) => void

export function observe<Val>(value$: ValueStream<Val>) {
  return new Observe<Val>(value$)
}

export class Observe<Val> extends Directive {
  constructor(
    private value$: ValueStream<Val>
  ) { super() }

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

export class ValueStream<Val> {
  subscribers: Subscriber[] = []
  
  constructor(
    private value?: Val
  ) { }

  subscribe(subscriber: Subscriber) {
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
