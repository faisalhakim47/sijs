import { Updater } from './updater.js'
import { Component, initComponent, updateComponent } from '../component.js'
import { Directive } from '../directive.js'
import { LitTag } from '../../core/littag.js'
import { INSTANCE } from '../../constant.js'

export class ContentUpdater extends Updater {
  /**
   * @param {Node} node
   */
  constructor(node) {
    super()

    if (node.previousSibling == null)
      node.parentNode.insertBefore(
        document.createComment(''),
        node,
      )

    if (node.nextSibling == null)
      node.parentNode.appendChild(document.createComment(''))

    this.previousNode = node.previousSibling
    this.nextNode = node.nextSibling
    this.oldValue = null
  }

  /**
   * @param {any[]} values 
   */
  init(values) {
    const currentNode = this.previousNode.nextSibling
    const value = values[0]

    if (value instanceof LitTag)
      value.mount(currentNode)

    else if (value instanceof Directive)
      value.init(this)

    else if (value instanceof Component)
      initComponent(value, currentNode)

    else {
      const textNode = document.createTextNode(value)
      currentNode.parentNode.replaceChild(
        textNode,
        currentNode,
      )
      this.oldValue = textNode.nodeValue
    }
  }

  /**
   * @param {any[]} values 
   */
  update(values) {
    let currentNode = this.previousNode.nextSibling
    let value = values[0]

    if (value instanceof LitTag)
      value.mount(currentNode)

    else if (value instanceof Directive)
      value.update(this)

    else if (value instanceof Component)
      updateComponent(value, currentNode)

    else if ((value + '') !== this.oldValue)
      this.oldValue = currentNode.nodeValue = value

  }
}
