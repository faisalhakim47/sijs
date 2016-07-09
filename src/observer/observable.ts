import { IWatcher, Emitter } from './emitter'
import { get, set } from '../tools/object'

export class Observable {
  private rawData
  private EE: Emitter
  private childWatcher: any = {}
  private childArray: any = {}
  private childNum: any = {}
  constructor(
    private baseData: any = { _dummy: null },
    private basePath: string = '_dummy',
    private id?: string
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
  get(path: string) {
    path = path
    return new ObsGetter(
      this.id,
      this.rawData,
      path,
      this.EE,
      this.get,
      this.childWatcher
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
    if (filterFn instanceof String) {
      obs.val = () => Filters[filterFn](val())
      return obs
    } else if (filterFn instanceof Function) {
      obs.val = () => filterFn(val())
      return obs
    }
  }
  watch(watcher: IWatcher) {
    this.EE.on(null, watcher)
    let i = 0
    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (listedPath.indexOf(null) === 0 && null !== listedPath) {
        const name = listedPath + null + i++
        this.childWatcher[name] = () => {
          this.EE.emit(listedPath, get(this.rawData, listedPath))
        }
        this.EE.on(null, this.childWatcher[name])
      }
    })
  }
  unwatch(watcher) {
    this.EE.off(null, watcher)
    let i = 0
    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (listedPath.indexOf(null) === 0 && 'null' !== listedPath) {
        this.EE.off(null, this.childWatcher[listedPath + null + i++])
      }
    })
  }
}

export class ObsGetter {
  constructor(
    public id: string,
    private rawData,
    public path: string,
    private EE: Emitter,
    private getter: (path: string) => ObsGetter,
    private childWatcher
  ) { }

  get(childPath: string) {
    return this.getter(this.path + childPath)
  }

  raw() {
    let ret = get(this.rawData, this.path)
    if (ret.undefined) ret = undefined
    return ret
  }

  val() {
    return Object.freeze(this.raw())
  }

  set(value) {
    if (get(this.rawData, this.path) === value) return
    if (set(this.rawData, this.path, value)) {
      this.EE.emit(this.path, value)
    }
  }

  watch(watcher: IWatcher) {
    this.EE.on(this.path, watcher)
    let i = 0
    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (listedPath.indexOf(this.path) === 0 && this.path !== listedPath) {
        const name = listedPath + this.path + i++
        this.childWatcher[name] = () => {
          this.EE.emit(listedPath, get(this.rawData, listedPath))
        }
        this.EE.on(this.path, this.childWatcher[name])
      }
    })
  }

  unwatch(watcher) {
    this.EE.off(this.path, watcher)
    let i = 0
    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (listedPath.indexOf(this.path) === 0 && this.path !== listedPath) {
        this.EE.off(this.path, this.childWatcher[listedPath + this.path + i++])
      }
    })
  }
}

export interface IFilter {
  name: string
  filterFn: (val) => any
}

export const Filters: any = {}

export function registerFilter(name: string, filterFn: (val) => any) {
  Filters[name] = filterFn
}

let idCound = 0
function genId() {
  return 'Obs_' + idCound++
}
