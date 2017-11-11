import { Updater } from './updater.js'
import { Repeat } from '../directive/repeat.js'
import { LitTag } from '../../core/littag.js'

export class ContentUpdater extends Updater {
  /**
   * @param {Node} node
   */
  constructor(node) {
    super()

    if (node.previousSibling == null)
      node.parentNode.insertBefore(
        document.createTextNode(''),
        node,
      )

    if (node.nextSibling == null)
      node.parentNode.appendChild(document.createTextNode(''))

    this.prevNode = node.previousSibling
    this.nextNode = node.nextSibling
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
    const oldElement = this.prevNode.nextSibling
    const newValue = newValues[0]
    if (newValue instanceof LitTag) {
      newValue.render(oldElement)
    }
    else if (newValue instanceof Repeat) {
      newValue.update(this.oldElements, this.prevNode, this.nextNode)
    }
    else if (('' + newValue) !== this.oldElements[0].nodeValue) {
      oldElement.nodeValue = newValue
    }
  }
}
