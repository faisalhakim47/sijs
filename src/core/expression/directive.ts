import { ContentUpdater } from '../updater/content.js'

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
  init(contentUpdater: ContentUpdater) {
    this.update(contentUpdater)
  }

  update(contentUpdater: ContentUpdater) { }
}
