import { prepareToRemoveNode } from '../../core/component.js'
import { Directive } from '../../core/directive.js'
import { LitTag } from '../../core/littag.js'
import { ContentUpdater } from '../../core/updater/content.js'

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
   * @param {(item: any, index: number) => LitTag} map 
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
    listUpdater.cache = {}
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
      listUpdater.cache[key] = itemUpdater
    }
    parentNode.replaceChild(
      fragment,
      previousNode.nextSibling,
    )
  }

  /**
   * @param {ContentUpdater} listUpdater 
   */
  update(listUpdater) {
    const parentNode = listUpdater.previousNode.parentNode
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
      const itemUpdater = listUpdater.cache[key]
      if (itemUpdater instanceof ContentUpdater) {
        const previousNodeOfItem = itemUpdater.previousNode.previousSibling
        const isPrevItemVerified = prevItemUpdater !== null
          && prevItemUpdater.nextNode === previousNodeOfItem
        const isFirstItemVerified = prevItemUpdater === null
          && previousNodeOfItem === listUpdater.previousNode
        if (isPrevItemVerified || isFirstItemVerified) {
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
    listUpdater.cache = newCache

    const lastItemNextNode = prevItemUpdater.nextNode
    while (lastItemNextNode.nextSibling !== listUpdater.nextNode) {
      parentNode.removeChild(lastItemNextNode.nextSibling)
    }
  }
}
