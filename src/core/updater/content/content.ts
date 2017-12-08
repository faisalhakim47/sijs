import { Updater } from '../updater.js'
import { Component, initComponent, updateComponent } from './component.js'
import { Directive } from './directive.js'
import { LitTag } from '../../littag.js'
import { INSTANCE } from '../../../constant.js'
import { replaceNode, insertNodeBefore, appendNode, removeNode } from '../../../tools/dom.js'

export class ContentUpdater extends Updater {
  private initNode: Node
  public previousNode: Node
  public nextNode: Node
  public oldValue: any

  constructor(node: Node) {
    super()
    this.initNode = node
    this.previousNode = node.previousSibling
    this.nextNode = node.nextSibling
    this.oldValue = null
  }

  clearContent() {
    if (!this.previousNode || !this.nextNode) return
    let contentNode: Node
    while ((contentNode = this.previousNode.nextSibling) !== this.nextNode)
      removeNode(contentNode)
  }

  init(values: any[]) {
    if (this.initNode && !this.initNode.previousSibling) {
      insertNodeBefore(this.initNode, document.createComment(''))
      this.previousNode = this.initNode.previousSibling
    }

    if (this.initNode && !this.initNode.previousSibling) {
      appendNode(this.initNode, document.createComment(''))
      this.nextNode = this.initNode.nextSibling
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

  update(values: any[]) {
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
