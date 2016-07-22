import { IUnwatcher } from './emitter'
import { Observable } from './observable'

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
