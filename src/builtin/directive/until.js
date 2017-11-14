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
   * @param {LitTag|string} placeholder 
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

  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  update(contentUpdater) {
    let isResolved = false
    function handler(content) {
      isResolved = true
      contentUpdater.update([content])
    }
    this.promise.then(handler)
    if (!isResolved) contentUpdater.update([
      this.placeholder
    ])
  }
}
