import { Updater } from './updater.js'
import { registeredController } from '../expression/controller.js'
import { MARKER } from '../../constant.js'

export class ElementUpdater extends Updater {
  constructor(private element: Element) {
    super()
    this.element = element
  }

  init(options) {
    this.element.removeAttribute(MARKER)
    registeredController.forEach((controller) => {
      controller.init(this.element, options)
    })
  }

  update(options) {
    registeredController.forEach((controller) => {
      controller.update(this.element, options)
    })
  }
}
