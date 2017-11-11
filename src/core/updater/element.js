import { Updater } from './updater.js'
import { IFELSE } from '../../constant.js'

export class ElementUpdater extends Updater {
  /**
   * @param {Element} node
   */
  constructor(node) {
    super()
    this.node = node
    this.prevNode = node.previousSibling
    this.nextNode = node.nextSibling
    this.options = {}
  }

  update(options) {
    options = options[0]
    for (const key in options) {
      const newOption = options[key]
      if (key === 'if') {
        if (newOption === this.options.if) continue
        else if (!newOption) {
          this.nextNode.parentNode.removeChild(
            this.node,
          )
          this.nextNode[IFELSE] = false
        }
        else if (newOption) {
          this.nextNode.parentNode.insertBefore(
            this.node,
            this.nextNode,
          )
          this.nextNode[IFELSE] = true
        }
        this.options.if = newOption
      }
      else if (key === 'elseIf') {
        const prevIf = this.prevNode[IFELSE]
        if (newOption === this.options.elseIf && prevIf === this.options.prevIf) {
          continue
        }
        if (!newOption || prevIf) {
          this.nextNode.parentNode.removeChild(
            this.node,
          )
          this.nextNode[IFELSE] = prevIf
        }
        else if (newOption) {
          this.nextNode.parentNode.insertBefore(
            this.node,
            this.nextNode,
          )
          this.nextNode[IFELSE] = true
        }
        this.options.prevIf = prevIf
        this.options.elseIf = newOption
      }
    }
  }
}
