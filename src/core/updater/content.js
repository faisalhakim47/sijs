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

  /**
   * @returns {Node[]}
   */
  get oldElements() {
    let content = this.prevNode.nextSibling
    const oldElements = []
    while (content !== this.nextNode) {
      oldElements.push(content)
      content = content.nextSibling
    }
    return oldElements
  }

  update(newValues) {
    const newValue = newValues[0]
    const oldElement = this.prevNode.nextSibling

    if (newValue instanceof LitTag)
      newValue.render(oldElement)

    else if (newValue instanceof Repeat)
      newValue.update(this.oldElements, this.prevNode, this.nextNode)

    else if ((newValue + '') !== oldElement.nodeValue)
      oldElement.nodeValue = newValue

  }
}
