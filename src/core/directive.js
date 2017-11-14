import { ContentUpdater } from '../core/updater/content.js'

/**
 * extends this class to create content directive
 * usage:
 * ```javascript
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
  init(contentUpdater) { }
  /**
   * @param {ContentUpdater} contentUpdater 
   */
  update(contentUpdater) { }
}
