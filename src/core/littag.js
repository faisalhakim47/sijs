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
    return this.staticParts === instance.staticParts
  }

  compile() {
    const instance = requestTemplate(this.staticParts).create()
    instance.element[INSTANCE] = instance
    instance.update(this.dymanicParts)
    return instance
  }

  /**
   * @param {Node} container
   */
  render(container) {
    /** @type {TemplateInstance} */
    const instance = container[INSTANCE]
    if (instance instanceof TemplateInstance && this.verify(instance)) {
      instance.update(this.dymanicParts)
    } else {
      container.parentNode.replaceChild(
        this.compile().element,
        container,
      )
    }
  }
}
