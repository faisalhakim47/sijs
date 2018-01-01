import { ContentUpdater, ContentExpr } from '../updater/content.js'
import { DynamicPart, BasicDynamicPart } from '../../constant.js'
import { insertNodeBefore } from '../../tools/dom.js'

class ArrayExpr extends ContentExpr {
  match(content: DynamicPart) {
    return Array.isArray(content)
  }
  update(updater: ContentUpdater, contents: BasicDynamicPart[]) {
    updater.clearContent()
    contents.forEach((content) => {
      const node = document.createComment('')
      insertNodeBefore(updater.nextNode, node)
      new ContentUpdater(node).init(content)
    })
  }
}

ContentUpdater.registerContentExpr(new ArrayExpr())
