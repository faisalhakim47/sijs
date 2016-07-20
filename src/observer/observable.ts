import { Emitter } from './emitter'
import { GlobalEvent } from '../instance/global-event'
import { get, set } from '../tools/object'
import { isString } from '../tools/typecheck'

export class Observable {
  private rawData
  private EE: Emitter
  private childWatcher: any = {}
  private childArray: any = {}
  private childNum: any = {}
  constructor(
    private baseData: any = { _dummy: null },
    private basePath: string = '_dummy',
    public id?: string
  ) {
    this.rawData = get(baseData, basePath)
    if (this.rawData && this.rawData.undefined) {
      throw new Error('cannot create on undefined path')
    }
    if (!id) {
      this.id = genId()
    }
    this.EE = new Emitter()
  }

  raw(path: string = null) {
    return get(this.rawData, path)
  }

  val(path: string = null) {
    return Object.freeze(this.raw(path))
  }

  get(path: string = null) {
    return new ObsObject(this.id, path, this)
  }

  set(path: string = null, value) {
    if (!path) {
      set(this.baseData, this.basePath, value)

      this.rawData = get(this.baseData, this.basePath)

      for (let key in this.EE.watchers) {
        if (key === 'null') key = null

        const watchers = this.EE.watchers[key]
        const val = get(this.rawData, key)

        watchers.forEach((watcher) => {
          watcher(val)
        })
      }
      return this.rawData
    }

    if (get(this.rawData, path) === value) return

    if (set(this.rawData, path, value)) {
      this.EE.emit(path, value)

      Object.keys(this.EE.watchers).forEach((listedPath) => {
        if (
          path !== listedPath &&
          (listedPath.indexOf(path) !== 0 || path.indexOf(listedPath) !== 0)
        ) {
          this.EE.emit(listedPath, this.val(listedPath))
        }
      })
    }
  }

  watch(path: string = null, watcher) {
    this.EE.on(path, watcher)
    return {
      unwatch: () => {
        this.unwatch(path, watcher)
      }
    }
  }

  unwatch(path: string = null, watcher) {
    this.EE.off(path, watcher)
  }
}

export class ObsObject {
  constructor(
    public id: string,
    public path: string,
    private parent: Observable
  ) { }

  get(childPath: string) {
    return this.parent.get(this.path + '.' + childPath)
  }

  raw() {
    return this.parent.raw(this.path)
  }

  val() {
    return Object.freeze(this.raw())
  }

  set(value) {
    return this.parent.set(this.path, value)
  }

  watch(watcher) {
    return this.parent.watch(this.path, watcher)
  }

  unwatch(watcher) {
    return this.parent.unwatch(this.path, watcher)
  }
}

export interface IFilter {
  name: string
  filterFn: (val) => any
}

export const Filters: {
  [name: string]: (val) => void
} = {}

export function registerFilter(name: string, filterFn: (val) => any) {
  Filters[name] = filterFn
}

let idCound = 0

function genId() {
  return 'Obs_' + idCound++
}

export function resetObsId() {
  idCound = 0
}

try {
  window['O'] = Observable
} catch (e) { }
