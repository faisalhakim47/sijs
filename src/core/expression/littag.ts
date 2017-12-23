import { requestTemplate, TemplateInstance } from '../template.js'
import { INSTANCE, AsyncDynamicPart } from '../../constant.js'
import { replaceNode } from '../../tools/dom.js'

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
