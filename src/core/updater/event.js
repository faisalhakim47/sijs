import { Updater } from './updater.js'

export class EventUpdater extends Updater {
  /**
   * @param {Element} element
   * @param {AttributeExpression} expression 
   */
  constructor(element, eventName) {
    super()
    this.element = element
    this.eventName = eventName
    /** @type {EventListenerOrEventListenerObject} */
    this.oldListener = null
  }

  /**
   * @param {((event:Event) => void)[]} newListeners 
   */
  init(newListeners) {
    this.element.removeAttribute('on' + this.eventName)
    const newListener = newListeners[0]
    if (newListener) this.element.addEventListener(this.eventName, newListener)
    this.oldListener = newListener
  }

  /**
   * @param {((event:Event) => void)[]} newListeners 
   */
  update(newListeners) {
    const newListener = newListeners[0]
    if (newListener === this.oldListener) return
    if (this.oldListener) this.element.removeEventListener(this.eventName, this.oldListener)
    if (newListener) this.element.addEventListener(this.eventName, newListener)
    this.oldListener = newListener
  }
}
