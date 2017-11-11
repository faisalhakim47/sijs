import { Expression } from './expression.js'

export class ContentExpression extends Expression {
  static filter() {
    return true
  }

  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    super(nodeIndex)
  }
}
