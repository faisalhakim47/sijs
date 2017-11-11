import { AttributeExpression } from '../2_expression/attribute.js'
import { Updater } from './updater.js'

export class EventUpdater extends Updater {
  /**
   * @param {AttributeExpression} expression 
   */
  static filter(expression) {
    return expression.attributeName.slice(0, 2) === 'on'
  }

  /**
   * @param {Element} node 
   * @param {AttributeExpression} expression 
   */
  constructor(node, expression) {
    super()
    this.node = node
    this.eventName = expression.attributeName.slice(2)
    this.oldListener = null
    this.numberOfPart = 1
    this.node.removeAttribute(expression.attributeName)
  }

  /**
   * @param {(event:Event) => void} newListener 
   */
  update(newListener) {
    newListener = newListener[0]
    if (newListener === this.oldListener) return
    if (this.oldListener) this.node.removeEventListener(this.eventName, this.oldListener)
    if (newListener) this.node.addEventListener(this.eventName, newListener)
    this.oldListener = newListener
  }
}
