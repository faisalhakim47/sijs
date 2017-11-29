import { ContentUpdater } from './content.js'

/**
 * extends this class to create content directive
 * usage:
 * ```
 * class Example extends Directive {
 *   constructor() { }
 *   init(contentUpdater) { }
 *   update(contentUpdater) { }
 * }
 * html`<div>${new Example()}</div>`
 * ```
 * there are built-in directives namely repeat and until 
 */
export class Directive {
  /**
   * @param {ContentUpdater} contentUpdater 
   */
  init(contentUpdater) {
    this.update(contentUpdater)
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   * @param {any} oldValue 
   */
  update(contentUpdater, oldValue) { }
}
