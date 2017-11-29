import { prepareToRemoveNode } from '../../core/updater/content/component.js'
import { Directive } from '../../core/updater/content/directive.js'
import { ContentUpdater } from '../../core/updater/content/content.js'
import { LitTag } from '../../core/littag.js'


/**
 * List rendering directive.
 * 
 * usage:
 * 
 * ```
 * const items = [
 *   { name: 'one' },
 *   { name: 'two' },
 *   { name: 'three' },
 * ]
 * 
 * html`
 *   <ul>
 *     ${repeat(items, item =>
 *         html`<li>${item.name}</li>`,
 *       item => item.name
 *     )}
 *   </ul>
 * `
 * ```
 * @param {any[]} items
 * @param {(item: any, index: number) => LitTag} map 
 * @param {(item: any, index: number) => string} key 
 */
export function repeat(items, map, key) {
  return new Repeat(items, map, key)
}

class Repeat extends Directive {
  /**
   * @param {any[]} items
   * @param {(item: any, index: number) => LitTag} map 
   * @param {(item: any, index: number) => string} key 
   */
  constructor(items, map, key) {
    super()
    this.items = items
    this.map = map
    this.key = key
  }

  /**
   * @param {ContentUpdater} listUpdater 
   */
  init(listUpdater) {
    const cache = {}
    const { previousNode, nextNode } = listUpdater
    const parentNode = previousNode.parentNode
    const fragment = document.createDocumentFragment()
    const length = this.items.length
    for (let index = 0; index < length; index++) {
      const item = this.items[index]
      const key = typeof this.key === 'function'
        ? this.key(item)
        : index
      const node = document.createComment('')
      fragment.appendChild(document.createComment(''))
      fragment.appendChild(node)
      fragment.appendChild(document.createComment(''))
      const itemUpdater = new ContentUpdater(node)
      itemUpdater.update([this.map(item)])
      cache[key] = itemUpdater
    }
    parentNode.replaceChild(
      fragment,
      previousNode.nextSibling,
    )
    return cache
  }

  /**
   * @param {ContentUpdater} listUpdater 
   */
  update(listUpdater) {
    const parentNode = listUpdater.previousNode.parentNode
    const oldCache = listUpdater.oldValue
    /** @type {ContentUpdater} */
    let prevItemUpdater = null
    const newCache = {}
    const length = this.items.length
    for (let index = 0; index < length; index++) {
      const item = this.items[index]
      const key = typeof this.key === 'function'
        ? this.key(item)
        : index
      /** @type {ContentUpdater} */
      const itemUpdater = oldCache[key]
      if (itemUpdater instanceof ContentUpdater) {
        const prevNodeOfItem = itemUpdater.previousNode.previousSibling
        const prevItemVerified = prevItemUpdater !== null
          && prevItemUpdater.nextNode === prevNodeOfItem
        const firstItemVerified = prevItemUpdater === null
          && prevNodeOfItem === listUpdater.previousNode
        if (prevItemVerified || firstItemVerified) {
          itemUpdater.update([this.map(item)])
        } else {
          const wrongOrderedNodes = [
            itemUpdater.previousNode,
            itemUpdater.previousNode.nextSibling,
            itemUpdater.nextNode,
          ]
          const refChild = prevItemUpdater
            ? prevItemUpdater.nextNode.nextSibling
            : listUpdater.previousNode.nextSibling
          let wrongOrderedNode
          while (wrongOrderedNode = wrongOrderedNodes.shift()) {
            parentNode.insertBefore(
              wrongOrderedNode,
              refChild,
            )
          }
          itemUpdater.update([this.map(item)])
        }
        newCache[key] = itemUpdater
        prevItemUpdater = itemUpdater
      }
      else {
        const fragment = document.createDocumentFragment()
        const node = document.createTextNode('')
        fragment.appendChild(document.createComment(''))
        fragment.appendChild(node)
        fragment.appendChild(document.createComment(''))
        const itemUpdater = new ContentUpdater(node)
        itemUpdater.update([this.map(item)])
        parentNode.insertBefore(
          fragment,
          prevItemUpdater
            ? prevItemUpdater.nextNode.nextSibling
            : listUpdater.previousNode.nextSibling,
        )
        newCache[key] = itemUpdater
        prevItemUpdater = itemUpdater
      }
    }

    const lastItemNextNode = prevItemUpdater.nextNode
    while (lastItemNextNode.nextSibling !== listUpdater.nextNode) {
      parentNode.removeChild(lastItemNextNode.nextSibling)
    }

    return newCache
  }
}
