import { Directive } from '../../core/updater/content/directive.js'
import { ContentUpdater } from '../../core/updater/content/content.js'
import { LitTag } from '../../core/littag.js'
import { removeNode, replaceNode, insertNodeBefore, appendNode } from '../../tools/dom.js'

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
 */
export function repeat<Item>(
  items: Item[],
  map: ((item: Item, index: number) => LitTag),
  key: (item: Item, index: number) => string) {
  return new Repeat<Item>(items, map, key)
}

export class Repeat<Item> extends Directive {
  constructor(
    private items: Item[],
    private map: (item: Item, index: number) => LitTag,
    private key: (item: Item, index: number) => string
  ) { super() }
  
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
      ? this.key(item, index)
      : index
      const node = document.createComment('')
      fragment.appendChild(document.createComment(''))
      fragment.appendChild(node)
      fragment.appendChild(document.createComment(''))
      const itemUpdater = new ContentUpdater(node)
      itemUpdater.update([this.map(item, index)])
      cache[key] = itemUpdater
    }
    replaceNode(previousNode.nextSibling, fragment)
    return cache
  }

  /**
   * @param {ContentUpdater} listUpdater 
   */
  update(listUpdater) {
    const parentNode = listUpdater.previousNode.parentNode
    const oldCache = listUpdater.oldValue
    let prevItemUpdater: ContentUpdater = null
    const newCache = {}
    const length = this.items.length
    for (let index = 0; index < length; index++) {
      const item = this.items[index]
      const key = typeof this.key === 'function'
        ? this.key(item, index)
        : index
      const itemUpdater: ContentUpdater = oldCache[key]
      if (itemUpdater instanceof ContentUpdater) {
        const prevNodeOfItem = itemUpdater.previousNode.previousSibling
        const prevItemVerified = prevItemUpdater !== null
          && prevItemUpdater.nextNode === prevNodeOfItem
        const firstItemVerified = prevItemUpdater === null
          && prevNodeOfItem === listUpdater.previousNode
        if (prevItemVerified || firstItemVerified) {
          itemUpdater.update([this.map(item, index)])
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
            insertNodeBefore(refChild, wrongOrderedNode)
          }
          itemUpdater.update([this.map(item, index)])
        }
        newCache[key] = itemUpdater
        prevItemUpdater = itemUpdater
      }
      else {
        const fragment = document.createDocumentFragment()
        const node = document.createTextNode('')
        appendNode(fragment, document.createComment(''))
        appendNode(fragment, node)
        appendNode(fragment, document.createComment(''))
        const itemUpdater = new ContentUpdater(node)
        itemUpdater.update([this.map(item, index)])
        insertNodeBefore(
          prevItemUpdater
          ? prevItemUpdater.nextNode.nextSibling
          : listUpdater.previousNode.nextSibling,
          fragment
        )
        newCache[key] = itemUpdater
        prevItemUpdater = itemUpdater
      }
    }

    const lastItemNextNode = prevItemUpdater.nextNode
    while (lastItemNextNode.nextSibling !== listUpdater.nextNode)
      removeNode(lastItemNextNode.nextSibling)

    return newCache
  }
}
