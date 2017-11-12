import { prepareToRemoveNode } from './component.js'
import { requestTemplate, TemplateInstance, templateCache } from './template.js'
import { INSTANCE } from '../constant.js'

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
    const instance = requestTemplate(this.staticParts).create()
    instance.element[INSTANCE] = instance
    instance.update(this.dymanicParts, { isInit: true })
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
      prepareToRemoveNode(container)
      container.parentNode.replaceChild(
        this.compile().element,
        container,
      )
    }
  }
}
