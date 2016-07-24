import { IWatcher, Emitter } from './emitter'

export interface Observable {
  (obj): any
  depCollector: Function
  watchers: any[]
}

export interface Observer {
  EE: Emitter
  path: string
  prevWatcher: IWatcher
}

const ObsEmitter = new Emitter()

export const Observable: Observable = (() => {
  const h: any = function ObservableFn(obj) {
    return new Proxy(obj, {
      get(target, key) {
        const value = target[key]
        if (key === '__obs') return value

        let parent: Observer = target.__obs
        if (!parent) {
          Object.defineProperty(target, '__obs', {
            value: {
              EE: new Emitter(),
              path: '',
              prevWatcher: null
            },
            enumerable: false
          })
          parent = target.__obs
        }

        const Observer: Observer = {
          EE: parent.EE,
          path: parent.path + '.' + key.toString(),
          prevWatcher: parent.prevWatcher
        }

        if (Observable.depCollector) {
          if (Observer.prevWatcher) {
            Observable.watchers.pop()
            Observer.prevWatcher.unwatch()
          }
          const watcher = Observer.EE.on(Observer.path, Observable.depCollector)
          Observable.watchers.push(watcher)
          Observer.prevWatcher = watcher
        }

        if (value instanceof Object) {
          Object.defineProperty(value, '__obs', {
            value: Observer,
            enumerable: false
          })
          return ObservableFn(value)
        } else {
          return value
        }
      }
    })
  }

  h.depCollector = null

  return <Observable>h
})() 
