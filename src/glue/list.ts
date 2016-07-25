import { Glue, addEvents, installState, destroyState } from './index'
import { CompilerStateConstructor, getChildState } from '../compiler/index'
import { listenDeps } from '../observer/dependent'
import { isObserved, isObservable, listenObs, parseObsValue } from '../observer/observable'

export interface IItemList {
  index: number
  item
  el: Element
  state: CompilerStateConstructor
}

export class ListGlue extends Glue {
  helperEl: HTMLElement
  skip: number
  limit: number
  public currentItems: IItemList[] = []

  constructor(
    private helperId: string,
    private itemsFactory: Function,
    private listFn: (item, index: () => number) => string,
    private opts: {
      skip?
      limit?
    }
  ) {
    super()
    this.id = helperId
    const { skip, limit } = opts
    if (isObservable(skip)) {
      this.skip = parseObsValue(skip)
      if (isObserved(skip)) {
        this.listeners.push(listenObs(skip, () => this.skipSetter()))
      } else {
        this.listeners.push(listenDeps(() => this.skipSetter()))
      }
    } else {
      this.skip = skip
    }
    if (isObservable(limit)) {
      this.limit = parseObsValue(limit)
      if (isObserved(limit)) {
        this.listeners.push(listenObs(limit, () => this.limitSetter()))
      } else {
        this.listeners.push(listenDeps(() => this.limitSetter()))
      }
    } else {
      this.limit = limit
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

    this.listeners.push(listenDeps(() => this.listGenerator()))
    this.isInstalled = true
  }

  destroy() {
    const { skip, limit } = this.opts
    if (!this.isInstalled) return
    this.teardown()
    this.helperEl = null
  }

  skipSetter() {
    this.skip = (<Function>this.opts.skip)()
  }

  limitSetter() {
    this.limit = (<Function>this.opts.limit)()
  }

  listGenerator() {
    const { helperId, helperEl, itemsFactory, listFn, skip, limit, currentItems } = this

    const items: any[] = itemsFactory()
    let newItems: IItemList[] = []
    let length = items.length
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
      const item = items[index]

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
        const itemParam: IItemList = { item, index, state: null, el: null }
        let template: string
        const state = getChildState(() => {
          template = listFn(itemParam.item, () => itemParam.index)
        })

        installState(state, () => {
          helperEl.insertAdjacentHTML(
            'afterend', template.replace('>', ' ' + helperId + '>')
          )
        })

        itemParam.state = state
        itemParam.el = helperEl.nextElementSibling
        newItems.push(itemParam)
      }
    }

    currentItems.forEach((oldItem) => {
      destroyState(oldItem.state, () => {
        helperEl.parentElement.removeChild(oldItem.el)
      })
    })

    this.currentItems = newItems
    newItems = []
  }
}
