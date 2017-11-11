import { Expression } from './expression.js'
import { MARKER } from '../../constant.js'

export class ElementExpression extends Expression {
  /**
   * @param {Attr} attribute 
   */
  static filter(attribute) {
    return attribute.name === MARKER
  }

  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    super(nodeIndex)
  }
}
