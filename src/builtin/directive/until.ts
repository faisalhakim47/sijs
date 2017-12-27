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
    updater.init(this.placeholder)
    this.promise.then((litTag) => {
      updater.update(litTag)
    })
    updater.value = this.promise
  }

  update(updater: ContentUpdater) {
    updater.value = this.promise === updater.value
      ? this.promise
      : this.init(updater)
  }
}
