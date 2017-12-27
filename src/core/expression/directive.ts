import { ContentUpdater, ContentExpr } from '../updater/content.js'
import { DynamicPart } from '../../constant.js'

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

class DirectiveExpr extends ContentExpr {
  match(content: DynamicPart) {
    return content instanceof Directive
  }
  init(updater: ContentUpdater, content: Directive) {
    content.init(updater)
  }
  update(updater: ContentUpdater, content: Directive) {
    content.update(updater)
  }
}

ContentUpdater.registerContentExpr(new DirectiveExpr())
