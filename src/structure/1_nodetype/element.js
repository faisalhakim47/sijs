import { NodeType } from './nodetype.js'

export class ElementNodeType extends NodeType {
  /**
   * @param {Node} node 
   */
  static filter(node) {
    return node.nodeType === Node.ELEMENT_NODE && node.hasAttributes()
  }

  /**
   * @param {Node} node
   * @param {Function} node
   */
  static map(node, nodeIndex, mapFn) {
    for (const attribute of node.attributes) mapFn(attribute)
  }
}
