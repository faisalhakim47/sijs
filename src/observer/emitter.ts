export interface IListener {
  unlist: () => void
}

export class Emitter {
  listeners: {
    [name: string]: Set<Function>
  } = {}

  on(name: string, listener: Function): IListener {
    const listeners = this.listeners[name]
      ? this.listeners[name]
      : (this.listeners[name] = new Set())
    listeners.add(listener)
    return { unlist: () => this.off(name, listener) }
  }

  off(name: string, listener: Function) {
    const listeners = this.listeners[name]
    if (!listeners) return
    return listeners.delete(listener)
  }

  emit(name: string, ...data) {
    const listeners = this.listeners[name]
    if (!listeners) return
    listeners.forEach(listener => listener(...data))
  }
}
