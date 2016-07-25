import { Observe } from './observable'

export function listenDeps(testFn: Function) {
  Observe.DEPENDENT = testFn
  testFn()
  Observe.DEPENDENT = null

  const listeners = Observe.LISTENERS
  Observe.LISTENERS = []

  return {
    unlist() {
      listeners.forEach((listener) => listener.unlist())
    }
  }
}
