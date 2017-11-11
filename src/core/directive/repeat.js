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
   * @param {Node} prevNode 
   * @param {Node} nextNode 
   */
  update(oldElements, prevNode, nextNode) {
    const parentNode = nextNode.parentNode
    this.items.map(this.mapFn).forEach((litTag) => {
      const oldElement = oldElements.shift()
      if (oldElement) litTag.render(oldElement)
      else {
        const instance = litTag.compile()
        parentNode.insertBefore(instance.element, nextNode)
      }
    })
    oldElements.forEach((oldElement) => {
      parentNode.removeChild(oldElement)
    })
  }
}
