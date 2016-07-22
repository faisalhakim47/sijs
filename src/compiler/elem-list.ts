import { IHooks, Elem } from './elem'
import { genId } from './uid'
import { RouterView } from './routerview'
import { Glue } from '../glue/glue'
import { ListGlue } from '../glue/list'
import { ObsArray } from '../observer/observable-array'
import { ObsObject } from '../observer/observable-object'

export interface IListFn {
  (item, index: () => number): Elem
}

function isListFn(t): t is IListFn {
  return t && typeof t === 'function'
}

export function eList(
  items: ObsArray,
  listFn: IListFn,
  opts?: {
    limit?: number | ObsObject,
    skip?: number | ObsObject,
    key?: string
  }
): Elem {
  if (!opts) opts = { limit: 0, skip: 0 }
  let skip = opts.skip instanceof ObsObject
    ? (<ObsObject>opts.skip).val()
    : (opts.skip || 0)
  let limit = opts.limit instanceof ObsObject
    ? (<ObsObject>opts.limit).val()
    : (opts.limit || 0)

  const id = genId()
  const glues: Glue[] = []
  const events: string[] = []
  const hooks: IHooks = {
    beforeInstall: [],
    afterInstall: [],
    beforeDestroy: [],
    afterDestroy: []
  }
  const routers: RouterView[] = []
  const listGlue = new ListGlue(id, items, listFn, opts)
  let template = '<script id="' + id + '"></script>'

  let length = items.length(), i: number
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
      elem: null,
      index,
      item: items.get(skip + index)
    }
    const e = listFn(currentItem.item, () => currentItem.index)
    template += e.template.replace('>', ' ' + id + '>')
    glues.push(...e.glues)
    events.push(...e.events)
    hooks.beforeInstall.push(...e.hooks.beforeInstall)
    hooks.afterInstall.push(...e.hooks.afterInstall)
    hooks.beforeDestroy.push(...e.hooks.beforeDestroy)
    hooks.afterDestroy.push(...e.hooks.afterDestroy)
    currentItem.elem = e
  }

  glues.unshift(listGlue)

  return new Elem(id, template, glues, events, hooks, routers)
}
