import { Updater } from './updater.js'
import { Directive } from '../expression/directive.js'
import { LitTag } from '../expression/littag.js'
import { INSTANCE, DynamicPart } from '../../constant.js'
import { replaceNode, insertNodeBefore, appendNode, removeNode } from '../../tools/dom.js'

export class ContentUpdater extends Updater {
  private initNode: Node
  public previousNode: Node
  public nextNode: Node
  public value: any

  constructor(node: Node) {
    super()
    this.initNode = node
    this.previousNode = node.previousSibling
    this.nextNode = node.nextSibling
    this.value = null
  }

  init(content: DynamicPart) {
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

    if (content instanceof LitTag)
      content.mount(currentNode)

    else if (content instanceof Directive)
      this.value = content.init(this)

    else {
      const textNode = document.createTextNode(('' + content))
      replaceNode(currentNode, textNode)
      this.value = textNode.nodeValue
    }
  }

  update(content: DynamicPart) {
    let currentNode = this.previousNode.nextSibling

    if (content instanceof LitTag)
      content.mount(currentNode)

    else if (content instanceof Directive)
      this.value = content.update(this)

    else if (('' + content) !== this.value) {
      this.value = '' + content
      currentNode.nodeValue = this.value
    }
  }
}
