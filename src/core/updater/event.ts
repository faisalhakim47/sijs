import { Updater } from './updater.js'

export class EventUpdater extends Updater {
  currentListener: Function = null

  constructor(
    private element: Element,
    private eventName: string
  ) { super() }

  init(newListeners: Function[]) {
    this.currentListener = newListeners[0]
    this.element.removeAttribute('on' + this.eventName)
    this.element.addEventListener(this.eventName, (event) => {
      this.currentListener(event)
    })
  }

  update(newListeners: Function[]) {
    this.currentListener = newListeners[0]
  }
}
