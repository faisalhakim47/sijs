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
    if (this.rawData.undefined) {
      throw new Error('cannot create on undefined path')
    }
    if (!id) {
      this.id = genId()
    }
    this.EE = new Emitter()
  }
  raw(path: string) {
    return get(this.rawData, path)
  }
  get(path: string) {
    path = path
    return new ObsGetter(
      this.id,
      path,
      this
    )
  }
  set(path: string, value) {
    if (!path) {
      set(this.baseData, this.basePath, value)
      this.rawData = get(this.baseData, this.basePath)
      return
    }
    if (get(this.rawData, path) === value) return
    if (set(this.rawData, path, value)) {
      this.EE.emit(path, value)
    }
  }
  filter(path, filterFn: ((val) => any) | string) {
    const obs = this.get(path)
    const val = obs.val
    if (isString(filterFn)) {
      obs.val = () => Filters[filterFn](val())
      return obs
    } else if (filterFn instanceof Function) {
      obs.val = () => filterFn(val())
      return obs
    }
  }
  watch(path: string, watcher) {
    this.EE.on(path, watcher)
    let i = 0
    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (listedPath.indexOf(path) === 0 && path !== listedPath) {
        const name = listedPath + path + i++
        this.childWatcher[name] = () => {
          this.EE.emit(listedPath, get(this.rawData, listedPath))
        }
        this.EE.on(null, this.childWatcher[name])
      }
    })
    return {
      unwatch: () => {
        this.unwatch(path, watcher)
      }
    }
  }
  unwatch(path: string, watcher) {
    this.EE.off(path, watcher)
    let i = 0
    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (listedPath.indexOf(path) === 0 && path !== listedPath) {
        this.EE.off(path, this.childWatcher[listedPath + path + i++])
      }
    })
  }
}

export class ObsGetter {
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
