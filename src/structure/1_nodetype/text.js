import { NodeType } from './nodetype.js'
import { PLACEHOLDER } from '../../constant.js'

export class TextNodeType extends NodeType {
  /**
   * @param {Node} node 
   */
  static filter(node) {
    return node.nodeType === Node.TEXT_NODE && node.nodeValue === PLACEHOLDER
  }

  /**
   * @param {Node} node
   * @param {Function} node
   */
  static map(node, nodeIndex, mapFn) {
    mapFn()
  }
}
