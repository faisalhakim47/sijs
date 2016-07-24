import { IWatcher, Emitter } from './emitter'
import { ObsObject } from './observable-object'
import { GlobalEvent } from '../instance/global-event'
import { get, set } from '../tools/object'
import { isString } from '../tools/typecheck'

let idCound = 0

function genId() {
  return 'Obs_' + idCound++
}

export function resetObsId() {
  idCound = 0
}

export class Observable<T> {
  private rawData: T
  private EE: Emitter = new Emitter()
  private childArray: any = {}

  constructor(
    private baseData: any = { _dummy: {} },
    private basePath: string = '_dummy',
    public id?: string
  ) {
    this.rawData = get<T>(baseData, basePath)
    if (this.rawData == null) {
      throw new Error('cannot create on undefined path')
    }
    if (!id) this.id = genId()
  }

  raw(path: string = null): T {
    return get<T>(this.rawData, path)
  }

  val(path: string = null) {
    return Object.freeze(this.raw(path))
  }

  get<TChild>(path: string = null): ObsObject<TChild> {
    return new ObsObject<TChild>(this.id, path, this)
  }

  set(path: string = null, value) {
    if (!path) {
      this.rawData = set(this.baseData, this.basePath, value)

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

    set(this.rawData, path, value)

    this.EE.emit(path, value)

    Object.keys(this.EE.watchers).forEach((listedPath) => {
      if (
        path !== listedPath &&
        (listedPath.indexOf(path) === 0 || path.indexOf(listedPath) === 0)
      ) {
        this.EE.emit(listedPath, this.val(listedPath))
      }
    })
  }

  watch(path: string = null, watcher) {
    return this.EE.on(path, watcher)
  }

  unwatch(path: string = null, watcher) {
    return this.EE.off(path, watcher)
  }
}
