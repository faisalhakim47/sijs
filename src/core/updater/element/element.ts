import { Updater } from '../updater.js'
import { registeredController } from './controller.js'
import { MARKER } from '../../../constant.js'

export class ElementUpdater extends Updater {
  constructor(private element: Element) {
    super()
    this.element = element
  }

  init(options) {
    this.element.removeAttribute(MARKER)
    const length = registeredController.length
    for (let index = 0; index < length; index++)
      registeredController[index].init(this.element, options)
  }

  update(options) {
    const length = registeredController.length
    for (let index = 0; index < length; index++)
      registeredController[index].update(this.element, options)
  }
}
