import { prepareToRemoveNode } from '../core/component.js'
import { Directive } from '../core/directive.js'
import { LitTag } from '../core/littag.js'

/**
 * @param {any[]} items
 * @param {(item: any, index: number) => LitTag} mapFn 
 */
export function repeat(items, mapFn) {
  return new Repeat(items, mapFn)
}

class Repeat extends Directive {
  /**
   * @param {any[]} items
   * @param {(item: any, index: number) => LitTag} mapFn 
   */
  constructor(items, mapFn) {
    super()
    this.items = items
    this.map = mapFn
  }

  /**
   * @param {Node} currNode 
   * @param {Node} prevNode 
   * @param {Node} nextNode 
   */
  update(currNode, prevNode, nextNode) {
    const currentNodes = []
    while (currNode && currNode !== nextNode) {
      currentNodes.push(currNode)
      currNode = currNode.nextSibling
    }
    const parentNode = nextNode.parentNode
    const length = this.items.length
    for (let index = 0; index < length; index++) {
      const litTag = this.map(this.items[index])
      const oldElement = currentNodes.shift()
      if (oldElement) litTag.mount(oldElement)
      else parentNode.insertBefore(
        litTag.compile().element,
        nextNode,
      )
    }
    let nodeToRemove
    while (nodeToRemove = currentNodes.shift()) {
      prepareToRemoveNode(nodeToRemove)
      parentNode.removeChild(nodeToRemove)
    }
  }
}
