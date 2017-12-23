import { Observable } from './observable.js'

export class EventEmitter<Val> {
  listeners: ((val: Val) => void)[] = []

  listen(listener) {
    this.listeners.push(listener)
    return () => this.listeners.splice(
      this.listeners.indexOf(listener), 1
    )
  }

  emit(val: Val) {
    const length = this.listeners.length
    for (let index = 0; index < length; index++) {
      this.listeners[0](val)
    }
  }

  toObservable() {
    return new Observable<Val>((observer) =>
      this.listen((value) => observer.next(value))
    )
  }
}
