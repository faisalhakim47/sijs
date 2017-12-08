import { Directive } from '../../core/updater/content/directive.js'
import { LitTag } from '../../core/littag.js'
import { ContentUpdater } from '../../core/updater/content/content.js'

export function until<T>(promise: Promise<T>, placeholder: LitTag) {
  return new Until(promise, placeholder)
}

export class Until<T> extends Directive {
  constructor(
    private promise: Promise<T>,
    private placeholder: LitTag
  ) { super() }

  init(updater: ContentUpdater) {
    updater.init([this.placeholder])
    this.promise.then((litTag) => {
      updater.update([litTag])
    })
    return this.promise
  }

  update(updater: ContentUpdater) {
    if (this.promise === updater.oldValue)
      return this.promise
    else {
      return this.init(updater)
    }
  }
}
