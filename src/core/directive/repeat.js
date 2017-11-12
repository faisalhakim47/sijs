import { LitTag } from '../../core/littag.js'

/**
 * @param {any[]} items
 * @param {(item: any, index: number) => LitTag} mapFn 
 */
export function repeat(items, mapFn) {
  return new Repeat(items, mapFn)
}

export class Repeat {
  /**
   * @param {any[]} items
   * @param {(item: any, index: number) => LitTag} mapFn 
   */
  constructor(items, mapFn) {
    this.items = items
    this.mapFn = mapFn
  }

  /**
   * @param {Node[]} oldElements 
   * @param {Node} prevNode 
   * @param {Node} nextNode 
   */
  update(oldElements, prevNode, nextNode) {
    const parentNode = nextNode.parentNode
    const length = this.items.length
    for (let index = 0; index < length; index++) {
      const litTag = this.mapFn(this.items[index])
      const oldElement = oldElements.shift()
      if (oldElement) litTag.render(oldElement)
      else {
        parentNode.insertBefore(
          litTag.compile().element,
          nextNode,
        )
      }
    }
    let oldElement
    while (oldElement = oldElements.shift()) {
      parentNode.removeChild(oldElement)
    }
  }
}
