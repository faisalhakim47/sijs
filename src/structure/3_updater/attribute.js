import { Updater } from './updater.js'
import { AttributeExpression } from '../2_expression/attribute.js'

export class AttributeUpdater extends Updater {
  static filter() { return true }

  /**
   * @param {Node} node 
   * @param {AttributeExpression} expression
   */
  constructor(node, expression) {
    super()
    this.node = node
    this.attributeName = expression.attributeName
    this.staticParts = expression.staticParts
    /* @type {string[]}  */
    this.oldValues = []
    this.numberOfPart = staticParts.length - 1
  }

  /**
   * @param {string[]} newValues 
   */
  update(newValues) {
    if (newValues.findIndex((newValue, index) => {
      return newValue !== this.oldValues[index]
    }) === -1) return
    let newValueIndex = 0
    const lastPartIndex = this.numberOfPart
    const value = this.staticParts.map((staticPart, index) => {
      if (index === lastPartIndex) return staticPart
      return staticPart + newValues[newValueIndex++]
    }).join('')
    this.node.setAttribute(this.attributeName, value)
    this.oldValues = newValues
  }
}
