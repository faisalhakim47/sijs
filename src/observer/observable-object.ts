import { IWatcher } from './emitter'
import { Observable } from './observable'
import { escape } from '../tools/string'

export class ObsObject<T> {
  private filterFn = val => val
  constructor(
    public id: string,
    public path: string,
    private parent: Observable<any>
  ) { }

  get<TChild>(childPath: string): ObsObject {
    return this.parent.get<TChild>(this.path + '.' + childPath)
  }

  raw() {
    return this.parent.raw(this.path)
  }

  val() {
    return this.filterFn(Object.freeze(this.raw()))
  }

  escape() {
    this.filterFn = escape
    return this
  }

  filter(filterFn: (val: any) => any) {
    this.filterFn = filterFn
    return this
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
