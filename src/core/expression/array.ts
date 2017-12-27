import { ContentUpdater, ContentExpr } from '../updater/content.js'
import { DynamicPart, BasicDynamicPart } from '../../constant.js'
import { insertNodeBefore } from '../../tools/dom.js'

class ArrayExpr extends ContentExpr {
  match(content: DynamicPart) {
    return Array.isArray(content)
  }
  update(updater: ContentUpdater, content: BasicDynamicPart[]) {
    updater.clearContent()
    const length = content.length
    for (let index = 0; index < length; index++) {
      const node = document.createComment('')
      insertNodeBefore(updater.nextNode, node)
      new ContentUpdater(node).init(content[index])
    }
  }
}

ContentUpdater.registerContentExpr(new ArrayExpr())
