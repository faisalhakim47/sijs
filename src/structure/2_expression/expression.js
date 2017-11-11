import { List } from '../../tools/list.js'

export class Expression {
  filter() { }

  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    this.nodeIndex = nodeIndex
  }
}

const expressionList = new List()

/**
 * @param {number} nodeTypeBase
 * @return {(typeof Expression)[]}
 */
export function getExpressionsFor(nodeTypeBase) {
  return expressionList.get(nodeTypeBase)
}

/**
 * @param {number} nodeTypeBase
 * @param {typeof Expression} expressionBase
 */
export function addExpressionFor(nodeTypeBase, expressionBase) {
  const directives = getExpressionsFor(nodeTypeBase)
  if (Array.isArray(directives)) directives.push(expressionBase)
  else expressionList.set(nodeTypeBase, [expressionBase])
}
