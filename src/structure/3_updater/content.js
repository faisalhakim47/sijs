import { Updater } from './updater.js'
import { Repeat } from '../4_directive/repeat.js'
import { LitTag } from '../../core/littag.js'

export class ContentUpdater extends Updater {
  static filter() { return true }

  /**
   * @param {Node} node
   */
  constructor(node, expression) {
    super()
    if (node.previousSibling == null) {
      node.parentNode.insertBefore(
        document.createTextNode(''),
        node
      )
    }
    this.prevNode = node.previousSibling
    this.nextNode = node.nextSibling
    this.numberOfPart = 1
  }

  get oldElements() {
    let content = this.prevNode.nextSibling
    /**
     * @type {Node[]}
     */
    const oldElements = []
    while (content !== this.nextNode) {
      oldElements.push(content)
      content = content.nextSibling
    }
    return oldElements
  }

  update(newValues) {
    const oldElement = this.oldElements[0]
    const newValue = newValues[0]
    if (newValue instanceof LitTag) {
      newValue.render(oldElement)
    }
    else if (newValue instanceof Repeat) {
      newValue.update(this.oldElements, this.prevNode, this.nextNode)
    }
    else if (('' + newValues) !== this.oldElements[0].nodeValue) {
      oldElement.nodeValue = newValues
    }
  }
}
