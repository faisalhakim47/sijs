import { Updater } from './updater.js'

export class EventUpdater extends Updater {
  /**
   * @param {Element} node
   * @param {AttributeExpression} expression 
   */
  constructor(node, eventName) {
    super()
    this.node = node
    this.eventName = eventName
    this.oldListener = null
    node.removeAttribute('on' + eventName)
  }

  /**
   * @param {((event:Event) => void)[]} newListener 
   */
  init(newListener) {
    newListener = newListener[0]
    if (newListener) this.node.addEventListener(this.eventName, newListener)
    this.oldListener = newListener
  }

  /**
   * @param {((event:Event) => void)[]} newListener 
   */
  update(newListener) {
    newListener = newListener[0]
    if (newListener === this.oldListener) return
    if (this.oldListener) this.node.removeEventListener(this.eventName, this.oldListener)
    if (newListener) this.node.addEventListener(this.eventName, newListener)
    this.oldListener = newListener
  }
}
