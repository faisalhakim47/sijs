import { Observable } from './observable'
import { set } from '../tools/object'

export function getSetter(testFn: Function) {
  testFn()
  const obj = Observable.LAST_PROXYOBJ
  const path = Observable.LAST_KEY
  return (value) => set(obj, path, value)
}
