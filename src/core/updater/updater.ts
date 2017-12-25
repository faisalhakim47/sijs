import { DynamicPart } from '../../constant.js'
/**
 * this is base class for every Updater
 * the purpose of Updater is to do the dirty work with DOM
 * the Updaters will be stored in TemplateInstance
 * with DOM that they manage 
 */
export class Updater {
  init(value: DynamicPart) {
    return this.update(value)
  }
  update(value: DynamicPart) { }
}
