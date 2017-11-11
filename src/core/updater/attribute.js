import { Updater } from './updater.js'

export class AttributeUpdater extends Updater {
  /**
   * @param {Attr} attribute 
   * @param {string[]} expression
   */
  constructor(attribute, staticParts) {
    super()
    this.attribute = attribute
    this.staticParts = staticParts
    /* @type {string[]}  */
    this.oldValues = []
    this.numberOfPart = staticParts.length - 1
  }

  /**
   * @param {string[]} newValues 
   */
  update(newValues) {
    if (newValues.findIndex((newValue, index) => {
      return newValue !== this.oldValues[index]
    }) === -1) return
    let newValueIndex = 0
    const lastPartIndex = this.numberOfPart
    const value = this.staticParts.map((staticPart, index) => {
      if (index === lastPartIndex) return staticPart
      return staticPart + newValues[newValueIndex++]
    }).join('')
    this.attribute.value = value
    this.oldValues = newValues
  }
}
