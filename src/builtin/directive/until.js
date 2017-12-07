import { Directive } from '../../core/updater/content/directive.js'
import { LitTag } from '../../core/littag.js'
import { ContentUpdater } from '../../core/updater/content/content.js'

/**
 * @param {Promise} promise 
 * @param {LitTag} placeholder 
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
   * @param {ContentUpdater} updater 
   */
  init(updater) {
    updater.init([this.placeholder])
    this.promise.then((litTag) => {
      if (this.promise.si_cancel) return
      updater.update([litTag])
    })
    return this.promise
  }

  /**
   * @param {ContentUpdater} updater 
   */
  update(updater) {
    if (this.promise === updater.oldValue)
      return this.promise
    else {
      if (updater.oldValue instanceof Promise) {
        updater.oldValue.si_cancel = true
      }
      return this.init(updater)
    }
  }
}
