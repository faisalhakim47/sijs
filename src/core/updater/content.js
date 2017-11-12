import { Updater } from './updater.js'
import { Component, initiateComponent, updateComponent } from '../component.js'
import { Directive } from '../directive.js'
import { LitTag } from '../../core/littag.js'
import { TemplateInstance } from '../../core/template.js'
import { INSTANCE } from '../../constant.js'

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
   * @param {any[]} newValues 
   * @param {any} flags 
   */
  update(newValues, { isInit }) {
    let newValue = newValues[0]
    const currNode = this.prevNode.nextSibling

    if (newValue instanceof LitTag)
      newValue.mount(currNode)

    else if (newValue instanceof Directive)
      newValue.update(
        currNode === this.nextNode ? null : currNode,
        this.prevNode,
        this.nextNode,
      )

    else if (newValue instanceof Component)
      if (isInit) initiateComponent(newValue, currNode)
      else updateComponent(newValue, currNode)

    else if ((newValue + '') !== currNode.nodeValue)
      currNode.nodeValue = newValue
  }
}
