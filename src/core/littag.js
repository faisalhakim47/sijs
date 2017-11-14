import { prepareToRemoveNode } from './component.js'
import { requestTemplate, TemplateInstance } from './template.js'
import { INSTANCE } from '../constant.js'

/**
 * LitTag is class that represent the Tagged Template Literal
 * it is created by html function
 */
export class LitTag {
  /**
   * @param {TemplateStringsArray} staticParts 
   * @param {any[]} dymanicParts 
   */
  constructor(staticParts, dymanicParts) {
    this.staticParts = staticParts
    this.dymanicParts = dymanicParts
  }

  /**
   * @param {TemplateInstance} instance 
   */
  verify(instance) {
    return instance instanceof TemplateInstance
      && instance.staticParts === this.staticParts
  }

  compile() {
    const instance = requestTemplate(this.staticParts).clone()
    instance.init(this.dymanicParts)
    return instance
  }

  /**
   * @param {Node} target
   */
  mount(target) {
    /** @type {TemplateInstance} */
    const instance = target[INSTANCE]
    if (this.verify(instance)) {
      instance.update(this.dymanicParts)
    } else {
      prepareToRemoveNode(target)
      target.parentNode.replaceChild(
        this.compile().element,
        target,
      )
    }
  }
}
