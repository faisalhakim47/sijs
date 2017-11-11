import { Expression } from './expression.js'
import { MARKER } from '../../constant.js'

export class AttributeExpression extends Expression {
  /**
   * @param {number} nodeIndex
   * @param {string} attributeName 
   * @param {string[]} staticParts 
   */
  constructor(nodeIndex, attributeName, staticParts) {
    super(nodeIndex)
    this.attributeName = attributeName
    this.staticParts = staticParts
  }
}
