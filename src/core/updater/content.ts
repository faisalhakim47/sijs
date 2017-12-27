import { Updater } from './updater.js'
import { Directive } from '../expression/directive.js'
import { LitTag } from '../expression/littag.js'
import { INSTANCE, DynamicPart } from '../../constant.js'
import { replaceNode, insertNodeBefore, appendNode, removeNode, removeNodeBetween } from '../../tools/dom.js'

export class ContentExpr {
  match(content: DynamicPart): boolean {
    return false
  }
  init(updater: ContentUpdater, content: DynamicPart) {
    this.update(updater, content)
  }
  update(updater: ContentUpdater, content: DynamicPart) { }
}

export class ContentUpdater extends Updater {
  static contentExprs: ContentExpr[] = []
  static registerContentExpr(contentExpr: ContentExpr) {
    this.contentExprs.push(contentExpr)
  }

  private initNode: Node
  private currentExp: ContentExpr
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

  clearContent() {
    removeNodeBetween(this.previousNode, this.nextNode)
  }

  init(content: DynamicPart) {
    if (!this.initNode) {
      return this.update(content)
    }

    if (!this.initNode.previousSibling) {
      insertNodeBefore(this.initNode, document.createComment(''))
      this.previousNode = this.initNode.previousSibling
    }

    if (!this.initNode.previousSibling) {
      appendNode(this.initNode, document.createComment(''))
      this.nextNode = this.initNode.nextSibling
    }
    
    this.initNode = null

    const length = ContentUpdater.contentExprs.length
    for (let index = 0; index < length; index++) {
      const contentExpr = ContentUpdater.contentExprs[index]
      if (contentExpr.match(content)) {
        contentExpr.init(this, content)
        this.currentExp = contentExpr
        break
      }
    }
  }

  update(content: DynamicPart) {
    const length = ContentUpdater.contentExprs.length
    for (let index = 0; index < length; index++) {
      const contentExpr = ContentUpdater.contentExprs[index]
      if (contentExpr.match(content)) {
        if (this.currentExp === contentExpr) {
          contentExpr.update(this, content)
        } else {
          this.clearContent()
          contentExpr.init(this, content)
        }
        this.currentExp = contentExpr
        break
      }
    }
  }
}
