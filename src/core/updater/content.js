import { Updater } from './updater.js'
import { Directive } from '../directive.js'
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

  update(newValues) {
    const newValue = newValues[0]
    const currNode = this.prevNode.nextSibling

    if (newValue instanceof LitTag)
      newValue.render(currNode)

    else if (newValue instanceof Directive)
      newValue.update(
        currNode === this.nextNode ? null : currNode,
        this.prevNode,
        this.nextNode,
      )

    else if ((newValue + '') !== currNode.nodeValue)
      currNode.nodeValue = newValue

  }
}
