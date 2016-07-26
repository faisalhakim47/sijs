import { genId } from './uid'
import { CompilerState, getChildState } from './index'
import { RouterView } from './routerview'
import { Glue } from '../glue/index'
import { ListGlue } from '../glue/list'

export interface IListFn {
  (item, index: () => number): string
}

function isListFn(t): t is IListFn {
  return t && typeof t === 'function'
}

export function List(
  itemsFactory: Function,
  listFn: IListFn,
  opts?: {
    limit?: number | Function,
    skip?: number | Function
  }
): string {
  if (!opts) opts = { limit: 0, skip: 0 }

  let skip: number = opts.skip instanceof Function
    ? (<Function>opts.skip)()
    : opts.skip
  let limit: number = opts.limit instanceof Function
    ? (<Function>opts.limit)()
    : opts.limit

  const items = itemsFactory()
  const id = genId()
  const listGlue = new ListGlue(id, itemsFactory, listFn, opts)
  let template = '<script id="' + id + '"></script>'

  let length = items.length, i: number
  if (length <= skip + limit) {
    i = length - skip
    if (i < 0) i = 0
  } else if (limit === 0) {
    i = length - skip
  } else {
    i = limit
  }

  if (skip > length) skip = length
  else if (skip < 0) skip = 0

  for (let index = 0; index < i; index++) {
    const currentItem = listGlue.currentItems[index] = {
      el: null,
      state: null,
      index,
      item: items[skip + index]
    }
    currentItem.state = getChildState(() => {
      template += listFn(currentItem.item, () => currentItem.index)
        .replace('>', ' ' + id + '>')
    })
  }

  CompilerState.glues.unshift(listGlue)

  return template
}
