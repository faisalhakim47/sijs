import { requestTemplate, TemplateInstance } from '../template.js'
import { ContentUpdater, ContentExpr } from '../updater/content.js'
import { INSTANCE, AsyncDynamicPart, DynamicPart } from '../../constant.js'
import { replaceNode, insertNodeBefore } from '../../tools/dom.js'

export function html(staticParts: TemplateStringsArray, ...dynamicParts: AsyncDynamicPart[]) {
  return new LitTag(staticParts, dynamicParts)
}

/**
 * LitTag is class that represent the Tagged Template Literal
 * it is created by html function
 */
export class LitTag {
  constructor(
    private staticParts: TemplateStringsArray,
    public dymanicParts: AsyncDynamicPart[]
  ) { }

  verify(instance: TemplateInstance) {
    return instance instanceof TemplateInstance
      && instance.staticParts === this.staticParts
  }

  compile() {
    const instance = requestTemplate(this.staticParts).clone()
    instance.init(this.dymanicParts)
    return instance
  }

  mount(container: Node) {
    const instance: TemplateInstance = container[INSTANCE]
    if (this.verify(instance)) {
      instance.update(this.dymanicParts)
    } else {
      replaceNode(container, this.compile().element)
    }
  }
}

class LitTagExpr extends ContentExpr {
  match(content: DynamicPart) {
    return content instanceof LitTag
  }
  update({ previousNode, nextNode }: ContentUpdater, content: LitTag) {
    if (previousNode.nextSibling === nextNode) {
      insertNodeBefore(nextNode, document.createComment(''))
    }
    content.mount(previousNode.nextSibling)
  }
}

ContentUpdater.registerContentExpr(new LitTagExpr())
