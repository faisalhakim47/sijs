/**
 * this is base class for every Updater
 * the purpose of Updater is to do the dirty work with DOM
 * the Updaters will be stored in TemplateInstance
 * with DOM that they manage 
 */
export class Updater {
  constructor() {
    this.numberOfPart = 1
  }

  /**
   * @param {any[]} values 
   */
  init(values) {
    return this.update(values)
  }

  /**
   * @param {any[]} values 
   */
  update(values) { }
}
