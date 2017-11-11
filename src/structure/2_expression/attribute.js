import { Expression } from './expression.js'
import { MARKER } from '../../constant.js'

export class AttributeExpression extends Expression {
  /**
   * @param {Attr} attribute 
   */
  static filter(attribute) {
    return attribute.value.indexOf(MARKER) !== -1
  }

  /**
   * @param {number} nodeIndex
   * @param {Attr} attribute 
   */
  constructor(nodeIndex, attribute) {
    super(nodeIndex)
    this.attributeName = attribute.name
    this.staticParts = attribute.value.split(MARKER)
  }
}
