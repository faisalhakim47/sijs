import { requestTemplate, TemplateInstance } from './template.js'
import { INSTANCE } from '../constant.js'
import { replaceNode } from '../tools/dom.js'

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
   * @param {Node} container
   */
  mount(container) {
    /** @type {TemplateInstance} */
    const instance = container[INSTANCE]
    if (this.verify(instance)) {
      instance.update(this.dymanicParts)
    } else {
      replaceNode(container, this.compile().element)
    }
  }
}
