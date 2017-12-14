"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class Directive {
    init(contentUpdater) {
        this.update(contentUpdater);
    }
    update(contentUpdater) { }
}
exports.Directive = Directive;
