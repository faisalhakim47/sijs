import { Updater } from './updater.js'

export class AttributeUpdater extends Updater {
  /**
   * @param {Attr} attribute 
   * @param {string[]} expression
   */
  constructor(attribute, staticParts) {
    super()
    this.node = attribute.parentElement
    this.attribute = attribute
    this.staticParts = staticParts
    /* @type {string[]}  */
    this.oldValue = ''
    this.numberOfPart = staticParts.length - 1
  }

  /**
   * @param {string[]} newValues
   */
  update(newValues) {
    const length = this.staticParts.length
    if (length === 1 && typeof newValues[0] === 'boolean') {
      if (newValues[0])
        this.node.removeAttributeNode(this.attribute)
      else
        this.node.setAttributeNode(this.attribute)
    } else {
      let value = ''
      for (let index = 0; index < length; index++) {
        value += this.staticParts[index] + (newValues[index] || '')
      }
      if (value !== this.oldValue) {
        this.attribute.nodeValue = value
        this.oldValue = value
      }
    }
  }
}
