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
    return templateCache.get(this.staticParts) === instance.template
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
    if (container[INSTANCE] instanceof TemplateInstance && this.verify(container[INSTANCE])) {
      const instance = container[INSTANCE]
      instance.update(this.dymanicParts)
    } else {
      const instance = this.compile()
      container.parentNode.replaceChild(instance.element, container)
    }
  }
}
