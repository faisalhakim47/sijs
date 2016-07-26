import { IListener, Emitter } from './emitter'
import { listenObs } from './dependent'
import { set, get } from '../tools/object'

export interface Observable {
  (obj): any
  DEPENDENT: Function
  LISTENERS: IListener[]
  LAST_KEY: string
  LAST_PROXYOBJ: any
}

export interface Observer {
  EE: Emitter
  value: any
  path: string
  prevListener: IListener
}

const ObsEmitter = new Emitter()

export const Observable: Observable = (() => {
  const h: any = function Observe(MasterObj) {
    const ProxiedObj = new Proxy(MasterObj, {
      get(target, key) {
        let value = target[key]

        // filter
        if (
          key === '__Obs' ||
          value === undefined
        ) {
          return value
        }

        let parent: Observer = target.__Obs

        if (!parent) parent = createObsParent(target)

        Observable.LAST_PROXYOBJ = ProxiedObj
        Observable.LAST_KEY = key.toString()

        if (value instanceof Object) {
          let Observer: Observer = value.__Obs

          if (!Observer) {
            Observer = createObsChild(value, { parent, key })
          }

          if (value instanceof Function) {
            return target[key].bind(get(ProxiedObj, parent.path))
          }

          if (Observable.DEPENDENT) {
            if (Observer.prevListener) {
              Observable.LISTENERS.pop()
              Observer.prevListener.unlist()
            }
            const listener = Observer.EE.on(Observer.path, Observable.DEPENDENT)
            Observable.LISTENERS.push(listener)
            Observer.prevListener = listener
          }

          return Observable(value)
        }

        return value
      },

      set(target, key, value) {
        if (key === '__Obs') return false

        let parent: Observer = target.__Obs
        
        if (!parent) parent = createObsParent(target)

        // Set
        target[key] = value
        parent.value = value

        const path = parent.path

        parent.EE.emit(path)
        Object.keys(parent.EE.listeners).forEach((listedPath) => {
          if (!listedPath.indexOf(path) || !path.indexOf(listedPath)) {
            parent.EE.emit(listedPath)
          }
        })

        return true
      }
    })

    return ProxiedObj
  }

  h.DEPENDENT = null
  h.LISTENERS = []

  return <Observable>h
})()

function createObsParent(target) {
  const Observer: Observer = {
    EE: new Emitter(),
    path: null,
    prevListener: null,
    value: target
  }
  Object.defineProperty(target, '__Obs', {
    value: Observer,
    enumerable: false
  })
  return Observer
}

function createObsChild(child, { parent, key }) {
  const Observer: Observer = {
    EE: parent.EE,
    path: parent.path ? `${parent.path}.${key}` : key.toString(),
    prevListener: parent.prevListener,
    value: child
  }
  Object.defineProperty(child, '__Obs', {
    value: Observer,
    enumerable: false
  })
  return Observer
}
