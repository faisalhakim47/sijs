import { IListener, Emitter } from './emitter'
import { listenDeps } from './dependent'
import { set, get } from '../tools/object'

export interface Observe {
  (obj): any
  DEPENDENT: Function
  LISTENERS: IListener[]
}

export interface Observer {
  EE: Emitter
  value: any
  set: (val: any) => void
  listen: (fn: Function) => IListener
  path: string
  prevListener: IListener
}

const ObsEmitter = new Emitter()

export const Observe: Observe = (() => {
  const h: any = function ObservableFn(MasterObj) {
    const ProxiedObj = new Proxy(MasterObj, {
      get(target, key) {
        let value = target[key]

        // filter
        if (
          ['__Obs', '__ObsValue'].indexOf(key.toString()) !== -1 ||
          value === undefined
        ) {
          return value
        }

        let parent: Observer = target.__Obs

        if (!parent) {
          parent = {
            EE: new Emitter(),
            path: null,
            prevListener: null,
            value: MasterObj,
            set(value) {
              set(ProxiedObj, this.path, value)
            },
            listen(fn) {
              return this.EE.on(this.path, fn)
            }
          }
          Object.defineProperty(MasterObj, '__Obs', {
            value: parent,
            enumerable: false
          })
        }

        const Observer: Observer = {
          value,
          EE: parent.EE,
          path: parent.path
            ? parent.path + '.' + key.toString()
            : key.toString(),
          prevListener: parent.prevListener,
          set: parent.set,
          listen: parent.listen
        }

        if (value instanceof Function) {
          return target[key].bind(get(ProxiedObj, Observer.path))
        }

        if (Observe.DEPENDENT) {
          if (Observer.prevListener) {
            Observe.LISTENERS.pop()
            Observer.prevListener.unlist()
          }
          const listener = Observer.EE.on(Observer.path, Observe.DEPENDENT)
          Observe.LISTENERS.push(listener)
          Observer.prevListener = listener
        }

        if (!(value instanceof Object)) {
          value = { __ObsValue: value }
        }

        Object.defineProperty(value, '__Obs', {
          value: Observer,
          enumerable: false
        })
        return ObservableFn(value)
      },

      set(target, key, value) {
        if (key === '__Obs') return false

        const Observer: Observer = target.__Obs

        target[key] = value
        Observer.value = value

        const path = Observer.path
        const listeners = Observer.EE.listeners

        Observer.EE.emit(path)
        Object.keys(listeners).forEach((listedPath) => {
          if (listedPath.indexOf(path) || path.indexOf(listedPath)) {
            Observer.EE.emit(listedPath)
          }
        })

        return true
      }
    })
  }

  h.DEPENDENT = null
  h.LISTENERS = []

  return <Observe>h
})()

export interface Observable {
  __Obs: Observer
}

export function isObserved(t): t is Observable {
  return t && t.__Obs instanceof Object
}

export function isObservable(value) {
  return isObserved(value) || value instanceof Function
}

export function getObsValue(obs) {
  return obs.__Obs.value
}

export function parseObsValue(value) {
  if (isObserved(value)) {
    return getObsValue(value)
  } else if (value instanceof Function) {
    return value()
  } else {
    return value
  }
}

export function listenObs(obs, fn): IListener {
  return obs.__Obs.listen(fn)
}
