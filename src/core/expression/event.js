import { Expression } from './expression.js'

export class EventExpression extends Expression {
  /**
   * @param {number} nodeIndex 
   * @param {string} eventName 
   */
  constructor(nodeIndex, eventName) {
    super(nodeIndex)
    this.eventName = eventName
  }
}
