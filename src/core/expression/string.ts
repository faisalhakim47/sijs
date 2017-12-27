import { ContentUpdater, ContentExpr } from '../updater/content.js'
import { DynamicPart, BasicDynamicPart } from '../../constant.js'
import { insertNodeBefore, replaceNode } from '../../tools/dom.js'

class StringExpr extends ContentExpr {
  match(content: DynamicPart) {
    return typeof content === 'string' || content == undefined
  }
  init({ previousNode, nextNode }: ContentUpdater, content: string) {
    if (previousNode.nextSibling === nextNode) {
      insertNodeBefore(nextNode, document.createTextNode('' + content))
    } else {
      replaceNode(previousNode.nextSibling, document.createTextNode('' + content))
    }
  }
  update({ previousNode, nextNode }: ContentUpdater, content: string) {
    if (previousNode.nextSibling === nextNode) {
      insertNodeBefore(nextNode, document.createTextNode('' + content))
    } else {
      previousNode.nextSibling.nodeValue = '' + content
    }
  }
}

ContentUpdater.registerContentExpr(new StringExpr())
