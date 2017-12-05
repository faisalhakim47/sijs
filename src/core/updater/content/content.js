import { Updater } from '../updater.js'
import { Component, initComponent, updateComponent } from './component.js'
import { Directive } from './directive.js'
import { LitTag } from '../../littag.js'
import { INSTANCE } from '../../../constant.js'
import { replaceNode, insertNodeBefore, appendNode } from '../../../tools/dom.js'

export class ContentUpdater extends Updater {
  /**
   * @param {Node} node
   */
  constructor(node) {
    super()
    this.initNode = node
    this.previousNode = node.previousSibling
    this.nextNode = node.nextSibling
    this.oldValue = null
  }

  /**
   * @param {any[]} values 
   */
  init(values) {
    if (this.initNode.previousSibling == null) {
      insertNodeBefore(node, document.createComment(''))
      this.previousNode = node.previousSibling
    }

    if (this.initNode.nextSibling == null) {
      appendNode(node, document.createComment(''))
      this.nextNode = node.nextSibling
    }

    this.initNode = null

    const currentNode = this.previousNode.nextSibling
    const content = values[0]

    if (content instanceof LitTag)
      content.mount(currentNode)

    else if (content instanceof Directive)
      this.oldValue = content.init(this)

    else if (content instanceof Component)
      initComponent(content, currentNode)

    else {
      const textNode = document.createTextNode(content)
      replaceNode(currentNode, textNode)
      this.oldValue = textNode.nodeValue
    }
  }

  /**
   * @param {any[]} values 
   */
  update(values) {
    let currentNode = this.previousNode.nextSibling
    let content = values[0]

    if (content instanceof LitTag)
      content.mount(currentNode)

    else if (content instanceof Directive)
      this.oldValue = content.update(this)

    else if (content instanceof Component)
      updateComponent(content, currentNode)

    else if ((content + '') !== this.oldValue)
      this.oldValue = currentNode.nodeValue = content

  }
}
