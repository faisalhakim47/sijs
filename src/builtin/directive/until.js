import { prepareToRemoveNode } from '../../core/component.js'
import { Directive } from '../../core/directive.js'
import { LitTag } from '../../core/littag.js'
import { ContentUpdater } from '../../core/updater/content.js'

/**
   * @param {Promise} promise 
   * @param {any} placeholder 
   */
export function until(promise, placeholder) {
  return new Until(promise, placeholder)
}

class Until extends Directive {
  /**
   * @param {Promise} promise 
   * @param {LitTag} placeholder 
   */
  constructor(promise, placeholder) {
    super()
    this.promise = promise
    this.placeholder = placeholder
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  init(contentUpdater) {
    const updater = new ContentUpdater(
      contentUpdater.previousNode.nextSibling
    )
    updater.init([this.placeholder])
    this.promise.then((littag) => {
      updater.update([littag])
    })
    return this.promise
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  update(oldPromise, contentUpdater) {
    if (this.promise === oldPromise)
      return oldPromise
    else
      return this.init(contentUpdater)
  }
}
