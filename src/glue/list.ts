import { Glue, installGlues, destroyGlues } from './glue'
import { IElem } from '../compiler/elem'
import { ObsGetter } from '../observer/observable'
import { ObsArray } from '../observer/observable-array'

export class ListGlue extends Glue {
  helperEl: HTMLElement
  skip: number
  limit: number
  public currentItems = []
  constructor(
    private helperId: string,
    private items: ObsArray,
    private listFn: (item, index: () => number) => IElem,
    private opts: {
      skip?: ObsGetter | number,
      limit?: ObsGetter | number
    }
  ) {
    super()
    const { skip, limit } = opts
    if (skip instanceof ObsGetter) {
      this.skip = skip.val()
      skip.watch(this.skipWatcher)
    }
    if (limit instanceof ObsGetter) {
      this.limit = limit.val()
      limit.watch(this.limitWatcher)
    }
  }

  install() {
    this.helperEl = document.getElementById(this.helperId)
    const helperParentEl = this.helperEl.parentElement
    const elIndex = Array.prototype.indexOf.call(
      helperParentEl.children, this.helperEl
    )

    this.currentItems = this.currentItems.map((oldItem, index) => {
      oldItem['el'] = helperParentEl.children[elIndex + index + 1]
      return oldItem
    })

    this.items.watch(this.listGenerator)
    this.isInstalled = true
  }

  destroy() {
    const { skip, limit } = this.opts
    if (skip instanceof ObsGetter) {
      skip.unwatch(this.skipWatcher)
    }
    if (limit instanceof ObsGetter) {
      limit.unwatch(this.limitWatcher)
    }
    if (!this.isInstalled) return
    this.items.unwatch(this.listGenerator)
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

    let newItems = []
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
        const itemParam = { item, index }
        const e = listFn(itemParam.item, () => itemParam.index)
        helperEl.insertAdjacentHTML(
          'afterend', e.template.replace('>', ' ' + helperId + '>')
        )
        installGlues(itemParam['glues'] = e.glues)
        itemParam['el'] = helperEl.nextSibling
        newItems.push(itemParam)
      }
    }

    currentItems.forEach((oldItem) => {
      helperEl.parentElement.removeChild(oldItem.el)
      destroyGlues(oldItem.glues)
    })
    this.currentItems = newItems
    newItems = []
  }
}
