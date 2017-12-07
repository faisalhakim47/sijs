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
    this.currentListener = null
  }

  /**
   * @param {((event:Event) => void)[]} newListeners 
   */
  init(newListeners) {
    this.currentListener = newListeners[0]
    this.element.removeAttribute('on' + this.eventName)
    this.element.addEventListener(this.eventName, (event) => {
      this.currentListener(event)
    })
  }

  /**
   * @param {((event:Event) => void)[]} newListeners 
   */
  update(newListeners) {
    this.currentListener = newListeners[0]
  }
}
