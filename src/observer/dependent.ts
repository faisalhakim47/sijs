import { Observable } from './observable'

export function listenObs(testFn: Function, subFn?: Function) {
  Observable.DEPENDENT = subFn || testFn

  testFn()

  Observable.DEPENDENT = null

  const listeners = Observable.LISTENERS
  Observable.LISTENERS = []

  return {
    unlist() {
      listeners.forEach((listener) => listener.unlist())
    }
  }
}
