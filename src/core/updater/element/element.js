import { Updater } from '../updater.js'
import { registeredController } from './controller.js'
import { MARKER } from '../../../constant.js'

export class ElementUpdater extends Updater {
  /**
   * @param {Element} node
   */
  constructor(node) {
    super()
    this.node = node
  }

  init(options) {
    this.node.removeAttribute(MARKER)
    const length = registeredController.length
    for (let index = 0; index < length; index++)
      registeredController[index].init(this.node, options)
  }

  update(options) {
    const length = registeredController.length
    for (let index = 0; index < length; index++)
      registeredController[index].update(this.node, options)
  }
}
