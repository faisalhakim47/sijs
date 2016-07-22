import { Glue, addEvents, installElem, destroyElem } from './glue'
import { Elem } from '../compiler/elem'
import { ObsObject } from '../observer/observable-object'
import { ObsArray } from '../observer/observable-array'

export interface IItemList {
  index: number
  item
  el: Element
  elem: Elem
}

export class ListGlue extends Glue {
  helperEl: HTMLElement
  skip: number
  limit: number
  public currentItems: IItemList[] = []

  constructor(
    private helperId: string,
    private items: ObsArray,
    private listFn: (item, index: () => number) => Elem,
    private opts: {
      skip?: ObsObject | number,
      limit?: ObsObject | number
    }
  ) {
    super()
    this.id = helperId
    const { skip, limit } = opts
    if (skip instanceof ObsObject) {
      this.skip = skip.val()
      this.watchers.push(
        skip.watch((val) => this.skipWatcher(val))
      )
    }
    if (limit instanceof ObsObject) {
      this.limit = limit.val()
      this.watchers.push(
        limit.watch((val) => this.limitWatcher(val))
      )
    }
  }

  install() {
    this.helperEl = document.getElementById(this.helperId)
    const helperParentEl = this.helperEl.parentElement
    const elIndex = Array.prototype.indexOf.call(
      helperParentEl.children, this.helperEl
    )

    this.currentItems = this.currentItems.map((oldItem, index) => {
      oldItem.el = helperParentEl.children[elIndex + index + 1]
      return oldItem
    })

    this.watchers.push(
      this.items.watch(() => this.listGenerator())
    )
    this.isInstalled = true
  }

  destroy() {
    const { skip, limit } = this.opts
    if (!this.isInstalled) return
    this.teardown()
    this.helperEl = null
  }

  skipWatcher(val) {
    this.skip = val
  }

  limitWatcher(val) {
    this.limit = val
  }

  listGenerator() {
    const { helperId, helperEl, items, listFn, skip, limit, currentItems } = this

    let newItems: IItemList[] = []
    let length = items.length()
    let i: number

    if (length <= skip + limit) {
      i = length - skip
      if (i < 0) i = 0
    } else if (limit === 0) {
      i = length - skip
    } else {
      i = limit
    }

    let skipIndex = skip
    if (skip > length) skipIndex = length
    else if (skip < 0) skipIndex = 0

    while (i--) {
      const index = skipIndex + i
      const item = items.get(index)

      let indexItem: number = -1
      for (let i = 0, l = currentItems.length; i < l; i++) {
        if (currentItems[i].item === item) {
          indexItem = i
          break
        }
      }

      if (indexItem !== -1) {
        helperEl.insertAdjacentElement(
          'afterend', currentItems[indexItem].el
        )
        const currentItem = currentItems.splice(indexItem, 1)[0]
        currentItem.index = index
        currentItems.push(currentItem)
      } else {
        const itemParam: IItemList = { item, index, elem: null, el: null }
        const e = listFn(itemParam.item, () => itemParam.index)
        installElem(e, (template) => {
          helperEl.insertAdjacentHTML(
            'afterend', template.replace('>', ' ' + helperId + '>')
          )
        })
        addEvents(e.events)

        itemParam.elem = e
        itemParam.el = helperEl.nextElementSibling
        newItems.push(itemParam)
      }
    }

    currentItems.forEach((oldItem) => {
      destroyElem(oldItem.elem, () => {
        helperEl.parentElement.removeChild(oldItem.el)
      })
    })

    this.currentItems = newItems
    newItems = []
  }
}
