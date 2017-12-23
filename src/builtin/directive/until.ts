import { Directive } from '../../core/expression/directive.js'
import { LitTag } from '../../core/expression/littag.js'
import { ContentUpdater } from '../../core/updater/content.js'
import { DynamicPart } from '../../constant.js'

export function until(promise: Promise<DynamicPart>, placeholder: LitTag) {
  return new Until(promise, placeholder)
}

export class Until extends Directive {
  constructor(
    private promise: Promise<DynamicPart>,
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
    if (this.promise === updater.value)
      return this.promise
    else
      return this.init(updater)
  }
}
