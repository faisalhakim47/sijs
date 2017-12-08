/**
 * this is base class for every Updater
 * the purpose of Updater is to do the dirty work with DOM
 * the Updaters will be stored in TemplateInstance
 * with DOM that they manage 
 */
export class Updater {
  numberOfPart = 1

  init(values: any[]) {
    return this.update(values)
  }

  update(values: any[]) { }
}
